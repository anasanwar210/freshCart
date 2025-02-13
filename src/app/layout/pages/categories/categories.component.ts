import { Component } from '@angular/core';
import { CategoryService } from '../../../shared/services/category.service';
import { IData } from '../../../shared/interfaces/category';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-categories',
  imports: [TitleCasePipe],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {
  allCat!: IData[];

  constructor(private _CategoryService: CategoryService) {
    this.getCategories();
  }

  getCategories() {
    this._CategoryService.getAllCategories().subscribe({
      next: (res) => {
        this.allCat = res.data;
        console.log(res);
      },
    });
  }
}
