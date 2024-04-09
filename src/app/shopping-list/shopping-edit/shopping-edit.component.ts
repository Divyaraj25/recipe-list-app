import { Component, OnInit, ViewChild } from '@angular/core';
import { Ingredients } from '../../shared/ingredients.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('f') slform: NgForm;
  editedItemIndex: number
  editMode = false
  editedIngredient: Ingredients
  subscription: Subscription
  constructor(private shoppingListService: ShoppingListService) { }

  onAddItem(form: NgForm) {
    const value = form.value
    console.log(value);
    const ingredient = new Ingredients(value.name, value.amount);
    if(this.editMode){
      this.shoppingListService.updateIngredient(this.editedItemIndex,ingredient)
    }else{
      this.shoppingListService.addIngredient(ingredient);
    }
    this.editMode = false
    form.reset()
  }

  onClear(){
    if(this.editMode){
      if(confirm('You want to edit?')){
        this.slform.reset({
          name: this.editedIngredient.name,
        })
      }else{
        this.slform.reset()
        this.editMode = false
      }
    }else{
      this.slform.reset()
    }
  }

  onDelete(){
    this.shoppingListService.deleteIngredient(this.editedItemIndex)
    this.onClear()
  }

  ngOnInit() {
    this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index
        this.editMode = true
        this.editedIngredient = this.shoppingListService.getIngredient(index)
        this.slform.setValue({
          name: this.editedIngredient.name,
          amount: this.editedIngredient.amount
        })
      }
    )
  }
}
