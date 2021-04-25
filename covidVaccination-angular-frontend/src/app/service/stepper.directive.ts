import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
  selector: '[stepHost]'
})
export class StepDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
