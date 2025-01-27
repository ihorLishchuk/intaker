import {effect, Injectable, signal, WritableSignal} from '@angular/core';
import {WidgetEntity} from '../entities';

@Injectable()
export class WidgetService {
  widgets: WritableSignal<WidgetEntity[]> = signal(JSON.parse(localStorage.getItem('widgets') ?? '[]'));

  toggleFavourite = (index: number | undefined): void => {
    this.widgets.update((widgets) => {
      if (index !== undefined && widgets[index]) widgets[index] = { ...widgets[index], favourite: !widgets[index].favourite }
      return [...widgets];
    })
  }

  removeWidget = (index: number | undefined): void => {
    this.widgets.update((widgets: WidgetEntity[]): WidgetEntity[] => {
      if (index !== undefined) widgets.splice(index, 1);
      return [...widgets];
    });
  }

  updateWidget = (updatedWidget: WidgetEntity): void => {
    this.widgets.update((widgets: WidgetEntity[]): WidgetEntity[] => {
      const index = widgets.findIndex(widget => widget.currentWeather.id === updatedWidget.currentWeather.id);
      if (index !== -1) widgets.splice(index, 1, updatedWidget);
      return [...widgets];
    })
  }

  addNewWidget = (newWidget: WidgetEntity): void => {
    this.widgets.update((widgets) => [...widgets, { ...newWidget, favourite: false }]);
  }

  hasDuplicates = (cityName: string): boolean => {
    return this.widgets().some(widget => widget.currentWeather.name === cityName);
  }

  constructor() {
    effect(() => {
      localStorage.setItem('widgets', JSON.stringify(this.widgets()));
    });
  }
}
