import { Dimensions, Platform } from 'react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const OS = Platform.OS;
const isHaveSB = OS === 'android' || OS === 'ios';
const sbh = OS === 'ios' ? 55 : 48;
const hwsbh = height - sbh;
export default {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
  isHaveSB,
  windWOsb: {
    width,
    height: hwsbh,
  },
  mtsbh: {
    marginTop: sbh,
  }
};
