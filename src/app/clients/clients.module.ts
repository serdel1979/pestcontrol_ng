import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AllClientsComponent } from './all-clients/all-clients.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatModule } from '../material/mat.module';
import { AddClientComponent } from './add-client/add-client.component';
import { AddClient2Component } from './add-client2/add-client2.component';
import { SeeDetailComponent } from './see-detail/see-detail.component';
import { AddBranchComponent } from './add-branch/add-branch.component';
import { AddContactComponent } from '../contacts/add-contact/add-contact.component';
import { BranchesComponent } from './branches/branches.component';
import { AddNewClientComponent } from './add-new-client/add-new-client.component';
import { savedGuard } from '../guards/saved.guard';
import { FormCliComponent } from './add-new-client/form-cli/form-cli.component';
import { FormBranchComponent } from './add-new-client/form-branch/form-branch.component';
import { TableBranchComponent } from './add-new-client/table-branch/table-branch.component';
import { FormContactComponent } from './add-new-client/form-contact/form-contact.component';
import { TableContactsComponent } from './add-new-client/table-contacts/table-contacts.component';

const routes: Routes = [
  { path: '', redirectTo: 'allclients', pathMatch: 'full' }, 
  { path: 'allclients', component: AllClientsComponent },
 // { path: 'addclient', component: AddClientComponent },
 // { path: 'addclient', component: AddClient2Component },
  { path: 'addclient', component: AddNewClientComponent, canDeactivate: [savedGuard]},
  { path: ':id/newbranch/:clientname', component: AddBranchComponent }
];


@NgModule({
  declarations: [
    AllClientsComponent,
    AddClientComponent,
    AddClient2Component,
    SeeDetailComponent,
    AddBranchComponent,
    BranchesComponent,
    AddNewClientComponent,
    FormCliComponent,
    FormBranchComponent,
    TableBranchComponent,
    FormContactComponent,
    TableContactsComponent
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
