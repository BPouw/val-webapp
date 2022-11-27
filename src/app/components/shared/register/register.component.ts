import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  isSuccessful = false;
  isSignUpFailed = false;

  submit() {
    if (this.form.valid) {
      let username = this.form.value.username
      let password = this.form.value.password

      this.authService.register(username, password).subscribe({
        next: data => {
          this.isSuccessful = true
        },
        error: err => {
          this.isSignUpFailed = true;
        }
      })
    }
  }

  @Input() error: string | undefined;

}
