using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Nowy.UI.Server.Views.Home;

public class IndexBlazorWebAssembly : PageModel
{
    private static long? _start_time;

    public long GetStartTime() => _start_time ??= DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();

    public string AppendStartTime(string path)
    {
        return Nowy.Standard.QueryHelpers.AddQueryString(path, "start_time", this.GetStartTime().ToString());
    }
}
