import React, { memo, useState } from 'react';
import {Text, Image, StyleSheet, View, TouchableWithoutFeedback, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { thousandsAndDecimalSeparatorFormat } from '../utils/NumberUtils';
import { Item } from '../types';


interface ListItemProps {
    item: Item;
    onPress: (id: number) => void;
}


const ListItem = ({item, onPress = () => null}: ListItemProps) => {

    // console.log('ITEM ID: ' + item.id);

    const [favorite, setFavorite] = useState<boolean>(false)

    const onPressFavorite = (itemID: number): void => {
        setFavorite(!favorite)
        console.log(itemID)
    }
  
    return (
        <TouchableWithoutFeedback onPress={() => onPress(item.id)}>
            <View style={[styles.container, favorite ? {backgroundColor: '#d9fceb'} : null]}>
                <Image source={{uri: item.thumbnail}} style={styles.image} />
                <View style={styles.innerContainer}>
                    
                    <View style={styles.titleIconContainer}>
                        <Text style={styles.textTitle} numberOfLines={1}>{item.title}</Text>
                        {
                            favorite
                            ?
                            <Icon name='heart' style={styles.iconFavoriteSelected} onPress={() => onPressFavorite(item.id)} />
                            :
                            <Icon name='heart-o' style={styles.iconFavorite} onPress={() => onPressFavorite(item.id)} />
                        }
                    </View>

                    <Text style={styles.textDescription} numberOfLines={1}>{item.description}</Text>
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
      flex:1,
    },
    image:{
      width: 80,
      height: 80,
      marginRight: 10,
      borderTopLeftRadius: 10,
      borderBottomLeftRadius: 10,
    },
    titleIconContainer: {
        flexDirection:'row', 
        justifyContent: 'space-between', 
        paddingRight:10
    },
    textTitle:{
      fontSize:17,
      fontWeight: 'bold',
      color: '#4262fe',
    },
    textDescription:{
      paddingRight: 20,
      fontSize:13,
      color: 'gray',
  
    },
    textPrice:{
      fontSize:16,
      fontWeight: 'bold',
      color: '#02d474'
    },
    iconFavorite: {
        fontSize:25
    },
    iconFavoriteSelected: {
        fontSize:25,
        color: '#02d474'
    }
  });
