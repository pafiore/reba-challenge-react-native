import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
    ListScreen: undefined;
    DetailScreen: { userId: number, name: string };
};

export type ListScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'DetailScreen'
>;

export type DetailsScreenRouteProp = RouteProp<
    RootStackParamList,
    'DetailScreen'
>;