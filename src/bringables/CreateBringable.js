import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View,ScrollView, Button, TextInput, Pressable, Platform } from 'react-native'
import appStyles from '../appStyles'
import AppButton from '../components/AppButton'
import AppInput from '../components/AppInput'
import AppField from '../components/AppField'
import { Select, Heading,HStack,VStack,Box,Switch } from 'native-base'
import FriendDropdown from "./components/FriendDropdown"

import CrossPlatformDatePicker from "../components/CrossPlatformDatePicker"

const CreateBringable = ({ route, navigation }) => {
  const data = {
    'name':'',
    'notes':"",
    'importance':4,
    'assigned_id':null,
    'required': 0,
    'acquired': 0,
  }
  const [requriedOn,setRequiredOn] = useState(0); 

  const [assignedUser,setAssignedUser] = useState("-1");
  const [importance, setImportance] = useState("4");
  const [form, setForm] = useState(data)
  const [errors, setErrors] = useState({})


  const { event } = route.params;

  useEffect(() => {
    setErrors({});
  },[form])


  const onClear = () => {
    setForm(data)

    setErrors({})
  }


  const onErrors = (error, setErrorCallback) => {
    const _errors = error?.response?.data?.errors
    if (_errors) {
      setErrorCallback(_errors)
    }
  }

  const goToProfile = () => {
    navigation.navigate('Profile')
  }

  const onSubmit = () => {
    let _form = {
      name:form.name,
      notes: form.notes === "" ? null : form.notes,
      importance: importance,
      assigned_id: assignedUser > 0 ? assignedUser : null,
      acquired:form.acquired,
      required: !requriedOn ? form.required : -1,

    };
    axios.post('/event/' + event.id + '/bringable/', _form)
    .then(({ data }) => {

      navigation.navigate('SearchBringables',{
        event: event
      });

    }).catch((error) => {
              alert(error);

      onErrors(error,setErrors);
    })
  }

  const getLabelText = (start,end) =>{
    let formatted = formatTimeRange(start,end);
    if(formatted){
      return formatted;
    }
    return "Not Set";
  }

  return (
    <ScrollView style={createBringableStyles.container}>

    <AppInput
    error={errors.name}
    onChangeText={(e) => setForm({ ...form, name: e })}
    value={form.name}
    placeholder="Bringable Name"
    ></AppInput>

    <AppInput
    error={errors.notes}
    onChangeText={(e) => setForm({ ...form, notes: e })}
    value={form.notes}
    placeholder="Bringable Notes"
    ></AppInput>


    <HStack m="4" space={2} justifyContent="flex-start" alignItems="center">
      <Heading size="sm" style={{textAlign: 'left', width:150 }}>Importance:</Heading>
      <Box style={{flex:1}} >
      <Select m="2" selectedValue={importance} minWidth="200" accessibilityLabel="Assign User" onValueChange={itemValue => { setImportance(itemValue)}}>
        <Select.Item label="Required" value="1"/>
        <Select.Item label="Important" value="2"/>
        <Select.Item label="Useful" value="3"/>
        <Select.Item label="Optional" value="4"/>

      </Select>
      </Box>
    </HStack>     



    <VStack space={0}>
      {!requriedOn ? 
      <AppInput
      error={errors.required}
      onChangeText={(e) => setForm({ ...form, required: e })}
      value={form.required}
      placeholder="Number of Required"
      ></AppInput>
      :
      null }
      <HStack mx="4" mt="3" alignItems="center" justifyContent="center">
        <Heading size="sm" style={{textAlign: 'left', width:150 }}>Any Amount</Heading>
          <Switch value={requriedOn} onValueChange={() => setRequiredOn(!requriedOn)} />
      </HStack>
    </VStack>


    <AppInput
    error={errors.acquired}
    onChangeText={(e) => setForm({ ...form, acquired: e })}
    value={form.acquired}
    placeholder="Number already Acquired"
    ></AppInput>



    <FriendDropdown event_id={event.id} onErrors={(error,setErrors) => {onErrors(error,setErrors)}} assignedUser={assignedUser} setAssignedUser={setAssignedUser}></FriendDropdown>
   


    <View style={createBringableStyles.buttonHolder}>

    <AppButton content="Create Bringable" onPress={onSubmit}>
    </AppButton>


    </View>
    </ScrollView>
    )
}

const createBringableStyles = StyleSheet.create({

  availableItem:{
    flexDirection: "row",
    alignItems: "center",
      // backgroundColor:'green',
      justifyContent: 'flex-start'

    },

    availableItemPickers:{
      flexDirection:'row',padding:2 ,justifyContent:'flex-start'
    },
    container: {
      // flex: 1,
      backgroundColor: 'lightgrey',
      // alignItems: 'stretch',
      // justifyContent: 'center'
    },

    label: {
      paddingTop: 10,
      paddingLeft: 20,
      alignSelf: 'flex-start',
      fontSize: 16
    },

    buttonHolder: {
      padding: 15,
      flexDirection: 'row',
      flexWrap: 'wrap', // backgroundColor: "green",

      paddingTop: 0,

      paddingBottom: 0
    }

  })

export default CreateBringable
