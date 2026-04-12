using FluentValidation;
using TradeAI.Application.Abstractions.Storage;

namespace TradeAI.Application.Users;

public sealed class UpdateCurrentUserProfileRequestValidator : AbstractValidator<UpdateCurrentUserProfileRequest>
{
    private static readonly string[] AllowedContentTypes =
    [
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/gif"
    ];

    private const int MaxFileSizeBytes = 5 * 1024 * 1024;

    public UpdateCurrentUserProfileRequestValidator()
    {
        RuleFor(x => x.DisplayName)
            .NotEmpty()
            .MinimumLength(2)
            .MaximumLength(80);

        RuleFor(x => x.RemoveAvatar)
            .Must((request, removeAvatar) => request.Avatar is null || !removeAvatar)
            .WithMessage("Choose a new avatar image or remove the current one, not both.");

        RuleFor(x => x.RemoveCover)
            .Must((request, removeCover) => request.Cover is null || !removeCover)
            .WithMessage("Choose a new cover image or remove the current one, not both.");

        When(x => x.Avatar is not null, () =>
        {
            RuleFor(x => x.Avatar!)
                .Must(HaveContent)
                .WithMessage("Avatar image is empty.");

            RuleFor(x => x.Avatar!)
                .Must(BeWithinSizeLimit)
                .WithMessage("Avatar image must be 5 MB or smaller.");

            RuleFor(x => x.Avatar!)
                .Must(HaveAllowedContentType)
                .WithMessage("Avatar image must be a PNG, JPEG, GIF, or WebP file.");
        });

        When(x => x.Cover is not null, () =>
        {
            RuleFor(x => x.Cover!)
                .Must(HaveContent)
                .WithMessage("Cover image is empty.");

            RuleFor(x => x.Cover!)
                .Must(BeWithinSizeLimit)
                .WithMessage("Cover image must be 5 MB or smaller.");

            RuleFor(x => x.Cover!)
                .Must(HaveAllowedContentType)
                .WithMessage("Cover image must be a PNG, JPEG, GIF, or WebP file.");
        });
    }

    private static bool HaveContent(ProfileMediaUpload upload)
    {
        return upload.Length > 0;
    }

    private static bool BeWithinSizeLimit(ProfileMediaUpload upload)
    {
        return upload.Length <= MaxFileSizeBytes;
    }

    private static bool HaveAllowedContentType(ProfileMediaUpload upload)
    {
        return AllowedContentTypes.Contains(upload.ContentType, StringComparer.OrdinalIgnoreCase);
    }
}
