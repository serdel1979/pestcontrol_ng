import { CanDeactivateFn } from '@angular/router';
import { AddNewClientComponent } from '../clients/add-new-client/add-new-client.component';
import { FormGroup } from '@angular/forms';
import { AlertService } from '../services/alert.service';
import { inject } from '@angular/core';
import { DialogCancelComponent } from '../alerts/dialog-cancel/dialog-cancel.component';
import { MatDialog } from '@angular/material/dialog';

export const savedGuard: CanDeactivateFn<unknown> = (component, currentRoute, currentState, nextState) => {


  if (component instanceof AddNewClientComponent && component.branchForm instanceof FormGroup && component.clientForm instanceof FormGroup) {
    const saved = component.saved;

    const dialog = inject(MatDialog);


    if (!saved) {
     
      return new Promise<boolean>((resolve) => {
        const dialogRef = dialog.open(DialogCancelComponent, {
          data: { message: '¿Desea salir sin guardar los datos?' },
        });

        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
            resolve(true); // Permite la navegación
          } else {
            resolve(false); // Cancela la navegación
          }
        });
      });
    }
  }
  return true;
};
