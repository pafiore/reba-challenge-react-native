import { SafeAreaView, ScrollView, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import * as Animatable from 'react-native-animatable';
import { DetailsScreenRouteProp, Item } from '../types';
import SpinnerInApp from '../components/SpinnerInApp';
import ErrorConnection from '../components/ErrorConnection';
import Slider from '../components/Slider';
import ItemFeature from '../components/ItemFeature';
import { thousandsAndDecimalSeparatorFormat } from '../utils/NumberUtils';
import useFetch from '../hooks/useFetch';
import { END_POINT, GLOBAL_STYLE } from '../constants';


const DetailScreen = () => {

    const route = useRoute<DetailsScreenRouteProp>();
    const { itemID }  = route.params;
    const { t } = useTranslation();


    // COMENTARIO: dado que toda la información necesaria para visualizar el detalle de un ITEM ya la obtuvimos con el EndPoint
    // que invocamos en la pantalla "ListScreen", podríamos haber pasado como parámetro a la pantalla "DetailScreen" el objeto
    // ITEM con todos sus campos, y asi mejorar la performance de la app evitando una nueva petición al Server.
    // En este caso - y solo para fines prácticos a los efectos de cumplir con los lineamientos del challenge - hacemos un 
    // fetch del EndPoint que obtiene la información de un ITEM en particular
    const [itemDetail, isLoading, isError, retryApiCall] = useFetch<Item>(`${END_POINT}/${itemID}`);


    if (isLoading) return (<SpinnerInApp/>)
    if (isError) return <ErrorConnection onPress={ () => retryApiCall((prev) => !prev) } />


    return (

        <SafeAreaView >
            <ScrollView>

                {/* SLIDER */}
                <Animatable.View animation="fadeInDown">
                    <Slider imageList={itemDetail ? itemDetail?.images: []} />
                </Animatable.View>


                <Animatable.View animation="zoomIn" style={styles.containerTitleDescription} >
                    {/* TITLE */}
                    <Text style={styles.title}>{itemDetail?.title}</Text>

                    {/* DESCRIPTION */}
                    <Text style={styles.description}>{itemDetail?.description}</Text>
                </Animatable.View>

                <Animatable.View animation="fadeInUp" style={styles.containerData} >
                     
                    {/* PRICE */}
                    <ItemFeature 
                        key={"money"}
                        icon={"money"}
                        label={t('lblPrice')}
                        value={itemDetail 
                            ? 
                            `$ ${thousandsAndDecimalSeparatorFormat(itemDetail.price)}`
                            :
                            `$ ${thousandsAndDecimalSeparatorFormat(0)}`
                        }
                    />
                
                    {/* STOCK */}
                    <ItemFeature 
                        key={"shopping-basket"}
                        icon={"shopping-basket"}
                        label={t('lblStock')}
                        value={itemDetail?.stock.toString()}
                    />

                    {/* BRAND */}
                    <ItemFeature 
                        key={"info-circle"}
                        icon={"info-circle"}
                        label={t('lblBrand')}
                        value={itemDetail?.brand}
                    />
                    
                    {/* CATEGORY */}
                    <ItemFeature 
                        key={"bookmark"}
                        icon={"bookmark"}
                        label={t('lblCategory')}
                        value={itemDetail?.category}
                    />
                </Animatable.View>

                <Animatable.View animation="zoomIn" style={styles.imgContainerBrand}>
                    <Image source={require('../assets/images/reba-logo-01.png')} style={styles.imgBrand} />
                </Animatable.View>

            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    containerTitleDescription: {
        paddingHorizontal: 5,
    },
    containerData: {
        paddingHorizontal: 10,
    },
    title: {
        fontSize:22,
        fontWeight:'bold',
        color: GLOBAL_STYLE.primaryColor,
        paddingTop:10,
        paddingLeft:5,
        paddingRight:5
    },
    description: {
        paddingLeft:5,
        fontSize:15,
        paddingBottom:10,
    },
    imgContainerBrand: {
        justifyContent:'center',
        alignItems:'center',
        marginTop:20
    },
    imgBrand: {
        width: 170,
        height: 80,
    }
});


export default DetailScreen