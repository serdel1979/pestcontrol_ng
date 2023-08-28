import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AllClientsComponent } from './all-clients/all-clients.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatModule } from '../material/mat.module';


const routes: Routes = [
  { path: '', redirectTo: 'allclients', pathMatch: 'full' }, 
  { path: 'allclients', component: AllClientsComponent },
];


@NgModule({
  declarations: [
    AllClientsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatModule,
    RouterModule.forChild(routes)
  ]
})
export class ClientsModule { }
