import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabGroup } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs';
import { DialogCancelComponent } from 'src/app/alerts/dialog-cancel/dialog-cancel.component';
import { AlertService } from 'src/app/services/alert.service';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-add-new-client',
  templateUrl: './add-new-client.component.html',
  styleUrls: ['./add-new-client.component.css']
})
export class AddNewClientComponent implements OnDestroy, OnInit {

  @ViewChild('tabGroup') tabGroup!: MatTabGroup;

  public sending: boolean = false;

  public saved: boolean = false;

  public clientForm: FormGroup = this.fb.group({
    businessName: ['', Validators.required],
    cuit: ['', Validators.required],
  });

  public contactForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phones: this.fb.array([])
  })

  public branchForm: FormGroup = this.fb.group({
    clientId: [0, Validators.required],
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



  showFormAndTable: boolean = false;


  branches: any[] = [];

  displayedColumns: string[] = ['name', 'street', 'number', 'floor', 'zipcode', 'apartment', 'city', 'action'];
  public dataSource = new MatTableDataSource<any>();






  constructor(private fb: FormBuilder, private clients: ClientService, public dialog: MatDialog,
    private router: Router, private alertDialogService: AlertService) { }



  ngOnInit(): void {
    this.subscribeToInputChanges();
    this.subscribeToInputChangesBranche();
  }


  ngOnDestroy(): void {
    //this.checkData();
  }


  get phoneForms() {
    return this.contactForm.get('phones') as FormArray;
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




  onSubmit() {
    if (this.clientForm.valid) {
      this.tabGroup.selectedIndex = 1;
    }
  }

  submitContact() {
    if (this.contactForm.valid) {
      this.tabGroup.selectedIndex = 3;
    }
  }

  back() {
    window.history.back();
  }

  addBranche() {
    if (this.branchForm.valid) {
      this.branches.push(this.branchForm.value);
      this.dataSource.data = this.branches;
      this.branchForm.reset();
      this.clearFormErrors(this.branchForm);

    }
  }

  clearFormErrors(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      if (control instanceof FormGroup) {
        this.clearAddressErrors(control);
      } else {
        control?.setErrors(null);
      }
    });
  }

  clearAddressErrors(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      formGroup.get(key)?.setErrors(null);
    });
  }


  save() {
    this.sending = true;
    if (this.branchForm.valid && this.branchForm.touched) {
      this.alertDialogService.openAlertDialog('Tiene datos sin guardar');
      this.sending = false;
      return;
    }

    this.saved = true;
    const clientNew = {
      client: this.clientForm.value,
      branches: this.branches
    }

    console.log(clientNew);
    this.clients.newClient(clientNew)
      .subscribe(res => {
        this.sending = false;
        this.router.navigate(['/clients/allclients']);
      },
        (err) => {
          this.sending = false;
          this.alertDialogService.openAlertDialog('Error en la solicitud');
        })

  }

  toggleFormAndTable() {
    this.showFormAndTable = !this.showFormAndTable;
  }




  private subscribeToInputChanges() {
    const inputFields = ['businessName', 'cuit'];

    inputFields.forEach(fieldName => {
      const control = this.clientForm.get(fieldName);

      if (control) {
        control.valueChanges.pipe(
          debounceTime(200)
        ).subscribe(newValue => {
          if (newValue) {
            const uppercaseValue = newValue.toUpperCase();
            if (uppercaseValue !== control.value) {
              control.setValue(uppercaseValue, { emitEvent: false });
            }
          }
        });
      }
    });
  }

  private subscribeToInputChangesBranche() {
    const inputFields = ['name', 'address.street', 'address.number', 'address.floor', 'address.zipcode', 'address.apartment', 'address.city'];

    inputFields.forEach(fieldName => {
      const control = this.branchForm.get(fieldName);

      if (control) {
        control.valueChanges.pipe(
          debounceTime(200)
        ).subscribe(newValue => {
          if (newValue) {
            const uppercaseValue = newValue.toUpperCase();
            if (uppercaseValue !== control.value) {
              control.setValue(uppercaseValue, { emitEvent: false });
            }
          }
        });
      }
    });
  }




}
