import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';


interface ListEmptyProps {
    message: string;
}


const ListEmpty = ({message}: ListEmptyProps) => {
  
    return (
        <Animatable.View animation="zoomIn" style={styles.container}>
            <Icon name='warning' style={styles.iconMessage} />
            <Text style={styles.message}>{message}</Text>
        </Animatable.View>
    );
}

export default ListEmpty;


const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent: 'center',
        marginTop: 20
    },
    message: {
        fontSize: 16
    },
    iconMessage: {
        fontSize: 20,
        marginRight: 10,
        marginTop: 1
    }
  });
