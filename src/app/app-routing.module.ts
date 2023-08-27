import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loginGuard } from './guards/login.guard';
import { loguedGuard } from './guards/logued.guard';

const routes: Routes = [
  { 
    path: 'auth', 
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate: [loguedGuard]
  },
  { 
    path: 'clients', 
    loadChildren: () => import('./clients/clients.module').then(m => m.ClientsModule),
    canActivate: [loginGuard]
  },
  { 
    path: 'contacts', 
    loadChildren: () => import('./contacts/contacts.module').then(m => m.ContactsModule),
    canActivate: [loginGuard]
  },
  { path: '', redirectTo: '/clients/allclients', pathMatch: 'full' },
  { path: '**', redirectTo: 'clients/allclients' }
];


@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
