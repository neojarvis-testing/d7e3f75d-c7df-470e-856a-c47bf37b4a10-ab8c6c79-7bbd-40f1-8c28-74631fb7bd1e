import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  mobile: string = '';
  role: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  handleRegister() {
    if (this.password !== this.confirmPassword) {
      console.error('Passwords do not match');
      return;
    }
  }

}

