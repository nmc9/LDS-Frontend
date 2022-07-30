import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { StyleSheet, Text, View, Button, TextInput, Pressable,ScrollView,Switch } from 'react-native'
// 
import { NativeBaseProvider, VStack, Box, Divider, Heading, Stack, HStack, Center, Radio } from "native-base";
import debounce from 'lodash.debounce';
import AppButton from "../../components/AppButton";
import AppInput from "../../components/AppInput";
import appStyles, {appPadding, appMargin, primaryColor} from '../../appStyles'


const BringableHeader = ({acquired, assigned,onApply, navigation}) => {

    return (
      <View style={BringableHeaderStyles.container}>
      <Box p="3" rounded="sm" overflow="hidden" borderColor="coolGray.500" borderWidth="2">
      <Stack p="4" space={0}>
          
        <Divider my="2" />
    <HStack space={2}>

      <Radio.Group name="Show Acquired Radio Group" value={acquired} onChange={nextValue => { onApply(nextValue,assigned); }} accessibilityLabel="Show Acquired">
        <Stack direction="row" alignItems="center" space={4} maxW="300px">
          <Radio value="all" >
            All
          </Radio>
          <Radio value="acquired" >
            Only Acquired
          </Radio>
          <Radio value="notacquired" >
            Only Not Acquired
          </Radio>
        </Stack>
      </Radio.Group>
    </HStack>
        
        <Divider my="2" />

      <HStack alignItems="center" space={4}>
        <Text>Only Assigned To Me</Text>
        <Switch value={assigned} onValueChange={() => onApply(acquired,!assigned)} />
      </HStack>


      </Stack>
      </Box>
      </View>
      )
  }

  const BringableHeaderStyles = StyleSheet.create({

    container:{
      padding: appPadding

    },

  })

  export default BringableHeader
