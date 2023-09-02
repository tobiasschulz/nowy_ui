using System.Reflection;
using Nowy.UI.Common.Services;

namespace Nowy.UI.Server.Services;

internal sealed class BlazorDefaultWebAssetReferenceService : IWebAssetReferenceService
{
    public Assembly? BlazorWebAssemblyEntryAssembly { get; set; }
    public Type? BlazorServerAppComponentType { get; set; }

    public bool? UseMudBlazor { get; set; }
    public bool? UseHavit { get; set; }
    public bool? UseTelerik { get; set; }

    public string? InitialPageTitle { get; set; }

    private static long? _start_time;
    public long GetStartTime() => _start_time ??= DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();

    public IReadOnlyList<CssReference> GetCssPaths()
    {
        List<CssReference> ret = new()
        {
            new(10000, $"css/app.css"),
            new(10001, $"{( this.BlazorWebAssemblyEntryAssembly ?? this.BlazorServerAppComponentType?.Assembly )?.GetName().Name}.styles.css"),
        };

        if (UseMudBlazor ?? true)
        {
            ret.Add(new(-100, "_content/MudBlazor/MudBlazor.min.css"));
        }

        if (UseHavit ?? true)
        {
            ret.Add(new(-101, "_content/Havit.Blazor.Components.Web.Bootstrap/defaults.css"));
        }

        return ret;
    }

    public IReadOnlyList<JavascriptReference> GetJavascriptPaths()
    {
        List<JavascriptReference> ret = new()
        {
            new(10000, $"js/app.js"),
        };

        if (UseMudBlazor ?? true)
        {
            ret.Add(new(10100, "_content/MudBlazor/MudBlazor.min.js"));
        }

        if (UseTelerik ?? true)
        {
            ret.Add(new(10200, "_content/Telerik.UI.for.Blazor/js/telerik-blazor.js", defer: true));
        }

        return ret;
    }
}
