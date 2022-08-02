import { TextInput, Text, View } from 'react-native'
import { useState } from 'react'
import {HStack,Box,Select,Heading} from 'native-base'

import appStyles from '../appStyles'

const AppInput = (props) => {


  const computedWrapperStyle = () => {
    return [appStyles.appInputWrapper, {...props.wrapperStyle}]
  }

  const computedTextInputStyle = () => {
    return [
    props.error && props.error.length ? appStyles.appInputWithError : appStyles.appInput,
    props.error && props.error.length ? {...props.textInputErrorStyle} : {...props.textInputStyle}
    ]
  }

  return <View style={computedWrapperStyle()}>

  <HStack m="4" space={2} justifyContent="start" alignItems="center">
    <Heading size="sm" style={{textAlign: 'start', width:150 }}>{ props.placeholder }:</Heading>
    <Box style={{flex:1}} >
      <TextInput
      style={computedTextInputStyle()}
      onChangeText={ props.onChangeText}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
      value={props.value}
      placeholder={props.placeholder}
      textContentType={props.textContentType}
      autoComplete={props.autoComplete}
      keyboardType={props.keyboardType}
      secureTextEntry={props.secureTextEntry}
      dataDetectorTypes={props.dataDetectorTypes}
      />
      {props.error && props.error.length ? (<Text style={appStyles.appInputError}>{props.error}</Text>) : null }
    </Box>
  </HStack>     


  </View>
}

export default AppInput
