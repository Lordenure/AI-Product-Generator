using Microsoft.EntityFrameworkCore;
using TradeAI.Application.Abstractions.Persistence;
using TradeAI.Domain.Entities;

namespace TradeAI.Infrastructure.Persistence;

public sealed class TradeAIDbContext(DbContextOptions<TradeAIDbContext> options)
    : DbContext(options), IUnitOfWork
{
    public DbSet<User> Users => Set<User>();

    public DbSet<RefreshToken> RefreshTokens => Set<RefreshToken>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(TradeAIDbContext).Assembly);
    }

    async Task IUnitOfWork.SaveChangesAsync(CancellationToken cancellationToken)
    {
        _ = await base.SaveChangesAsync(cancellationToken);
    }
}
