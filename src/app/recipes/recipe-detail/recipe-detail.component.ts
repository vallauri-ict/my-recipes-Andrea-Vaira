import { Component, Input, OnInit } from '@angular/core';
import { RecipeModel } from 'src/app/Models/recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit{
  constructor(public recipeService:RecipeService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params)=>{
        console.log('Recipe id: '+params['id']);
        this.recipeService.getRecipe(params['id']);
      }
    )
  }

  onAddToShoppingList(){
    this.recipeService.addIngridientsToShoppingList(this.recipeService.selectedRecipe.ingredients);
  }
}
