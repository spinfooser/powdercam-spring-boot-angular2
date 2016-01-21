import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';
import {WinterParkComponent} from './winter-park/winterpark.component';

@Component({
    selector: 'my-app',
    template: `
    <h1>{{title}}</h1>
    <nav>
      <a [routerLink]="['WinterPark']">Winter Park Camera</a>
    </nav>
    <router-outlet></router-outlet>
  `,
    //styleUrls: ['app/app.component.css'],
    directives: [ROUTER_DIRECTIVES],
    providers: [ROUTER_PROVIDERS]
})

@RouteConfig([
    {path: '/winter-park', name: 'WinterPark', component: WinterParkComponent},
])
export class AppComponent {
    public title = 'Powder Cams';
}