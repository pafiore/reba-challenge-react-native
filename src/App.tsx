import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import RootStack from './navigation/RootStack';

const App = () => {

    console.log('Ingreso a App')

    return (
        <NavigationContainer>
            <RootStack />
        </NavigationContainer>
    )
}

export default App;
