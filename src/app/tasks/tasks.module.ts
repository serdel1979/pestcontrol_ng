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
import { EditScheduleComponent } from './schedule/edit-schedule/edit-schedule.component';
import { SettingTasksComponent } from './setting-tasks/setting-tasks.component';

const routes: Routes = [
  { path: '', redirectTo: 'schedule', pathMatch: 'full' }, 
  { path: 'schedule', component: ScheduleComponent },
  { path: 'setting', component: SettingTasksComponent},
  { path: 'addSchedule', component: AddScheduleComponent },
  { path: 'schedule/:id', component: EditScheduleComponent },
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
    AddScheduleComponent,
    EditScheduleComponent,
    SettingTasksComponent
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
