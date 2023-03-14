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
      (x:any) => x.name.toLowerCase() == ingredient.name.toLowerCase()
    )
    if(!result){
      this.ingredients.push(ingredient);
      this.postIngredient(ingredient);
    }
    else {
      result.amount += ingredient.amount;
      console.log(ingredient);
      this.patchIngredient(result._id, {amount:result.amount})
    }
  }

  addIngredients(ingredients: IngredientModel[]){
    for (const ingredient of ingredients) {
      this.addIngredient(ingredient);
    }
  }

  patchIngredient(id:string, amount:any){
    this.dataStorageService.patchRequest("shopping-list/"+id, amount)
    .subscribe({
      next : data => console.log(data),
      error : error => console.log(error)
    })
  }

  postIngredient(ingredient:IngredientModel){
    let newIngredient = {
      name: ingredient.name,
      amount: ingredient.amount
    }
    this.dataStorageService.postRequest("shopping-list", newIngredient)
    .subscribe({
      next : data => console.log(data),
      error : error => console.log(error)
    })
  }
}
