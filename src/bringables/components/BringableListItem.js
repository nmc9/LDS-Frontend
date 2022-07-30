import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { StyleSheet, Text, View, Button, TextInput, Pressable,ScrollView } from 'react-native'
// 
import { NativeBaseProvider, VStack, Box, Divider, Heading, Stack, HStack, Center } from "native-base";
import debounce from 'lodash.debounce';
import AppButton from "../../components/AppButton";
import appStyles, {appPadding, appMargin, primaryColor} from '../../appStyles'


const BringableListItem = ({ bringable, navigation }) => {

  const [wasAdded,setWasAdded] = useState(false);

  const goToBringablePage = () => {
    navigation.navigate("Bringable",{
      BringableId: bringable.id,
    });
  }

  const goToEditBringablePage = () => {
    navigation.navigate("EditBringable",{
      BringableId: bringable.id,
    });
  }


  return (
    <Box p="3">
      <Box p="3" rounded="lg" overflow="hidden" borderColor="coolGray.500" borderWidth="2">
        <Stack p="4" space={3}>
          <Heading size="md" ml="-1">
          { bringable.name }
          </Heading>
          <Text>
          {bringable.description}
          </Text>
        </Stack>
        <Divider my="2" />
        <HStack my="4" space={2} justifyContent="center" alignItems="center">
          <Heading size="sm" ml="-1">
          { bringable.location }
          </Heading>
        </HStack>
        <Divider my="2" />
        <HStack my="4" space={2} justifyContent="center" alignItems="center">
          <Text style={{textAlign: 'center'}}>{ bringable.time_frame_text?.start }</Text>
          <Text> - </Text>
          <Text style={{textAlign: 'center'}}>{ bringable.time_frame_text?.end }</Text>
        </HStack>
        <Divider my="2" />
        <HStack space={2} justifyContent="space-evenly">
            <AppButton buttonStyle={{margin:0}} content="View Bringable" onPress={goToBringablePage}>
            </AppButton>    
          <AppButton buttonStyle={{margin:0}} content="Manage Bringable" onPress={goToEditBringablePage}>
            </AppButton>  
        </HStack>
      </Box>
    </Box>
    )
}


export default BringableListItem
