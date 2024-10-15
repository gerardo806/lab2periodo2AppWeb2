import {NgModule} from '@angular/core';
import {LoginComponent} from './pages/login/login.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginRoutingModule} from './login.routes';

@NgModule({
  declarations: [],
  imports: [
    LoginComponent,
    //CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoginRoutingModule
  ],
  providers: []
})
export class LoginModule {
}

