import React, { useMemo, useRef, useState } from 'react';
import { View, ScrollView, StyleSheet, Dimensions, Image, Text, NativeScrollEvent } from 'react-native';
import { GLOBAL_STYLE } from '../constants';


const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

interface SliderProps {
    imageList: string[];
}


const Slider = ( {imageList = [] }: SliderProps ) => {

    const [imgActiveIndex, setImgActiveIndex] = useState(0);
    const scrollViewRef = useRef(null);


    // Apply format to image list addimg 'uri' field
    const imageListFormatted = useMemo(() => {
        return imageList.map( image => { return { url: image } })
    }, [imageList]);
    

    const onChangeImage = (nativeEvent: NativeScrollEvent) => {
        if(nativeEvent) {
            const slide = Math.round(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
            if(slide != imgActiveIndex) {
                setImgActiveIndex(slide);
            }
        }
    }


    return (

        <View style={styles.wrap}>
        
            <ScrollView
                onScroll={({nativeEvent}) => onChangeImage(nativeEvent)}
                ref={scrollViewRef}
                showsHorizontalScrollIndicator={false}
                pagingEnabled={true}
                horizontal={true}
                style={styles.wrap}
            >
                { imageList?.map( (urlImage, index) => 
                    <Image 
                        key={index}    
                        resizeMode='cover'
                        style={styles.wrap}
                        source={{uri:urlImage}}
                    />
                )}
            </ScrollView>

            <View style={styles.wrapDot}>
                { imageList.map( (urlImage, index) => 
                    <Text
                        key={`${index}-${urlImage}`}
                        style={imgActiveIndex == index ? styles.dotActive : styles.dot}
                    >
                    ⬤
                    </Text>
                )}
            </View>

        </View>
            
    )
}

export default Slider;

const styles = StyleSheet.create({
    wrap: {
        width: WIDTH,
        height: HEIGHT * 0.30  
    },
    wrapDot: {
        position:'absolute',
        bottom: 0,
        flexDirection: 'row',
        alignSelf:'center' 
    },
    dotActive: {
        margin:3,
        color: GLOBAL_STYLE.primaryColor,
        textShadowColor: GLOBAL_STYLE.secondaryColor,
        textShadowOffset: {width: 0, height: 0},
        textShadowRadius: 4
    },
    dot: {
        margin:3,
        color: 'white',
        textShadowColor: GLOBAL_STYLE.secondaryColor,
        textShadowOffset: {width: 0, height: 0},
        textShadowRadius: 4
    }
});