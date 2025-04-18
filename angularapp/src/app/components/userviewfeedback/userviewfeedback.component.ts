import { Component, OnInit } from '@angular/core';
import { Feedback } from 'src/app/models/feedback.model';
import { AuthService } from 'src/app/services/auth.service';
import { FeedbackService } from 'src/app/services/feedback.service';
declare var bootstrap: any;

@Component({
  selector: 'app-userviewfeedback',
  templateUrl: './userviewfeedback.component.html',
  styleUrls: ['./userviewfeedback.component.css']
})
export class UserviewfeedbackComponent implements OnInit {
  userId: number = 0;
  uid: number =0;
  feedbacks: Feedback[] = [];
  feedbackToDelete: Feedback | null = null;

  constructor(private authService: AuthService, private feedbackService: FeedbackService) 
  {
  this.uid = parseInt(localStorage.getItem("userId"));
  this.userId = this.uid;
  console.log("Here: ", this.userId);
  }

  ngOnInit(): void {
    this.loadUserFeedback();
  }

  loadUserFeedback(): void {
    this.feedbackService.getAllFeedbacksByUserId(this.userId).subscribe((res) => {
      this.feedbacks = res;
    })
  }

  confirmDelete(feedback: Feedback): void {
  this.feedbackToDelete = feedback;
  var deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
  deleteModal.show();
  }

  deleteFeedback(): void {
    if (this.feedbackToDelete) {
    this.feedbackService.deleteFeedback(this.feedbackToDelete.FeedbackId).subscribe(() => {
      this.feedbacks = this.feedbacks.filter((item) => item.FeedbackId != this.feedbackToDelete.FeedbackId);
    });
   }
  }
}
