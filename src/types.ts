import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';


export type RootStackParamList = {
    ListScreen: undefined;
    DetailScreen: { itemID: Number };
};


export type ListScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'DetailScreen'
>;


export type DetailsScreenRouteProp = RouteProp<
    RootStackParamList,
    'DetailScreen'
>;


export interface Item {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
}


