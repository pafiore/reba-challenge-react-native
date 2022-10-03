import { SafeAreaView, View, Text } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native';
import { DetailsScreenRouteProp } from '../types';

const DetailScreen = () => {

    const route = useRoute<DetailsScreenRouteProp>();
    const { itemID }  = route.params;

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Detalle</Text>
            <Text>{itemID.toString()}</Text>
        </SafeAreaView>
    )
}

export default DetailScreen