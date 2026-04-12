using FluentValidation;
using TradeAI.Application.Abstractions.Persistence;
using TradeAI.Application.Abstractions.Storage;
using TradeAI.Application.Abstractions.Time;
using TradeAI.Application.Common.Exceptions;

namespace TradeAI.Application.Users;

public sealed class UserService(
    IUserRepository userRepository,
    IUnitOfWork unitOfWork,
    IProfileMediaStorage profileMediaStorage,
    IDateTimeProvider dateTimeProvider,
    IValidator<UpdateCurrentUserProfileRequest> updateCurrentUserProfileValidator) : IUserService
{
    public async Task<CurrentUserResponse> GetCurrentUserAsync(Guid userId, CancellationToken cancellationToken = default)
    {
        var user = await userRepository.GetByIdAsync(userId, cancellationToken);

        if (user is null || !user.IsActive)
        {
            throw new NotFoundException("The current user could not be found.");
        }

        return MapCurrentUser(user);
    }

    public async Task<CurrentUserResponse> UpdateCurrentUserProfileAsync(
        Guid userId,
        UpdateCurrentUserProfileRequest request,
        CancellationToken cancellationToken = default)
    {
        await updateCurrentUserProfileValidator.ValidateAndThrowAsync(request, cancellationToken);

        var user = await userRepository.GetByIdAsync(userId, cancellationToken);

        if (user is null || !user.IsActive)
        {
            throw new NotFoundException("The current user could not be found.");
        }

        var avatarUrl = user.AvatarUrl;
        var coverImageUrl = user.CoverImageUrl;

        if (request.Avatar is not null)
        {
            var nextAvatarUrl = await profileMediaStorage.SaveAsync(user.Id, ProfileMediaKind.Avatar, request.Avatar, cancellationToken);
            await profileMediaStorage.DeleteAsync(avatarUrl, cancellationToken);
            avatarUrl = nextAvatarUrl;
        }
        else if (request.RemoveAvatar)
        {
            await profileMediaStorage.DeleteAsync(avatarUrl, cancellationToken);
            avatarUrl = null;
        }

        if (request.Cover is not null)
        {
            var nextCoverImageUrl = await profileMediaStorage.SaveAsync(user.Id, ProfileMediaKind.Cover, request.Cover, cancellationToken);
            await profileMediaStorage.DeleteAsync(coverImageUrl, cancellationToken);
            coverImageUrl = nextCoverImageUrl;
        }
        else if (request.RemoveCover)
        {
            await profileMediaStorage.DeleteAsync(coverImageUrl, cancellationToken);
            coverImageUrl = null;
        }

        user.UpdateProfile(request.DisplayName.Trim(), avatarUrl, coverImageUrl, dateTimeProvider.UtcNow);
        await unitOfWork.SaveChangesAsync(cancellationToken);

        return MapCurrentUser(user);
    }

    private static CurrentUserResponse MapCurrentUser(Domain.Entities.User user)
    {
        return new CurrentUserResponse(
            user.Id,
            user.Email,
            user.DisplayName,
            user.AvatarUrl,
            user.CoverImageUrl,
            user.AuthProvider,
            user.CreatedAtUtc,
            user.LastLoginAtUtc,
            user.IsActive);
    }
}
