import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private regForm;

  constructor(private router: Router, private http: HttpClient, private formBuilder: FormBuilder) {
    this.regForm = this.formBuilder.group({
      email: '',
      password1: '',
      password2: '',
      name: ''
    });
  }

  ngOnInit() {
    const userId = localStorage.getItem('userId');
    if (userId != null) {
      this.router.navigate(['/cart']);
    }
  }

  public register(userData) {
    if (userData.password1 === userData.password2) {
      this.http.post('http://diogoandrade1999.pythonanywhere.com/register/', {
        email: userData.email,
        password: userData.password1,
        name: userData.name
      }).subscribe(
        data => {
          localStorage.setItem('userId', data['pk']);
          localStorage.setItem('admin', data['admin']);
          localStorage.setItem('name', data['name']);
          this.router.navigate(['/cart']);
        },
        err => {
          console.log("Register failed!");
        });
    }
    console.log("Register failed!");
  }

}
