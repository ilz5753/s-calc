import * as React from 'react';
import {useWindowDimensions, Platform} from 'react-native';
import LD from '../constants/Layout';
import {View} from '../components/Themed';
interface Props {
    children?: JSX.Element[] | JSX.Element,
    Key?: number | string,
}
export function ROOT(props: Props): JSX.Element {
    let {width, height} = LD.window;
    const isWeb = Platform.OS === 'web';
    //console.log('isWeb : ' + isWeb);
    //console.log('web width : ' + width * 0.6);
    return (
        <View key={props.Key} style={[isWeb ? {width: width * 0.6, height} : LD.window]}>
            <View style={[LD.windWOsb, LD.mtsbh]}>{props.children}</View>
        </View>
    );
}