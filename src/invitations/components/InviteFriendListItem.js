import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { StyleSheet, Text, View, Button, TextInput, Pressable,ScrollView } from 'react-native'
// 
import { NativeBaseProvider, VStack, Box, Divider, Heading, Stack, HStack, Center } from "native-base";
import debounce from 'lodash.debounce';
import AppButton from "../../components/AppButton";
import appStyles, {appPadding, appMargin, primaryColor} from '../../appStyles'


const InviteFriendListItem = ({ eventId, user, onRemove, navigation }) => {

  const [wasAdded,setWasAdded] = useState(false);

  const removeUser = () => {
    onRemove(user.id);
  }

  return (
    <Box p={appPadding} borderWidth="2"  rounded="lg" overflow="hidden" borderColor={primaryColor} borderWidth="2">

        <HStack my="4" space={20} justifyContent="center" alignItems="center">
      <Heading>{ user.name }</Heading>

      <AppButton content="Remove" onPress={removeUser}></AppButton>  
        </HStack>


    </Box>
    )
}


export default InviteFriendListItem
