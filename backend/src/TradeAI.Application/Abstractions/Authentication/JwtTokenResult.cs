namespace TradeAI.Application.Abstractions.Authentication;

public sealed record JwtTokenResult(string Token, DateTime ExpiresAtUtc);
