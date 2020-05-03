// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBwwcNyPlpjgYhDKVxsrg0udV8ArcW1ppU',
    authDomain: 'vocalson-kodemen.firebaseapp.com',
    databaseURL: 'https://vocalson-kodemen.firebaseio.com',
    projectId: 'vocalson-kodemen',
    storageBucket: 'vocalson-kodemen.appspot.com',
    messagingSenderId: '787043809873',
    appId: '1:787043809873:web:a7bca80619279488241670',
    measurementId: 'G-13QE2TQYVG'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/dist/zone-error';  // Included with Angular CLI.
