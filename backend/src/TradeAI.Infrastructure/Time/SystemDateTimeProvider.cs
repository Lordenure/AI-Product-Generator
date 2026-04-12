using TradeAI.Application.Abstractions.Time;

namespace TradeAI.Infrastructure.Time;

public sealed class SystemDateTimeProvider : IDateTimeProvider
{
    public DateTime UtcNow => DateTime.UtcNow;
}
