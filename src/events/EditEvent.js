import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Button, TextInput, Pressable,ScrollView } from 'react-native'
import appStyles, {appPadding,appMargin,primaryColor} from '../appStyles'
import AppField from '../components/AppField'
import AppInput from '../components/AppInput'
import AppButton from '../components/AppButton'

import { FormControl, Heading } from 'native-base';


const EditEvent = ({ route, navigation }) => {

  const data = {
    id:-1,
    name:"",
    description:"",
    location:"",
    start_datetime:"",
    end_datetime:"",
  }

  const [form, setForm] = useState(data)
  const [event, setEvent] = useState(data)
  const [errors, setErrors] = useState({})

  const { eventId } = route.params;


  useEffect(() => {
    Auth.load(() => {
      axios.get('event/' + eventId).then(({data}) => {
        setEvent(data.data);
        setForm(data.data)

      }).catch((error) => {

        onAuthFail(error,navigation);
      });
    })


  },[])

  const onAuthFail = (error,navigation) => {
    if(error?.response?.status == 401){
      Auth.clear();

      navigation.replace('Login');
    }
  }

  const getEventTime = () => {
    if(!form?.start_datetime){
      return ""
    }
    return "From: " + form.start_datetime + " to " + form.end_datetime;
  }

  const onSubmit = () => {
    // axios.post('event/', form)
    axios.put('event/' . form.id, form)
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




  return (
    <ScrollView style={eventStyles.container}>

    <AppField label="Event Name" content={event?.name}></AppField>

    <Heading fontSize="md"  pl={appPadding} >Event Details</Heading>
    <AppInput
    error={errors.description}
    onChangeText={(e) => setForm({ ...form, description: e })}
    value={form.description}
    placeholder="Event Details"
    ></AppInput>

    <Heading fontSize="md"  pl={appPadding} >Where is it?</Heading>
    <AppInput
    error={errors.location}
    onChangeText={(e) => setForm({ ...form, location: e })}
    value={form.location}
    placeholder="Where is it?"
    ></AppInput>

    <Heading fontSize="md"  pl={appPadding} >Start Date Ex: (2022-12-12 12:01:01)</Heading>
    <AppInput
    error={errors.start_datetime}
    onChangeText={(e) => setForm({ ...form, start_datetime: e })}
    value={form.start_datetime}
    placeholder="Start Date Ex: (2022-12-12 12:01:01)"
    ></AppInput> 

    <Heading fontSize="md"  pl={appPadding} >End Date Ex: (2022-12-12 12:01:01)</Heading>
    <AppInput
    error={errors.end_datetime}
    onChangeText={(e) => setForm({ ...form, end_datetime: e })}
    value={form.end_datetime}
    placeholder="End Date Ex: (2022-12-12 12:01:01)"
    ></AppInput>

    <AppField label="Event Dates" content={getEventTime()}></AppField>

    <AppButton content="Save Changes" onPress={onSubmit}>
    </AppButton>

    </ScrollView>
    )
}

const eventStyles = StyleSheet.create({
  container: {
    // flex: 1,
    // maxWidth: 400,
    // padding: 300,
    backgroundColor: 'lightgrey',
    // alignItems: 'flex-start',
    // justifyContent: 'center'
  },

  welcome:{
    margin:appMargin,
    padding:appPadding,
    fontSize:"600",
    color:primaryColor,
    fontSize:32,
    borderBottomWidth:2,
    borderColor:primaryColor
  }

})

export default EditEvent
