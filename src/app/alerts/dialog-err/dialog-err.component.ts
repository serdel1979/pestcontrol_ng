import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-err',
  templateUrl: './dialog-err.component.html',
  styleUrls: ['./dialog-err.component.css']
})
export class DialogErrComponent {


  constructor(
    public dialogRef: MatDialogRef<DialogErrComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

}
