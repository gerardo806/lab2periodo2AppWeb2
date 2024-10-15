import {Routes} from '@angular/router';
import {RegistroComponent} from './pages/registro/registro.component';

export  const registroRoutes: Routes = [
  {
    path: '', children: [
      { path: 'home', component: RegistroComponent }
    ]
  }
];
