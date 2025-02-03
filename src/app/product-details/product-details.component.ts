import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetDataService } from '../service/get-data.service';
import { DataStorageService } from '../service/data-storage.service';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

    constructor(private route: ActivatedRoute, private getData: GetDataService, private dataStorage: DataStorageService,
        private router: Router, private authService: AuthService) { }

    getParamValue: any;
    getProductDetails: any;
    storeCartData: any = [];
    inCart: boolean = false;
    showLoginModal: boolean = false;
    showRegisterModal: boolean = false;
     private productsWithRatings: any[] = [];
    productReviews: any[] = [];


    ngOnInit(): void {
        this.getParamValue = this.route.snapshot.paramMap.get('id');

        var getVal = this.dataStorage.getCartData()

        this.storeCartData = getVal ? getVal : [];

          // Yorumları sadece ilk kez oluşturuyoruz
      if (!this.productReviews || this.productReviews.length === 0) {
            this.productReviews = this.generateRandomReviews();
         }
        this.getData.productData.forEach((product: any) => {
           // Eğer ürünün rating değeri yoksa yeni bir tane oluştur.
            if (!product.rating) {
                product.rating = Math.round((Math.random() * 4 + 1) * 2) / 2;
            }
             this.productsWithRatings.push(product);

                 if (product.pdId == this.getParamValue) {
                     this.getProductDetails = product;
                 }
        });

        this.storeCartData.filter((ele: any) => {
            if (ele.pdId == this.getParamValue) {
                this.inCart = true;
            }
        });
    }

    addCart(data: any) {

        if (this.authService.isLoggedIn()) {
            data['plusMinusCounter'] = 1;
            this.storeCartData.push(data);
            this.dataStorage.storeCartData(this.storeCartData);

            this.router.navigate(['/cart']);
        }
        else {
            this.authService.resetAuth();
            this.showLoginModal = true;
        }
    }

  closeModal() {
        this.showLoginModal = false;
        this.showRegisterModal = false;
    }

    openRegisterModal() {
        this.showLoginModal = false;
        this.showRegisterModal = true;

    }

    loginSuccess() {
        this.showLoginModal = false;
        this.addCart(this.getProductDetails)

    }
    registerSuccess() {
        this.showRegisterModal = false;
        this.addCart(this.getProductDetails)
    }

    createStarArray(rating: number): any[] {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        const stars = [];

        for (let i = 0; i < fullStars; i++) {
            stars.push('full');
        }

        if (hasHalfStar) {
            stars.push('half');
        }

        for (let i = 0; i < emptyStars; i++) {
            stars.push('empty');
        }
        return stars;
    }

    generateRandomReviews(): any[] {
         const reviews = [
            { author: 'Alice', comment: 'Great product, fast delivery!' },
            { author: 'Bob', comment: 'Excellent quality, highly recommend.' },
            { author: 'Charlie', comment: 'Very satisfied with my purchase.' },
            { author: 'Diana', comment: 'Good value for the money.' },
            { author: 'Eve', comment: 'Met my expectations perfectly.' },
             { author: 'Frank', comment: 'Awesome product, love it!' }
        ];
            // Rastgele sıralamayı burada yapıyoruz
          return  reviews.sort(() => Math.random() - 0.5).slice(0, Math.floor(Math.random() * 6) + 1); // 1 ile 6 arası yorum sayısı
    }
}