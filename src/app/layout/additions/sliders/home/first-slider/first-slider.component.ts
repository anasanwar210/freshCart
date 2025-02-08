import { Component } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-first-slider',
  imports: [CarouselModule],
  templateUrl: './first-slider.component.html',
  styleUrl: './first-slider.component.scss',
})
export class FirstSliderComponent {
  customOptions: OwlOptions = {
    loop: true,
    margin: 10,
    dots: true,
    navSpeed: 700,
    autoplay: true,
    autoplaySpeed: 1000,
    responsive: {
      0: {
        items: 1,
      },
    },
    nav: false,
  };
}
