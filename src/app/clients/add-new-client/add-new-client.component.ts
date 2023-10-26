import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
  styleUrls: ['./add-new-client.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AddNewClientComponent implements OnDestroy, OnInit {

  @ViewChild('tabGroup') tabGroup!: MatTabGroup;
  public sending: boolean = false;

  public saved: boolean = false;

  newPhoneNumber!: string;
  phonesNumber: string[] = [];

  selectedCliValue: any;
  public clientForm: FormGroup = this.fb.group({
    businessName: ['', Validators.required],
    cuit: ['', Validators.required]
  });

  public contactForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    businessName: ['', Validators.required],
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
    contacts: this.fb.array([])
  });



  showFormAndTable: boolean = false;


  branches: any[] = [];

  contactsList: any[] = [];

  branchSelected!: any;


  displayedColumns: string[] = ['name', 'street', 'number', 'floor', 'zipcode', 'apartment', 'city', 'action'];
  public dataSource = new MatTableDataSource<any>();

  displayedColumnsContact: string[] = ['name', 'surname', 'email', 'branch', 'action'];
  columnsToDisplayWithExpand = [...this.displayedColumnsContact, 'expand'];
  expandedElement: any | null;
  public dataSourceContact = new MatTableDataSource<any>();







  constructor(private fb: FormBuilder, private clients: ClientService, public dialog: MatDialog,
    private router: Router, private alertDialogService: AlertService) { }



  ngOnInit(): void {
    this.subscribeToInputChanges();
    this.subscribeToInputChangesBranche();
    this.subscribeToInputChangesContact();
  }


  ngOnDestroy(): void {
    //this.checkData();
  }


  get phoneForms() {
    return this.contactForm.get('phones') as FormArray;
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

  selectedBranch(branch: any) {
    const businessNameValue = branch.name;
    this.contactForm.patchValue({
      businessName: businessNameValue
    });
    if (this.contactForm.valid) {
      //branch.contacts.push(this.contactForm.value)
      this.branchSelected = branch;
    }

  }

  addContactToBranch() {
    this.branchSelected.contacts.push(this.contactForm.value);
    const businessNameValue = this.branchSelected.name;
    this.contactForm.patchValue({
      businessName: businessNameValue
    });

    this.contactsList.push(this.contactForm.value);
    this.phonesNumber = [];
    this.contactForm.reset();
    this.resetListNumber();
    this.clearFormErrors(this.contactForm);
    this.dataSourceContact.data = this.contactsList;
  }


  handleKeyDown(event: KeyboardEvent, branch: any) {
    if (event.key === ' ' || event.key === 'Spacebar' || event.keyCode === 32) {
      this.selectedBranch(branch);
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
    const client = this.clientForm.value;
    const branches = this.branches;
    //const contacts = this.contactsList;
    const data = {
      client, branches
    }


    this.clients.addClientData(data)
    .subscribe(res => {
      this.sending = false;
     // this.router.navigate(['/clients/newclient']);
        console.log(res);
      },
      (err) => {
        this.sending = false;
        if (err.status == 400) {
          this.alertDialogService.openAlertDialog(err.error);
        } else {
          this.alertDialogService.openAlertDialog("Error desconocido");
        }

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

  private subscribeToInputChangesContact() {
    const inputFields = ['name', 'surname', 'email'];
    inputFields.forEach(fieldName => {
      const control = this.contactForm.get(fieldName);
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


  deletContact(element: any) {
    const index = this.contactsList.indexOf(element);
    if (index !== -1) {

      const emailToRemove = element.email; 

      this.branchSelected.contacts = this.branchSelected.contacts.filter((contact: { email: string; }) => contact.email !== emailToRemove);


      this.contactsList.splice(index, 1);
      this.dataSourceContact = new MatTableDataSource(this.contactsList);
    }
  }


  deletBranch(element: any) {
    if (this.branchInContact(element.name)) {
      this.alertDialogService.openAlertDialog('Ésta sucursal está agregada a un cliente');
      return;
    }
    const index = this.branches.indexOf(element);
    if (index !== -1) {
      this.branches.splice(index, 1);
      this.dataSource = new MatTableDataSource(this.branches);
    }
  }

  branchInContact(name: string): boolean {
    for (const el of this.contactsList) {
      if (el.businessName === name) {
        return true;
      }
    }
    return false;
  }




  saveContact() {

  }

  get phoneControls() {
    return this.contactForm.get('phones') as FormArray;
  }

  delPhone(i: number) {
    if (i >= 0 && i < this.phonesNumber.length) {
      this.phonesNumber.splice(i, 1); // Elimina 1 elemento en la posición i
    }
  }


  resetListNumber() {
    const phonesArray = this.contactForm.get('phones') as FormArray;
    while (phonesArray.length > 0) {
      phonesArray.removeAt(0);
    }
  }

  addNumber() {
    if (this.newPhoneNumber == '') {
      return;
    }
    const phoneNumberString = this.newPhoneNumber;
    const phoneNumberLong = parseInt(phoneNumberString, 10);
  
    if (!isNaN(phoneNumberLong)) {
      this.phonesNumber.push(this.newPhoneNumber);
      const phonesArray = this.contactForm.get('phones') as FormArray;
  
      // Crear un FormGroup que contenga el número de teléfono
      const phoneFormGroup = this.fb.group({
        number: phoneNumberLong
      });
  
      // Agregar el FormGroup al FormArray
      phonesArray.push(phoneFormGroup);
  
      this.newPhoneNumber = '';
    } else {
      console.error("La cadena no es un número válido en formato long.");
    }
  }
  


}
