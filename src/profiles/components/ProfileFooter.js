import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { StyleSheet, Text, View, Button, TextInput, Pressable,ScrollView } from 'react-native'
// 
import { NativeBaseProvider, VStack, Box, Divider, Heading, Stack, HStack } from "native-base";
import debounce from 'lodash.debounce';
import AppButton from "../../components/AppButton";
import AppInput from "../../components/AppInput";


const ProfileFooter = ({}) => {

  const [imaginaryEmail,setImaginaryEmail] = useState([]);

  const [wasSent,setWasSent] = useState(false);


  const sendImaginaryFriendRequest = (error,navigation) => {
      axios.post('imaginary/friend/',{"email":imaginaryEmail}).then(({data}) => {
        setWasSent(true);
        // setUsers(data.data);

      }).catch((error) => {

        // onAuthFail(error,navigation);
      });
  }


  return (
    <Box p="3">
    <Box p="3" rounded="sm" overflow="hidden" borderColor="coolGray.500" borderWidth="2">
    <Stack p="4" space={3}>
    <Stack space={2}>
    <Heading size="md" ml="-1">
    { !wasSent ? "Send an email to a nonexistant user?" : "Request Was Sent!" }
    </Heading>
    </Stack>
    <HStack alignItems="center" space={4} justifyContent="space-between">
{/*    <AppInput placeholder="User Email" value={props.value} onChangeText={setImaginaryEmail}>
    </AppInput>*/}



    <AppInput
    // error={errors.description}
    onChangeText={(e) => setImaginaryEmail(e)}
    value={imaginaryEmail}
    placeholder="Email"
    textContentType="emailAddress"
    autoComplete="email"
    keyboardType="email-address"
    ></AppInput>

    <AppButton content="Send Request" onPress={sendImaginaryFriendRequest}>
    </AppButton>    
    </HStack>
    </Stack>
    </Box>
    </Box>
    )
}


export default ProfileFooter
