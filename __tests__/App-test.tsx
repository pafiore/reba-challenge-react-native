
// import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer, { act } from 'react-test-renderer';
import { thousandsAndDecimalSeparatorFormat } from '../src/utils/NumberUtils';
import ItemFeature from '../src/components/ItemFeature';
import ErrorConnection from '../src/components/ErrorConnection';


describe("<ErrorConnection> ", () => {

    const pressIconRefresh = jest.fn();
    const errorConnection = renderer.create(<ErrorConnection onPress={pressIconRefresh} />)

    it('--> Render', () => {
        expect(errorConnection).toMatchSnapshot();
    });
    

    it('--> Press icon refresh', () => {
        const iconRefresh = errorConnection.root.findByProps({testID: 'iconRefresh'}).props
        act(() => iconRefresh.onPress())
        expect(pressIconRefresh).toHaveBeenCalled()
    });
})


describe("<ItemFeature> ", () => {

    const itemFeature = renderer.create(<ItemFeature icon={'star'} label={''} value={''} />)

    it('--> Render', () => {
        expect(itemFeature).toMatchSnapshot();
    });
    

    it('--> Icon style', () => {
        const iconDetail = itemFeature.root.findByProps({testID: 'iconDetail'}).props.style
        expect(iconDetail.color).toBe("#02d474");
    }); 
})


describe("Utils functions", () => {
    it('Formato de un valor positivo', () => {
        expect(thousandsAndDecimalSeparatorFormat(13600)).toBe("13.600,00");
    });

    it('Formato de cero', () => {
        expect(thousandsAndDecimalSeparatorFormat(0)).toBe("0,00");
    });

    it('Formato de un valor negativo', () => {
        expect(thousandsAndDecimalSeparatorFormat(-32500)).toBe("-32.500,00");
    });
})

