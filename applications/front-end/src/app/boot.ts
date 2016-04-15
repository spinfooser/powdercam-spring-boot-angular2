/*
 * Providers provided by Angular
 */
import {bootstrap} from 'angular2/platform/browser';
import {Promise} from 'es6-promise';

// Angular 2 browser
import {
    ELEMENT_PROBE_PROVIDERS,
    ELEMENT_PROBE_PROVIDERS_PROD_MODE
} from 'angular2/platform/browser';

// Angular 2
import {enableProdMode} from 'angular2/core';

/*
 * App Component
 * our top level component that holds all of our components
 */
import {AppComponent} from './app.component';

/*
 * Bootstrap our Angular app with a top level component `App` and inject
 * our Services and Providers into Angular's dependency injection
 */
export function main(initialHmrState?: any): Promise<any> {

    return bootstrap(AppComponent, [])
        .catch(err => console.error(err));

}




/*
 * Vendors
 * For vendors for example jQuery, Lodash, angular2-jwt just import them anywhere in your app
 * You can also import them in vendors to ensure that they are bundled in one file
 * Also see custom-typings.d.ts as you also need to do `typings install x` where `x` is your module
 */


/*
 * Hot Module Reload
 * experimental version by @gdi2290
 */
//if ('development' === ENV && HMR === true) {
    // activate hot module reload
    let ngHmr = require('angular2-hmr');
    ngHmr.hotModuleReplacement(main, module);
//} else {
//    // bootstrap when document is ready
//    document.addEventListener('DOMContentLoaded', () => main());
//}
