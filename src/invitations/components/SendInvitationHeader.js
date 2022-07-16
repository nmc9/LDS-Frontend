import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { StyleSheet, Text, View, Button, TextInput, Pressable,ScrollView } from 'react-native'
// 
import { Stack } from "native-base";
import debounce from 'lodash.debounce';
import AppButton from "../../components/AppButton";
import AppInput from "../../components/AppInput";
import appStyles, {appPadding, appMargin, primaryColor} from '../../appStyles'

const EVERYONE = "Everyone";
const AVAILABLE = "Available";
const SendInvitationHeader = ({eventId, onSearch, onSend, navigation}) => {

  const [imaginaryEmail,setImaginaryEmail] = useState([]);

  const [wasCreated,setWasCreated] = useState(false);

  const goToCreateEvent = () => {
    navigation.navigate("CreateEvent");
  }

  const listEveryone = () => {
    onSearch(false)
  }

  const listAvailable = () => {
    onSearch(true)
  }

  const sendInvitations = () => {
    onSend()
  }


  return (
    <Stack direction={{base:"column", sm:"row"}} rounded="lg" overflow="hidden" borderColor={primaryColor} borderWidth="2" p={appPadding} justifyContent="space-between">


    <AppButton content="List Everyone" onPress={() => onSearch(EVERYONE)}></AppButton>  

    <AppButton content="List Available" onPress={() => onSearch(AVAILABLE)}></AppButton>  

    <View></View>
    <View></View>

    <AppButton content="Send Invitations" onPress={() => onSend()}></AppButton>  


    </Stack>
    )
}

const sendInvitationHeaderStyles = StyleSheet.create({

  container:{
    padding: appPadding

  },

})

export { EVERYONE,AVAILABLE };

export default SendInvitationHeader
