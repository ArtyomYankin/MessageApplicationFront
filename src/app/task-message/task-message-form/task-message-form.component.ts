import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TaskMessage } from 'src/app/shared/task-message.model';
import { TaskMessageService } from 'src/app/shared/task-message.service';

@Component({
  selector: 'app-task-message-form',
  templateUrl: './task-message-form.component.html',
})
export class TaskMessageFormComponent implements OnInit {
  constructor(
    public service: TaskMessageService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    this.service.postTaskMessage().subscribe(
      (res: any) => {
        this.resetForm(form);
        this.toastr.success('Submitted successfully', 'New task added.');
      },
      (err) => {
        console.log(err);
      }
    );
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formData = new TaskMessage();
  }
}
