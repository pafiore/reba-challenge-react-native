import React, { memo, useState } from 'react';
import {Text, Image, StyleSheet, View, TouchableWithoutFeedback, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { thousandsAndDecimalSeparatorFormat } from '../utils/NumberUtils';
import { Item } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FAVORITES } from '../constants/localStorage';


interface ListItemProps {
    item: Item;
    isFavorite: boolean;
    onPress: (id: number) => void;
}


const ListItem = ({item, isFavorite, onPress = () => null}: ListItemProps) => {

    const [favorite, setFavorite] = useState<boolean>(isFavorite)

    const onPressFavorite = async (itemID: number) => {
        console.log(itemID)

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

            console.log('onPressFavorite', JSON.stringify(favList))
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
                    
                    <View style={styles.titleIconContainer}>
                        <Text style={styles.textTitle} numberOfLines={1}>{item.title} - ID:{item.id}</Text>
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
        fontSize:28,
        color: '#02d474'
    },
    iconFavoriteSelected: {
        fontSize:28,
        color: '#02d474'
    }
  });
