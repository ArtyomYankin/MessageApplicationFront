import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private fb: FormBuilder, private http: HttpClient) {}
  readonly BaseURI = 'http://localhost:5000/api';
  formModel = this.fb.group({
    Email: ['', Validators.email],
    Passwords: this.fb.group(
      {
        Password: ['', Validators.required],
        ConfirmPassword: ['', Validators.required],
      },
      { validator: this.comparePasswords }
    ),
  });
  comparePasswords(fb: FormGroup) {
    let confirmPswrdCtrl = fb.get('ConfirmPassword');
    //passwordMismatch
    //confirmPswrdCtrl.errors={passwordMismatch:true}
  }
  register() {
    var body = {
      Email: this.formModel.value.Email,
      Password: this.formModel.value.Passwords.Password,
    };
    return this.http.post(this.BaseURI + '/User/Register', body);
  }

  login(formData: any) {
    return this.http.post(this.BaseURI + '/User/Login', formData);
  }

  getUserProfile() {
    var tokenHeader = new HttpHeaders({
      Authorization: 'Bearer' + localStorage.getItem('token'),
    });
    return this.http.get(this.BaseURI + '/UserProfile');
  }
}
