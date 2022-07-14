import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { StyleSheet, Text, View, Button, TextInput, Pressable,ScrollView } from 'react-native'
// 
import { NativeBaseProvider, VStack, Box, Divider, Heading, Stack, HStack, Center } from "native-base";
import debounce from 'lodash.debounce';
import AppButton from "../../components/AppButton";
import appStyles, {appPadding, appMargin, primaryColor} from '../../appStyles'


const UserinvitedListItem = ({ user, navigation }) => {

  return (
    <Box p="3">
      <Box p="3" rounded="lg" overflow="hidden" borderColor="coolGray.500" borderWidth="2">
        <Stack p="4" space={3}>
          <Heading size="md" ml="-1">
          { user.name }
          </Heading>
          <Text>
          {user.email}
          </Text>
        </Stack>
        <Divider my="2" />
        {/*<HStack my="4" space={2} justifyContent="center" alignItems="center">
          <Heading size="sm" ml="-1">
          { user.location }
          </Heading>
        </HStack>
        <Divider my="2" />
        <HStack my="4" space={2} justifyContent="center" alignItems="center">
          <Text style={{textAlign: 'center'}}>{ user.time_frame_text?.start }</Text>
          <Text> - </Text>
          <Text style={{textAlign: 'center'}}>{ user.time_frame_text?.end }</Text>
        </HStack>
        <Divider my="2" />
        <HStack space={2} justifyContent="space-evenly">
            <AppButton buttonStyle={{margin:0}} content="View user" onPress={goTouserPage}>
            </AppButton>    
          <AppButton buttonStyle={{margin:0}} content="Edit user" onPress={goToEdituserPage}>
            </AppButton>  
        </HStack>*/}
      </Box>
    </Box>
    )
}


export default UserinvitedListItem
