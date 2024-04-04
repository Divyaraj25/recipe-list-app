import { Component, OnInit } from '@angular/core';
import { Ingredients } from '../shared/ingredients.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent implements OnInit{
  Ingredients: Ingredients[];

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(){
      this.Ingredients = this.shoppingListService.getIngredients()
      this.shoppingListService.IngredientsChanged.subscribe(
        (ingredients: Ingredients[]) => {
          this.Ingredients = ingredients
        }
      )
  }
}
