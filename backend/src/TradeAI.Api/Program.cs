using TradeAI.Api.Extensions;
using TradeAI.Application;
using TradeAI.Infrastructure;
using TradeAI.Infrastructure.ProfileMedia;
using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);
var webRootPath = Path.Combine(builder.Environment.ContentRootPath, "wwwroot");

Directory.CreateDirectory(webRootPath);
builder.WebHost.UseWebRoot(webRootPath);

builder.Services
    .AddApplication()
    .AddInfrastructure(builder.Configuration)
    .AddApiServices()
    .AddJwtAuthentication(builder.Configuration);

builder.Services.AddOptions<ProfileMediaOptions>()
    .Configure(options =>
    {
        options.RootPath = Path.Combine(webRootPath, "media", "profiles");
        options.RequestPath = "/media/profiles";
    });

var app = builder.Build();

app.UseExceptionHandler();
app.UseCors(ServiceCollectionExtensions.LocalFrontendCorsPolicy);
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(webRootPath)
});
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();

public partial class Program;
