import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TasksService } from '../../services/tasks.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SharedDataService } from '../../services/shared-data.service';

@Component({
  selector: 'app-add-noveltie',
  templateUrl: './add-noveltie.component.html',
  styleUrls: ['./add-noveltie.component.css']
})
export class AddNoveltieComponent{


  public noveltieForm!: FormGroup;
  public sending: boolean = false;





  constructor(@Inject(MAT_DIALOG_DATA) public novelty: any, private fb: FormBuilder,
  private tasksService: TasksService,
  private _snackBar: MatSnackBar,
  private shared: SharedDataService,
  private dialogRef: MatDialogRef<AddNoveltieComponent>) {
    this.noveltieForm = this.fb.group({
      subjobid: [this.novelty.id, Validators.required], // Se asigna el valor de idClient aquí
      observation: ['', Validators.required],
    });
  }


  onSubmit(){
    this.sending = true;
    this.tasksService.addNoveltie(this.noveltieForm.value)
    .subscribe(
      ()=>{
        this.sending = false;
        this.openSnackBar("Novedad agregada","Ok");
        this.shared.updateSubtask(true);
        this.dialogRef.close();
      }
    )

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
