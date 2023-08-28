import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AllClientsComponent } from './all-clients/all-clients.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatModule } from '../material/mat.module';
import { AddClientComponent } from './add-client/add-client.component';


const routes: Routes = [
  { path: '', redirectTo: 'allclients', pathMatch: 'full' }, 
  { path: 'allclients', component: AllClientsComponent },
  { path: 'addclient', component: AddClientComponent },
];


@NgModule({
  declarations: [
    AllClientsComponent,
    AddClientComponent
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
