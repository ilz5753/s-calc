import * as React from 'react';
import {Platform, Keyboard, StyleSheet} from 'react-native';

import { Text, View, TextInput, ScrollView } from '../components/Themed';
//import { RootTabScreenProps } from '../types';
import { ROOT } from '../ownc/Layout';
import Dim from '../constants/Layout';
import { CustomButton as BUTTON } from '../ownc/Button';
export default function HomeScreen() {
  Keyboard.dismiss();
  let isWeb = Platform.OS === 'web';
  let [Data, setData] = React.useState({
    result: '',
    inputText: '',
  });
  type Historry = {
    text: string,
    date: string,
  };
  let [History, setHistory] = React.useState<Array<Historry>>([]);
  let [ShowHistory, setShowHistory] = React.useState(false);
  let [OtherDot, setOtherDot] = React.useState(true);
  /**
   * 
   * @returns toggle showing history page.
   */
  let toggleShowHistory = () => setShowHistory(prev => !prev);
  /**
   * this function will reset all data to 0.
   */
  function reset(): void {
    setData((prevData) => ({
      ...prevData,
      result: '',
      inputText: ''
    }));
  }
  /**
   * @param text string
   * @returns first operation in text
   */
  function OS(text: string): string {
    let operations = [
      '+',
      '*',
      '-',
      '/',
    ];
    let i = 1;
    while (i !== operations.length) {
      for (let j = 0; j < text.length; j++) {
        if (text[j] === operations[i - 1]) {
          return text[j];
        }
      }
      i++;
    }

    if (text.includes('/')) {
      return '/';
    }
    return '';
  }
  /**
   * 
   * @param input string
   * @returns is input string have operation or not.
   */
  function IO(input: string): boolean {
    let operations = [
      '+',
      '*',
      '-',
      '/',
    ];
    let i = 0;
    for (; i < operations.length - 1; i++) {
      if (input === operations[i]) {
        return true;
      }
    }
    if (input === '/') {
      return true;
    }
    return false;
  }
  /**
   * 
   * @param text string
   * @param operator string
   * @returns replace new operrator and return new text
   */
  function ReplacedOperator(text: string, operator: string): string {
    let newText = '';
    let length = text.length;
    for (let i = 0; i < length - 1; i++) {
      newText += text[i];
    }
    newText += operator;
    return newText;
  }
  /**
   * 
   * @param text string
   * @returns remove last index in calculator and determine last index is an operator or not, if it be then remove it.
   */
  function DEL(text: string): string {
    let length = text.length;
    let helpArray = [];
    for (let i = 0; i < length; i++) {
      helpArray.push(text[i]);
    }
    if (helpArray.includes('.') && helpArray[helpArray.length - 1] === '.') {
      setOtherDot(true);
    }
    let lastOperator = helpArray.lastIndexOf(OS(text));
    let lastE = helpArray.lastIndexOf('e');
    helpArray.pop();
    if (lastOperator === helpArray.length - 1) {
      helpArray.pop();
    }
    if (lastE === helpArray.length - 1) {
      helpArray.pop();
    }
    return helpArray.join('');
  }

  /**
   * here we have a small bug bot not important!
   * 
   * this bug is happend when we want to input some zeros before each number inputing, eg. 00200+00120-015+00004
   * 
   * TODO: remove this small BUG and complete project! THANK YOU.
   * 
   * @param text string
   * @returns remove all zeros before our inputed number and convert all to Float number.
   */
  function RemoveZerosFromMiddle(text: string): string {
    //let operators: Array<any> = [];
    //let nums = ['0','1','2','3','4','5','6','7','8','9'];
    let ops = ['+', '-', '*', '/'];
    let txt = '';
    let start = 0, end = 0;
    for (let z = 0; z < text.length; z++) {
      for (let m = 0; m < ops.length; m++) {
        if (text[z] === ops[m]) {
          end = z;
          //console.log('operator ' + (z + 1) + ' : ' + ops[m]);
          txt += parseFloat(text.slice(start, end));
          start = end + 1;
          txt += ops[m];
        }
      }
    }
    txt += parseFloat(text.slice(start, text.length));
    return txt;
    /*
    //console.log('result : ' + operators.map((O, i) => i + ' : ' + JSON.stringify(O)).join('\t,\t'));
    let isNE = true;
    let txt = '';
    let i = 0;
    let start = 0;
    let end = 0;
    while(isNE){
      end = operators[i].index;
      txt += parseFloat(text.slice(start,end));
      start = end + 1;
      txt += operators[i].op;
      i++;
      if(i === operators.length){
        txt += parseFloat(text.slice(start, text.length));
        isNE = true;
      }
    }
    return txt;
    /*
    let start = 0;
    let end = 0;
    let txt = '';
    let isNB = true;
    for (let o = 0; o <= operators.length; o++) {
      isNB = true;
      if( o === operators.length){
        end = text.length;
      }else{
        end = operators[o].index + 1;
      }
      while (isNB) {
        if (text[start] === '0') {
          start++;
        } else {
          txt += text.slice(start, end);
          start = end + 1;
          isNB = false;
        }
      }
    }
    //console.log('txt : ' + txt);
    return txt;
    */
  }
  /**
   * 
   * @param text string
   * @returns removes multiple zeros in front of a number, eg. 0000200 => 200,
   * but here has a small bug that can't this action on editing and result bug.
   */
  function RemoveMultipleZeroFromStart(text: string): string {
    let newText = '';
    let i = 0;
    let isNotBreak = true;
    while (isNotBreak) {
      if (text[i] === '0') {
        i++;
      } else {
        newText = text.slice(i, text.length);
       // console.log(newText);
        isNotBreak = false;
      }
    }
    return newText;
  }
  /**
   * this function get an input character or action string such (del) or (+/-).
   * 
   * @param input string
   * 
   */
  function calc(input: string): void {
    let { result, inputText } = Data;
    let inputTextLength = inputText.length;
    let isOperator = IO(input);
    //console.log('isOperator : ' + isOperator);
    if (isOperator) {
      if (!IO(inputText[0]) && inputTextLength !== 0) {
        //console.log(input);
        if (IO(inputText[inputTextLength - 1])) {
          setData((prevData) => ({
            ...prevData,
            inputText: ReplacedOperator(inputText, input),
          }));
        } else {
          setData((prevData) => ({
            ...prevData,
            inputText: (inputText + input),
          }));
        }
      }
      setOtherDot(true);
    } else {
      switch (input) {
        case '+/-':
          if (inputTextLength !== 0) {
            setData((prevData) => ({
              ...prevData,
              result: '' + eval(result + '*(-1)'),
              inputText: '' + eval(result + '*(-1)'),
            }));
          }
          break;
        case '.':
          if (OtherDot) {
            setData((prevData) => ({
              ...prevData,
              inputText: inputText + input,
            }));
            setOtherDot(false);
          }
          break;
        case '=':
          //alert(RemoveZerosFromMiddle('000090080+00040500-00000006080'));
          if (!IO(inputText[0]) && !IO(inputText[inputTextLength - 1]) && inputTextLength !== 0) {
            setHistory((history) => [...history, {
              text: inputText,
              date: new Date().toLocaleString(),
            }]);
            setData((prevData) => ({
              ...prevData,
              inputText: result,
            }));
          }
          break;
        case 'del':
          if (inputTextLength !== 0) {
            setData((prevData) => ({
              ...prevData,
              inputText: DEL(inputText),
              result: '' + eval(DEL(inputText)),
            }));
          }
          break;
        case '%':
          if (inputTextLength !== 0) {
            setData((prevData) => ({
              ...prevData,
              result: '' + eval(result + '*(0.01)'),
              inputText: '' + eval(result + '*(0.01)')
            }));
          }
          break;
        default:
          setData((prevData) => ({
            ...prevData,
            inputText: inputText + input,
            result: '' + eval(inputText + input),
          }));
          break;
      }
    }
  }
  let Buttons: Array<Array<any>> = [
    [
      {
        text: 'history',
        onPress: toggleShowHistory,
      },
      {
        text: 'del',
        onPress: () => {
          calc('del');
        },
      },
    ],
    [
      {
        text: '%',
        onPress: () => {
          calc("%");
        },
      },
      {
        text: 'AC',
        onPress: () => {
          reset();
        },
      },
      {
        text: '/',
        onPress: () => { calc('/') },
      },
    ], [
      {
        text: '7',
        onPress: () => { calc('7') }
      },
      {
        text: '8',
        onPress: () => { calc('8') },
      },
      {
        text: '9',
        onPress: () => { calc('9') },
      },
      {
        text: '*',
        onPress: () => { calc('*') },
      },
    ], [
      {
        text: '4',
        onPress: () => { calc('4') },
      },
      {
        text: '5',
        onPress: () => { calc('5') },
      },
      {
        text: '6',
        onPress: () => { calc('6') },
      },
      {
        text: '-',
        onPress: () => { calc('-') },
      },
    ], [
      {
        text: '1',
        onPress: () => { calc('1') },
      },
      {
        text: '2',
        onPress: () => { calc('2') },
      },
      {
        text: '3',
        onPress: () => { calc('3') },
      },
      {
        text: '+',
        onPress: () => { calc('+') },
      },
    ], [
      {
        text: '+/-',
        onPress: () => { calc("+/-") },
      },
      {
        text: '0',
        onPress: () => { calc('0') },
      },
      {
        text: '.',
        onPress: () => { calc('.') },
      },
      {
        text: '=',
        onPress: () => { calc("=") },
      },
    ],
  ];
  /**
   * editor on changing function.
   * @param text string
   */
  function onChangeText(text: string): void {
    setData((prevData) => ({
      ...prevData,
      inputText: text,
    }))
  }
  return (
    <ROOT Key='Calculator ROOT TAG'>
      <View style={[styles.f1, styles.aic, styles.pv5p]}>
        <View style={[styles.result, styles.bw, styles.mv5, styles.p10]}>
          <TextInput style={[styles.f1, styles.tal, styles.fontSize, styles.bottombw]} multiline numberOfLines={2} onChangeText={onChangeText} value={Data.inputText} />
          <View style={[styles.resultText, styles.jcc]}><Text style={[styles.fontSize]}>{Data.result}</Text></View>
        </View>
        <View style={[styles.Buttons, styles.topbw, styles.mv5,]}>
          {Buttons.map((BTN, i) => <View key={i} style={[styles.f1, styles.r, styles.bottombw, styles.leftbw]}>
            {BTN.map((btn, ii) => {
              let { text, onPress } = btn;
              let isAC = text === 'AC';
              return (
                <View key={text + ii} style={[isAC ? styles.f2 : styles.f1, styles.rightbw]}>
                  <BUTTON android_ripple={ripple} onPress={onPress} style={[styles.f1, styles.c, isWeb && cursor]}>
                      <Text style={[styles.fontSize]}>{text}</Text>
                    </BUTTON>
                </View>
              );
            })}
          </View>)}
        </View>
      </View>
      <View style={[styles.historyPage, ShowHistory && styles.bw, { width: ShowHistory ? '90%' : 0, height: ShowHistory ? '47.75%' : 0 }]}>
        <ScrollView style={[{ width: '100%', height: Dim.window.height * 0.48 - 60 }]} showsVerticalScrollIndicator={false}>
          {History.map((Hist, i) => <View style={[styles.historyButton, styles.bottombw]} key={Hist.date + i}>
            <BUTTON android_ripple={ripple} onPress={() => setData((prevData) => ({
              ...prevData,
              inputText: Hist.text,
              result: '' + eval(Hist.text),
            }))} style={[styles.f1, styles.p10, styles.jcc, isWeb && cursor]}>
              <Text style={[styles.fontSize]}>{Hist.text} = {eval(Hist.text)}</Text>
            </BUTTON>
          </View>)}
        </ScrollView>
        <View style={[styles.historyButton]}>
          <BUTTON android_ripple={ripple} onPress={() => setHistory([])} style={[styles.f1, styles.c, isWeb && cursor]}>
            <Text style={[styles.fontSize, {display: ShowHistory ? 'flex' : 'none',}]}>Reset History</Text>
          </BUTTON>
        </View>
      </View>
    </ROOT>
  );
}
/**
 * styles object
 */
const styles = StyleSheet.create({
  aic: {
    alignItems: 'center',
  },
  jcc: {
    justifyContent: 'center',
  },
  c: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  f1: {
    flex: 1,
  },
  f2: {
    flex: 2,
  },
  result: {
    width: '90%',
    height: '30%'
  },
  resultText: {
    width: '100%',
    height: 60
  },
  bw: {
    borderWidth: 1
  },
  mv5: {
    marginVertical: 5
  },
  Buttons: {
    width: '90%',
    height: '60%'
  },
  pv5p: {
    paddingVertical: '5%'
  },
  p10: {
    padding: 10
  },
  tac: {
    textAlign: 'center'
  },
  r: {
    display: 'flex',
    flexDirection: 'row'
  },
  bottombw: {
    borderBottomWidth: 1,
  },
  topbw: {
    borderTopWidth: 1,
  },
  rightbw: {
    borderRightWidth: 1,
  },
  leftbw: {
    borderLeftWidth: 1
  },
  fontSize: {
    fontSize: 24
  },
  bct: {
    borderColor: 'transparent'
  },
  tal: {
    textAlign: 'left'
  },
  historyPage: {
    //width: '90%',
    //height: '47.75%',
    marginHorizontal: '5%',
    position: 'absolute',
    bottom: '10%',
    left: 0
  },
  historyButton: {
    width: '100%',
    height: Dim.window.height * 0.1 - 10
  }
});
/**
 * cursor for web
 */
let cursor = {
  cursor: 'pointer'
}
/**
 * ripple for android
 */
let ripple = {
  color: 'white',
  borderless: true,
  radius: Dim.window.width / 2,
};