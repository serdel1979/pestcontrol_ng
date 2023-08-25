import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllContactsComponent } from './all-contacts/all-contacts.component';
import { RouterModule, Routes } from '@angular/router';
import { MatModule } from '../material/mat.module';

const routes: Routes = [
  { path: '', redirectTo: 'allcontacts', pathMatch: 'full' }, 
  { path: 'allcontacts', component: AllContactsComponent },
];



@NgModule({
  declarations: [
    AllContactsComponent
  ],
  imports: [
    CommonModule,
    MatModule,
    RouterModule.forChild(routes)
  ]
})
export class ContactsModule { }
