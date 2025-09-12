import {AppRegistry} from 'react-native';
import App from './src/App';
import StorybookUIRoot from './.rnstorybook';
import {name as appName} from './package.json';

// Toggle between main app and Storybook
// Set to true to view Storybook, false for main app
const SHOW_STORYBOOK = false;  // false = Main App, true = Storybook

const RootComponent = SHOW_STORYBOOK ? StorybookUIRoot : App;

AppRegistry.registerComponent(appName, () => RootComponent);