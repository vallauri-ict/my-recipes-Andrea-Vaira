import { Component, Input } from '@angular/core';
import { RecipeModel } from 'src/app/Models/recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent {
  constructor(public recipeService:RecipeService) { }

  onAddToShoppingList(){
    this.recipeService.addIngridientsToShoppingList(this.recipeService.selectedRecipe.ingredients);
  }
}
