import { Component } from '@angular/core';
import { RecipeModel } from '../Models/recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent {

  selectedRecipe: RecipeModel | undefined;

  OnRecipeSelected(recipe: RecipeModel){
    console.log("Log", recipe);
    this.selectedRecipe = recipe;
  }
}
