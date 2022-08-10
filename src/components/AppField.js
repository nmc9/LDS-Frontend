import { TextInput, Text, View, ActivityIndicator } from 'react-native'
import { useState } from 'react'

import appStyles, {spinnerColor} from '../appStyles'
import {HStack,Box,Select,Heading} from 'native-base'

const AppField = (props) => {

  const computedWrapperStyle = () => {
    return [appStyles.appFieldWrapper, {...props.wrapperStyle}]
  }

  return <View style={computedWrapperStyle()}>


  <HStack m="4" space={2} justifyContent="flex-start" alignItems="center">
    <Heading size="sm" style={{textAlign: 'left', width:150 }}>{props.label}:</Heading>
    <HStack >
  {props.content ? <Text>{props.content}</Text> : <ActivityIndicator style={appStyles.appFieldLoading} color={spinnerColor}/> }

    </HStack>
  </HStack>     


  </View>
}

export default AppField
