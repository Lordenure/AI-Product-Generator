namespace TradeAI.Application.Authentication.Models;

public sealed record RegisterRequest(string Email, string Password, string DisplayName);
