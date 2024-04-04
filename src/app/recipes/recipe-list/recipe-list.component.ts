import { Component,OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { recipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[];

  constructor(private recipeService: recipeService) {}

  ngOnInit(){
    this.recipes = this.recipeService.getRecipes();
  }
}
