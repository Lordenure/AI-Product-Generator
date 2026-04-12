using Microsoft.EntityFrameworkCore;
using TradeAI.Application.Abstractions.Persistence;
using TradeAI.Domain.Entities;

namespace TradeAI.Infrastructure.Persistence.Repositories;

public sealed class UserRepository(TradeAIDbContext dbContext) : IUserRepository
{
    public async Task AddAsync(User user, CancellationToken cancellationToken = default)
    {
        await dbContext.Users.AddAsync(user, cancellationToken);
    }

    public Task<User?> GetByEmailAsync(string email, CancellationToken cancellationToken = default)
    {
        return dbContext.Users.SingleOrDefaultAsync(x => x.Email == email, cancellationToken);
    }

    public Task<User?> GetByIdAsync(Guid userId, CancellationToken cancellationToken = default)
    {
        return dbContext.Users.SingleOrDefaultAsync(x => x.Id == userId, cancellationToken);
    }
}
