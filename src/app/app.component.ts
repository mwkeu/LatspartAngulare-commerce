import { Component } from '@angular/core';
import { DataStorageService } from './service/data-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'shopping-cart-app';
  constructor(private dataStorage:DataStorageService){}


  ngOnInit(): void {
    // her uygulama ilk başladığında localStorage dan getCartData methodu çalışarak , sepet bilgileri anında güncelleniyor. Böylece veritutarsızlıklarıda önlemiş olduk.
    this.dataStorage.getCartData()
   
 }
}