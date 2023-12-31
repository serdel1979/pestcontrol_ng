import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-err',
  templateUrl: './dialog-err.component.html',
  styleUrls: ['./dialog-err.component.css']
})
export class DialogComponent {


  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}

  closeDialog() {
    this.dialogRef.close();
  }

}
