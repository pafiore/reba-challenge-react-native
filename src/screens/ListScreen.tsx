import { SafeAreaView, FlatList, ListRenderItem } from 'react-native'
import React, { useCallback, useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Item, ListScreenNavigationProp } from '../types';
import ListCustomItem from '../components/ListCustomItem';
import ListEmpty from '../components/ListEmpty';
import SpinnerInApp from '../components/SpinnerInApp';
import ErrorConnection from '../components/ErrorConnection';
import useFetch from '../hooks/useFetch';
import { END_POINT, FAVORITES } from '../constants';


const ListScreen = () => {
    
    const navigation = useNavigation<ListScreenNavigationProp>();
    const { t } = useTranslation();
    const [data, isLoading, isError, retryApiCall] = useFetch<Item[]>(END_POINT);
    const [itemListSorted, setItemListSorted] = useState<Item[]>()
    const [favoriteIDList, setFavoriteIDList] = useState<number[]>()

    
    useEffect( () => {

        const getFavorites = async () => {

            let favList: number[] = []

            try {
                // Obtengo los ID-s Favoritos desde local storage
                let favListString = await AsyncStorage.getItem(FAVORITES);
                if (favListString) {
                    favList = JSON.parse(favListString)
                } 
                setFavoriteIDList(favList)
            }
            catch(err) {
                console.log(err)
            }
           
            // Items Favoritos
            const favoriteItemList: Item[]  = data?.filter((item) => favList.includes(item.id))!

            // Items NO Favoritos
            const notFavoriteItemList: Item[] = data?.filter((item) => !favList.includes(item.id))!
            
            // Items ordenados con el sguiente criterio: Favoritos + NO Favoritos
            setItemListSorted(favoriteItemList?.concat(notFavoriteItemList))

            
        }
        
        if(data) {
            getFavorites()
        }
    }, [data])
    

    const renderListEmptyComponent = () => {
        if (itemListSorted?.length === 0 && !isLoading && !isError) {
            return <ListEmpty message={t('msgItemListEmpty')} /> ;
        }
        else {
            return null;
        }
    }


    const handlerOnPressItem = useCallback((itemID: number) => {
        navigation.navigate('DetailScreen', {itemID});
    }, [])
    

    const renderItem: ListRenderItem<Item> = ( { item } ) => {
        if(favoriteIDList) {
            return ( 
                <ListCustomItem 
                    item={item} 
                    isFavorite={favoriteIDList.includes(item.id) ? true : false}
                    onPress={handlerOnPressItem} 
                /> 
            )
        }
        else {
            return null
        }
    } 

    const keyExtractor = useCallback( ( item: Item ) => item.id.toString(), [] );


    if (isError) return ( <ErrorConnection onPress={ () => retryApiCall((prev) => !prev) } /> )
    if (isLoading || (!isLoading && !favoriteIDList)) return ( <SpinnerInApp /> )

    
    return (
        <SafeAreaView>
            <FlatList
                data={itemListSorted}
                renderItem={ renderItem }
                keyExtractor={keyExtractor}
                ListEmptyComponent={ renderListEmptyComponent }
            />
        </SafeAreaView>
    )
}

export default ListScreen