import { Component, OnInit } from '@angular/core';
import {Phone} from '../shop/shop.component';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  phones = null;
  phones2 = null;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    const userId = localStorage.getItem('userId');
    if (userId == null) {
      this.router.navigate(['/login']);
    }
    this.http.get<Phone>('http://diogoandrade1999.pythonanywhere.com/cart/' + userId + '/').subscribe(
      data => {
        this.phones = data;
      });
    this.http.get<Phone>('http://diogoandrade1999.pythonanywhere.com/order/' + userId + '/').subscribe(
      data => {
        this.phones2 = data;
      });
  }

  remove_cart(id) {
    this.http.get('http://diogoandrade1999.pythonanywhere.com/cart_del/' + id + '/').subscribe(
      data => {
        console.log(data);
      });
  }

  order(phone: Phone) {
    const sendData = phone;
    sendData['id'] = localStorage.getItem('userId');
    sendData['quantity'] = 1;
    console.log(sendData);
    this.http.post('http://diogoandrade1999.pythonanywhere.com/order/', sendData).subscribe(
      data => {
        console.log(data);
      });
  }
}
