import {Injector} from '@angular/core';

/**
 * Allows for retrieving singletons using 'appInjector.get(MyService)'
 */
export let appInjector: Injector;

/**
 * Helper to set the exported {@link appInjector}, needed as ES6 modules export
 * immutable bindings (see http://2ality.com/2015/07/es6-module-exports.html) for
 * which trying to make changes after using 'import {appInjector}' would throw:
 * "TS2539: Cannot assign to 'appInjector' because it is not a variable".
 */
export function setAppInjector(injector: Injector) {
  if (appInjector) {
    console.error('Programming error: appInjector was already set');
  } else {
    appInjector = injector;
  }
}
