namespace TradeAI.Application.Abstractions.Storage;

public sealed record ProfileMediaUpload(string FileName, string ContentType, byte[] Content)
{
    public int Length => Content.Length;
}
