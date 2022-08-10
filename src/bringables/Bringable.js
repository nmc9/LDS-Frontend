import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Button, TextInput, Pressable,ScrollView,FlatList } from 'react-native'
import appStyles, {appPadding,appMargin,primaryColor} from '../appStyles'
import AppField from '../components/AppField'
import AppInput from '../components/AppInput'
import AppButton from '../components/AppButton'
import UserinvitedListItem from "../invitations/components/UserinvitedListItem";
import UserInvitedHeader from "../invitations/components/UserInvitedHeader";
import { useIsFocused } from '@react-navigation/native';


const Bringable = ({ route, navigation }) => {
  const isFocused = useIsFocused();
  
  useEffect(() => {
    isFocused && loadPage()
  },[isFocused]);

  const { BringableId } = route.params;

  const [Bringable, setBringable] = useState(null)

  const [invitedUsers,setInvitedUsers] = useState([
  ]);

  const [errors, setErrors] = useState({})

  const loadPage = () => {
    Auth.load(() => {
      axios.get('Bringable/' + BringableId).then(({data}) => {
        setBringable(data.data);

      }).catch((error) => {

        onAuthFail(error,navigation);
      });
    })
  }

  const onAuthFail = (error,navigation) => {
    if(error?.response?.status == 401){
      Auth.clear();

      navigation.replace('Login');
    }
  }

  const getBringableTime = () =>{
    if(!Bringable?.start_datetime){
      return ""
    }
    return "From: " + Bringable.start_datetime + " to " + Bringable.end_datetime;
  }

  const goToEditBringablePage = () => {
    if(Bringable?.id){
      navigation.navigate("EditBringable",{
        BringableId: Bringable.id,
      });      
    }
  }

  const goToSendInvitationPage = () => {
    if(Bringable?.id){
      navigation.navigate("SendInvitations",{
        BringableId: Bringable.id,
        BringableName: Bringable.name,
      });      
    }
  }

  const searchAccepted = () => {
      axios.get('/bringable/' + BringableId + '/accepted').then(({data}) => {
        setInvitedUsers(data.data);

      }).catch((error) => {

        onAuthFail(error,navigation);
      });

  }
  const searchPending = () => {
      axios.get('/bringable/' + BringableId + '/pending').then(({data}) => {
        setInvitedUsers(data.data);

      }).catch((error) => {

        onAuthFail(error,navigation);
      });

  }

  const renderUserinvitedListItem = ({ item }) => (
    <UserinvitedListItem user={item}></UserinvitedListItem>
    );

    const renderUserInvitedHeader = ({ item }) => (
    <UserInvitedHeader onAccepted={searchAccepted} onPending={searchPending} onInvite={goToSendInvitationPage} navigation={navigation}></UserInvitedHeader>
    );


  return (
    <ScrollView style={BringableStyles.container}>
    <AppField label="Bringable Name" content={Bringable?.name}></AppField>
    <AppField label="Description" content={Bringable?.description}></AppField>
    <AppField label="Location" content={Bringable?.location}></AppField>

    <AppField label="Bringable Dates" content={getBringableTime()}></AppField>

    <AppButton content="Edit Bringable" onPress={goToEditBringablePage}></AppButton>



    <FlatList
      style={{padding: appPadding}}
      data={invitedUsers}
      renderItem={renderUserinvitedListItem}
      keyExtractor={(invitedUser) => invitedUser.id}
      ListHeaderComponent={renderUserInvitedHeader}
    />

    </ScrollView>
    )
}

const BringableStyles = StyleSheet.create({
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

export default Bringable
