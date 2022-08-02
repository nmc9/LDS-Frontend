import { TextInput, Text, View, ActivityIndicator } from 'react-native'
import { useState } from 'react'

import appStyles, {spinnerColor} from '../appStyles'
import {HStack,Box,Select,Heading} from 'native-base'

const AppField = (props) => {

  const computedWrapperStyle = () => {
    return [appStyles.appFieldWrapper, {...props.wrapperStyle}]
  }

  return <View style={computedWrapperStyle()}>


  <HStack m="4" space={2} justifyContent="start" alignItems="center">
    <Heading size="sm" style={{textAlign: 'start', width:150 }}>{props.label}:</Heading>
    <Box style={{flex:1}} >
  {props.content ? <Text>{props.content}</Text> : <ActivityIndicator style={appStyles.appFieldLoading} color={spinnerColor}/> }

    </Box>
  </HStack>     


  </View>
}

export default AppField
