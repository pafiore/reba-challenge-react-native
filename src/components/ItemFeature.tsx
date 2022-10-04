import { ListItem } from '@rneui/themed';
import React from 'react';
import {Text, Image, StyleSheet, View, TouchableWithoutFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


interface ItemFeatureProps {
    icon: string;
    label: string;
    value: string | undefined;
}


const ItemFeature = ({icon, label, value}: ItemFeatureProps) => {
  
    return (
        <ListItem 
            // containerStyle={styles.test} 
            bottomDivider
        >

            <Icon name={icon} style={styles.icon} />
            <ListItem.Content>
                <ListItem.Title style={{fontWeight:'normal'}}>{label}</ListItem.Title>
            </ListItem.Content>
            <Text style={{fontSize: 16, }}>{value}</Text>

        </ListItem>
    );
}


const styles = StyleSheet.create({
    icon: {
        fontSize:20,
        color: '#02d474'
    }

});


export default ItemFeature;
