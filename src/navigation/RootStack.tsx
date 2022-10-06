import React, {useLayoutEffect} from 'react';
import { Image, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import SplashScreen from 'react-native-splash-screen';
import ListScreen from '../screens/ListScreen';
import DetailScreen from '../screens/DetailScreen';
import { RootStackParamList } from '../types';
import { GLOBAL_STYLE } from '../constants';


const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
    
    console.log('Ingreso a RootStack');
    
    const { t } = useTranslation();

    useLayoutEffect(() => {
        // setTimeout allow delay render because userInfo.token is asynchronous and its value is null
        setTimeout( function() 
        { 
            SplashScreen.hide(); 
        }, 1000);
        
    }, []);

    return (
        <Stack.Navigator 
            initialRouteName="ListScreen" 
            screenOptions={{
                headerStyle: {
                    backgroundColor: GLOBAL_STYLE.primaryColor,
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