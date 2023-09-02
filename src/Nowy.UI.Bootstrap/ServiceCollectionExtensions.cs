using Microsoft.Extensions.DependencyInjection;
using Nowy.UI.Bootstrap.Services;
using Nowy.UI.Common.Services;

namespace Nowy.UI.Bootstrap;

public static class ServiceCollectionExtensions
{
    public static void AddNowyUIBootstrapClient(this IServiceCollection services, Action<INowyUIBootstrapConfig>? config_action)
    {
        NowyUIBootstrapConfig config = new();
        config_action?.Invoke(config);

        services.AddSingleton<BootstrapWebAssetReferenceService>(sp =>
        {
            BootstrapWebAssetReferenceService service = new();
            config.Apply(service);
            return service;
        });
        services.AddSingleton<IWebAssetReferenceService>(sp => sp.GetRequiredService<BootstrapWebAssetReferenceService>());
    }

    public static void AddNowyUIBootstrapServer(this IServiceCollection services, Action<INowyUIBootstrapConfig>? config_action)
    {
        NowyUIBootstrapConfig config = new();
        config_action?.Invoke(config);

        services.AddSingleton<BootstrapWebAssetReferenceService>(sp =>
        {
            BootstrapWebAssetReferenceService service = new();
            config.Apply(service);
            return service;
        });
        services.AddSingleton<IWebAssetReferenceService>(sp => sp.GetRequiredService<BootstrapWebAssetReferenceService>());
    }
}

public interface INowyUIBootstrapConfig
{
    void AddBootstrap5();
    void AddFluentUI();
    void AddSpectre();
    void UseThemeNowy();
    void UseThemeLR();
    void UseThemeTS();
}

internal sealed class NowyUIBootstrapConfig : INowyUIBootstrapConfig
{
    public bool IsBootstrap;
    public bool IsFluentUI;
    public bool IsSpectre;

    private NowyBootstrapJavascriptTheme _theme;

    public void Apply(BootstrapWebAssetReferenceService service)
    {
        if (this.IsBootstrap)
        {
            if (this.IsFluentUI)
            {
                service.JavascriptFramework = NowyBootstrapJavascriptFramework.BOOTSTRAP5_FLUENTUI;
            }
            else
            {
                service.JavascriptFramework = NowyBootstrapJavascriptFramework.BOOTSTRAP5;
            }
        }

        if (this.IsSpectre)
        {
            service.UseSpectre = true;
        }

        service.JavascriptTheme = _theme;
    }

    public void AddBootstrap5()
    {
        this.IsBootstrap = true;
    }

    public void AddFluentUI()
    {
        this.IsFluentUI = true;
    }

    public void AddSpectre()
    {
        this.IsSpectre = true;
    }

    public void UseThemeNowy()
    {
        this._theme = NowyBootstrapJavascriptTheme.NOWY;
    }

    public void UseThemeLR()
    {
        this._theme = NowyBootstrapJavascriptTheme.LR;
    }

    public void UseThemeTS()
    {
        this._theme = NowyBootstrapJavascriptTheme.TS;
    }
}
