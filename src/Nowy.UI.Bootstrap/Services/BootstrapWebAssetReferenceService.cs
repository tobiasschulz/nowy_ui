using System.Reflection;
using Nowy.UI.Common.Services;

namespace Nowy.UI.Bootstrap.Services;

internal sealed class BootstrapWebAssetReferenceService : IWebAssetReferenceService
{
    public NowyBootstrapJavascriptFramework JavascriptFramework { get; set; }
    public NowyBootstrapJavascriptTheme JavascriptTheme { get; set; }
    public bool UseSpectre { get; set; }

    public IReadOnlyList<CssReference> GetCssPaths()
    {
        string javascript_theme = this.JavascriptTheme.ToString().ToLower().Replace("_", "-");
        string javascript_framework = this.JavascriptFramework.ToString().ToLower().Replace("_", "-");

        List<CssReference> ret = new()
        {
            new(0, $"_content/Nowy.UI.Bootstrap/output/init.css"),
            new(1000, $"_content/Nowy.UI.Bootstrap/output/bundle-{javascript_theme}-{javascript_framework}.css"),
        };

        return ret;
    }

    public IReadOnlyList<JavascriptReference> GetJavascriptPaths()
    {
        string javascript_theme = this.JavascriptTheme.ToString().ToLower().Replace("_", "-");
        string javascript_framework = this.JavascriptFramework.ToString().ToLower().Replace("_", "-");

        List<JavascriptReference> ret = new()
        {
            new(0, $"_content/Nowy.UI.Bootstrap/output/init.js"),
            new(1000, $"_content/Nowy.UI.Bootstrap/output/bundle-{javascript_theme}-{javascript_framework}.js"),
        };

        return ret;
    }
}

internal enum NowyBootstrapJavascriptTheme
{
    NONE = 0,
    LR,
    TS,
    NOWY,
}

internal enum NowyBootstrapJavascriptFramework
{
    NONE = 0,
    BOOTSTRAP5_FLUENTUI,
    BOOTSTRAP5,
}
