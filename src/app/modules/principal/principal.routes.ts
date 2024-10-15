import {RouterModule, Routes} from '@angular/router';
import {PrincipalComponent} from './pages/principal/principal.component';
import {NgModule} from '@angular/core';

export const principalRoutes: Routes = [
  { path: '', children: [
      { path: 'principal', component: PrincipalComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(principalRoutes)],
  exports: [RouterModule]
})
export class PrincipalRoutingModule {
}
