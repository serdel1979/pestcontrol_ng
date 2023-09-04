import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime } from 'rxjs';
import { DialogCancelComponent } from 'src/app/alerts/dialog-cancel/dialog-cancel.component';
import { Client } from 'src/app/interfaces/client.interface';
import { AlertService } from 'src/app/services/alert.service';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-add-client2',
  templateUrl: './add-client2.component.html',
  styleUrls: ['./add-client2.component.css']
})
export class AddClient2Component {

  public clientForm: FormGroup  = this.fb.group({
    businessName: ['', Validators.required],
    cuit: ['', Validators.required],
    contact: this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phones: this.fb.array([]) 
    }),
  });

  public sending: boolean = false;

  constructor(private fb: FormBuilder, private clients: ClientService, public dialog: MatDialog,
    private alertDialogService: AlertService){}

  get phoneForms() {
    return this.clientForm.get('contact.phones') as FormArray;
  }

  addPhone() {
    const phoneFormGroup = this.fb.group({
      number: ['', Validators.required]
    });
    this.phoneForms.push(phoneFormGroup);
  }

  removePhone(index: number) {
    this.phoneForms.removeAt(index);
  }

  ngOnInit(): void {
  //  this.subscribeToInputChanges();
    this.clientForm.reset();
   // this.clientForm.markAsUntouched();
  }


  // private subscribeToInputChanges() {
  //   const inputFields = ['businessName', 'cuit', 'contact.name', 'contact.surname'];
  
  //   inputFields.forEach(fieldName => {
  //     const control = this.clientForm.get(fieldName);
  
  //     if (control) {
  //       control.valueChanges.pipe(
  //         debounceTime(200)
  //       ).subscribe(newValue => {
  //         const uppercaseValue = newValue.toUpperCase();
  //         if (uppercaseValue !== control.value) {
  //           control.setValue(uppercaseValue, { emitEvent: false });
  //         }
  //       });
  //     }
  //   });
  // }
  
  resetForm(){
    this.clientForm = this.fb.group({
      businessName: ['', Validators.required],
      cuit: ['', Validators.required],
      contact: this.fb.group({
        name: ['', Validators.required],
        surname: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phones: this.fb.array([]) 
      }),
    });
  }

  back() {
    window.history.back();
  }

  onSubmit() {
    this.sending = true;
    if (this.clientForm.valid) {
      this.clients.newClient(this.clientForm.value)
        .subscribe(resp => {
          this.openDialog();
        },
        err => {
          this.sending = false;
          if (err.status === 400) {
            this.alertDialogService.openAlertDialog(err.error);
          } else {
            // Otro tipo de error (error de red u otro)
            this.alertDialogService.openAlertDialog('Error desconocido');
          }
        });
    }
  }
  
  openDialog() {
    const dialogRef = this.dialog.open(DialogCancelComponent, {
      data: { message: '¿Deseas agregar otro cliente?' }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.resetForm();
        this.clientForm.reset();
        this.clientForm.markAsUntouched();
      } else {
        this.back();
      }
      this.sending = false;
    });
  }
  



}
