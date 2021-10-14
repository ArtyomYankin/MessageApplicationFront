import { Component, OnInit } from '@angular/core';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { TaskMessage } from '../shared/task-message.model';
import { TaskMessageService } from '../shared/task-message.service';
import { UserService } from '../shared/user.service';
import { TaskMessageFormComponent } from './task-message-form/task-message-form.component';

@Component({
  selector: 'app-task-message',
  templateUrl: './task-message.component.html',
})
export class TaskMessageComponent implements OnInit {
  userId: number;
  userDetails: any;
  constructor(
    public service: TaskMessageService,
    public userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe(
      (res) => {
        this.userDetails = res;
      },
      (err) => {
        console.log(err);
      }
    );
    this.service.refreshList(this.userId);
  }
  getUserData() {
    this.userService.getUserProfile().subscribe(
      (res) => {
        this.userDetails = res;
      },
      (err) => {
        console.log(err);
      }
    );
    return this.userDetails.id;
  }
  populateForm(selectedRecord: TaskMessage) {
    this.service.formData = Object.assign({}, selectedRecord);
  }
  onDelete(id: number) {
    if (confirm('Are you sure to delete this record?')) {
      this.service.deleteTaskMessage(id).subscribe(
        (res) => {
          this.service.refreshList(this.userId);
          this.toastr.error('Deleted successfully', 'Task Register');
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
}
