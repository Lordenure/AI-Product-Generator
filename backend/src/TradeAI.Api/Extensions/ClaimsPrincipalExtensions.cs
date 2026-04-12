using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using TradeAI.Application.Common.Exceptions;

namespace TradeAI.Api.Extensions;

public static class ClaimsPrincipalExtensions
{
    public static Guid GetRequiredUserId(this ClaimsPrincipal principal)
    {
        var rawUserId = principal.FindFirstValue(ClaimTypes.NameIdentifier)
            ?? principal.FindFirstValue(JwtRegisteredClaimNames.Sub);

        if (Guid.TryParse(rawUserId, out var userId))
        {
            return userId;
        }

        throw new UnauthorizedException("The access token is invalid.");
    }
}
