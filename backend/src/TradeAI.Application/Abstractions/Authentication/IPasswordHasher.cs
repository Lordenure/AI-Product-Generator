using TradeAI.Domain.Entities;

namespace TradeAI.Application.Abstractions.Authentication;

public interface IPasswordHasher
{
    string HashPassword(User user, string password);

    bool VerifyPassword(User user, string password);
}
