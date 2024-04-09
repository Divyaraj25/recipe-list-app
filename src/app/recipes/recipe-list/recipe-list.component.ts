import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { recipeService } from '../recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnInit, OnDestroy {

  subscribtion:Subscription;
  recipes: Recipe[];

  constructor(private recipeService: recipeService) { }

  ngOnInit() {
    this.subscribtion = this.recipeService.ingredientsChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes
      }
    )
    this.recipes = this.recipeService.getRecipes();
  }

  ngOnDestroy(){
    this.subscribtion.unsubscribe();
  }
}
