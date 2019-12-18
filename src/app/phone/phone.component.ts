import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {Phone} from '../shop/shop.component';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.css']
})
export class PhoneComponent implements OnInit {

  private routeSub: Subscription;
  private changeForm;
  phone = null;
  id = 0;
  admin = false;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router, private formBuilder: FormBuilder) {
    this.changeForm = this.formBuilder.group({
      quantity: ''
    });
    const admin = localStorage.getItem('admin');
    if (admin != null) {
      if (admin === 'true') {
        this.admin = true;
      }
    }
  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.http.get<Phone>('http://diogoandrade1999.pythonanywhere.com/phone_details/' + this.id + '/').subscribe(
      data => {
        this.phone = data;
      });
  }

  public add_cart(phone: Phone) {
    const userId = localStorage.getItem('userId');
    if (userId == null) {
      this.router.navigate(['/login']);
    }
    const sendData = phone;
    sendData['id'] = userId;
    sendData['quantity'] = 1;
    this.http.post('http://diogoandrade1999.pythonanywhere.com/cart/', sendData).subscribe(
      data => {
        console.log(data);
      });
  }

  public change(formData, id) {
    this.http.post('http://diogoandrade1999.pythonanywhere.com/phone/', {quantity: formData.quantity, id: id}).subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log('Failed!');
      });
  }
}
