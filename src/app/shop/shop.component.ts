import { Component, OnInit } from '@angular/core';

import {HttpClient, HttpErrorResponse} from '@angular/common/http';

export interface Phone {
  name: string;
  memory: number;
  color: string;
  quantity: number;
  img: string;
  pk: number;
}

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  phones = null;

  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    this.http.get<Phone>('http://diogoandrade1999.pythonanywhere.com/phones/').subscribe(
      data => {
        this.phones = data;
    });
  }
}
