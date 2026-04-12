using TradeAI.Domain.Enums;

namespace TradeAI.Application.Users;

public sealed record CurrentUserResponse(
    Guid Id,
    string Email,
    string DisplayName,
    AuthProvider AuthProvider,
    DateTime CreatedAtUtc,
    DateTime? LastLoginAtUtc,
    bool IsActive);
