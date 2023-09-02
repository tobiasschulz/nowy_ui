using System.Reflection;
using Nowy.UI.Common.Services;

namespace Nowy.UI.Maps.Services;

public sealed class MapsWebAssetReferenceService : IWebAssetReferenceService
{
    public IReadOnlyList<CssReference> GetCssPaths()
    {
        List<CssReference> ret = new()
        {
            new(2000, $"_content/Nowy.UI.Maps/output/module-leaflet.css"),
        };

        return ret;
    }

    public IReadOnlyList<JavascriptReference> GetJavascriptPaths()
    {
        List<JavascriptReference> ret = new()
        {
            new(2000, $"_content/Nowy.UI.Maps/output/module-leaflet.js"),
        };

        return ret;
    }
}
