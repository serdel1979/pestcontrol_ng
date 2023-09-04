import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-cancel',
  templateUrl: './dialog-cancel.component.html',
  styleUrls: ['./dialog-cancel.component.css']
})
export class DialogCancelComponent {


    constructor(
      public dialogRef: MatDialogRef<DialogCancelComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
    ) { }



    onConfirm(result: boolean): void {
      this.dialogRef.close(result);
    }

}
