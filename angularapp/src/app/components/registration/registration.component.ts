import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

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
  confirmPassword: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  userAlreadyExists: boolean = false;
  errorMessage: string = '';
  register(): void {
    if (this.user.Password !== this.confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Passwords do not match'
      });
      if (this.user.Email.trim() && this.user.Password.trim() && this.user.Username.trim() && this.user.MobileNumber.trim() && this.user.UserRole.trim()) {
        this.authService.register(this.user).subscribe(
          (res) => {
            console.log("Registration successful", res);
            Swal.fire({
              icon: 'success',
              title: 'Registration Successful',
              text: 'You have been registered successfully!'
            }).then(() => {
              this.router.navigate(['/login']);
            });
          },
          (error) => {
            console.log("Registration failed", error);
            if (error.status === 409) {
              this.userAlreadyExists = true;
              Swal.fire({
                icon: 'error',
                title: 'Registration Failed',
                text: 'User already exists'
              });
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Registration Failed',
                text: 'An error occurred. Please try again later.'
              });
            }
          }
        );
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'All fields are required'
        });
      }
    }


  }
}

