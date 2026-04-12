using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace TradeAI.Infrastructure.Persistence;

public sealed class TradeAIDbContextFactory : IDesignTimeDbContextFactory<TradeAIDbContext>
{
    public TradeAIDbContext CreateDbContext(string[] args)
    {
        var apiProjectPath = ResolveApiProjectPath();
        var configuration = new ConfigurationBuilder()
            .AddJsonFile(Path.Combine(apiProjectPath, "appsettings.json"), optional: false)
            .AddJsonFile(Path.Combine(apiProjectPath, "appsettings.Development.json"), optional: true)
            .Build();

        var connectionString = Environment.GetEnvironmentVariable("ConnectionStrings__Postgres")
            ?? configuration.GetConnectionString("Postgres")
            ?? throw new InvalidOperationException("Connection string 'Postgres' was not found.");

        var optionsBuilder = new DbContextOptionsBuilder<TradeAIDbContext>();
        optionsBuilder.UseNpgsql(
            connectionString,
            options => options.MigrationsAssembly(typeof(TradeAIDbContext).Assembly.FullName));

        return new TradeAIDbContext(optionsBuilder.Options);
    }

    private static string ResolveApiProjectPath()
    {
        var currentDirectoryCandidate = Path.Combine(Directory.GetCurrentDirectory(), "src", "TradeAI.Api");
        if (Directory.Exists(currentDirectoryCandidate))
        {
            return currentDirectoryCandidate;
        }

        var siblingCandidate = Path.GetFullPath(Path.Combine(Directory.GetCurrentDirectory(), "..", "TradeAI.Api"));
        if (Directory.Exists(siblingCandidate))
        {
            return siblingCandidate;
        }

        var fallbackCandidate = Path.GetFullPath(Path.Combine(AppContext.BaseDirectory, "..", "..", "..", "..", "TradeAI.Api"));
        if (Directory.Exists(fallbackCandidate))
        {
            return fallbackCandidate;
        }

        throw new DirectoryNotFoundException("Could not locate the TradeAI.Api project directory for design-time database creation.");
    }
}
