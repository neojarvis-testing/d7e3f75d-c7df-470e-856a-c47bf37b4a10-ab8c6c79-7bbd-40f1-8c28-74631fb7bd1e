import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Feedback } from '../models/feedback.model'; // Make sure this model is defined

@Injectable({
providedIn: 'root'
})
export class FeedbackService {
<<<<<<< HEAD

public apiUrl = 'https://8080-adaaebcbceaecbccefdafbeedadabccbbdfcfbbde.premiumproject.examly.io/api'; // Replace with actual backend URL
=======
  
public apiUrl = "https://8080-deafabfcaecbccefdafbeedadabccbbdfcfbbde.premiumproject.examly.io/api";
>>>>>>> 715581abfb458af0472147e27387db8be61d6c9a

constructor(private http: HttpClient) {}

private getAuthHeaders(): HttpHeaders {
const token = localStorage.getItem('token');
return new HttpHeaders({
Authorization: `Bearer ${token}`,
'Content-Type': 'application/json'
});

}
// Send feedback to the server
sendFeedback(feedback: Feedback): Observable<Feedback> {
return this.http.post<Feedback>(`${this.apiUrl}/Feedback`, feedback, {
headers: this.getAuthHeaders()
});
}
// Get all feedbacks submitted by a specific user
getAllFeedbacksByUserId(userId: number): Observable<Feedback[]> {
return this.http.get<Feedback[]>(`${this.apiUrl}/Feedback/user/${userId}`, {
headers: this.getAuthHeaders()
});
}
// Delete feedback by ID
deleteFeedback(feedbackId: number): Observable<void> {
return this.http.delete<void>(`${this.apiUrl}/Feedback/${feedbackId}`, {
headers: this.getAuthHeaders()
});
}
// Get all feedbacks from the server
getFeedbacks(): Observable<Feedback[]> {
return this.http.get<Feedback[]>(`${this.apiUrl}/Feedback`, {
headers: this.getAuthHeaders()
});
}
}