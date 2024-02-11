import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import(
        './modules/component/choose-model-color/choose-model-color.component'
      ).then((m) => m.ChooseModelColorComponent),
  },
  {
    path: 'config-and-options',
    loadComponent: () =>
      import(
        './modules/component/config-and-options/config-and-options.component'
      ).then((m) => m.ConfigAndOptionsComponent),
  },
  {
    path: 'summary',
    loadComponent: () =>
      import('./modules/component/summary/summary.component').then(
        (m) => m.SummaryComponent
      ),
  },
];
