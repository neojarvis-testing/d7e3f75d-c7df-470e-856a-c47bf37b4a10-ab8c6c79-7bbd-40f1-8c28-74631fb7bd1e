import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-usernav',
  templateUrl: './usernav.component.html',
  styleUrls: ['./usernav.component.css']
})
export class UsernavComponent implements OnInit {
  userName: string = '';
  userRole: string = '';

  constructor(public router: Router, public service: AuthService) {
    this.userName = localStorage.getItem('name') || 'Guest';
    this.userRole = localStorage.getItem('role') || 'User';
  }


  ngOnInit(): void { }

  onFeedbackChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    if (value === 'post') {
      this.router.navigate(['/useraddfeedback']);
    } else if (value === 'view') {
      this.router.navigate(['/userviewfeedback']);
    }
    (event.target as HTMLSelectElement).value = 'Feedback';

  }


  lout(): void {
<<<<<<< HEAD
    this.service.logout();
    this.router.navigate([`/login`]); 
  }
 
 
=======
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want, logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, logout!',
      cancelButtonText: 'No, stay logged in'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.logout();
        this.router.navigate(['/login']);
      }
    });
  }
>>>>>>> 5f53b7ea1dc890501e1422af8dd9aa6202d7d72b
}


