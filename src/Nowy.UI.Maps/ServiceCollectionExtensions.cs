using Microsoft.Extensions.DependencyInjection;
using MudBlazor;
using Nowy.UI.Common.Services;
using Nowy.UI.Maps.Services;

namespace Nowy.UI.Maps;

public static class ServiceCollectionExtensions
{
    public static void AddNowyUIMaps(this IServiceCollection services)
    {
        services.AddSingleton<MapsWebAssetReferenceService>();
        services.AddSingleton<IWebAssetReferenceService>(sp => sp.GetRequiredService<MapsWebAssetReferenceService>());

        services.AddSingleton<GeocodingService>(sp => new GeocodingService(sp.GetRequiredService<IHttpClientFactory>().CreateClient(), sp.GetRequiredService<ISnackbar>()));
    }
}
