using Havit.Blazor.Components.Web;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Components;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.JSInterop;
using MudBlazor.Services;
using Nowy.Standard;
using Nowy.UI.Common.Services;

namespace Nowy.UI.BlazorServer;

public static class ServiceCollectionExtensions
{
    public static void AddNowyUIBlazorServer(this IServiceCollection services)
    {
        services.AddNowyStandard();

        services.AddMudServices();

        services.AddHxServices();
        services.AddHxMessageBoxHost();
        services.AddHxMessenger();

        //services.AddHttpClient("", (sp, client) => client.BaseAddress = new Uri(sp.GetRequiredService<NavigationManager>().BaseUri));
        services.AddHttpClient("", (sp, client) => { });
        services.AddScoped<HttpClient>(sp => sp.GetRequiredService<IHttpClientFactory>().CreateClient(""));
        services.AddScoped<IPlatformInfo>(sp => new WasmPlatformInfo(sp.GetRequiredService<BrowserService>()));
        services.AddScoped<FileService>(sp => new WasmFileService(sp.GetRequiredService<IJSRuntime>(), sp.GetRequiredService<ILogger<WasmFileService>>()));
        services.AddScoped<BrowserService>(sp => new BrowserService(sp.GetRequiredService<IJSRuntime>()));
        services.AddScoped<ResponsiveStateService>(sp => new ResponsiveStateService(sp.GetRequiredService<IJSRuntime>(), sp.GetRequiredService<BrowserService>()));
    }

    public static void UseNowyUIBlazorServer(this WebApplication host)
    {
        /*
         , string? app_name = null, string? app_title = null, string? app_version = null

        StandardApp.Services = host.Services;

        StandardApp.AppName = app_name ?? StandardApp.AppName;
        StandardApp.AppVersion = app_version ?? StandardApp.AppVersion;
        StandardApp.AppTitle = app_title ?? StandardApp.AppTitle;
        */
    }
}
