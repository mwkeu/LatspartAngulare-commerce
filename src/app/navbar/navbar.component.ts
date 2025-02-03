import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { GetDataService } from '../service/get-data.service';
import { DataStorageService } from '../service/data-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Input() cartCount: number = 0;
  searchTerm: string = '';
  filteredProducts: any[] = [];
  productData: any;
  isDarkTheme: boolean = false; // Tema kontrolü

  constructor(
    private getDataService: GetDataService,
    private dataStorageService: DataStorageService,
    private cdr: ChangeDetectorRef // Change Detection ekledik
  ) {
    this.productData = this.getDataService.productData;
    this.cartCount = this.getCartDataCount();
  }

  getCartDataCount(): number {
    var getCartData = this.dataStorageService.getCartData();
    return getCartData ? getCartData.length : 0;
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    if (this.isDarkTheme) {
      document.body.classList.add('dark-theme');
      localStorage.setItem('dark-theme', 'true');
    } else {
      document.body.classList.remove('dark-theme');
      localStorage.removeItem('dark-theme');
    }

    this.cdr.detectChanges(); // Değişiklikleri zorla
  }

  ngOnInit(): void {
    if (localStorage.getItem('dark-theme') == 'true') {
      this.isDarkTheme = true;
      document.body.classList.add('dark-theme');
    }
  }

  searchProduct() {
    if (this.searchTerm) {
      this.filteredProducts = this.productData.filter((product: any) =>
        product.pdName.toLowerCase().startsWith(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredProducts = [];
    }
  }
}
