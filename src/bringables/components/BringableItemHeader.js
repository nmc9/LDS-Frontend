import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { StyleSheet, Text, View, Button, TextInput, Pressable,ScrollView,Switch } from 'react-native'
// 
import { NativeBaseProvider, VStack, Box, Divider, Heading, Stack, HStack, Center, Radio } from "native-base";
import debounce from 'lodash.debounce';
import AppButton from "../../components/AppButton";
import AppInput from "../../components/AppInput";
import appStyles, {appPadding, appMargin, primaryColor} from '../../appStyles'
import FriendDropdown from "./FriendDropdown"


const BringableItemHeader = ({event, bringable, navigation}) => {
  const data = {
    'required': 0,
    'acquired': 0,
  }
  const [requriedOn,setRequiredOn] = useState(0); 

  const [assignedUser,setAssignedUser] = useState("-1");
  const [importance, setImportance] = useState("4");
  const [form, setForm] = useState(data);

  const [errors, setErrors] = useState({})

  const addBringableItem = () => {
    let _data = {
      required: bringable.required_count >= 0 ? form.required : -1,
      acquired: form.acquired,
      'assigned_id': assignedUser == "-1" ? null : assignedUser,
    }
    axios.post('bringable/' + bringable.id + '/items',_data)
    .then(({data}) => {
      alert("Added Bringable Item");

    }).catch((error) => {
      const _errors = error?.response?.data?.errors
      if (_errors) {
        setErrors(_errors)
      }
      onAuthFail(error,navigation);
    });

  }

  const onAuthFail = (error,navigation) => {
    if(error?.response?.status == 401){
      Auth.clear();
      navigation.replace('Login');
    }
  }



  return (
    <View style={BringableItemHeaderStyles.container}>
    <Box p="3" rounded="sm" overflow="hidden" borderColor="coolGray.500" borderWidth="2">
    <Heading pl="2" size="md">Add Required To Bringable</Heading>
    <Stack p="4" space={0}>
    <FriendDropdown event_id={event.id} assignedUser={assignedUser} setAssignedUser={setAssignedUser}></FriendDropdown>


    <VStack space={0}>
    { bringable.required_count >= 0 ? 
      <AppInput
      error={errors.required}
      onChangeText={(e) => setForm({ ...form, required: e })}
      value={form.required}
      placeholder="Number of Required"
      ></AppInput>
      :
      null }

      </VStack>


      <AppInput
      error={errors.acquired}
      onChangeText={(e) => setForm({ ...form, acquired: e })}
      value={form.acquired}
      placeholder="Number already Acquired"
      ></AppInput>

      <AppButton onPress={addBringableItem} content="Add items"></AppButton>
      </Stack>
      </Box>
      </View>
      )
}

const BringableItemHeaderStyles = StyleSheet.create({

  container:{
    padding: appPadding

  },

})

export default BringableItemHeader
