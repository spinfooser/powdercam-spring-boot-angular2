import {Component, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import 'rxjs/add/operator/map';


@Component({
    selector: 'winter-park',
    templateUrl: './app/winter-park/winterpark.component.html',
    viewProviders: [HTTP_PROVIDERS]
})
export class WinterParkComponent {
    public image:String;

    constructor(private _router: Router, public http: Http) {

        http.get('api/winter-park')
            // Call map on the response observable to get the parsed people object
            .map(res => res.json())
            // Subscribe to the observable to get the parsed people object and attach it to the
            // component
            .subscribe(powder =>
                this.image = "data:image/png;base64," + powder.image
            );
    }
}
