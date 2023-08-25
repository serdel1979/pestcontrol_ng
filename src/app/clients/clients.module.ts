import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AllClientsComponent } from './all-clients/all-clients.component';
import { MatModule } from '../material/mat.module';


const routes: Routes = [
  { path: '', redirectTo: 'allclients', pathMatch: 'full' }, 
  { path: 'allcontacts', component: AllClientsComponent },
];


@NgModule({
  declarations: [
  ],
  imports: [
    MatModule,
    RouterModule.forChild(routes)
  ]
})
export class ClientsModule { }