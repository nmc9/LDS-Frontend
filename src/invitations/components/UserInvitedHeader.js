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
const UserInvitedHeader = ({onAccepted, onPending, onInvite, navigation}) => {


  return (
    <Stack direction={{base:"column", sm:"row"}} rounded="lg" overflow="hidden" borderColor={primaryColor} borderWidth="2" p={appPadding} justifyContent="space-between" >


    <AppButton content="Going" onPress={onAccepted}></AppButton>  

    <AppButton content="Pending" onPress={onPending}></AppButton>  

    <View></View>
    <View></View>

    <AppButton content="Invite" onPress={onInvite}></AppButton>  


    </Stack>
    )
}

const UserInvitedHeaderStyles = StyleSheet.create({

  container:{
    padding: appPadding

  },

})

export default UserInvitedHeader
