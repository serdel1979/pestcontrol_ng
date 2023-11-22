import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientGet } from 'src/app/interfaces/client-get.interface';
import { AlertService } from 'src/app/services/alert.service';
import { ClientService } from '../../services/client.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogCancelComponent } from 'src/app/alerts/dialog-cancel/dialog-cancel.component';
import { Branch } from 'src/app/interfaces/client.interface';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css']
})
export class ClientDetailComponent implements OnInit{

  public id!: number;
  public loading: boolean = false;

  public client!: ClientGet;

  public addBranch: boolean = false;

  public addContact: boolean = false;

  public dataSource = new MatTableDataSource<any>();
  public dataSourceContacts = new MatTableDataSource<any>();

  public branchSelected: string = "...";

  public branch!: Branch | any;

  public idBranchSelected!:number;

  phonesArray!: FormArray;


  newPhoneNumber!: string;
  phonesNumber: string[] = [];

  public branchForm: FormGroup = this.fb.group({
    clientId: [0, Validators.required],
    name: ['', Validators.required],
    address: this.fb.group({
      street: ['', Validators.required],
      number: ['', Validators.required],
      floor: ['', Validators.required],
      zipCode: ['', Validators.required],
      apartment: ['', Validators.required],
      city: ['', Validators.required]
    }),
    contacts: this.fb.array([])
  });

  public contactForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    businessName: [''],
    phones: this.fb.array([])
  })



  constructor(private route: ActivatedRoute,
    private alertDialogService: AlertService,
    private clientService: ClientService,
    private dialog: MatDialog,
    private fb: FormBuilder){
      this.phonesArray = this.contactForm.get('phones') as FormArray;
    }


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];    
    this.subscribeToInputChangesBranche();
    this.subscribeToInputChangesContact();
    this.loadData();
  }

  loadData(){
    this.loading = true;
    this.clientService.getClient(this.id)
    .subscribe(resp=>{
      this.client=resp;
      this.dataSource.data=this.client.branches;
      if(this.branchSelected != '...'){
        const foundBranch = this.client.branches.find(branch => branch.name === this.branchSelected);
        if (foundBranch) {
            this.dataSourceContacts.data = foundBranch.contacts;
        } else {
            console.log('No se encontró el branch con el nombre deseado.');
        }
      }
      this.loading=false;
    },
    err=>{
      this.loading=false;
    })
  }





  selectBranch(element:any){
    this.branchSelected = element.name;
    this.branch = element;
    this.idBranchSelected = element.id;
    this.dataSourceContacts.data = element.contacts;
  }

  saveContact(){
    const  { name, surname, email, phones } = this.contactForm.value;
    const data = {
      name,surname,email,phones,
      branchId : this.idBranchSelected
    }

    this.loading = true
    this.clientService.addContact(data)
    .subscribe(resp=>{
      this.loading = false;
      this.loadData();
      this.resetFormContact();
    },
    err=>{
      this.loading = false;
      if (err.status === 400) {
        this.alertDialogService.openAlertDialog('No se puede agregar el contacto');
      } else {
        // Otro tipo de error (error de red u otro)
        this.alertDialogService.openAlertDialog('Se ha producido un error. Por favor, inténtalo de nuevo más tarde.');
      }
    })

  }

  deletContact(element:any){
    return new Promise<boolean>((resolve) => {
      const dialogRef = this.dialog.open(DialogCancelComponent, {
        data: { message: '¿Está seguro de eliminar el contacto?' },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.loading = true;
          this.clientService.deleteContact(element.id)
          .subscribe(resp=>{
            this.loading = false;
            this.loadData();
          },
          err=>{
            this.loading = false;
            if (err.status === 400) {
              this.alertDialogService.openAlertDialog('No se puede borrar el contacto');
            } else {
              this.alertDialogService.openAlertDialog('Se ha producido un error. Por favor, inténtalo de nuevo más tarde.');
            }
          })
          
        }
      });
    });
  }


  deletBranch(element: any) {
    return new Promise<boolean>((resolve) => {
      const dialogRef = this.dialog.open(DialogCancelComponent, {
        data: { message: '¿Está seguro de eliminar sucursal con sus contactos?' },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.loading = true;
          this.clientService.deleteBranch(element.id)
          .subscribe(
            resp=>{
              this.loading = false;
              this.loadData();
            },
            err=>{
              this.loading = false;
              if (err.status === 400) {
                console.log(err);
                this.alertDialogService.openAlertDialog('No se puede agregar la sucursal');
              } else {
                // Otro tipo de error (error de red u otro)
                this.alertDialogService.openAlertDialog('Se ha producido un error. Por favor, inténtalo de nuevo más tarde.');
              }

            }
          )
        }
      });
    });
    
  }

  addBranchToggle(){
    this.addBranch = !this.addBranch;
    if(!this.addBranch)this.resetFormBranch();
  }

  addContactToggle(){
    this.addContact = !this.addContact;
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

  saveBranche(){
    this.branchForm.value['clientId']=this.client.id;
    this.loading = true;
    this.clientService.addBranch(this.branchForm.value)
    .subscribe(resp=>{
      this.loading = false;
      this.loadData();
      this.resetFormBranch();
    },
    err=>{
      this.loading = false;
      if (err.status === 400) {
        this.alertDialogService.openAlertDialog('No se puede agregar la sucursal');
      } else {
        // Otro tipo de error (error de red u otro)
        this.alertDialogService.openAlertDialog('Se ha producido un error. Por favor, inténtalo de nuevo más tarde.');
      }
    })

  }

  resetFormBranch(){
    this.branchForm.reset();
    this.clearFormErrors(this.branchForm);
  }



  resetFormContact(){
    this.phonesNumber=[];
    this.contactForm.reset();
    this.resetListNumber();
    this.clearFormErrors(this.contactForm);
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


  delPhone(i: number) {
    if (i >= 0 && i < this.phonesNumber.length) {
      this.phonesNumber.splice(i, 1); // Elimina 1 elemento en la posición i
      this.phonesArray.removeAt(i);
    }
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


  back() {
    window.history.back();
  }
}
