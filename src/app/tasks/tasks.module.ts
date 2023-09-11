import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AllTasksComponent } from './all-tasks/all-tasks.component';
import { MatModule } from '../material/mat.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { SubTaskDetailComponent } from './sub-task-detail/sub-task-detail.component';
import { AddNoveltieComponent } from './add-noveltie/add-noveltie.component';

const routes: Routes = [
  { path: '', redirectTo: 'alltasks', pathMatch: 'full' }, 
  { path: 'alltasks', component: AllTasksComponent },
  { path: 'task/:id', component: TaskDetailComponent },
  { path: 'subtask/:id', component: SubTaskDetailComponent },
];

@NgModule({
  declarations: [
    AllTasksComponent,
    TaskDetailComponent,
    SubTaskDetailComponent,
    AddNoveltieComponent
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
