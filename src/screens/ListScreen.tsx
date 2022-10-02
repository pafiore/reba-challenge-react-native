import { SafeAreaView, View, Text, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { ListScreenNavigationProp } from '../navigation/types';


const ListScreen = () => {

    const navigation = useNavigation<ListScreenNavigationProp>();

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        
            <Text>Lista</Text>

            <Button
                title="Ver Detalle"
                onPress={() => navigation.navigate('DetailScreen', {
                    userId: 86,
                    name: 'Pablo',
                })}
            />



        </SafeAreaView>
    )
}

export default ListScreen