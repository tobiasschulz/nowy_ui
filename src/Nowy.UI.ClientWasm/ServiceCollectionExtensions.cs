using Havit.Blazor.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.JSInterop;
using MudBlazor;
using MudBlazor.Services;
using Nowy.Standard;
using Nowy.UI.Common.Services;

namespace Nowy.UI.ClientWasm;

public static class ServiceCollectionExtensions
{
    public static void AddNowyUIClientWasm(this IServiceCollection services, IWebAssemblyHostEnvironment host_environment)
    {
        services.AddNowyStandard();

        services.AddMudServices();

        services.AddHxServices();
        services.AddHxMessageBoxHost();
        services.AddHxMessenger();

        services.AddHttpClient("", client => client.BaseAddress = new Uri(host_environment.BaseAddress));
        services.AddScoped<HttpClient>(sp => sp.GetRequiredService<IHttpClientFactory>().CreateClient(""));
        services.AddSingleton<IPlatformInfo>(sp => new WasmPlatformInfo(sp.GetRequiredService<BrowserService>()));
        services.AddSingleton<FileService>(sp => new WasmFileService(sp.GetRequiredService<IJSRuntime>(), sp.GetRequiredService<ILogger<WasmFileService>>()));
        services.AddSingleton<BrowserService>(sp => new BrowserService(sp.GetRequiredService<IJSRuntime>()));
        services.AddSingleton<ResponsiveStateService>(sp => new ResponsiveStateService(sp.GetRequiredService<IJSRuntime>(), sp.GetRequiredService<BrowserService>()));
    }

    public static void UseNowyUIClientWasm(this WebAssemblyHost host)
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
