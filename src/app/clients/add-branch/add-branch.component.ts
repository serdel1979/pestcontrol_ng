import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { debounceTime } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-add-branch',
  templateUrl: './add-branch.component.html',
  styleUrls: ['./add-branch.component.css']
})
export class AddBranchComponent implements OnInit {

  public branchForm!: FormGroup;
  public idClient!: number;
  public businessName!: string;
  public sending: boolean = false; // Agrega esta variable para el ngIf del progressBar

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private _snackBar: MatSnackBar,
    private clientService: ClientService,
    private alertDialogService: AlertService) { }

  ngOnInit(): void {
    this.idClient = this.route.snapshot.params['id'];
    this.businessName = this.route.snapshot.params['clientname'];
    this.branchForm = this.fb.group({
      clientId: [this.idClient, Validators.required], // Se asigna el valor de idClient aquí
      name: ['', Validators.required],
      address: this.fb.group({
        street: ['', Validators.required],
        number: ['', Validators.required],
        floor: ['', Validators.required],
        zipcode: ['', Validators.required],
        apartment: ['', Validators.required],
        city: ['', Validators.required]
      }),
    });
    this.subscribeToInputChanges();
  }



  private subscribeToInputChanges() {
    const inputFields = [
      'name',
      'address.street',
      'address.number',
      'address.floor',
      'address.zipcode',
      'address.apartment',
      'address.city',
    ];
  
    inputFields.forEach(fieldName => {
      const control = this.branchForm.get(fieldName);
  
      if (control) {
        control.valueChanges.pipe(
          debounceTime(200)
        ).subscribe(newValue => {
          const uppercaseValue = newValue.toUpperCase();
          if (uppercaseValue !== control.value) {
            control.setValue(uppercaseValue, { emitEvent: false });
          }
        });
      }
    });
  }
  



  onSubmit() {
    this.sending = true; 
    this.clientService.addBranch(this.branchForm.value).subscribe(()=>{
      this.sending = false;
      this.openSnackBar("Datos guardados","OK");
      window.history.back();
    },
    (err)=>{
        this.sending = false;
        if (err.status === 400) {
          this.alertDialogService.openAlertDialog('Operación erronea');
        } else {
          // Otro tipo de error (error de red u otro)
          this.alertDialogService.openAlertDialog('Se ha producido un error. Por favor, inténtalo de nuevo más tarde.');
        }
    })

  }

  back() {
    window.history.back();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
