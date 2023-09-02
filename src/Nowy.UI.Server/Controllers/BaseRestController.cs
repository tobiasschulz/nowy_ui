using System.Reflection;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Nowy.Database.Common.Models;
using Nowy.Database.Contract.Models;
using Nowy.Database.Contract.Services;
using Nowy.UI.Server.Services;

namespace Nowy.UI.Server.Controllers;

public abstract class BaseRestController<TItem> : ControllerBase where TItem : BaseModel
{
    protected readonly ILogger _logger;
    protected readonly INowyCollection<TItem> _collection;

    protected BaseRestController(ILogger logger, INowyCollection<TItem> collection)
    {
        _logger = logger;
        _collection = collection;
    }


    protected abstract Task<TItem?> _getModelByKeyAsync(string key);

    protected abstract Task<TItem> _createModelAsync();

    [HttpGet(Order = 99)]
    public async Task<IEnumerable<TItem>> Get()
    {
        // _database.LatestInteractionTimestamp = UnixTimestamp.Now;

        IReadOnlyList<TItem> ret = await _collection.GetAllAsync();
        _logger.LogInformation($"Get (count = {ret.Count})");

        return ret;
    }

    [HttpGet("{key}", Order = 98)]
    public async Task<ActionResult<TItem>> GetItem(string key)
    {
        // _database.LatestInteractionTimestamp = UnixTimestamp.Now;

        _logger.LogInformation("GetItem");

        TItem? ret = await _getModelByKeyAsync(key);

        if (ret is null)
        {
            return NotFound();
        }

        return ret;
    }

    [HttpPost(Order = 99)]
    public async Task<IActionResult> PostModel(TItem input)
    {
        // _database.LatestInteractionTimestamp = UnixTimestamp.Now;

        _logger.LogInformation("PostModel");

        TItem? ret = await _createModelAsync();

        _copyProperties(ret, input);

        ret.is_modified = true;
        await _collection.UpsertAsync(ret.id, ret);

        return NoContent();
    }

    [HttpPut("{key}", Order = 99)]
    public async Task<IActionResult> PutModel(string key, TItem input)
    {
        // _database.LatestInteractionTimestamp = UnixTimestamp.Now;

        _logger.LogInformation("PutModel");

        TItem? ret = await _getModelByKeyAsync(key);

        if (ret is null)
        {
            return NotFound();
        }

        _copyProperties(ret, input);

        ret.is_modified = true;
        await _collection.UpsertAsync(ret.id, ret);

        return NoContent();
    }

    private void _copyProperties(TItem ret, TItem input)
    {
        IEnumerable<PropertyInfo> props = ReflectionExtensions.GetPublicInstanceProperties(ret.GetType());
        foreach (PropertyInfo prop in props)
        {
            if (prop is { CanWrite: true, CanRead: true })
            {
                _logger.LogInformation($"copy prop {prop.Name} ({prop.PropertyType.Name}) = {prop.GetValue(input)}");
                prop.SetValue(ret, prop.GetValue(input));
            }
        }
    }
}
