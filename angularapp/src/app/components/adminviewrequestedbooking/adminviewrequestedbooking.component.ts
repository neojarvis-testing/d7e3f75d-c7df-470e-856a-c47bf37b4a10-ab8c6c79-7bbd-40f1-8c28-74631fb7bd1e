import { Component, OnInit } from '@angular/core';
import { Booking } from 'src/app/models/booking.model';
import { Room } from 'src/app/models/room.model';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-adminviewrequestedbooking',
  templateUrl: './adminviewrequestedbooking.component.html',
  styleUrls: ['./adminviewrequestedbooking.component.css']
})
export class AdminviewrequestedbookingComponent implements OnInit {
  bookings:Booking[] = [];
  filteredBooking: Booking[] = []; 
  searchTerm:string=''; 

  constructor(private service:RoomService) { }

  ngOnInit(): void {
    this.loadbookings();
  }

  loadbookings()
  {
   
     this.service.getAllBookings().subscribe((res)=>{
      console.log("user data", res);
      this.bookings = res;
      this.filteredBooking = res;    
      
     });
  }
  
  searchbyHotelName(): void {
    if (this.searchTerm) {
      this.filteredBooking = this.bookings.filter((item) => {
        console.log(this.searchTerm);
        return item.Room?.HotelName.toLowerCase().includes(this.searchTerm.toLowerCase())  //calling the HotelName from Room property.
      }
      );
    } else {
      this.filteredBooking = [...this.bookings];
    }
  }

  filterByStatus(status: string): void {
    if (status === 'All') {
      this.filteredBooking = [...this.bookings];
    } else {
      this.filteredBooking = this.bookings.filter(booking => booking.Status === status);
    }
  } 

  updateStatus(booking: Booking, status: string): void {
    booking.Status = status;
    this.service.updateBooking(booking.BookingId, booking).subscribe(() => {
      this.loadbookings(); // Refresh the bookings list
    });
  }

}
