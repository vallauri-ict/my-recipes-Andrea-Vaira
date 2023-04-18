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
  constructor(
    private dataStorageService: DataStorageService,
    private shoppingListService: ShoppingListService
  ) {}
  firstScan: boolean = true;

  getRecipes() {
    this.dataStorageService.getRequest('recipes').subscribe({
      next: (data) => {
        this.recipes = data;
        if (this.firstScan) {
          this.shoppingListService.getIngredients();
          this.firstScan = false;
        }
        // this.selectedRecipe = this.recipes[0];
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getRecipe(id: string) {
    this.dataStorageService.getRequest('recipes/' + id).subscribe(
      (recipe: any) => {
        this.selectedRecipe = recipe;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  addIngridientsToShoppingList(ingredients: IngredientModel[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: RecipeModel) {
    return this.dataStorageService.postRequest('recipes', recipe);
  }

  updateRecipe(_id: string, recipe: RecipeModel) {
    return this.dataStorageService.patchRequest('recipes/' + _id, recipe);
  }

  deleteRecipe(_id: string){
    return this.dataStorageService.deleteRequest('recipes/'+_id);
  }
}
