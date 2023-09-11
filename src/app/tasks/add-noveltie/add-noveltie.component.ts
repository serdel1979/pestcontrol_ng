import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TasksService } from '../../services/tasks.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
      (resp)=>{
        this.sending = false;
        this.openSnackBar("Novedad agregada","Ok");
        this.dialogRef.close();
      }
      ,
      (err)=>{
        this.sending = false;
        this.openSnackBar("No se agregó la novedad","Ok");
        this.dialogRef.close();
      }
    )

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
