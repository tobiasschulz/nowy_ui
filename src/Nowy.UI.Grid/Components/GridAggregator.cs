namespace Nowy.UI.Grid.Components;

public delegate TValue GridAggregator<in TItem, out TValue>(IEnumerable<TItem> items);
