import { Pressable, Platform } from 'react-native';
import {TouchableOpacity} from '../components/Themed';

let Component = Platform.OS === 'ios' ? TouchableOpacity : Pressable;

export let CustomButton = Component;