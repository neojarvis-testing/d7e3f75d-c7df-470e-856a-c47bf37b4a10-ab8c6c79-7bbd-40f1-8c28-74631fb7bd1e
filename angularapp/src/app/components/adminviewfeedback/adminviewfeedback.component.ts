import { Component, OnInit } from '@angular/core';
import { Feedback } from 'src/app/models/feedback.model';
import { FeedbackService } from 'src/app/services/feedback.service';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { GridOptions } from 'ag-grid-community';

import { AgGridAngular } from 'ag-grid-angular';
declare var bootstrap: any;

@Component({
  selector: 'app-adminviewfeedback',
  templateUrl: './adminviewfeedback.component.html',
  styleUrls: ['./adminviewfeedback.component.css']
})
export class AdminviewfeedbackComponent implements OnInit {
  feedbacks: Feedback[] = [];
  filteredFeedbacks : Feedback[]=[];
  paginatedFeedbacks: Feedback[] = [];
  selectedUser: User | null = null;
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPagesArray: number[] = [];
  search:string='';
  searchx(): void{
    this.filteredFeedbacks = this.feedbacks.filter(item => item.User.Username == this.search);
  }
  

  gridOptions: GridOptions = {
     pagination: true,
     defaultColDef: { resizable: true }
     };
    
  
  columnDefs = [
    {field:'User.Username', sortable: true, filters: true},
    {field:'FeedbackText', sortable: true, filters: true},
    {field:'Date', sortable: true, filters: true},
    {field:'User.MobileNumber', sortable: true, filters: true}
  ]

  constructor(private feedbackService: FeedbackService, private router: Router) { }

  ngOnInit(): void {
    this.loadFeedbacks();
  }

  loadFeedbacks(): void {
    this.feedbackService.getFeedbacks().subscribe(
      (res) => {
        console.log(res);
        this.feedbacks = res;
        this.filteredFeedbacks = res;
        this.paginateFeedbacks();
        this.setupPagination();
      },
      (error) => {
        console.error('Error fetching feedbacks:', error);
      }
    );
  }

  paginateFeedbacks(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedFeedbacks = this.feedbacks.slice(startIndex, endIndex);
  }

  setupPagination(): void {
    const totalPages = Math.ceil(this.feedbacks.length / this.itemsPerPage);
    this.totalPagesArray = Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.paginateFeedbacks();
  }

  openModal(user: User): void {
    this.selectedUser = user;
    const modalElement = document.getElementById('userModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }
}
