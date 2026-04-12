using TradeAI.Application.Users;

namespace TradeAI.Application.Authentication.Models;

public sealed record AuthResponse(
    string AccessToken,
    DateTime AccessTokenExpiresAtUtc,
    string RefreshToken,
    DateTime RefreshTokenExpiresAtUtc,
    CurrentUserResponse User);
