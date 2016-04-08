import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';
import {WinterParkComponent} from './winter-park/winterpark.component';

@Component({
    selector: 'my-app',
    template: `
    <header>{{title}}</header>
    <main>
        <div class="divider-line"></div>
        <nav class="site-nav">
            <a [routerLink]="['WinterPark']">Winter Park Camera</a>
        </nav>
        <div class="cards">
            <router-outlet></router-outlet>
        </div>
    </main>
  `,
    //styleUrls: ['app/app.component.css'],
    directives: [ROUTER_DIRECTIVES],
    providers: [ROUTER_PROVIDERS]
})

@RouteConfig([
    {path: '/winter-park', name: 'WinterPark', component: WinterParkComponent}
])
export class AppComponent {
    public title = 'Powder Cams';
}