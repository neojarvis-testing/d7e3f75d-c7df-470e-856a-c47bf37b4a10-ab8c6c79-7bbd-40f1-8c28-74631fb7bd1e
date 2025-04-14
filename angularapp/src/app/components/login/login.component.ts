import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
    
  }
  
  handleLogin() {
    console.log('Username:', this.username);
    console.log('Password:', this.password);
    // Add your authentication logic here
  }

  register(): void{
    this.router.navigate(['/register']);
  }

}
