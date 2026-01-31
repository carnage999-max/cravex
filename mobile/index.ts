import { registerRootComponent } from 'expo';

import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
// Polyfill for navigator.userAgent which is sometimes expected by three.js or other libs
if (typeof navigator === 'undefined') {
    (global as any).navigator = { userAgent: '' };
}

registerRootComponent(App);
