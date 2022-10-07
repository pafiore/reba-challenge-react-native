import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Fontisto';
import { useTranslation } from 'react-i18next';

interface ErrorConnectionProps {
    onPress: () => void;
}

const ErrorConnection = ({ onPress = () => null }: ErrorConnectionProps) => {
    
    const { t } = useTranslation();
    
    return (
        <View>

            {/* ICON REFRESH */}
            <Animatable.View animation="zoomIn" style={styles.iconRefreshContainer}>
                <Icon
                    name='spinner-refresh'
                    style={styles.iconRefresh}
                    onPress={() => onPress()}
                    testID="iconRefresh"
                />
            </Animatable.View>

            {/* TIRLE */}
            <Animatable.View animation="zoomIn">
                <Text style={styles.titleRefreshScreen}>{t('msgGenericErrorShort')}</Text>
            </Animatable.View>

            {/* MESSAGGE */}
            <Animatable.View animation="zoomIn">
                <Text style={styles.messaggeRefreshScreen}>{t('msgCheckConnectionInconRefresh')}</Text>
            </Animatable.View>

            {/* LOGO */}
            <Animatable.View animation="zoomIn" style={styles.imageLogoContainer}>
                <Image source={require('../assets/images/reba-logo-01.png')} style={styles.imageLogo} />
            </Animatable.View>

        </View>
    )
}

const styles = StyleSheet.create({
    iconRefreshContainer: {
        alignItems:'center',
        marginTop:50,
        marginBottom:30,
    },
    iconRefresh: {
        fontSize:120,
        color: '#02e676'
    },

    titleRefreshScreen: {
        fontSize:18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'red',
        marginBottom: 10,
    },
    messaggeRefreshScreen: {
        paddingRight:20,
        paddingLeft:20,
        textAlign: 'center',
        fontSize:16,
        marginBottom:60,
    },
    imageLogoContainer: {
        justifyContent:'center',
        alignItems:'center',
    },
    imageLogo: {
        width: 210,
        height: 90,
    }
  });

  export default ErrorConnection;