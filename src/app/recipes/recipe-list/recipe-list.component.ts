import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { recipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();

  recipes: Recipe[];

  constructor(private recipeService: recipeService) {}

  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }

  ngOnInit(){
    this.recipes = this.recipeService.getRecipes();
  }
}
