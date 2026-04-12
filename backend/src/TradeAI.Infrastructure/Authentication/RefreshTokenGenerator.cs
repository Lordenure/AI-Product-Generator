using System.Security.Cryptography;
using TradeAI.Application.Abstractions.Authentication;

namespace TradeAI.Infrastructure.Authentication;

public sealed class RefreshTokenGenerator(
    IRefreshTokenHasher refreshTokenHasher,
    Microsoft.Extensions.Options.IOptions<JwtOptions> jwtOptions) : IRefreshTokenGenerator
{
    private readonly JwtOptions _jwtOptions = jwtOptions.Value;

    public RefreshTokenResult Generate(DateTime utcNow)
    {
        var rawToken = ToUrlSafeBase64(RandomNumberGenerator.GetBytes(64));
        var tokenHash = refreshTokenHasher.Hash(rawToken);
        var expiresAtUtc = utcNow.AddDays(_jwtOptions.RefreshTokenLifetimeDays);

        return new RefreshTokenResult(rawToken, tokenHash, expiresAtUtc);
    }

    private static string ToUrlSafeBase64(byte[] value)
    {
        return Convert.ToBase64String(value)
            .Replace('+', '-')
            .Replace('/', '_')
            .TrimEnd('=');
    }
}
