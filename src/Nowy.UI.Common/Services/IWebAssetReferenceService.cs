namespace Nowy.UI.Common.Services;

public interface IWebAssetReferenceService
{
    public IReadOnlyList<CssReference> GetCssPaths();
    public IReadOnlyList<JavascriptReference> GetJavascriptPaths();
}

public sealed record CssReference(int order, string path);

public sealed record JavascriptReference(int order, string path, bool defer = false);
