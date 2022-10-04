import { SafeAreaView, View, Text, Button, FlatList, ListRenderItem, ActivityIndicator, StyleSheet } from 'react-native'
import React, { useCallback, useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Item, ListScreenNavigationProp } from '../types';
import ListCustomItem from '../components/ListCustomItem';
import ListEmpty from '../components/ListEmpty';
import SpinnerInApp from '../components/SpinnerInApp';
import ErrorConnection from '../components/ErrorConnection';


const ListScreen = () => {

    console.log('Ingreso a ListScreen')
    
    const navigation = useNavigation<ListScreenNavigationProp>();

    const { t } = useTranslation();
    const [itemList, setItemList] = useState<Item[]>([]);
    const [isError, setIsError] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);


    useEffect(() => {
        getListItem()
    },[])


    const getListItem = () => {
        fetch('https://dummyjson.com/products')
        .then(res => res.json())
        .then(json => {
            // console.log('SUCCESS')
            // console.log(json)
            setItemList(json.products);
            setIsError(false);
            setIsLoading(false);
        })
        .catch(err => {
            // console.log('ERROR')
            // console.log(err)
            setIsError(true);
            setIsLoading(false);
        })
    }


    const renderListEmptyComponent = () => {
        // If there are no items
        if (itemList.length === 0 && !isLoading && !isError) {
            return <ListEmpty message={t('msgItemListEmpty')} /> ;
        }
        else {
            return null;
        }
    }


    const handlerOnPressItem = useCallback((itemID: number) => {
        console.log('handlerOnPressItem()  --  item.id: ' + itemID);
        navigation.navigate('DetailScreen', {itemID});
    }, [])


    const renderItem: ListRenderItem<Item> = ( { item } ) => ( <ListCustomItem item={item} onPress={handlerOnPressItem} /> )

    const keyExtractor = useCallback( ( item: Item ) => item.id.toString(), [] );


    // If the API call still is "loding" show spinner
    if (isLoading) return ( <SpinnerInApp /> )

    // If the API call response with error
    if (isError) return ( <ErrorConnection onPress={ () => getListItem()} /> )

    
    return (
        <SafeAreaView>
            <FlatList
                data={itemList}
                renderItem={ renderItem }
                keyExtractor={keyExtractor}
                ListEmptyComponent={ renderListEmptyComponent }
            />
        </SafeAreaView>
    )
}

export default ListScreen