using TradeAI.Domain.Entities;

namespace TradeAI.Application.Abstractions.Authentication;

public interface IJwtTokenGenerator
{
    JwtTokenResult Generate(User user);
}
