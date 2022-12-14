import React, { memo, useState } from 'react';
import {Text, Image, StyleSheet, View, TouchableWithoutFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { thousandsAndDecimalSeparatorFormat } from '../utils/NumberUtils';
import { Item } from '../types';
import { FAVORITES, GLOBAL_STYLE } from '../constants';


interface ListItemProps {
    item: Item;
    isFavorite: boolean;
    onPress: (id: number) => void;
}


const ListCustomItem = ({item, isFavorite, onPress = () => null}: ListItemProps) => {

    const [favorite, setFavorite] = useState<boolean>(isFavorite)

    const onPressFavorite = async (itemID: number) => {

        let favList: number[] = []

        try {
            // Obtengo los favoritos almacenados localmente
            let favListString = await AsyncStorage.getItem(FAVORITES);
            if (favListString) {
                favList = JSON.parse(favListString)
            } 

            // Si el estado anterior es Favorito, lo quito del array
            if(favorite) {
                const index = favList.indexOf(itemID);
                if (index > -1) { 
                    favList.splice(index, 1)
                }
            }
            else {
                if(!favList.includes(itemID)) {
                    favList.push(itemID)
                }
            }

            // Agrego al storage el favorito
            await AsyncStorage.setItem(FAVORITES, JSON.stringify(favList));
            setFavorite(!favorite)
        }
        catch(err) {
            console.log(err)
        }
    }
  
    return (
        <TouchableWithoutFeedback onPress={() => onPress(item.id)}>
            <View style={[styles.container, favorite ? {backgroundColor: '#d9fceb'} : null]}>
                <Image source={{uri: item.thumbnail}} style={styles.image} />
                <View style={styles.innerContainer}>
                    
                        {/* TITLE */}
                        <Text style={styles.textTitle} numberOfLines={1}>{item.title}</Text>
                        
                        {/* ICON */}
                        <View style={styles.iconContainer}>
                                <TouchableWithoutFeedback onPress={() => onPressFavorite(item.id)}>
                                {
                                    favorite
                                    ?
                                    <Icon name='heart' style={styles.iconFavoriteSelected} />
                                    :
                                    <Icon name='heart-o' style={styles.iconFavorite} />
                                }
                                </TouchableWithoutFeedback>
                        </View>

                    <Text style={styles.textDescription} numberOfLines={1}>{item.description}</Text>
                    <Text style={styles.textPrice}>${thousandsAndDecimalSeparatorFormat(item.price)}</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

export default memo(ListCustomItem);


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
    iconContainer: {
        flexDirection:'row', 
        justifyContent: 'space-between', 
        position:'absolute',
        right:0,
        paddingRight:10,
        marginTop:-5,
        marginRight:-5
    },
    textTitle:{
      fontSize:17,
      fontWeight: 'bold',
      color: GLOBAL_STYLE.primaryColor,
      paddingRight:50
    },
    textDescription:{
      paddingRight: 20,
      fontSize:13,
      color: 'gray',
  
    },
    textPrice:{
      fontSize:16,
      fontWeight: 'bold',
      color: GLOBAL_STYLE.secondaryColor
    },
    iconFavorite: {
        fontSize:30,
        color: GLOBAL_STYLE.secondaryColor,
    },
    iconFavoriteSelected: {
        fontSize:30,
        color: GLOBAL_STYLE.secondaryColor
    }
  });
