import { Component, OnInit } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { Booking } from 'src/app/models/booking.model';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-userviewmybooking',
  templateUrl: './userviewmybooking.component.html',
  styleUrls: ['./userviewmybooking.component.css']
})
export class UserviewmybookingComponent implements OnInit {
  userId: number | null = null;  // Use null initially
  bookings: Booking[] = [];
  filteredBookings: Booking[] = [];
  searchQuery: string = '';
  bookingToDelete: Booking | null = null;
  uid:number;

  constructor(private roomService: RoomService) { }

  ngOnInit(): void {
    this.uid = parseInt(localStorage.getItem('userId'));
    this.userId = this.uid;
    this.loadUserBookings();
  }
  loadUserBookings():void{
    this.roomService.getBookingsByUserId(this.userId).subscribe((res) => {
      this.bookings = res;
      this.filteredBookings = [...this.bookings];
    });
  }
  searchBookings(): void {
    if (this.searchQuery) {
      this.filteredBookings = this.bookings.filter(booking =>
     booking.Room && booking.Room.HotelName.toLowerCase().includes(this.searchQuery.toLowerCase()));
    } else {
      this.filteredBookings = [...this.bookings];
    }
  }

  confirmDelete(booking: Booking): void {
    this.bookingToDelete = booking;
    var deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
    deleteModal.show();
  }

  deleteBooking(): void {
    if (this.bookingToDelete) {
      console.log("Booking to be deleted", this.bookingToDelete);
      this.roomService.deleteBooking(this.bookingToDelete.BookingId).subscribe(() => {
        this.filteredBookings = this.filteredBookings.filter((item) => item.BookingId != this.bookingToDelete.BookingId);
      })
    }
  }


}
