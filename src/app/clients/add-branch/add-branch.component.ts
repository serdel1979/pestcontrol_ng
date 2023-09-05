import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private _snackBar: MatSnackBar) { }

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
  }

  onSubmit() {
    this.sending = true; 
    setTimeout(() => {
      console.log(this.branchForm.value);

      this.branchForm.reset();
      this.sending = false;
      this.openSnackBar("Datos guardados","OK");
      window.history.back();
    }, 2000);
  }

  back() {
    window.history.back();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
