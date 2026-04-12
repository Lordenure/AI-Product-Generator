using TradeAI.Application.Abstractions.Persistence;
using TradeAI.Application.Common.Exceptions;

namespace TradeAI.Application.Users;

public sealed class UserService(IUserRepository userRepository) : IUserService
{
    public async Task<CurrentUserResponse> GetCurrentUserAsync(Guid userId, CancellationToken cancellationToken = default)
    {
        var user = await userRepository.GetByIdAsync(userId, cancellationToken);

        if (user is null || !user.IsActive)
        {
            throw new NotFoundException("The current user could not be found.");
        }

        return new CurrentUserResponse(
            user.Id,
            user.Email,
            user.DisplayName,
            user.AuthProvider,
            user.CreatedAtUtc,
            user.LastLoginAtUtc,
            user.IsActive);
    }
}
