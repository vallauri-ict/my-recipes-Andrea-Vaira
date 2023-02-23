import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() featureSelected = new EventEmitter<boolean>();

  collapsed:boolean = true;
  isRecipes:boolean = true;

  onSelect(feature:string){
    //console.log(feature);
    this.isRecipes = feature == "recipes";
    this.featureSelected.emit(this.isRecipes);
  }
}
