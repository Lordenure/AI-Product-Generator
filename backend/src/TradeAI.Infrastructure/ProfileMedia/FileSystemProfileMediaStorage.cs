using TradeAI.Application.Abstractions.Storage;

namespace TradeAI.Infrastructure.ProfileMedia;

public sealed class FileSystemProfileMediaStorage(ProfileMediaOptions options) : IProfileMediaStorage
{
    public async Task<string> SaveAsync(
        Guid userId,
        ProfileMediaKind kind,
        ProfileMediaUpload upload,
        CancellationToken cancellationToken = default)
    {
        var kindSegment = kind.ToString().ToLowerInvariant();
        var fileName = $"{Guid.CreateVersion7():N}{GetExtension(upload.FileName, upload.ContentType)}";
        var directoryPath = Path.Combine(GetRootPath(), userId.ToString("D"), kindSegment);
        var filePath = Path.Combine(directoryPath, fileName);

        Directory.CreateDirectory(directoryPath);
        await File.WriteAllBytesAsync(filePath, upload.Content, cancellationToken);

        return $"{NormalizeRequestPath()}/{userId:D}/{kindSegment}/{fileName}";
    }

    public Task DeleteAsync(string? storedPath, CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrWhiteSpace(storedPath))
        {
            return Task.CompletedTask;
        }

        var normalizedRequestPath = NormalizeRequestPath();
        var normalizedStoredPath = storedPath.Replace('\\', '/');

        if (!normalizedStoredPath.StartsWith($"{normalizedRequestPath}/", StringComparison.OrdinalIgnoreCase))
        {
            return Task.CompletedTask;
        }

        var relativePath = normalizedStoredPath[(normalizedRequestPath.Length + 1)..]
            .Replace('/', Path.DirectorySeparatorChar);

        var rootPath = Path.GetFullPath(GetRootPath());
        var absolutePath = Path.GetFullPath(Path.Combine(rootPath, relativePath));

        if (!absolutePath.StartsWith(rootPath, StringComparison.OrdinalIgnoreCase))
        {
            return Task.CompletedTask;
        }

        if (File.Exists(absolutePath))
        {
            File.Delete(absolutePath);
        }

        return Task.CompletedTask;
    }

    private string GetRootPath()
    {
        if (string.IsNullOrWhiteSpace(options.RootPath))
        {
            throw new InvalidOperationException("Profile media root path is not configured.");
        }

        return options.RootPath;
    }

    private string NormalizeRequestPath()
    {
        return options.RequestPath.TrimEnd('/').StartsWith('/')
            ? options.RequestPath.TrimEnd('/')
            : $"/{options.RequestPath.TrimEnd('/')}";
    }

    private static string GetExtension(string fileName, string contentType)
    {
        return contentType.ToLowerInvariant() switch
        {
            "image/jpeg" => ".jpg",
            "image/png" => ".png",
            "image/webp" => ".webp",
            "image/gif" => ".gif",
            _ => string.IsNullOrWhiteSpace(Path.GetExtension(fileName))
                ? ".bin"
                : Path.GetExtension(fileName).ToLowerInvariant()
        };
    }
}
