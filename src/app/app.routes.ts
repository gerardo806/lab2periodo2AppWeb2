import { Routes } from '@angular/router';
import {PrincipalComponent} from './modules/principal/pages/principal/principal.component';
import {SessionComponent} from './layout/publico/session/session.component';
import {ContenidoComponent} from './layout/privado/contenido/contenido.component';
import {AuthGuard} from './modules/principal/guard/auth/auth.guard';

export const routes: Routes = [
  {
    path: 'home',
    component: ContenidoComponent,
    loadChildren: () => import('./modules/principal/principal.module').then(m => m.PrincipalModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'init',
    component: SessionComponent,
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule),
    canActivate: [AuthGuard]
  },
  {
    path: '', redirectTo: 'init/login', pathMatch: 'full'
  },
  { path: '**', redirectTo: 'init/login' }
];
