import { Component, HostListener } from '@angular/core';
import { PAGES_ANIMATION } from "./global/animation";
import { Router } from "@angular/router";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    PAGES_ANIMATION
    
  ],
})
export class AppComponent {
  // title = 'tasked';  
  objectKeys = Object.keys;
  routerState: any;

  constructor(
    private router: Router ){
  }
  
  @HostListener("window:keydown", ["$event"])
   prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
  
  updateRouterState() {
    this.routerState = this.router.url;
  }
}
