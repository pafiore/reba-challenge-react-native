
// import 'react-native';
import React from 'react';
import SpinnerInApp from '../src/components/SpinnerInApp';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';


it('renders a SpinnerInApp using Snapshots', () => {
    // expect(renderer.create(
    //   <SpinnerInApp />
    // )).toMatchSnapshot();



    const tree = renderer.create(<SpinnerInApp />).toJSON();
    expect(tree).toMatchSnapshot();

});



