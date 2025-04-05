import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';
import { ListUsuarioComponent } from './pages/usuario/list-usuario/list-usuario.component';
import { AdminComponent } from './admin.component';
import { FormUsuarioComponent } from './pages/usuario/form-usuario/form-usuario.component';
import { ListRolComponent } from './pages/rol/list-rol/list-rol.component';
import { FormRolComponent } from './pages/rol/form-rol/form-rol.component';

export const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'usuario/list',
        component: ListUsuarioComponent,
      },
      {
        path: 'usuario/add',
        component: FormUsuarioComponent,
      },
      {
        path: 'usuario/edit/:id',
        component: FormUsuarioComponent,
      },

      {
        path: 'rol/list',
        component: ListRolComponent,
      },
      {
        path: 'rol/add',
        component: FormRolComponent,
      },
      {
        path: 'rol/edit/:id',
        component: FormRolComponent,
      },
    ]
  },
];
