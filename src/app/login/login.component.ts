import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import {ActivatedRoute, NavigationEnd, Router, RoutesRecognized} from '@angular/router';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private logForm;

  constructor(private router: Router, private http: HttpClient, private formBuilder: FormBuilder) {
    this.logForm = this.formBuilder.group({
      email: '',
      password: ''
    });
  }

  ngOnInit() {
    const userId = localStorage.getItem('userId');
    if (userId != null) {
      this.router.navigate(['/cart']);
    }
  }

  public login(userData) {
    this.http.post('http://diogoandrade1999.pythonanywhere.com/login/', {email: userData.email, password: userData.password}).subscribe(
      data => {
        localStorage.setItem('userId', data['pk']);
        localStorage.setItem('admin', data['admin']);
        localStorage.setItem('name', data['name']);
        this.router.navigate(['/cart']);
      },
      err => {
        console.log("Login failed!");
      });
  }
}
