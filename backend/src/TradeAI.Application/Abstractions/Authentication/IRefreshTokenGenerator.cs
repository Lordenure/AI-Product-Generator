namespace TradeAI.Application.Abstractions.Authentication;

public interface IRefreshTokenGenerator
{
    RefreshTokenResult Generate(DateTime utcNow);
}
