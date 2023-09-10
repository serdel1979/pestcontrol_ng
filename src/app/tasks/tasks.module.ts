import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AllTasksComponent } from './all-tasks/all-tasks.component';
import { MatModule } from '../material/mat.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', redirectTo: 'alltasks', pathMatch: 'full' }, 
  { path: 'alltasks', component: AllTasksComponent },
 // { path: 'addcontact', component: AddContactComponent },
];

@NgModule({
  declarations: [
    AllTasksComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatModule,
    RouterModule.forChild(routes)
  ]
})
export class TasksModule { }
