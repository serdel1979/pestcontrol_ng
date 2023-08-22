import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { MatModule } from '../material/mat.module';

const routes: Routes = [
  { path: '',  component: LoginComponent }, 
  { path: 'login', component: LoginComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    MatModule
  ],
})
export class AuthModule { }
