import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TaskMessage } from './task-message.model';

@Injectable({
  providedIn: 'root',
})
export class TaskMessageService {
  constructor(private http: HttpClient) {}
  readonly baseUrl = 'http://localhost:5001/api/Task';
  formData: TaskMessage = new TaskMessage();
  list: TaskMessage[];

  postTaskMessage() {
    return this.http.post(this.baseUrl, this.formData);
  }

  refreshList(userId: number) {
    this.http
      .get(`${this.baseUrl}?userId=${userId}`)
      .toPromise()
      .then((res) => (this.list = res as TaskMessage[]));
  }
  putTaskMessage() {
    return this.http.put(this.baseUrl, this.formData);
  }
  deleteTaskMessage(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
