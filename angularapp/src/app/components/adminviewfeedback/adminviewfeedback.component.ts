// import { Component, OnInit } from '@angular/core';
// import { Feedback } from 'src/app/models/feedback.model';
// import { FeedbackService } from 'src/app/services/feedback.service';
// import { User } from 'src/app/models/user.model';
// import { Router } from '@angular/router';
// declare var bootstrap: any;

// @Component({
//   selector: 'app-adminviewfeedback',
//   templateUrl: './adminviewfeedback.component.html',
//   styleUrls: ['./adminviewfeedback.component.css']
// })
// export class AdminviewfeedbackComponent implements OnInit {
//   feedbacks:Feedback[] = [];
//   selectedUser: User | null = null; // For showing User details on the pop up menu.



//   constructor(private feedbackService : FeedbackService, private router : Router) { }

//   ngOnInit(): void {
//     this.loadFeedbacks();

//   }

//   loadFeedbacks(){
//     this.feedbackService.getFeedbacks().subscribe((res)=>{
//       console.log(res);
//       this.feedbacks=res;
//     },
    
// (error) => {console.error('Error fetching feedbacks:', error);
// });
// }

//   openModal(user: User) {
//     this.selectedUser = user;
//     const modalElement = document.getElementById('userModal');
//     if (modalElement) {
//       const modal = new bootstrap.Modal(modalElement);
//       modal.show();
//     }
//   }
// }


import { Component, OnInit } from '@angular/core';
import { Feedback } from 'src/app/models/feedback.model';
import { FeedbackService } from 'src/app/services/feedback.service';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
declare var bootstrap: any;

@Component({
  selector: 'app-adminviewfeedback',
  templateUrl: './adminviewfeedback.component.html',
  styleUrls: ['./adminviewfeedback.component.css']
})
export class AdminviewfeedbackComponent implements OnInit {
  feedbacks: Feedback[] = [];
  paginatedFeedbacks: Feedback[] = [];
  selectedUser: User | null = null;
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPagesArray: number[] = [];

  constructor(private feedbackService: FeedbackService, private router: Router) { }

  ngOnInit(): void {
    this.loadFeedbacks();
  }

  loadFeedbacks(): void {
    this.feedbackService.getFeedbacks().subscribe(
      (res) => {
        console.log(res);
        this.feedbacks = res;
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
