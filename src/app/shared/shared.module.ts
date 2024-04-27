import { NgModule } from "@angular/core";

import { dropdownDirective } from "./dropdown.directive";

import { AlertComponent } from "./alert/alert.component";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { CommonModule } from "@angular/common";


@NgModule({
    declarations: [
        AlertComponent,
        LoadingSpinnerComponent,
        dropdownDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        AlertComponent,
        LoadingSpinnerComponent,
        dropdownDirective,
        CommonModule
    ]
})
export class SharedModule { }