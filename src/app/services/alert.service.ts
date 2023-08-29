import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../alerts/dialog-err/dialog-err.component';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private dialog: MatDialog) { }


  openAlertDialog(message: string) {
    this.dialog.open(DialogComponent, {
      width: '250px',
      data: { message },
    });
  }


}
