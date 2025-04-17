import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

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


  ngOnInit(): void {}

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
    this.service.logout();
    this.router.navigate([`/login`]); 
  }
 
 
}


