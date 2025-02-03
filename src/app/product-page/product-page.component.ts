import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetDataService } from '../service/get-data.service';

@Component({
    selector: 'app-product-page',
    templateUrl: './product-page.component.html',
    styleUrls: ['./product-page.component.css'],
})
export class ProductPageComponent implements OnInit {
    getParamValue: any;
    getProductData: any = [];
    filterProductData: any = [];
    getSubCategoryOption: any = [];
    selectedSortOption: string = 'none';

    constructor(private route: ActivatedRoute, private getData: GetDataService) { }

    ngOnInit(): void {
        this.getParamValue = this.route.snapshot.paramMap.get('name');

        this.getData.productData.forEach((ele: any) => {
            if (ele.pdCategory == this.getParamValue) {
              
              // Rating kontrolü
              if (!ele.rating) {
                  ele.rating = Math.round((Math.random() * 4 + 1) * 2) / 2;
              }

                this.getProductData.push(ele);
                this.filterProductData.push(ele);
            }
        });

        this.getData.subCategorisFilterData.forEach((ele: any) => {
            if (ele.categories == this.getParamValue) {
                this.getSubCategoryOption.push(ele);
            }
        });
    }

    filterSelect(data: any) {
        this.filterProductData = [];
        var getFilterValue: any = data.target.value;
       
        if (getFilterValue != 'all') {
            this.getData.productData.forEach((ele: any) => {
                if (ele.pdSubCategory == getFilterValue) {
                    this.filterProductData.push(ele);
                }
            });
        } else {
            this.filterProductData = this.getProductData;
        }
        this.resetSort();
    }

    sortProducts(event: any) {
        const sortOrder = event.target.value;
        if (sortOrder === 'asc') {
            this.filterProductData.sort((a: any, b: any) => a.pdPrice - b.pdPrice);
        } else if (sortOrder === 'desc') {
            this.filterProductData.sort((a: any, b: any) => b.pdPrice - a.pdPrice);
        }
    }

    resetSort() {
        this.selectedSortOption = 'none';
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