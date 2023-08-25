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
    path: 'pages', 
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
    canActivate: [loginGuard]
  },
  { 
    path: 'contacts', 
    loadChildren: () => import('./contacts/contacts.module').then(m => m.ContactsModule),
    canActivate: [loginGuard]
  },
  { 
    path: 'clients', 
    loadChildren: () => import('./clients/clients.module').then(m => m.ClientsModule),
    canActivate: [loginGuard]
  },
  { path: '', redirectTo: '/pages/page1', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages/page1' }
];


@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
