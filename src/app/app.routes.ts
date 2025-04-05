import { Routes } from '@angular/router';
import { NotFoundComponent } from './core/layouts/not-found/not-found.component';
import { isAdmin, isClient } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },

  {
    path: 'auth',
    loadChildren: () =>
      import('../app/modules/auth/auth.routes').then((m) => m.routes),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('../app/modules/admin/admin.routes').then((m) => m.routes),
    canActivate: [isAdmin]
  },
  {
    path: 'client',
    loadChildren: () =>
      import('../app/modules/client/client.routes').then((m) => m.routes),
    canActivate: [isClient]
  },
  {
    path: '**',
    component: NotFoundComponent
  },
];
