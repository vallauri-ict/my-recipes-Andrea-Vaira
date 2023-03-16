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

  addIngredient(newIngredient: IngredientModel) {
    let result = this.ingredients.find(
      (x:any) => x.name.toLowerCase() == newIngredient.name.toLowerCase()
    )
    if(!result){
      this.ingredients.push(newIngredient);
      this.postIngredient(newIngredient);
    }
    else {
      result.amount += newIngredient.amount;
      console.log(newIngredient);
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
    // let newIngredient = {
    //   name: ingredient.name,
    //   amount: ingredient.amount
    // }
    this.dataStorageService.postRequest("shopping-list", ingredient)
    .subscribe({
      next : data => console.log(data),
      error : error => console.log(error)
    })
  }
}
