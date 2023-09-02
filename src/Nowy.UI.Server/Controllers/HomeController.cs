using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Nowy.UI.Server.Views.Home;

namespace Nowy.UI.Server.Controllers;

public class HomeController : Controller
{
    private readonly IWebHostEnvironment _environment;

    public HomeController(IWebHostEnvironment environment)
    {
        this._environment = environment;
    }

    public IActionResult IndexBlazorWebAssembly()
    {
        return this.View(new IndexBlazorWebAssembly { });
    }

    public IActionResult IndexBlazorServer()
    {
        return this.View(new IndexBlazorServer { });
    }
}
