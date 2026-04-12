using FluentValidation;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using TradeAI.Application.Common.Exceptions;

namespace TradeAI.Api.ExceptionHandling;

public sealed class GlobalExceptionHandler(
    ILogger<GlobalExceptionHandler> logger,
    IHostEnvironment hostEnvironment) : IExceptionHandler
{
    public async ValueTask<bool> TryHandleAsync(
        HttpContext httpContext,
        Exception exception,
        CancellationToken cancellationToken)
    {
        var problemDetails = exception switch
        {
            ValidationException validationException => CreateValidationProblemDetails(httpContext, validationException),
            ConflictException conflictException => CreateProblemDetails(httpContext, StatusCodes.Status409Conflict, "Conflict", conflictException.Message),
            UnauthorizedException unauthorizedException => CreateProblemDetails(httpContext, StatusCodes.Status401Unauthorized, "Unauthorized", unauthorizedException.Message),
            NotFoundException notFoundException => CreateProblemDetails(httpContext, StatusCodes.Status404NotFound, "Not found", notFoundException.Message),
            BadHttpRequestException badHttpRequestException => CreateProblemDetails(httpContext, StatusCodes.Status400BadRequest, "Bad request", badHttpRequestException.Message),
            _ => CreateProblemDetails(
                httpContext,
                StatusCodes.Status500InternalServerError,
                "Server error",
                hostEnvironment.IsDevelopment() ? exception.Message : "An unexpected error occurred.")
        };

        if ((problemDetails.Status ?? StatusCodes.Status500InternalServerError) >= StatusCodes.Status500InternalServerError)
        {
            logger.LogError(exception, "Unhandled server error.");
        }
        else
        {
            logger.LogWarning(exception, "Request failed with a handled exception.");
        }

        httpContext.Response.StatusCode = problemDetails.Status ?? StatusCodes.Status500InternalServerError;
        httpContext.Response.ContentType = "application/problem+json";

        await httpContext.Response.WriteAsJsonAsync(problemDetails, cancellationToken);
        return true;
    }

    private static ValidationProblemDetails CreateValidationProblemDetails(
        HttpContext httpContext,
        ValidationException validationException)
    {
        var errorDictionary = validationException.Errors
            .GroupBy(x => ToCamelCase(x.PropertyName))
            .ToDictionary(
                group => group.Key,
                group => group.Select(x => x.ErrorMessage).Distinct().ToArray());

        var problemDetails = new ValidationProblemDetails(errorDictionary)
        {
            Title = "Validation failed.",
            Status = StatusCodes.Status400BadRequest,
            Type = "https://httpstatuses.com/400",
            Instance = httpContext.Request.Path
        };

        problemDetails.Extensions["traceId"] = httpContext.TraceIdentifier;
        return problemDetails;
    }

    private static ProblemDetails CreateProblemDetails(
        HttpContext httpContext,
        int statusCode,
        string title,
        string detail)
    {
        var problemDetails = new ProblemDetails
        {
            Title = title,
            Detail = detail,
            Status = statusCode,
            Type = $"https://httpstatuses.com/{statusCode}",
            Instance = httpContext.Request.Path
        };

        problemDetails.Extensions["traceId"] = httpContext.TraceIdentifier;
        return problemDetails;
    }

    private static string ToCamelCase(string value)
    {
        if (string.IsNullOrWhiteSpace(value) || char.IsLower(value[0]))
        {
            return value;
        }

        return char.ToLowerInvariant(value[0]) + value[1..];
    }
}
