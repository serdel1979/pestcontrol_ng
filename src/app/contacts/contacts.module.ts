import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllContactsComponent } from './all-contacts/all-contacts.component';
import { RouterModule, Routes } from '@angular/router';
import { MatModule } from '../material/mat.module';
import { AddContactComponent } from './add-contact/add-contact.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', redirectTo: 'allcontacts', pathMatch: 'full' }, 
  { path: 'allcontacts', component: AllContactsComponent },
  { path: 'addcontact', component: AddContactComponent },
];



@NgModule({
  declarations: [
    AllContactsComponent,
    AddContactComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatModule,
    RouterModule.forChild(routes)
  ]
})
export class ContactsModule { }
