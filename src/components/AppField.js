import { TextInput, Text, View, ActivityIndicator } from 'react-native'
import { useState } from 'react'

import appStyles, {spinnerColor} from '../appStyles'

const AppField = (props) => {

  const computedWrapperStyle = () => {
    return [appStyles.appFieldWrapper, {...props.wrapperStyle}]
  }

  return <View style={computedWrapperStyle()}>
  <View style={appStyles.appFieldLabelView} >
    <Text style={appStyles.appFieldLabel}>{props.label}</Text>
  </View>


  {props.content ? <Text style={appStyles.appFieldContent}>{props.content}</Text> : <ActivityIndicator style={appStyles.appFieldLoading} color={spinnerColor}/> }
  </View>
}

export default AppField
