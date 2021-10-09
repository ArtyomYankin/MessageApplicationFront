import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [],
})
export class HomeComponent implements OnInit {
  countryName: string = '';
  userDetails: any;
  response: any;
  constructor(
    private router: Router,
    private service: UserService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.service.getUserProfile().subscribe(
      (res) => {
        this.userDetails = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }
  getCoronaStats() {
    this.http
      .get(
        'https://covid-19-data.p.rapidapi.com/report/country/name?name=' +
          this.countryName +
          '&date=2021-09-02'
      )
      .subscribe((response) => {
        this.response = response;
        console.log(this.response);
      });
  }
}
