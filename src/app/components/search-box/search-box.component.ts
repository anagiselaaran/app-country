import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'app-search-box',
  standalone: true,
  imports: [],
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent {

  private debouncer: Subject<string> = new Subject<string>()
  private debouncerSuscription? :Subscription


  @Input() initialValue:string = ''
  @Input() public placeholder: string = ''
  @Output() public onValue: EventEmitter<string> = new EventEmitter()
  /* @Output() public onValue = new EventEmitter<string>()
 */
  @Output() public onDebounce: EventEmitter<string> = new EventEmitter()


  emitValue(value: string):void {
    this.onValue.emit(value)
  }

  onKeyPress(searchTerm:string) {
    this.debouncer.next(searchTerm)
    
    
  }
  ngOnInit() {
    this.debouncerSuscription =  this.debouncer
      .pipe( 
      debounceTime( 300)
    )
      .subscribe(value => {
      this.onDebounce.emit(value)
    })
  }

  ngOnDestroy() {
    console.log('destruido');
    this.debouncerSuscription?.unsubscribe()
    
  }
 

}
