import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AllTasksComponent } from './all-tasks/all-tasks.component';
import { MatModule } from '../material/mat.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { SubTaskDetailComponent } from './sub-task-detail/sub-task-detail.component';
import { AddNoveltieComponent } from './add-noveltie/add-noveltie.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { AddScheduleComponent } from './schedule/add-schedule/add-schedule.component';

const routes: Routes = [
  { path: '', redirectTo: 'schedule', pathMatch: 'full' }, 
  { path: 'schedule', component: ScheduleComponent },
  { path: 'addSchedule', component: AddScheduleComponent },
  { path: 'alltasks', component: AllTasksComponent },
  { path: 'task/:id', component: TaskDetailComponent },
  { path: 'subtask/:id', component: SubTaskDetailComponent },
];

@NgModule({
  declarations: [
    AllTasksComponent,
    TaskDetailComponent,
    SubTaskDetailComponent,
    AddNoveltieComponent,
    ScheduleComponent,
    AddScheduleComponent
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
