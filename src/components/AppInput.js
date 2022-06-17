import { TextInput, Text, View } from 'react-native'
import { useState } from 'react'

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
  </View>
}

export default AppInput
