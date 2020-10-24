// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    parse: { dateInput: ['DD MMMM YYYY'] },
    display: {
        dateInput: 'DD MMMM YYYY',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
    // connexion firebase
    firebase : {
        apiKey: "AIzaSyC9q77j8kpDJj-pvCrBGFWsL69TfOKj7QY",
        authDomain: "suiben-15967.firebaseapp.com",
        databaseURL: "https://suiben-15967.firebaseio.com",
        projectId: "suiben-15967",
        storageBucket: "suiben-15967.appspot.com",
        messagingSenderId: "180229815068",
        appId: "1:180229815068:web:ca45daaed9fc3ea1ae58d9"
    }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
