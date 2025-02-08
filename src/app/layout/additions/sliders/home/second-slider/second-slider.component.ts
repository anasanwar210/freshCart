import { Component, OnInit } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CategoryService } from '../../../../../shared/services/category.service';
import { IData } from '../../../../../shared/interfaces/category';

@Component({
  selector: 'app-second-slider',
  imports: [CarouselModule],
  templateUrl: './second-slider.component.html',
  styleUrl: './second-slider.component.scss',
})
export class SecondSliderComponent implements OnInit {
  categories!: IData[];
  constructor(private _CategoryService: CategoryService) {}
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    rewind: true,
    touchDrag: false,
    pullDrag: false,
    autoplay: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      740: {
        items: 3,
      },
      940: {
        items: 6,
      },
    },
    nav: true,
  };

  ngOnInit(): void {
    this.getAllCategory();
  }

  getAllCategory() {
    this._CategoryService.getAllCategories().subscribe({
      next: (res) => {
        this.categories = res.data;
      },
    });
  }
}
