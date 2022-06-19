import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View,ScrollView, Button, TextInput, Pressable, Platform } from 'react-native'
import appStyles from '../appStyles'
import AppButton from '../components/AppButton'
import AppInput from '../components/AppInput'
import AppField from '../components/AppField'

import CrossPlatformDatePicker from "../components/CrossPlatformDatePicker"

const CreateEvent = ({ route, navigation }) => {
  const data = {
    name:"",
    description:"",
    location:"",
    start_datetime:"",
    end_datetime:"",
  }
  const [form, setForm] = useState(data)
  const [errors, setErrors] = useState({})

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

    axios.post('event', form)
    .then(({ data }) => {

      console.log(data);
      console.log(data.data.id)

      navigation.navigate('Event',{
        eventId: data.data.id,
      });

    }).catch((error) => {
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
    <ScrollView style={createEventStyles.container}>

    <AppInput
    error={errors.name}
    onChangeText={(e) => setForm({ ...form, name: e })}
    value={form.name}
    placeholder="Event Name"
    ></AppInput>

    <AppInput
    error={errors.description}
    onChangeText={(e) => setForm({ ...form, description: e })}
    value={form.description}
    placeholder="Event Details"
    ></AppInput>


    <AppInput
    error={errors.location}
    onChangeText={(e) => setForm({ ...form, location: e })}
    value={form.location}
    placeholder="Where is it?"
    ></AppInput>

    <AppInput
    error={errors.start_datetime}
    onChangeText={(e) => setForm({ ...form, start_datetime: e })}
    value={form.start_datetime}
    placeholder="Start Date Ex: (2022-12-12 12:01:01)"
    ></AppInput>

    <AppInput
    error={errors.end_datetime}
    onChangeText={(e) => setForm({ ...form, end_datetime: e })}
    value={form.end_datetime}
    placeholder="Start Date Ex: (2022-12-12 12:01:01)"
    ></AppInput>



    <View style={createEventStyles.buttonHolder}>
    <AppButton content="Clear" onPress={onClear}>
    </AppButton>
    <AppButton content="Create Event" onPress={onSubmit}>
    </AppButton>

    <AppButton content="Return To Profile" onPress={goToProfile}>
    </AppButton>

    </View>
    </ScrollView>
    )
}

const createEventStyles = StyleSheet.create({

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

export default CreateEvent
