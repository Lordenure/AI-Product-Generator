namespace TradeAI.Api.Contracts.Users;

public sealed class UpdateCurrentUserProfileForm
{
    public string DisplayName { get; init; } = string.Empty;

    public IFormFile? Avatar { get; init; }

    public bool RemoveAvatar { get; init; }

    public IFormFile? Cover { get; init; }

    public bool RemoveCover { get; init; }
}
