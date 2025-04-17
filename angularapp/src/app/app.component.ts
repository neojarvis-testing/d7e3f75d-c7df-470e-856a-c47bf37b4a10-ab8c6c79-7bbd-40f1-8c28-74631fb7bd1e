// import { Component, OnInit } from '@angular/core';
// import { AuthService } from './services/auth.service';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent implements OnInit {
//   title = 'angularapp';
//   userRole: string | null = null;
//   isLoggedIn: boolean = false;

//   constructor(private authService: AuthService) { }

//   ngOnInit(): void {
//     this.isLoggedIn = this.authService.isLoggedIn();
//     console.log("Is Logged In:", this.isLoggedIn);
    
//     this.authService.getCurrentUserRole().subscribe(role => {
//       console.log("User Role from AuthService:", role);
//       this.userRole = role;
//     });

//     // Subscribe to auth state changes
//     this.authService.getAuthStateChange().subscribe(() => {
//       this.isLoggedIn = this.authService.isLoggedIn();
//       this.authService.getCurrentUserRole().subscribe(role => {
//         this.userRole = role;
//         console.log("Helooo" + this.userRole);
//       });
//     });
//   }
// }

import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title:'angularapp';
  isLoggedIn = false;
  userRole: string | null = null;
 
  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.userRole = localStorage.getItem('role');
        this.isLoggedIn = !!this.userRole;
      }
    });
  }
 
  ngOnInit(): void {
    this.userRole = localStorage.getItem('role');
    this.isLoggedIn = !!this.userRole;
  }
}