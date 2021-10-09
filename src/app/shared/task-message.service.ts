import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TaskMessage } from './task-message.model';

@Injectable({
  providedIn: 'root',
})
export class TaskMessageService {
  constructor(private http: HttpClient) {}
  readonly baseUrl = 'http://localhost:5000/api/Task';
  formData: TaskMessage = new TaskMessage();

  postTaskMessage() {
    return this.http.post(this.baseUrl, this.formData);
  }
}
