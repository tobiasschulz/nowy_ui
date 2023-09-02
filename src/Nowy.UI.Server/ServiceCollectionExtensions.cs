using System.Reflection;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Nowy.UI.Common.Services;
using Nowy.UI.Server.Services;

namespace Nowy.UI.Server;

public static class ServiceCollectionExtensions
{
    public static void AddNowyUIServer(this IServiceCollection services, Action<INowyUIServerConfig>? config_action)
    {
        NowyUIServerConfig config = new();
        config_action?.Invoke(config);

        services.AddSingleton<INowyUIServerConfig>(sp => config);

        // services.AddSingleton<HttpClient>(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress), });

        services.AddHttpClient("", client => { });
        services.AddScoped<HttpClient>(sp => sp.GetRequiredService<IHttpClientFactory>().CreateClient(""));

        services.AddSingleton<StartupTimeService>();

        services.AddSingleton<BlazorDefaultWebAssetReferenceService>();
        services.AddSingleton<IWebAssetReferenceService>(sp => sp.GetRequiredService<BlazorDefaultWebAssetReferenceService>());

        services.AddControllersWithViews()
            .AddApplicationPart(typeof(ServiceCollectionExtensions).Assembly)
            // .AddRazorRuntimeCompilation()
            .AddJsonOptions(o =>
            {
                o.JsonSerializerOptions.ReferenceHandler = null;
                o.JsonSerializerOptions.PropertyNamingPolicy = null;
            });

        services.AddRazorPages();

        if (config.UseBlazorServer)
        {
            services.AddServerSideBlazor();
        }

        // .AddNewtonsoftJson(json_options => ConfigHelper.CreateJsonSerializerSettings(json_options.SerializerSettings));

        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        services.AddEndpointsApiExplorer();
    }

    public static void UseNowyUIServer(this WebApplication app)
    {
        NowyUIServerConfig config = (NowyUIServerConfig)app.Services.GetRequiredService<INowyUIServerConfig>();
        config.Apply(app.Services.GetRequiredService<BlazorDefaultWebAssetReferenceService>());

        if (config.HostBlazorWebAssembly)
        {
            app.UseBlazorFrameworkFiles();
        }

        app.UseStaticFiles();

        app.MapRazorPages();
        app.MapControllers();

        if (config.HostBlazorWebAssembly)
        {
            // app.MapFallbackToFile("index.html");
            app.MapFallbackToController("IndexBlazorWebAssembly", "Home");
        }

        if (config.UseBlazorServer)
        {
            app.MapBlazorHub();
            app.MapFallbackToController("IndexBlazorServer", "Home");
        }

        // StandardApp.Services = app.Services;

        // Log.StorageEnabled = false;
        // Log.ShouldPrintMethod = false;
        // Log.ShouldPrintTimestamp = false;
        // Log.SetStarted();
    }
}

public interface INowyUIServerConfig
{
    void EnableWebAssemblyHosting(Assembly? wasm_entry_assembly);
    void DisableWebAssemblyHosting();

    void EnableBlazorServer(Type app_component_type);
    void DisableBlazorServer();

    Type? GetBlazorServerAppComponentType();

    // void SetAppName(string? app_name = null, string? app_title = null, string? app_version = null);
    void SetDefaultPageTitle(string? default_page_title = null);
    void EnableMudBlazor();
    void DisableMudBlazor();
    void EnableHavit();
    void DisableHavit();
    void EnableTelerik();
    void DisableTelerik();
}

internal sealed class NowyUIServerConfig : INowyUIServerConfig
{
    internal bool HostBlazorWebAssembly = false;
    internal bool UseBlazorServer = false;
    public Assembly? BlazorWebAssemblyEntryAssembly = null;
    public Type? BlazorServerAppComponentType = null;

    public bool? UseMudBlazor = null;
    public bool? UseHavit = null;
    public bool? UseTelerik = null;

    private string? _default_page_title = null;

    internal void Apply(BlazorDefaultWebAssetReferenceService service)
    {
        service.BlazorWebAssemblyEntryAssembly = this.BlazorWebAssemblyEntryAssembly;
        service.BlazorServerAppComponentType = this.BlazorServerAppComponentType;
        service.UseMudBlazor = this.UseMudBlazor;
        service.UseHavit = this.UseHavit;
        service.UseTelerik = this.UseTelerik;
    }

    public Type? GetBlazorServerAppComponentType()
    {
        return BlazorServerAppComponentType;
    }

    /*
    internal void Apply(IServiceProvider services)
    {
        StandardApp.AppName = _app_name ?? StandardApp.AppName;
        StandardApp.AppVersion = _app_version ?? StandardApp.AppVersion;
        StandardApp.AppTitle = _app_title ?? StandardApp.AppTitle;

        services.GetRequiredService<BlazorDefaultWebAssetReferenceService>().WebAssemblyEntryAssembly = this.WasmEntryAssembly;
        services.GetRequiredService<BlazorDefaultWebAssetReferenceService>().UseMudBlazor = this.UseMudBlazor;
        services.GetRequiredService<BlazorDefaultWebAssetReferenceService>().UseHavit = this.UseHavit;
        services.GetRequiredService<BlazorDefaultWebAssetReferenceService>().UseTelerik = this.UseTelerik;
    }
    */

    public void EnableWebAssemblyHosting(Assembly? wasm_entry_assembly)
    {
        this.HostBlazorWebAssembly = true;
        this.BlazorWebAssemblyEntryAssembly = wasm_entry_assembly;
    }

    public void DisableWebAssemblyHosting()
    {
        this.HostBlazorWebAssembly = false;
        this.BlazorWebAssemblyEntryAssembly = null;
    }

    public void EnableBlazorServer(Type? app_component_type)
    {
        this.UseBlazorServer = true;
        this.BlazorServerAppComponentType = app_component_type;
    }

    public void DisableBlazorServer()
    {
        this.UseBlazorServer = false;
        this.BlazorServerAppComponentType = null;
    }

    /*
    public void SetAppName(string? app_name = null, string? app_title = null, string? app_version = null)
    {
        this._app_name = app_name;
        this._app_title = app_title;
        this._app_version = app_version;
    }
    */

    public void SetDefaultPageTitle(string? default_page_title = null)
    {
        this._default_page_title = default_page_title;
    }

    public void EnableMudBlazor()
    {
        this.UseMudBlazor = true;
    }

    public void DisableMudBlazor()
    {
        this.UseMudBlazor = false;
    }

    public void EnableHavit()
    {
        this.UseHavit = true;
    }

    public void DisableHavit()
    {
        this.UseHavit = false;
    }

    public void EnableTelerik()
    {
        this.UseTelerik = true;
    }

    public void DisableTelerik()
    {
        this.UseTelerik = false;
    }
}
