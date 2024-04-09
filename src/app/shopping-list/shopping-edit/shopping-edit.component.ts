import { Component, OnInit} from '@angular/core';
import { Ingredients } from '../../shared/ingredients.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent implements OnInit {

  constructor(private shoppingListService: ShoppingListService) { }

  onAddItem(form: NgForm) {
    const value = form.value
    console.log(value);
    const ingredient = new Ingredients(value.name, value.amount);
    this.shoppingListService.addIngredient(ingredient);
  }

  ngOnInit() { 
    console.log('divyaraj makwana');
  }
}
