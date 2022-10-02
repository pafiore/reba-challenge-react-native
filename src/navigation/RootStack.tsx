import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import ListScreen from '../screens/ListScreen';
import DetailScreen from '../screens/DetailScreen';
import { RootStackParamList } from './types';




const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
    
    console.log('Ingreso a RootStack');
    
    const { t } = useTranslation();

    return (
        <Stack.Navigator initialRouteName="ListScreen" >
            
            {/* LIST */}
            <Stack.Screen 
                name="ListScreen"
                component={ListScreen} 
                options={{ 
                            title: t('lblList'),
                            headerTintColor: "white",
                            headerStyle: {
                            backgroundColor: '#4262fe',
                    },
                }} 
            />
            
            {/* DETAIL */}
            <Stack.Screen 
                name="DetailScreen" 
                component={DetailScreen} 
                options={{ 
                            title: t('lblDetail'),
                            headerTintColor: "white",
                            headerStyle: {
                                backgroundColor: '#4262fe',
                                
                            },
                        }} 
            />
            
        </Stack.Navigator>
    )
}

export default RootStack;