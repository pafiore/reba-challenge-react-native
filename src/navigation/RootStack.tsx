import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import ListScreen from '../screens/ListScreen';
import DetailScreen from '../screens/DetailScreen';
import { RootStackParamList } from '../types';




const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
    
    console.log('Ingreso a RootStack');
    
    const { t } = useTranslation();

    return (
        <Stack.Navigator 
            initialRouteName="ListScreen" 
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#4262fe',
                },
                headerTintColor: "white",
              }}
        >
            
            {/* LIST */}
            <Stack.Screen 
                name="ListScreen"
                component={ListScreen} 
                options={{ 
                            title: t('lblList'),
                            headerRight: () => (
                                <Image source={require('../assets/images/reba-logo-03.png')} 
                                    resizeMode="contain" style={styles.imageHeaderList} />
                            ),
                }} 
            />
            
            {/* DETAIL */}
            <Stack.Screen 
                name="DetailScreen" 
                component={DetailScreen} 
                options={{ 
                            title: t('lblDetail'),
                        }} 
            />
            
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    imageHeaderList: {
        width: 70, 
        height:50
    },

  });

export default RootStack;