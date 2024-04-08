import { Component, Input} from '@angular/core';
import { Recipe } from '../../recipe.model';
import { recipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css'
})
export class RecipeItemComponent {
  @Input() recipe: Recipe;
  @Input() index:number;
  // constructor(private recipeService: recipeService){}

  // onSelected(){
  //   // this.recipeSelected.emit();
  //   this.recipeService.selectedRecipe.emit(this.recipe)
  // }
}
