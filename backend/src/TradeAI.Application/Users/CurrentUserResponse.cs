using TradeAI.Domain.Enums;

namespace TradeAI.Application.Users;

public sealed record CurrentUserResponse(
    Guid Id,
    string Email,
    string DisplayName,
    string? AvatarUrl,
    string? CoverImageUrl,
    AuthProvider AuthProvider,
    DateTime CreatedAtUtc,
    DateTime? LastLoginAtUtc,
    bool IsActive);
