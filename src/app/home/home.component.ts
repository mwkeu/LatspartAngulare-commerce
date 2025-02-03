import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../service/get-data.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    bannerImgs = [
        {
            id: 1,
            img: '../../assets/images/banner/ef637eb93bf1a887.webp',
        },
        {
            id: 2,
            img: '../../assets/images/banner/9021283f0be266c1.webp',
        },
        {
            id: 3,
            img: '../../assets/images/banner/7dcc28ed89760319.webp',
        },
    ];

    getCategorisData: any;
    getApplianceProductData: any[] = [];
    getFashionProductData: any[] = [];
    private productsWithRatings: any[] = []; // Rating'li ürünleri saklayacağımız alan

    constructor(private getData: GetDataService) { }

    ngOnInit(): void {
        this.getCategorisData = this.getData.categoriesData;

        // Ürünleri alıp, rating'leri kontrol etme ve atama işlemlerini burada yapacağız.
        this.getData.productData.forEach((product: any) => {
            // Eğer ürünün rating değeri yoksa yeni bir tane oluştur.
            if (!product.rating) {
                product.rating = Math.round((Math.random() * 4 + 1) * 2) / 2;
            }
             this.productsWithRatings.push(product); // Güncellenmiş ürünü bir diziye ekle
             
              if (product.pdCategory == 'appliances') {
                this.getApplianceProductData.push(product);
              }
              if (product.pdCategory == 'fashion') {
                this.getFashionProductData.push(product);
              }
        });
       
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
}