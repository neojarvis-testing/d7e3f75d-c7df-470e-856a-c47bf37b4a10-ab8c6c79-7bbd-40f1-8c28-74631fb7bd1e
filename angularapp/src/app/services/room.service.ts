import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Room } from '../models/room.model';
import { Booking } from '../models/booking.model';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  public apiUrl = 'https://8080-caabadbfacbfbcaecbccefdafbeedadabccbbdfcfbbde.premiumproject.examly.io/api'; 

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  
  getAllRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.apiUrl}/Room`, {
      headers: this.getAuthHeaders(),
    });
  }

  
  getRoomById(roomId: number): Observable<Room> {
    return this.http.get<Room>(`${this.apiUrl}/Room/${roomId}`, {
      headers: this.getAuthHeaders(),
    });
  }

  
  addRoom(room: Room): Observable<Room> {
    return this.http.post<Room>(`${this.apiUrl}/Room`, room, {
      headers: this.getAuthHeaders(),
    });
  }


  updateRoom(roomId: number, room: Room): Observable<Room> {
    return this.http.put<Room>(`${this.apiUrl}/Room/${roomId}`, room, {
      headers: this.getAuthHeaders(),
    });
  }


  deleteRoom(roomId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/Room/${roomId}`, {
      headers: this.getAuthHeaders(),
    });
  }


  getAllBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiUrl}/Booking`, {
      headers: this.getAuthHeaders(),
    });
  }

  getBookingsByUserId(userId: number): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiUrl}/Booking/user/${userId}`, {
      headers: this.getAuthHeaders(),
    });
  }

  addBooking(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(`${this.apiUrl}/Booking`, booking, {
      headers: this.getAuthHeaders(),
    });
  }


  updateBooking(bookingId: number, booking: Booking): Observable<Booking> {
    return this.http.put<Booking>(`${this.apiUrl}/Booking/${bookingId}`, booking, {
      headers: this.getAuthHeaders(),
    });
  }

  deleteBooking(bookingId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/Booking/${bookingId}`, {
      headers: this.getAuthHeaders(),
    });
  }
}

