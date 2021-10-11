import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TaskMessage } from 'src/app/shared/task-message.model';
import { TaskMessageService } from 'src/app/shared/task-message.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-task-message-form',
  templateUrl: './task-message-form.component.html',
})
export class TaskMessageFormComponent implements OnInit {
  apiTypes: any[] = [
    { apiType: 'Weather', id: 1 },
    { apiType: 'Covid', id: 2 },
    { apiType: 'Football', id: 3 },
  ];
  public selectedApi: string;
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
  }
  onSubmit(form: NgForm) {
    if (this.service.formData.id == 0) this.insertRecord(form);
    else this.updateRecord(form);
  }
  insertRecord(form: NgForm) {
    this.service.formData.apiType = this.selectedApi;
    this.service.formData.userId = this.userDetails.id;
    this.service.postTaskMessage().subscribe(
      (res: any) => {
        this.resetForm(form);
        this.service.refreshList(this.userDetails.id);
        this.toastr.success('Submitted successfully', 'New task added.');
      },
      (err) => {
        console.log(err);
      }
    );
  }
  updateRecord(form: NgForm) {
    this.service.putTaskMessage().subscribe(
      (res) => {
        this.resetForm(form);
        this.service.refreshList(this.userDetails.id);
        this.toastr.info('Updated successfully', 'Task updated');
      },
      (err) => {
        console.log(err);
      }
    );
  }
  onSelect(apiType: string): void {
    this.selectedApi = apiType;
  }
  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formData = new TaskMessage();
  }
}
