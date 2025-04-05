import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';
import { ClientComponent } from './client.component';
import { ListAtletaComponent } from './pages/atleta/list-atleta/list-atleta.component';
import { FormAtletaComponent } from './pages/atleta/form-atleta/form-atleta.component';
import { ReporteComponent } from './pages/report/reporte/reporte.component';

export const routes: Routes = [
  {
    path: '',
    component: ClientComponent,
    children: [

      {
        path: 'atleta/list',
        component: ListAtletaComponent,
      },
      {
        path: 'atleta/add',
        component: FormAtletaComponent,
      },
      {
        path: 'atleta/edit/:id',
        component: FormAtletaComponent,
      },
      {
        path: 'reporte',
        component: ReporteComponent,
      },
    ]
  },
];
