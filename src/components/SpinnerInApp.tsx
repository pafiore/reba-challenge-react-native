import React from 'react';
import { SafeAreaView, ActivityIndicator } from 'react-native';

const SpinnerInApp = () => {
    
    return (
        <SafeAreaView style={{marginTop:20}}>
            <ActivityIndicator style={{marginTop:20}} size="large" color="#02e676" />
        </SafeAreaView>
    )
};


export default SpinnerInApp;