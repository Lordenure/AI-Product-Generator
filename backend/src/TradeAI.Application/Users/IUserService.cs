namespace TradeAI.Application.Users;

public interface IUserService
{
    Task<CurrentUserResponse> GetCurrentUserAsync(Guid userId, CancellationToken cancellationToken = default);

    Task<CurrentUserResponse> UpdateCurrentUserProfileAsync(
        Guid userId,
        UpdateCurrentUserProfileRequest request,
        CancellationToken cancellationToken = default);
}
