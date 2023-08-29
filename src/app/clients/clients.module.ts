import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AllClientsComponent } from './all-clients/all-clients.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatModule } from '../material/mat.module';
import { AddClientComponent } from './add-client/add-client.component';
import { AddClient2Component } from './add-client2/add-client2.component';


const routes: Routes = [
  { path: '', redirectTo: 'allclients', pathMatch: 'full' }, 
  { path: 'allclients', component: AllClientsComponent },
 // { path: 'addclient', component: AddClientComponent },
  { path: 'addclient', component: AddClient2Component }
];


@NgModule({
  declarations: [
    AllClientsComponent,
    AddClientComponent,
    AddClient2Component
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
