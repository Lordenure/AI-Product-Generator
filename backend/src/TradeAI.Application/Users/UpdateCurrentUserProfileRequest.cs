using TradeAI.Application.Abstractions.Storage;

namespace TradeAI.Application.Users;

public sealed record UpdateCurrentUserProfileRequest(
    string DisplayName,
    ProfileMediaUpload? Avatar,
    bool RemoveAvatar,
    ProfileMediaUpload? Cover,
    bool RemoveCover);
