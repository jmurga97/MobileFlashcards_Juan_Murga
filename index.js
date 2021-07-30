import React from 'react';
import { registerRootComponent } from 'expo';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers'
import middleware from './middleware';
import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately

const Redux = () => (
    <Provider store = {createStore(reducer, middleware)}>
        <App/>
    </Provider>
)

registerRootComponent(Redux);
