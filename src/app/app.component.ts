import { ViewChild,ElementRef,AfterViewInit,Component } from '@angular/core';
import {fromEvent,of,interval,timer, Observable, pipe} from 'rxjs';
import {ajax} from 'rxjs/ajax';
import {map,take,retry, filter, concat, takeUntil} from 'rxjs/operators';
import {FormControl} from '@angular/forms'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
interval:Observable<any>;
fromEvent:Observable<any>;
ajaxReq:Observable<any>;
timer:Observable<any>;
inputControl:FormControl;
@ViewChild('elementReference') element:ElementRef;  

  constructor(){
  this.takeUntilExample();
  //this.takeExample();
  this.concatApp();
  this.timerExample();
  this.pipeExample(); 
  this.pipeExampleShortForm(); 
  this.intervalExample();
  this.ajaxRequest();
  this.mapOpExample();
  }

  ngAfterViewInit(){
    this.eventExample();
  }

  eventExample(){
    this.fromEvent=fromEvent(this.element.nativeElement,'mouseenter');
    this.fromEvent.subscribe((event:MouseEvent)=>{
      console.log("Mouse Position "+event.clientX+"X"+event.clientY);
    });
  }

  intervalExample(){
    this.interval=interval(1000);
    this.interval.subscribe(x=>{console.log(x);});
  }

  ajaxRequest(){
    this.ajaxReq=ajax('https://jsonplaceholder.typicode.com/posts/4').pipe(retry(3));
    this.ajaxReq.subscribe(x=>{console.log(x);},err=>{console.log(err)});
  }

  mapOpExample(){
    const nums=of(1,2,3,4,5,6);
    const squareMap=map((x:number)=>x*x);
    const squareValues=squareMap(nums);
    squareValues.subscribe(x=>console.log(x));
  }

  pipeExample(){
    const nums=of(1,2,3,4,5,6);
    const squareEvenNumbers=pipe(
      filter((n:number)=>n%2==0),
      map(x=>x*x)
    );
    const vals=squareEvenNumbers(nums); 
    vals.subscribe(x=>{console.log(x)}); 
  }


  pipeExampleShortForm(){
    const nums=of(1,2,3,4,5,6).pipe(
      filter((n:number)=>n%2==0),
      map(x=>x*x)
    );
    
    nums.subscribe(x=>{console.log(x)}); 
  }


  timerExample(){
    this.timer=timer(1000,4000);
    this.timer.subscribe(x=>console.log(x));
  }

  concatApp(){
    const sourceOne=of(1,2,3,4,5,6);
    const sourceTwo=of(7,8,9,10,11,12);
    const concatExample=sourceOne.pipe(concat(sourceTwo));
    concatExample.subscribe(val=>{
      console.log("concat Example",val);
    });
    
  }

  takeExample(){
    this.inputControl=new FormControl();
    this.inputControl.valueChanges.pipe(take(5)).subscribe(x=>{console.log(x)});
    
  }
  takeUntilExample(){
    this.inputControl=new FormControl();
    this.inputControl.valueChanges.pipe(takeUntil(interval(5000))).subscribe(x=>{console.log(x)});
    
  }
}
