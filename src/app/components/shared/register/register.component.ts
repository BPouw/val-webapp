import { Country } from '@angular-material-extensions/select-country';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private authService: AuthService, private snackbar: MatSnackBar, private router: Router) {}

  ngOnInit(): void {}

  public defaultValue: Country = {
    name: 'Germany',
    alpha2Code: 'DE',
    alpha3Code: 'DEU',
    numericCode: '276',
    callingCode: '',
  };

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    country: new FormControl<Country>(this.defaultValue),
    password: new FormControl(''),
  });

  isSuccessful = false;
  isSignUpFailed = false;

  submit() {
    if (this.form.valid) {
      let username = this.form.value.username;

      let country = this.form.value.country.name

      let password = this.form.value.password;

      this.authService.register(username, country, password).subscribe({
        next: (data) => {
          this.isSuccessful = true;
          this.snackbar.open(`Successfully Registered`, '', {P
            duration: 3000,
          });
          this.router.navigate(['login'])
        },
        error: (err) => {
          this.isSignUpFailed = true;
        },
      });
    }
  }

  @Input() error: string | undefined;
}
