import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { StyleSheet, Text, View, Button, TextInput, Pressable,ScrollView } from 'react-native'
// 
import { NativeBaseProvider, VStack, Box, Divider, Heading, Stack, HStack, Center } from "native-base";
import debounce from 'lodash.debounce';
import AppButton from "../../components/AppButton";
import appStyles, {appPadding, appMargin, primaryColor} from '../../appStyles'


const BringableListItem = ({ bringable, event, navigation }) => {

  const [wasAdded,setWasAdded] = useState(false);

  const goToBringablePage = () => {
    navigation.navigate("Bringable",{
      BringableId: bringable.id,
    });
  }

  const goToManageBringablePage = () => {
    navigation.navigate("ManageBrinable",{
      BringableId: bringable.id,
      event: event,
    });
  }

  const getImportanceString = (level) => {
    let x = constants.bringable_levels[level];
    return x != null ? x : constants.bringable_levels[4]
  }

  const getAssignedToString = (items) => {
    if(items == null || items.length < 1){
      return "Unassigned";
    }
    if(items.length > 1){
      return "Multiple";
    }
    return items[0]?.assigned?.name
  }


  return (
    <Box p="3">
      <Box p="3" rounded="lg" overflow="hidden" borderColor="coolGray.500" borderWidth="2">
        <Stack p="4" space={3}>

        <HStack space={3} justifyContent="space-between">
          <Heading size="md" ml="-1">
          { bringable.name }
          </Heading>
          <Heading size="md" mr="-1">
          { getImportanceString(bringable.importance) }
          </Heading>
        </HStack>
        </Stack>
        <Divider mb="2" />
        
        {
        bringable.required_count > 0 ?
        <HStack ml="4" space={2} justifyContent="flex-start" alignItems="center">
          <Heading size="sm" style={{textAlign: 'left'}}>Required</Heading>
          <Text>:</Text>
          <Text style={{textAlign: 'center'}}>{ bringable.required_count }</Text>
        </HStack> : null 
        }

        {
        bringable.required_count == 1 ?
        <HStack ml="4" space={2} justifyContent="flex-start" alignItems="center">
          <Heading size="sm" style={{textAlign: 'left'}}>Acquired</Heading>
          <Text>:</Text>
          { bringable.acquired_all ? <Heading size="sm">YES</Heading> : <Heading size="sm">NO</Heading>}
        </HStack>        
        :
        <HStack ml="4" space={2} justifyContent="flex-start" alignItems="center">
          <Heading size="sm" style={{textAlign: 'left'}}>Acquired</Heading>
          <Text>:</Text>
          <Text style={{textAlign: 'center'}}>{ bringable.acquired_count }</Text>
          { bringable.acquired_all ? <Heading size="sm">ALL ITEMS ACQUIRED</Heading> : null}
        </HStack>
        }
        <Divider my="2" />
        <HStack ml="4" space={2} justifyContent="flex-start" alignItems="center">
          <Heading size="sm" style={{textAlign: 'left'}}>Assigned To:</Heading>
          <Text style={{textAlign: 'center'}}>{ getAssignedToString(bringable.items) }</Text>
        </HStack>
        <Divider my="2" />

        <HStack space={2} justifyContent="space-evenly">
          <AppButton buttonStyle={{margin:0}} content="Manage Bringable" onPress={goToManageBringablePage}>
            </AppButton>  
        </HStack>
      </Box>
    </Box>
    )
}


export default BringableListItem
