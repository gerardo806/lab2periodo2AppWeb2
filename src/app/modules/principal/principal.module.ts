import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PrincipalRoutingModule} from './principal.routes';
import {PrincipalComponent} from './pages/principal/principal.component';

@NgModule({
  declarations: [],
  imports: [
    PrincipalComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PrincipalRoutingModule
  ],
  providers: []
})
export class PrincipalModule {
}
