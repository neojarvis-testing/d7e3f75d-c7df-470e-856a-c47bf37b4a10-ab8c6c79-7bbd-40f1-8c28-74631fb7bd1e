import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  user: User = {
    UserId: 0,
    Email: '',
    Password: '',
    Username: '',
    MobileNumber: '',
    UserRole: ''
  };
  confirmPassword:string='';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
  }

  userAlreadyExists: boolean = false;
  errorMessage: string = '';

  register(): void {
    if (this.user.Password !== this.confirmPassword) {
      console.error('Passwords do not match');
      return;
    }
    if(this.user.Email.trim() && this.user.Password.trim() && this.user.Username.trim() && this.user.MobileNumber.trim() && this.user.UserRole.trim()) {
      this.authService.register(this.user).subscribe(
        (res) => {
          console.log("Registration successful", res);
          this.router.navigate(['/login']);
        },
        (error) => {
          console.log("Registration failed", error);
          if (error.status === 409) {
            this.userAlreadyExists = true;
          }
        }
      );
    }
  }

}


