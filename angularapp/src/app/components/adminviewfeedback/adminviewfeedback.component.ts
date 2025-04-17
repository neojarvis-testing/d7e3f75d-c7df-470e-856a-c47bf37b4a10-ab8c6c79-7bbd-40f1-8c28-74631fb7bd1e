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
  feedbacks:Feedback[] = [];
  selectedUser: User | null = null; // For showing User details on the pop up menu.



  constructor(private feedbackService : FeedbackService, private router : Router) { }

  ngOnInit(): void {
    this.loadFeedbacks();

  }

  loadFeedbacks(){
    this.feedbackService.getFeedbacks().subscribe((res)=>{
      console.log(res);
      this.feedbacks=res;
    },
    
(error) => {console.error('Error fetching feedbacks:', error);
});
}

  openModal(user: User) {
    this.selectedUser = user;
    const modalElement = document.getElementById('userModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }
}


