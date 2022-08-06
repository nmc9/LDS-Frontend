import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Button, TextInput, Pressable,ScrollView, FlatList } from 'react-native'
import appStyles, {appPadding,appMargin,primaryColor} from '../appStyles'
import AppField from '../components/AppField'
import AppInput from '../components/AppInput'
import AppButton from '../components/AppButton'

import {Stack} from "native-base"

import InviteFriendListItem from "./components/InviteFriendListItem"
import SendInvitationHeader from "./components/SendInvitationHeader"

import {EVERYONE,AVAILABLE} from "./components/SendInvitationHeader";

const SendInvitations = ({ route, navigation }) => {


  const { eventId, eventName } = route.params;


  const [users, setUsers] = useState([])
  const [errors, setErrors] = useState({})

  const removeUser = (userId) => {
    setUsers(users.filter(x => x.id !== userId));
  }

  const searchUsers = (type) => {
    if(type == EVERYONE){
      axios.get('friend').then(({data}) => {
        setUsers(data.data);
      }).catch((error) => {
        alert(error);
      });
    }else if (type == AVAILABLE){
      axios.get('event/' + eventId + '/available').then(({data}) => {
        setUsers(data.data);
      }).catch((error) => {
        alert(error);
      });
    }
  }

  const sendInvitations = () => {
    let ids = users.map(x => {return x.id})

    axios.post('event/' + eventId + '/invitation',{
      users: ids
      }).then(({data}) => {
      alert("Invitations Sent");
    }).catch((error) => {
      alert(error);
    });
  }

  const onAdd = (email) => {
    console.log("onAdd");
    console.log(email)
    axios.post('event/' + eventId + '/invitation',{
      emails: [email]
      }).then(({data}) => {
      alert("Invitations Sent");
    }).catch((error) => {
      alert(error);
    });
  }



  const renderInviteFriendListItem = ({ item }) => (
    <InviteFriendListItem eventId={eventId} user={item} navigation={navigation} onRemove={removeUser}></InviteFriendListItem>
    );

    const renderSendInvitationHeader = ({ item }) => (
    <SendInvitationHeader eventId={eventId} onSearch={searchUsers} onSend={sendInvitations} onAdd={onAdd} navigation={navigation}></SendInvitationHeader>
    );


    return (
    <ScrollView style={sendInvitationsStyles.container}>
    <AppField label="Event Name" content={eventName}></AppField>



    <FlatList
    style={{padding: appPadding}}
    data={users}
    renderItem={renderInviteFriendListItem}
    keyExtractor={(users) => users.id}
    ListHeaderComponent={renderSendInvitationHeader}
    />


    </ScrollView>
    )
  }

  const sendInvitationsStyles = StyleSheet.create({
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

  export default SendInvitations
