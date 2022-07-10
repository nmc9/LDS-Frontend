import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Button, TextInput, Pressable,ScrollView } from 'react-native'
import appStyles, {appPadding,appMargin,primaryColor} from '../appStyles'
import AppField from '../components/AppField'
import AppInput from '../components/AppInput'
import AppButton from '../components/AppButton'

import AsyncStorage from '@react-native-async-storage/async-storage';


const Profile = ({ route, navigation }) => {

  const [profile, setProfile] = useState(null)
  const [sunday,setSunday] = useState({start:"",end:""});
  const [monday,setMonday] = useState({start:"",end:""});
  const [tuesday,setTuesday] = useState({start:"",end:""});
  const [wednesday,setWednesday] = useState({start:"",end:""});
  const [thursday,setThursday] = useState({start:"",end:""});
  const [friday,setFriday] = useState({start:"",end:""});
  const [saturday,setSaturday] = useState({start:"",end:""});

  const [errors, setErrors] = useState({})

  useEffect(() => {
    Auth.load(() => {
      axios.get('profile').then(({data}) => {
        setProfile(data.data);

      }).catch((error) => {

        onAuthFail(error,navigation);
      });

      axios.get('availability').then(({data}) => {
        console.log(data.data?.sunday);

        data.data?.sunday ? setSunday(data.data?.sunday) : null;
        data.data?.monday ? setMonday(data.data?.monday) : null;
        data.data?.tuesday ? setTuesday(data.data?.tuesday) : null;
        data.data?.wednesday ? setWednesday(data.data?.wednesday) : null;
        data.data?.thursday ? setThursday(data.data?.thursday) : null;
        data.data?.friday ? setFriday(data.data?.friday) : null;
        data.data?.saturday ? setSaturday(data.data?.saturday) : null;


      }).catch((error) => {
        console.log(error)
      });
    })


  },[])

  const onAuthFail = (error,navigation) => {
    if(error?.response?.status == 401){
      Auth.clear();

      navigation.replace('Login');
    }
  }


  const logout = () => {
    Auth.clear();
    navigation.replace('Login');
  }

  const getLabelText = (start,end,day = "A") =>{
    console.log(start,end,day);
    let formatted = formatTimeRange(start,end);
    if(formatted){
      return formatted;
    }
    return "Not Set";
  }




  return (
    <ScrollView style={profileStyles.container}>
    <Text style={profileStyles.welcome}>Welcome {profile?.name}, Let's Do Stuff</Text>


    <AppField label="Name" content={profile?.name}></AppField>
    <AppField label="Email" content={profile?.email}></AppField>
    {profile?.phone ? <AppField label="Phone Number" content={profile?.phone}></AppField> : null}

    {profile?.phone ? <AppField label="Phone Number" content={profile?.phone}></AppField> : null}

    <Text style={profileStyles.welcome}>Availability</Text>


    { sunday?.start ? <AppField label="Sunday" content={getLabelText(sunday?.start,sunday?.end,)}></AppField> : null}
    { monday?.start ? <AppField label="Monday" content={getLabelText(monday?.start,monday?.end)}></AppField> : null}
    { tuesday?.start ? <AppField label="Tuesday" content={getLabelText(tuesday?.start,tuesday?.end)}></AppField> : null}
    { wednesday?.start ? <AppField label="Wednesday" content={getLabelText(wednesday?.start,wednesday?.end)}></AppField> : null}
    { thursday?.start ? <AppField label="Thursday" content={getLabelText(thursday?.start,thursday?.end)}></AppField> : null}
    { friday?.start ? <AppField label="Friday" content={getLabelText(friday?.start,friday?.end)}></AppField> : null}
    { saturday?.start ? <AppField label="Saturday" content={getLabelText(saturday?.start,saturday?.end)}></AppField> : null}


    <AppButton onPress={logout} content="Logout"></AppButton>

    <AppButton onPress={() => {  navigation.navigate('SearchEvents'); }} content="Events"></AppButton>

    <AppButton onPress={() => {  navigation.navigate('SearchUsers'); }} content="Friends"></AppButton>


    </ScrollView>
    )
}

const profileStyles = StyleSheet.create({
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

export default Profile
