import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthClientService } from 'src/app/shared/services/auth-client.service';
import { LoginComponent } from '../login/login.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  signupForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<RegisterComponent>,
    public fb: FormBuilder,
    public authService: AuthClientService,
    public router: Router,
    private dialog: MatDialog
  ) {
    this.signupForm = this.fb.group({
      name: [''],
      email: [''],
      mobile: [''],
      password: ['']
    });
  }

  ngOnInit() { }

  public closeMe() {
    this.dialogRef.close();
  }

  registerUser() {
    this.authService.signUp(this.signupForm.value).subscribe((res) => {
      if (res.result) {
        this.signupForm.reset();
        this.dialog.open(LoginComponent);
      }
    });
  }
}
