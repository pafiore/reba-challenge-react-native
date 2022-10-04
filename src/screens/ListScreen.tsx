import { SafeAreaView, View, Text, Button, FlatList, ListRenderItem, ActivityIndicator, StyleSheet } from 'react-native'
import React, { useCallback, useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Item, ListScreenNavigationProp } from '../types';
import ListCustomItem from '../components/ListCustomItem';
import ListEmpty from '../components/ListEmpty';
import SpinnerInApp from '../components/SpinnerInApp';
import ErrorConnection from '../components/ErrorConnection';
import useFetch from '../hooks/useFetch';


const ListScreen = () => {
    
    const navigation = useNavigation<ListScreenNavigationProp>();
    const { t } = useTranslation();
    const [itemList, isLoading, isError, retryApiCall] = useFetch<Item[]>('https://dummyjson.com/products');


    const renderListEmptyComponent = () => {
        // If there are no items
        if (itemList?.length === 0 && !isLoading && !isError) {
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


    if (isLoading) return ( <SpinnerInApp /> )
    if (isError) return ( <ErrorConnection onPress={ () => retryApiCall((prev) => !prev) } /> )

    
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