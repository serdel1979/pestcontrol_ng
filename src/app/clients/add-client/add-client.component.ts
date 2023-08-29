import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { debounceTime } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit{

  public clientForm!: FormGroup;

  public newPhoneNumber!: number; // Nuevo número de teléfono a agregar
  public phones: number[] = []; // Array de números de teléfono

  public gridCols!: number;
  public grid1Cols!: number;

  constructor(private fb: FormBuilder, private breakpointObserver: BreakpointObserver,
    private alertDialogService: AlertService) {

    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
    ]).subscribe(result => {
      if (result.breakpoints[Breakpoints.XSmall]) {
        this.gridCols = 1;
        this.grid1Cols = 1;
      } else if (result.breakpoints[Breakpoints.Small]) {
        this.gridCols = 2;
        this.grid1Cols = 1;
      } else {
        this.gridCols = 3;
        this.grid1Cols = 1;
      }
    });

  }

  ngOnInit(): void {
    this.clientForm = this.fb.group({
      businesName: ['', Validators.required],
      cuit: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      newPhoneNumber: [null],
      phones: this.fb.array([])
    });

    this.subscribeToInputChanges();
  }



  private subscribeToInputChanges() {
    const inputFields = ['businesName', 'cuit', 'name', 'surname']; // Add more fields if needed

    inputFields.forEach(fieldName => {
      const control = this.clientForm.get(fieldName);

      control?.valueChanges.pipe(
        debounceTime(300)
      ).subscribe(newValue => {
        const uppercaseValue = newValue.toUpperCase();
        if (uppercaseValue !== control.value) {
          control.setValue(uppercaseValue, { emitEvent: false });
        }
      });
    });
  }




  get phoneControls() {
    return this.clientForm.get('phones') as FormArray;
  }



  addPhone() {
    const newPhone = this.clientForm.get('newPhoneNumber')?.value;
    if (newPhone) {
      this.phones.push(newPhone);
      this.clientForm.get('newPhoneNumber')?.reset(); // Reiniciar el control
    }
  }
  

  removePhone(index: number) {
    this.phones.splice(index, 1);
  }

  saveContact() {
    if (this.clientForm.valid) {
      const newPhone = this.clientForm.get('newPhoneNumber')?.value;
      if(newPhone){
        this.phones.push(newPhone);
      }
      const client = {
        businesName: this.clientForm.get('businesName')?.value,
        cuit: this.clientForm.get('cuit')?.value,
        contact: {
          name: this.clientForm.get('name')?.value,
          surname: this.clientForm.get('surname')?.value,
          email: this.clientForm.get('email')?.value,
          phones: this.phones
        },
      
      };
      console.log(client);
      this.alertDialogService.openAlertDialog('Error en el formulario');
    }
  }



}


