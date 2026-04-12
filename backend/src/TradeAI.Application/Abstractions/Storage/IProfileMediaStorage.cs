namespace TradeAI.Application.Abstractions.Storage;

public interface IProfileMediaStorage
{
    Task<string> SaveAsync(
        Guid userId,
        ProfileMediaKind kind,
        ProfileMediaUpload upload,
        CancellationToken cancellationToken = default);

    Task DeleteAsync(string? storedPath, CancellationToken cancellationToken = default);
}
