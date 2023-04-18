import { Component, Input, OnInit } from '@angular/core';
import { RecipeModel } from 'src/app/Models/recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  constructor(
    public recipeService: RecipeService,
    private route: ActivatedRoute,
    private router:Router,
    public ngxSmartModalService: NgxSmartModalService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      console.log('Recipe id: ' + params['id']);
      this.recipeService.getRecipe(params['id']);
    });
  }

  onAddToShoppingList() {
    this.recipeService.addIngridientsToShoppingList(
      this.recipeService.selectedRecipe.ingredients
    );
  }

  deleteRecipe(myModal: any) {
    myModal.close();
    this.recipeService.deleteRecipe(this.recipeService.selectedRecipe._id)
    .subscribe(
      ()=>{
        this.recipeService.getRecipes();
        this.router.navigate(['recipes']);
      }
    )
  }
}
