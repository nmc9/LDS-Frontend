import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { StyleSheet, Text, View, Button, TextInput, Pressable,ScrollView } from 'react-native'
// 
import { NativeBaseProvider, VStack, Box, Divider, Heading, Stack, HStack } from "native-base";
import debounce from 'lodash.debounce';
import AppButton from "../../components/AppButton";


const ProfileListItem = ({ username, email, id }) => {

  const sendFriendRequest = (error,navigation) => {
      axios.post('friend/', {user_id: id} ).then(({data}) => {
        // setUsers(data.data);

      }).catch((error) => {

        // onAuthFail(error,navigation);
      });
  }


  return (
    <Box p="3">
    <Box p="3" rounded="lg" overflow="hidden" borderColor="coolGray.500" borderWidth="2">
    <Stack p="4" space={3}>
    <Stack space={2}>
    <Heading size="md" ml="-1">
    { username }
    </Heading>
    <Text fontSize="xs">
    {email}
    </Text>
    </Stack>
{/*    <AppButton content="View Profile">
    
    </AppButton>*/}
    <HStack alignItems="center" space={4} justifyContent="space-between">
    <AppButton content="Add Friend" onPress={sendFriendRequest}>
    </AppButton>    
    </HStack>
    </Stack>
    </Box>
    </Box>
    )
}


export default ProfileListItem
