import React from 'react';
import {Text, StyleSheet} from 'react-native';
import { ListItem } from '@rneui/themed';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GLOBAL_STYLE } from '../constants';


interface ItemFeatureProps {
    icon: string;
    label: string;
    value: string | undefined;
}


const ItemFeature = ({icon, label, value}: ItemFeatureProps) => {
  
    return (
        <ListItem bottomDivider>
            <Icon name={icon} style={styles.icon} testID="iconDetail" />
            <ListItem.Content>
                <ListItem.Title>{label}</ListItem.Title>
            </ListItem.Content>
            <Text style={styles.value}>{value}</Text>
        </ListItem>
    );
}


const styles = StyleSheet.create({
    icon: {
        fontSize:20,
        color: GLOBAL_STYLE.secondaryColor
    },
    value: {
        fontSize: 16,
    }

});


export default ItemFeature;
