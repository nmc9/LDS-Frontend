import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { StyleSheet, Text, View, Button, TextInput, Pressable,ScrollView } from 'react-native'
// 
import { NativeBaseProvider, VStack, Box, Divider, Heading, Stack, HStack, Center } from "native-base";
import debounce from 'lodash.debounce';
import AppButton from "../../components/AppButton";
import AppInput from "../../components/AppInput";
import appStyles, {appPadding, appMargin, primaryColor} from '../../appStyles'


const EventFooter = ({navigation}) => {

  const [imaginaryEmail,setImaginaryEmail] = useState([]);

  const [wasCreated,setWasCreated] = useState(false);

  const goToCreateEvent = () => {
      navigation.navigate("CreateEvent");
  }


    return (
      <View style={eventFooterStyles.container}>
      <Box p="3" rounded="sm" overflow="hidden" borderColor="coolGray.500" borderWidth="2">
      <Stack p="4" space={0}>
        <HStack space={2}>
          <Heading size="md">
          { "You Can Also Create A New Event! "}
          </Heading>     
        </HStack>
        
        <Divider my="2" />

        <HStack space={2} justifyContent="space-evenly">
            <AppButton buttonStyle={{margin:0}} content="Create Event" onPress={goToCreateEvent}>
            </AppButton>    
          <View></View>
        </HStack>

      </Stack>
      </Box>
      </View>
      )
  }

  const eventFooterStyles = StyleSheet.create({

    container:{
      padding: appPadding

    },

  })

  export default EventFooter
