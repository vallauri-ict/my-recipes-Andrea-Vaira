import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-recipe';

  isRecipes:boolean = true;

  onNavigate(isRecipes:boolean){
    //console.log(feature);
    this.isRecipes = isRecipes;
  }
}
