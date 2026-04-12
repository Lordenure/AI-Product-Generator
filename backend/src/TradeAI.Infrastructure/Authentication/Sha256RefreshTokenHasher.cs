using System.Security.Cryptography;
using System.Text;
using TradeAI.Application.Abstractions.Authentication;

namespace TradeAI.Infrastructure.Authentication;

public sealed class Sha256RefreshTokenHasher : IRefreshTokenHasher
{
    public string Hash(string refreshToken)
    {
        var bytes = Encoding.UTF8.GetBytes(refreshToken);
        var hash = SHA256.HashData(bytes);
        return Convert.ToHexString(hash);
    }
}
