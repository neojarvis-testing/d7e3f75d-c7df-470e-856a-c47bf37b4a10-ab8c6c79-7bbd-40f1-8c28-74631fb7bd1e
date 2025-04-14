import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminaddroomComponent } from './components/adminaddroom/adminaddroom.component';
import { AdmineditroomComponent } from './components/admineditroom/admineditroom.component';
import { AdminnavComponent } from './components/adminnav/adminnav.component';
import { AdminviewfeedbackComponent } from './components/adminviewfeedback/adminviewfeedback.component';
import { AdminviewrequestedbookingComponent } from './components/adminviewrequestedbooking/adminviewrequestedbooking.component';
import { AdminviewroomComponent } from './components/adminviewroom/adminviewroom.component';
import { AuthguardComponent } from './components/authguard/authguard.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { UseraddbookingComponent } from './components/useraddbooking/useraddbooking.component';
import { UseraddfeedbackComponent } from './components/useraddfeedback/useraddfeedback.component';
import { UsernavComponent } from './components/usernav/usernav.component';
import { UserviewfeedbackComponent } from './components/userviewfeedback/userviewfeedback.component';
import { UserviewmybookingComponent } from './components/userviewmybooking/userviewmybooking.component';
import { UserviewroomComponent } from './components/userviewroom/userviewroom.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AdminaddroomComponent,
    AdmineditroomComponent,
    AdminnavComponent,
    AdminviewfeedbackComponent,
    AdminviewrequestedbookingComponent,
    AdminviewroomComponent,
    AuthguardComponent,
    ErrorComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    RegistrationComponent,
    UseraddbookingComponent,
    UseraddfeedbackComponent,
    UsernavComponent,
    UserviewfeedbackComponent,
    UserviewmybookingComponent,
    UserviewroomComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
