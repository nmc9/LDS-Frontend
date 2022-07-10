import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Button, TextInput, Pressable,ScrollView } from 'react-native'
import appStyles, {appPadding,appMargin,primaryColor} from '../appStyles'
import AppField from '../components/AppField'
import AppInput from '../components/AppInput'
import AppButton from '../components/AppButton'


const Event = ({ route, navigation }) => {


  const { eventId } = route.params;

  const [event, setEvent] = useState(null)

  const [errors, setErrors] = useState({})

  useEffect(() => {
    Auth.load(() => {
      axios.get('event/' + eventId).then(({data}) => {
        setEvent(data.data);

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

  const getEventTime = () =>{
    if(!event?.start_datetime){
      return ""
    }
    return "From: " + event.start_datetime + " to " + event.end_datetime;
  }

  const goToEditEventPage = () => {
    if(event?.id){
      navigation.navigate("EditEvent",{
        eventId: event.id,
      });      
    }
  }

  const goToSendInvitationPage = () => {
    if(event?.id){
      navigation.navigate("SendInvitations",{
        eventId: event.id,
        eventName: event.name,
      });      
    }
  }




  return (
    <ScrollView style={eventStyles.container}>
    <AppField label="Event Name" content={event?.name}></AppField>
    <AppField label="Description" content={event?.description}></AppField>
    <AppField label="Location" content={event?.location}></AppField>

    <AppField label="Event Dates" content={getEventTime()}></AppField>

    <AppButton content="Edit Event" onPress={goToEditEventPage}></AppButton>
    <AppButton onPress={goToSendInvitationPage} content="Invite"></AppButton>

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

export default Event
