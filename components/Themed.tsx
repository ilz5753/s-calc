/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

 import * as React from 'react';
 import { Text as DefaultText, View as DefaultView, TextInput as DefaultTextInput, ScrollView as DefaultScrollView, TouchableOpacity as DefaultTouchableOpacity } from 'react-native';
 
 import Colors from '../constants/Colors';
 import useColorScheme from '../hooks/useColorScheme';
 export function useThemeColor(
   props: { light?: string; dark?: string },
   colorName: keyof typeof Colors.light & keyof typeof Colors.dark
 ) {
   const theme = useColorScheme();
   const colorFromProps = props[theme];
 
   if (colorFromProps) {
     return colorFromProps;
   } else {
     return Colors[theme][colorName];
   }
 }
 
 type ThemeProps = {
   lightColor?: string;
   darkColor?: string;
 };
 
 export type TextProps = ThemeProps & DefaultText['props'];
 export type ViewProps = ThemeProps & DefaultView['props'];
 export type TextInputProps = ThemeProps & DefaultTextInput['props'];
 export type ScrollViewProps = ThemeProps & DefaultScrollView['props'];
 export type TouchableOpacityProps = ThemeProps & DefaultTouchableOpacity['props'];
 export function Text(props: TextProps) {
   const { style, lightColor, darkColor, ...otherProps } = props;
   const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
 
   return <DefaultText style={[{ color, fontFamily: 'space-mono' }, style]} {...otherProps} />;
 }
 
 export function View(props: ViewProps) {
   const { style, lightColor, darkColor, ...otherProps } = props;
   const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
   const borderColor = useThemeColor({ light: darkColor, dark: lightColor }, 'text');
 
   return <DefaultView style={[{ backgroundColor, borderColor }, style]} {...otherProps} />;
 }
 export function TextInput(props: TextInputProps) {
   const { style, lightColor, darkColor, ...otherProps } = props;
   const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
   const borderColor = useThemeColor({ light: darkColor, dark: lightColor }, 'text');
 
   return <DefaultTextInput style={[{ color, fontFamily: 'space-mono', borderColor }, style]} {...otherProps} />;
 }
 
 export function ScrollView(props: ScrollViewProps) {
   const { style, lightColor, darkColor, ...otherProps } = props;
   const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
 
   return <DefaultScrollView style={[{ backgroundColor }, style]} {...otherProps} />;
 }
 export function TouchableOpacity(props: TouchableOpacityProps) {
   const { style, lightColor, darkColor, ...otherProps } = props;
   const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
 
   return <DefaultTouchableOpacity style={[{ backgroundColor }, style]} {...otherProps} />;
 }