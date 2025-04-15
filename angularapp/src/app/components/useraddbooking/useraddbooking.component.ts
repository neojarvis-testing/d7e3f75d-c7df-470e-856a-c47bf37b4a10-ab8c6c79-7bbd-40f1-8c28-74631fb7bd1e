import { Component, OnInit, ViewChild } from '@angular/core';
import { Booking } from 'src/app/models/booking.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from 'src/app/services/room.service';
import { AuthService } from 'src/app/services/auth.service';
declare var bootstrap: any;

@Component({
  selector: 'app-useraddbooking',
  templateUrl: './useraddbooking.component.html',
  styleUrls: ['./useraddbooking.component.css']
})
export class UseraddbookingComponent implements OnInit {
 

  constructor( ) { }

  ngOnInit(): void {
  
  }

}
