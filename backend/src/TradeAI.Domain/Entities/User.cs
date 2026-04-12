using TradeAI.Domain.Enums;

namespace TradeAI.Domain.Entities;

public sealed class User
{
    private readonly List<RefreshToken> _refreshTokens = [];

    private User()
    {
    }

    public Guid Id { get; private set; }

    public string Email { get; private set; } = string.Empty;

    public string PasswordHash { get; private set; } = string.Empty;

    public string DisplayName { get; private set; } = string.Empty;

    public DateTime CreatedAtUtc { get; private set; }

    public DateTime UpdatedAtUtc { get; private set; }

    public DateTime? LastLoginAtUtc { get; private set; }

    public bool IsActive { get; private set; }

    public AuthProvider AuthProvider { get; private set; }

    public IReadOnlyCollection<RefreshToken> RefreshTokens => _refreshTokens;

    public static User Create(
        string email,
        string passwordHash,
        string displayName,
        DateTime utcNow,
        AuthProvider authProvider = AuthProvider.EmailPassword)
    {
        return new User
        {
            Id = Guid.CreateVersion7(),
            Email = email,
            PasswordHash = passwordHash,
            DisplayName = displayName,
            AuthProvider = authProvider,
            CreatedAtUtc = utcNow,
            UpdatedAtUtc = utcNow,
            LastLoginAtUtc = utcNow,
            IsActive = true
        };
    }

    public void RecordLogin(DateTime utcNow)
    {
        LastLoginAtUtc = utcNow;
        UpdatedAtUtc = utcNow;
    }

    public void SetPasswordHash(string passwordHash)
    {
        PasswordHash = passwordHash;
    }

    public void SetDisplayName(string displayName, DateTime utcNow)
    {
        DisplayName = displayName;
        UpdatedAtUtc = utcNow;
    }

    public void Deactivate(DateTime utcNow)
    {
        IsActive = false;
        UpdatedAtUtc = utcNow;
    }
}
