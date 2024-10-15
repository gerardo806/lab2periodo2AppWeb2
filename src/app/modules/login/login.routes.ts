import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {NgModule} from '@angular/core';
import {RegistroComponent} from '../registro/pages/registro/registro.component';
import {AboutComponent} from '../registro/pages/about/about.component';

export const loginRoutes: Routes = [
  {
    path: '', children: [ //init/login
      { path: 'login', component: LoginComponent },
      { path: 'registro', component: RegistroComponent },
      { path: 'about', component: AboutComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(loginRoutes)],
  exports: [RouterModule]
})
export class LoginRoutingModule {
}
