using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using TradeAI.Application.Abstractions.Authentication;
using TradeAI.Application.Abstractions.Persistence;
using TradeAI.Application.Abstractions.Time;
using TradeAI.Infrastructure.Authentication;
using TradeAI.Infrastructure.Persistence;
using TradeAI.Infrastructure.Persistence.Repositories;
using TradeAI.Infrastructure.Time;

namespace TradeAI.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("Postgres")
            ?? throw new InvalidOperationException("Connection string 'Postgres' was not found.");

        services.AddOptions<JwtOptions>()
            .Bind(configuration.GetSection(JwtOptions.SectionName))
            .Validate(static options => !string.IsNullOrWhiteSpace(options.Issuer), "JWT issuer is required.")
            .Validate(static options => !string.IsNullOrWhiteSpace(options.Audience), "JWT audience is required.")
            .Validate(static options => !string.IsNullOrWhiteSpace(options.SigningKey) && options.SigningKey.Length >= 32, "JWT signing key must be at least 32 characters.")
            .Validate(static options => options.AccessTokenLifetimeMinutes > 0, "Access token lifetime must be greater than zero.")
            .Validate(static options => options.RefreshTokenLifetimeDays > 0, "Refresh token lifetime must be greater than zero.")
            .ValidateOnStart();

        services.AddDbContext<TradeAIDbContext>(options =>
            options.UseNpgsql(
                connectionString,
                dbOptions => dbOptions.MigrationsAssembly(typeof(TradeAIDbContext).Assembly.FullName)));

        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<IRefreshTokenRepository, RefreshTokenRepository>();
        services.AddScoped<IUnitOfWork>(serviceProvider => serviceProvider.GetRequiredService<TradeAIDbContext>());

        services.AddScoped<IPasswordHasher, AspNetPasswordHasher>();
        services.AddScoped<IJwtTokenGenerator, JwtTokenGenerator>();
        services.AddSingleton<IRefreshTokenHasher, Sha256RefreshTokenHasher>();
        services.AddScoped<IRefreshTokenGenerator, RefreshTokenGenerator>();
        services.AddSingleton<IDateTimeProvider, SystemDateTimeProvider>();

        return services;
    }
}
