import React, { memo } from 'react';
import {Text, Image, StyleSheet, View, TouchableWithoutFeedback} from 'react-native';
import { thousandsAndDecimalSeparatorFormat } from '../utils/NumberUtils';
import { Item } from '../types';


interface ListItemProps {
    item: Item;
    onPress: (id: number) => void;
}


const ListItem = ({item, onPress = () => null}: ListItemProps) => {

    // console.log('ITEM ID: ' + item.id);
  
  return (
    <TouchableWithoutFeedback onPress={() => onPress(item.id)}>
      <View style={styles.container}>
        <Image source={{uri: item.thumbnail}} style={styles.image} />
        <View style={styles.innerContainer}>
            <Text style={styles.textTitle} numberOfLines={1}>{item.title}</Text>
            <Text style={styles.textDescription} numberOfLines={2}>{item.description}</Text>
            <Text style={styles.textPrice}>${thousandsAndDecimalSeparatorFormat(item.price)}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default memo(ListItem);


const styles = StyleSheet.create({
    container:{
      flexDirection:'row',
      alignItems: 'center',
      borderBottomWidth:1,
      borderBottomColor: '#e0e0e0',
      backgroundColor: 'white',
      margin: 5,
      borderRadius: 10,
      elevation: 4, 
    },
    innerContainer:{
      flexDirection:'column',
    },
    image:{
      width: 80,
      height: 80,
      marginRight: 10,
      borderTopLeftRadius: 10,
      borderBottomLeftRadius: 10,
    },
    textTitle:{
      fontSize:17,
      fontWeight: 'bold',
      color: '#4262fe',
      paddingRight:95,
    },
    textDescription:{
      paddingRight:95,
      fontSize:13,
      color: 'gray',
  
    },
    textPrice:{
      fontSize:16,
      fontWeight: 'bold',
      color: '#02d474'
    },
  });
