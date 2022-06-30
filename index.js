console.log(process.env)
console.log(process.env.REACT_NATIVE_JUNK);
console.log(process.env['REACT_NATIVE_JUNK'])
console.log(process.env.JUNK);
console.log(process.env['JUNK'])
console.log(process.env.EXPO_STUFF);
console.log(process.env['EXPO_STUFF'])
console.log(process.env.STUFF);
console.log(process.env['STUFF'])


import { registerRootComponent } from 'expo'

import App from './App'

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App)
