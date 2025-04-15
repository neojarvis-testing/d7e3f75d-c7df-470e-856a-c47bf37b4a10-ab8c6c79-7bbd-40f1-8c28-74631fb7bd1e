import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Room } from 'src/app/models/room.model';
import { RoomService } from 'src/app/services/room.service';
declare var bootstrap: any;

@Component({
  selector: 'app-adminviewroom',
  templateUrl: './adminviewroom.component.html',
  styleUrls: ['./adminviewroom.component.css']
})
export class AdminviewroomComponent implements OnInit {

  rooms: Room[] = [];
  filteredTerm: Room[] = [...this.rooms]; // create dummy so main array may not get affected
  searchTerm: string = '';
  roomToDelete: Room | null = null;
  paginatedRooms: Room[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 6; // Number of items per page
  totalPagesArray: number[] = [];
  totalPages: number = 1;

  constructor(private roomService: RoomService, private router: Router) { }

  ngOnInit(): void {
    this.viewRoom();
  }

  viewRoom(): void {
    this.roomService.getAllRooms().subscribe((data) => {
      this.rooms = data;
      this.filteredTerm = [...this.rooms];
      this.updatePagination();
    });
  }

  searchByHotelName(): void {
    if (this.searchTerm) {
      this.filteredTerm = this.rooms.filter((HName) => {
        return HName.HotelName.toLowerCase().includes(this.searchTerm.toLowerCase());
      });
      console.log('Filtered rooms:', this.filteredTerm); // Log filtered rooms data
    } else {
      this.filteredTerm = [...this.rooms];
      console.log('Reset filtered rooms:', this.filteredTerm); // Log reset filtered rooms data
    }
    this.currentPage = 1; // Reset to the first page after searching
    this.updatePagination();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredTerm.length / this.itemsPerPage);
    this.totalPagesArray = Array(this.totalPages).fill(0).map((x, i) => i + 1);
    this.paginateRooms();
  }

  paginateRooms(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedRooms = this.filteredTerm.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.paginateRooms();
  }

  edit(roomId: number): void {
    console.log('Editing room with ID:', roomId); // Log room ID being edited
    this.router.navigate(['/admineditroom', roomId]); // navigate to edit page with room ID
  }

  confirmDelete(room: Room): void {
    this.roomToDelete = room;
    var deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
    deleteModal.show();
  }

  deleteRoom(): void {
    if (this.roomToDelete) {
      this.roomService.deleteRoom(this.roomToDelete.RoomId).subscribe(() => {
        this.filteredTerm = this.filteredTerm.filter((item) => item.RoomId != this.roomToDelete.RoomId);
        this.updatePagination();
      });
    }
  }
}


