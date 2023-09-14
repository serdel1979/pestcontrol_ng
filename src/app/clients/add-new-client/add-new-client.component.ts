import { Component, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabGroup } from '@angular/material/tabs';
import { AlertService } from 'src/app/services/alert.service';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-add-new-client',
  templateUrl: './add-new-client.component.html',
  styleUrls: ['./add-new-client.component.css']
})
export class AddNewClientComponent {

  @ViewChild('tabGroup') tabGroup!: MatTabGroup;

  public sending: boolean = false;

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

  displayedColumns: string[] = ['name', 'street', 'number', 'floor','zipcode','apartment','city'];
  public dataSource = new MatTableDataSource<any>();
  





  constructor(private fb: FormBuilder, private clients: ClientService, public dialog: MatDialog,
    private alertDialogService: AlertService) { }


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

    submitContact(){
      if(this.contactForm.valid){
        this.tabGroup.selectedIndex = 2;
      }
    }

    back() {
      window.history.back();
    }

    addBranche(){
      this.branches.push(this.branchForm.value);
      this.dataSource = new MatTableDataSource<any>(this.branches);
      this.branchForm.reset();
    }

    save(){
      
    }

    toggleFormAndTable() {
      this.showFormAndTable = !this.showFormAndTable;
    }


}