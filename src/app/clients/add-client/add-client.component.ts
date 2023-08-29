import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Client } from 'src/app/interfaces/client.interface';

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

  constructor(private fb: FormBuilder, private breakpointObserver: BreakpointObserver) {

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
      businessName: ['', Validators.required],
      cuit: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      newPhoneNumber: [null],
      phones: this.fb.array([])
    });
  }

  get phoneControls() {
    return this.clientForm.get('phones') as FormArray;
  }

  // addPhone() {
  //   const phoneGroup = this.fb.group({
  //     number: ['', Validators.required]
  //   });
  //   this.phoneControls.push(phoneGroup);
  // }

  // removePhone(index: number) {
  //   this.phoneControls.removeAt(index);
  // }

  // addPhone() {
  //   if (this.newPhoneNumber) {
  //     this.phones.push(this.newPhoneNumber);
  //     this.newPhoneNumber = 0; // Limpiar el input
  //   }
  // }
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
      // const client = {
      //   businessName: this.clientForm.get('businessName')?.value,
      //   cuit: this.clientForm.get('cuit')?.value,
      //   contact: {
      //     name: this.clientForm.get('name')?.value,
      //     surname: this.clientForm.get('surname')?.value,
      //     email: this.clientForm.get('email')?.value,
      //   },
      //   phones: this.clientForm.get('phones')?.value
      // };
      // console.log(client);
      console.log(this.clientForm.value);
    }
  }



}


