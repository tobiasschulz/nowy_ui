namespace Nowy.UI.Common.Models;

public abstract record NxBaseMenuItemModel(string? Title = null, string? IconUrl = null, string? LinkUrl = null);

public sealed record NxMenuItemModel : NxBaseMenuItemModel;

public sealed record NxMenuModel(NxBaseMenuItemModel[]? Items = null) : NxBaseMenuItemModel;
