import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredients } from '../shared/ingredients.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  Ingredients: Ingredients[];
  private changed: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.Ingredients = this.shoppingListService.getIngredients()
    this.changed = this.shoppingListService.IngredientsChanged.subscribe(
      (ingredients: Ingredients[]) => {
        this.Ingredients = ingredients
      }
    )
  }

  ngOnDestroy(){
    this.changed.unsubscribe()
  }

  onEditItem(index:number){
    this.shoppingListService.startedEditing.next(index)
  }
}
