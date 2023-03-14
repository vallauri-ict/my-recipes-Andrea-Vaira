import { Injectable } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeModel } from '../Models/recipe.model';
import { IngredientModel } from '../Models/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipes!: RecipeModel[] | any;
  selectedRecipe!: RecipeModel | any;
  constructor(private dataStorageService: DataStorageService, private shoppingListService: ShoppingListService) {}

  getRecipes() {
    this.dataStorageService.getRequest('recipes').subscribe({
      next: (data) => {
        this.recipes = data;
        // this.selectedRecipe = this.recipes[0];
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  addIngridientsToShoppingList(ingredients: IngredientModel[]){
    this.shoppingListService.addIngredients(ingredients);
  }
}
