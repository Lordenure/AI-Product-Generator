using TradeAI.Application.Abstractions.Authentication;
using TradeAI.Application.Abstractions.Persistence;
using TradeAI.Application.Abstractions.Time;
using TradeAI.Application.Authentication.Models;
using TradeAI.Application.Common.Exceptions;
using TradeAI.Application.Users;
using TradeAI.Domain.Entities;

namespace TradeAI.Application.Authentication;

public sealed class AuthService(
    IUserRepository userRepository,
    IRefreshTokenRepository refreshTokenRepository,
    IUnitOfWork unitOfWork,
    IPasswordHasher passwordHasher,
    IJwtTokenGenerator jwtTokenGenerator,
    IRefreshTokenGenerator refreshTokenGenerator,
    IRefreshTokenHasher refreshTokenHasher,
    IDateTimeProvider dateTimeProvider) : IAuthService
{
    public async Task<AuthResponse> RegisterAsync(RegisterRequest request, CancellationToken cancellationToken = default)
    {
        var normalizedEmail = NormalizeEmail(request.Email);
        var displayName = request.DisplayName.Trim();

        var existingUser = await userRepository.GetByEmailAsync(normalizedEmail, cancellationToken);
        if (existingUser is not null)
        {
            throw new ConflictException("An account with this email already exists.");
        }

        var utcNow = dateTimeProvider.UtcNow;
        var user = User.Create(normalizedEmail, string.Empty, displayName, utcNow);
        user.SetPasswordHash(passwordHasher.HashPassword(user, request.Password));

        await userRepository.AddAsync(user, cancellationToken);

        var response = await CreateAuthResponseAsync(user, utcNow, cancellationToken);
        await unitOfWork.SaveChangesAsync(cancellationToken);

        return response;
    }

    public async Task<AuthResponse> LoginAsync(LoginRequest request, CancellationToken cancellationToken = default)
    {
        var normalizedEmail = NormalizeEmail(request.Email);
        var user = await userRepository.GetByEmailAsync(normalizedEmail, cancellationToken);

        if (user is null || !user.IsActive || !passwordHasher.VerifyPassword(user, request.Password))
        {
            throw new UnauthorizedException("Invalid email or password.");
        }

        var utcNow = dateTimeProvider.UtcNow;
        user.RecordLogin(utcNow);

        var response = await CreateAuthResponseAsync(user, utcNow, cancellationToken);
        await unitOfWork.SaveChangesAsync(cancellationToken);

        return response;
    }

    public async Task<AuthResponse> RefreshAsync(RefreshTokenRequest request, CancellationToken cancellationToken = default)
    {
        var utcNow = dateTimeProvider.UtcNow;
        var tokenHash = refreshTokenHasher.Hash(request.RefreshToken);
        var storedRefreshToken = await refreshTokenRepository.GetByHashAsync(tokenHash, cancellationToken);

        if (storedRefreshToken is null || storedRefreshToken.User is null || !storedRefreshToken.User.IsActive)
        {
            throw new UnauthorizedException("Refresh token is invalid.");
        }

        if (!storedRefreshToken.IsActive(utcNow))
        {
            if (storedRefreshToken.RevokedAtUtc is not null)
            {
                await RevokeActiveUserTokensAsync(storedRefreshToken.UserId, utcNow, "Refresh token reuse detected.", cancellationToken);
                await unitOfWork.SaveChangesAsync(cancellationToken);
            }

            throw new UnauthorizedException("Refresh token is no longer valid.");
        }

        var nextRefreshToken = refreshTokenGenerator.Generate(utcNow);
        storedRefreshToken.Revoke(utcNow, nextRefreshToken.TokenHash, "Rotated.");

        await refreshTokenRepository.AddAsync(
            RefreshToken.Create(storedRefreshToken.UserId, nextRefreshToken.TokenHash, utcNow, nextRefreshToken.ExpiresAtUtc),
            cancellationToken);

        var accessToken = jwtTokenGenerator.Generate(storedRefreshToken.User);
        await unitOfWork.SaveChangesAsync(cancellationToken);

        return BuildAuthResponse(storedRefreshToken.User, accessToken, nextRefreshToken);
    }

    public async Task LogoutAsync(LogoutRequest request, CancellationToken cancellationToken = default)
    {
        var tokenHash = refreshTokenHasher.Hash(request.RefreshToken);
        var storedRefreshToken = await refreshTokenRepository.GetByHashAsync(tokenHash, cancellationToken);

        if (storedRefreshToken is null)
        {
            return;
        }

        storedRefreshToken.Revoke(dateTimeProvider.UtcNow, null, "Logged out.");
        await unitOfWork.SaveChangesAsync(cancellationToken);
    }

    private async Task<AuthResponse> CreateAuthResponseAsync(User user, DateTime utcNow, CancellationToken cancellationToken)
    {
        var accessToken = jwtTokenGenerator.Generate(user);
        var refreshToken = refreshTokenGenerator.Generate(utcNow);

        await refreshTokenRepository.AddAsync(
            RefreshToken.Create(user.Id, refreshToken.TokenHash, utcNow, refreshToken.ExpiresAtUtc),
            cancellationToken);

        return BuildAuthResponse(user, accessToken, refreshToken);
    }

    private static AuthResponse BuildAuthResponse(User user, JwtTokenResult accessToken, RefreshTokenResult refreshToken)
    {
        return new AuthResponse(
            accessToken.Token,
            accessToken.ExpiresAtUtc,
            refreshToken.Token,
            refreshToken.ExpiresAtUtc,
            new CurrentUserResponse(
                user.Id,
                user.Email,
                user.DisplayName,
                user.AvatarUrl,
                user.CoverImageUrl,
                user.AuthProvider,
                user.CreatedAtUtc,
                user.LastLoginAtUtc,
                user.IsActive));
    }

    private async Task RevokeActiveUserTokensAsync(
        Guid userId,
        DateTime utcNow,
        string reason,
        CancellationToken cancellationToken)
    {
        var activeRefreshTokens = await refreshTokenRepository.GetActiveByUserIdAsync(userId, utcNow, cancellationToken);

        foreach (var refreshToken in activeRefreshTokens)
        {
            refreshToken.Revoke(utcNow, null, reason);
        }
    }

    private static string NormalizeEmail(string email)
    {
        return email.Trim().ToLowerInvariant();
    }
}
