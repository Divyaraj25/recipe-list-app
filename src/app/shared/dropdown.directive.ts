import { Directive, HostBinding, HostListener, ElementRef } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})
export class dropdownDirective {
    @HostBinding('class.open') isOpen = false;
    @HostListener('document:click', ['$event']) toggleOpen(e: Event) {
        this.isOpen = this.elRef.nativeElement.contains(e.target) ? !this.isOpen : false;
    }
    constructor(private elRef: ElementRef) { }
    // ngDoCheck() {
    //     console.log(this.elRef);
    //     console.log(this.elRef.nativeElement.contains(document.activeElement));
    // }
}