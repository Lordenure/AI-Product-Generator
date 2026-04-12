using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TradeAI.Api.Contracts.Users;
using TradeAI.Api.Extensions;
using TradeAI.Application.Abstractions.Storage;
using TradeAI.Application.Users;

namespace TradeAI.Api.Controllers;

[ApiController]
[Route("api/users")]
public sealed class UsersController(IUserService userService) : ControllerBase
{
    [Authorize]
    [HttpGet("me")]
    [ProducesResponseType<CurrentUserResponse>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<CurrentUserResponse>> GetCurrentUser(CancellationToken cancellationToken)
    {
        var userId = User.GetRequiredUserId();
        var currentUser = await userService.GetCurrentUserAsync(userId, cancellationToken);
        return Ok(currentUser);
    }

    [Authorize]
    [HttpPut("me")]
    [Consumes("multipart/form-data")]
    [ProducesResponseType<CurrentUserResponse>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<CurrentUserResponse>> UpdateCurrentUser(
        [FromForm] UpdateCurrentUserProfileForm request,
        CancellationToken cancellationToken)
    {
        var userId = User.GetRequiredUserId();
        var updateRequest = new UpdateCurrentUserProfileRequest(
            request.DisplayName,
            await ToProfileMediaUploadAsync(request.Avatar, cancellationToken),
            request.RemoveAvatar,
            await ToProfileMediaUploadAsync(request.Cover, cancellationToken),
            request.RemoveCover);

        var currentUser = await userService.UpdateCurrentUserProfileAsync(userId, updateRequest, cancellationToken);
        return Ok(currentUser);
    }

    private static async Task<ProfileMediaUpload?> ToProfileMediaUploadAsync(
        IFormFile? formFile,
        CancellationToken cancellationToken)
    {
        if (formFile is null)
        {
            return null;
        }

        await using var memoryStream = new MemoryStream();
        await formFile.CopyToAsync(memoryStream, cancellationToken);

        return new ProfileMediaUpload(formFile.FileName, formFile.ContentType, memoryStream.ToArray());
    }
}
