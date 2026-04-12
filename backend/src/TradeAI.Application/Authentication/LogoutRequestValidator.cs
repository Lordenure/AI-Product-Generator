using FluentValidation;
using TradeAI.Application.Authentication.Models;

namespace TradeAI.Application.Authentication;

public sealed class LogoutRequestValidator : AbstractValidator<LogoutRequest>
{
    public LogoutRequestValidator()
    {
        RuleFor(x => x.RefreshToken)
            .NotEmpty()
            .MaximumLength(512);
    }
}
