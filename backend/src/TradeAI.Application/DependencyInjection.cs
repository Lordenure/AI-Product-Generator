using FluentValidation;
using Microsoft.Extensions.DependencyInjection;
using TradeAI.Application.Abstractions.Authentication;
using TradeAI.Application.Authentication;
using TradeAI.Application.Users;

namespace TradeAI.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddValidatorsFromAssemblyContaining<RegisterRequestValidator>();
        services.AddScoped<IAuthService, AuthService>();
        services.AddScoped<IUserService, UserService>();

        return services;
    }
}
