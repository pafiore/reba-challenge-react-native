import { SafeAreaView, View, Text } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native';
import { DetailsScreenRouteProp } from '../navigation/types';

const DetailScreen = () => {

    const route = useRoute<DetailsScreenRouteProp>();
    const { userId, name }  = route.params;

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Detalle</Text>
            <Text>{userId}</Text>
            <Text>{name}</Text>
        </SafeAreaView>
    )
}

export default DetailScreen