import { CanDeactivateFn } from '@angular/router';
import { AddNewClientComponent } from '../clients/add-new-client/add-new-client.component';
import { FormGroup } from '@angular/forms';

export const savedGuard: CanDeactivateFn<unknown> = (component, currentRoute, currentState, nextState) => {

  if (component instanceof AddNewClientComponent && component.branchForm instanceof FormGroup && component.clientForm instanceof FormGroup) {
    const formBranche = component.branchForm;
    const clientForm = component.clientForm;

    console.log(formBranche.dirty);

    if (!formBranche.valid) {
      // El formulario tiene cambios no guardados
      // Puedes mostrar una advertencia o realizar lógica según sea necesario
      const confirmacion = window.confirm('Tienes cambios no guardados. ¿Seguro que deseas abandonar la página?');
      return confirmacion; // Devuelve true o false según la decisión del usuario
    }
  }
  return true;
};
