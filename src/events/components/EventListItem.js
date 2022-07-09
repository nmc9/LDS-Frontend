import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { StyleSheet, Text, View, Button, TextInput, Pressable,ScrollView } from 'react-native'
// 
import { NativeBaseProvider, VStack, Box, Divider, Heading, Stack, HStack, Center } from "native-base";
import debounce from 'lodash.debounce';
import AppButton from "../../components/AppButton";
import appStyles, {appPadding, appMargin, primaryColor} from '../../appStyles'


const EventListItem = ({ event, navigation }) => {

  const [wasAdded,setWasAdded] = useState(false);

  const goToEventPage = () => {
    navigation.navigate("Event",{
      eventId: event.id,
    });
  }

  const goToEditEventPage = () => {
    navigation.navigate("EditEvent",{
      eventId: event.id,
    });
  }


  return (
    <Box p="3">
      <Box p="3" rounded="lg" overflow="hidden" borderColor="coolGray.500" borderWidth="2">
        <Stack p="4" space={3}>
          <Heading size="md" ml="-1">
          { event.name }
          </Heading>
          <Text>
          {event.description}
          </Text>
        </Stack>
        <Divider my="2" />
        <HStack my="4" space={2} justifyContent="center" alignItems="center">
          <Heading size="sm" ml="-1">
          { event.location }
          </Heading>
        </HStack>
        <Divider my="2" />
        <HStack my="4" space={2} justifyContent="center" alignItems="center">
          <Text style={{textAlign: 'center'}}>{ event.time_frame_text?.start }</Text>
          <Text> - </Text>
          <Text style={{textAlign: 'center'}}>{ event.time_frame_text?.end }</Text>
        </HStack>
        <Divider my="2" />
        <HStack space={2} justifyContent="space-evenly">
            <AppButton buttonStyle={{margin:0}} content="View Event" onPress={goToEventPage}>
            </AppButton>    
          <AppButton buttonStyle={{margin:0}} content="Edit Event" onPress={goToEditEventPage}>
            </AppButton>  
        </HStack>
      </Box>
    </Box>
    )
}


export default EventListItem
