import { Injectable } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { IngredientModel } from '../Models/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  ingredients!: IngredientModel[] | any;

  constructor(private dataStorageService: DataStorageService) {}

  getIngredients() {
    this.dataStorageService.getRequest('shopping-list').subscribe({
      next: (data) => {
        this.ingredients = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  addIngredient(ingredient: IngredientModel) {
    let result = this.ingredients.find(
      (x:any) => x.name == ingredient.name
    )
    if(!result){
      this.ingredients.push(ingredient);
      this.postIngredient(ingredient);
    }
    else result.amount += ingredient.amount;
  }

  postIngredient(ingredient:IngredientModel){
    this.dataStorageService.postRequest("shopping-list", ingredient)
    .subscribe({
      next : data => console.log(data),
      error : error => console.log(error)
    })
  }
}
