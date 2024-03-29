import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { StyleSheet, Text, View, Button, TextInput, Pressable,ScrollView } from 'react-native'
// 
import { NativeBaseProvider, VStack, Box, Divider, Heading, Stack, HStack, Center } from "native-base";
import debounce from 'lodash.debounce';
import AppButton from "../../components/AppButton";
import AppInput from "../../components/AppInput";

import appStyles, {appPadding, appMargin, primaryColor} from '../../appStyles'
import FriendDropdown from "./FriendDropdown"


const BringableItemListItem = ({ event,bringableItem, onRefresh, group, navigation }) => {
  const data = {
    'required': 0,
    'acquired': 0,
    'assigned_id':"-1",
  }
  const [form, setForm] = useState(data)

  const [errors, setErrors] = useState({})

  const [assignedUser,setAssignedUser] = useState(-1);
  const [required, setRequired] = useState(0)
  const [acquired, setAcquired] = useState(0)


  useEffect(() => {

    setRequired(bringableItem.required);
    setAcquired(bringableItem.acquired);

    setAssignedUser(bringableItem.assigned ? bringableItem.assigned.id + "" : "-1")

  },[bringableItem]);

  const goToBringablePage = () => {
    navigation.navigate("Bringable",{
      BringableId: bringable.id,
    });
  }

  const goToManageBringablePage = () => {
    navigation.navigate("ManageBrinable",{
      BringableId: bringable.id,
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

  const updateItems = () => {
    let _data = {
      required: required,
      acquired: acquired,
    }
    axios.put('bringableitem/' + bringableItem.id,_data)
    .then(({data}) => {
      alert("Bringable Item Updated");
      onRefresh();

    }).catch((error) => {
      onAuthFail(error,navigation);
    });

  }

  const deleteItem = () => {
    axios.delete('bringableitem/' + bringableItem.id)
    .then(({data}) => {
      alert("Record Deleted");
      onRefresh();
    }).catch((error) => {
      onAuthFail(error,navigation);
    });
  }

  const reassignItem = (keep) => {
    let ass_user = assignedUser;
    if(ass_user === "-1"){
      ass_user = null;
    }
    if(ass_user === -1){
      ass_user = null;
    }
    axios.post('bringableitem/reassign/' + bringableItem.id,{
      keep:keep,
      assigned_id:ass_user
      })
    .then(({data}) => {
      alert("Bringable Item Updated");
      onRefresh();

    }).catch((error) => {
      onAuthFail(error,navigation);
    });
  }

  const onAuthFail = (error,navigation) => {
    if(error?.response?.status == 401){
      Auth.clear();
      navigation.replace('Login');
    }
  }

  const onErrors = (error, setErrorCallback) => {
    const _errors = error?.response?.data?.errors
    if (_errors) {
      setErrorCallback(_errors)
    }
  }

  return (
    <Box p="3">
      <Box p="3" rounded="lg" overflow="hidden" borderColor="coolGray.500" borderWidth="2">
        <Text>{ assignedUser + ":" + required + ":" + acquired}</Text>

        <FriendDropdown presetGroup={group} onErrors={(error,setErrors) => {onErrors(error,setErrors)}} event_id={event.id} assignedUser={assignedUser} setAssignedUser={setAssignedUser}></FriendDropdown>

    <HStack alignItems="center" justifyContent="center">
        <AppButton onPress={ () => {reassignItem(true)}} content="Reassign (Keep)"></AppButton>
        <AppButton onPress={() => {reassignItem(false)}} content="Reassign (Clear)"></AppButton>
    </HStack>


    <VStack space={0}>
      {required >= 0 ? 
      <AppInput
      error={errors.required}
      onChangeText={(e) => setRequired(e)}
      value={required}
      placeholder="Number of Required"
      ></AppInput>
      :
      null }
    </VStack>


            <AppInput
    error={errors.acquired}
    onChangeText={(e) => setAcquired(e)}
    value={acquired}
    placeholder="Number already Acquired"
    ></AppInput>

        <HStack alignItems="center" justifyContent="center">
        <AppButton onPress={updateItems} content="Save Record"></AppButton>
        <AppButton onPress={deleteItem} content="Delete Item Record"></AppButton>

        </HStack>

      </Box>
    </Box>
    )
}


export default BringableItemListItem
