import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View,ScrollView, Button, TextInput, Pressable, Platform } from 'react-native'
import appStyles from '../appStyles'
import AppButton from '../components/AppButton'
import AppInput from '../components/AppInput'
import AppField from '../components/AppField'

import CrossPlatformDatePicker from "../components/CrossPlatformDatePicker"

const Register = ({ route, navigation }) => {
  const data = {
    name: '',
    email: '',
    password: '',
    phone: '',
    device_name: getPlatform() ?? "WEB"
  }
  const [form, setForm] = useState(data)
  const [errors, setErrors] = useState({})

  const [Sunday,setSunday] = useState({start:{},end:{}});
  const [Monday,setMonday] = useState({start:{},end:{}});
  const [Tuesday,setTuesday] = useState({start:{},end:{}});
  const [Wednesday,setWednesday] = useState({start:{},end:{}});
  const [Thursday,setThursday] = useState({start:{},end:{}});
  const [Friday,setFriday] = useState({start:{},end:{}});
  const [Saturday,setSaturday] = useState({start:{},end:{}});

  useEffect(() => {
    setErrors({});
  },[form])


  const onClear = () => {
    setForm(data)
    setSunday({start:{},end:{}});
    setMonday({start:{},end:{}});
    setTuesday({start:{},end:{}});
    setWednesday({start:{},end:{}});
    setThursday({start:{},end:{}});
    setFriday({start:{},end:{}});
    setSaturday({start:{},end:{}});

    setErrors({})
  }

  const onErrors = (error, setErrorCallback) => {
    const _errors = error?.response?.data?.errors
    if (_errors) {
      setErrorCallback(_errors)
    }
  }

  const goToLogin = () => {
    navigation.navigate('Login')
  }

  const onSubmit = () => {
    let _form = form;
    _form.availability = {
      sunday:Sunday,
      monday:Monday,
      tuesday:Tuesday,
      wednesday:Wednesday,
      thursday:Thursday,
      friday:Friday,
      Saturday:Saturday,
    }
    axios.post('register', _form)
    .then(({ data }) => {

      /* TODO add spinner to buttons */
      Auth.set(data.user,data.token);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Profile' }],
      })


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
    <ScrollView style={registerStyles.container}>

    <AppInput
    error={errors.name}
    onChangeText={(e) => setForm({ ...form, name: e })}
    value={form.name}
    placeholder="Username"
    ></AppInput>

    <AppInput
    onChangeText={(e) => setForm({ ...form, email: e })}
    value={form.email}
    error={errors.email}

    placeholder="Email"
    textContentType="emailAddress"
    autoComplete="email"
    keyboardType="email-address"
    ></AppInput>

    <AppInput
    onChangeText={(e) => setForm({ ...form, password: e })}
    value={form.password}
    error={errors.password}

    placeholder="Password"
    autoComplete="password-new"
    secureTextEntry={true}
    textContentType="newPassword"
    ></AppInput>

    <AppInput
    onChangeText={(e) => setForm({ ...form, phone: e })}
    value={form.phone}
    error={errors.phone}

    placeholder="Phone - Optional"
    dataDetectorTypes="phoneNumber"
    keyboardType="phone-pad"
    textContentType="telephoneNumber"
    ></AppInput>


    <View style={registerStyles.availableItem}>
    <View>
    <AppField label="Sunday" content={getLabelText(Sunday.start,Sunday.end)}></AppField>
    </View>
    <View style={registerStyles.availableItemPickers}>

    <CrossPlatformDatePicker onConfirm={(time) => setSunday({ ...Sunday, start: time }) } content="Start"></CrossPlatformDatePicker>
    <CrossPlatformDatePicker onConfirm={(time) => setSunday({ ...Sunday, end: time }) } content="End"></CrossPlatformDatePicker>
    </View>
    </View>


    <View style={registerStyles.availableItem}>
    <View>
    <AppField label="Monday" content={getLabelText(Monday.start,Monday.end)}></AppField>
    </View>
    <View style={registerStyles.availableItemPickers}>

    <CrossPlatformDatePicker onConfirm={(time) => setMonday({ ...Monday, start: time }) } content="Start"></CrossPlatformDatePicker>
    <CrossPlatformDatePicker onConfirm={(time) => setMonday({ ...Monday, end: time }) } content="End"></CrossPlatformDatePicker>
    </View>
    </View>




    <View style={registerStyles.availableItem}>
    <View>
    <AppField label="Tuesday" content={getLabelText(Tuesday.start,Tuesday.end)}></AppField>
    </View>
    <View style={registerStyles.availableItemPickers}>

    <CrossPlatformDatePicker onConfirm={(time) => setTuesday({ ...Tuesday, start: time }) } content="Start"></CrossPlatformDatePicker>
    <CrossPlatformDatePicker onConfirm={(time) => setTuesday({ ...Tuesday, end: time }) } content="End"></CrossPlatformDatePicker>
    </View>
    </View>

    <View style={registerStyles.availableItem}>
    <View>
    <AppField label="Wednesday" content={getLabelText(Wednesday.start,Wednesday.end)}></AppField>
    </View>
    <View style={registerStyles.availableItemPickers}>

    <CrossPlatformDatePicker onConfirm={(time) => setWednesday({ ...Wednesday, start: time }) } content="Start"></CrossPlatformDatePicker>
    <CrossPlatformDatePicker onConfirm={(time) => setWednesday({ ...Wednesday, end: time }) } content="End"></CrossPlatformDatePicker>
    </View>
    </View>


    <View style={registerStyles.availableItem}>
    <View>
    <AppField label="Thursday" content={getLabelText(Thursday.start,Thursday.end)}></AppField>
    </View>
    <View style={registerStyles.availableItemPickers}>

    <CrossPlatformDatePicker onConfirm={(time) => setThursday({ ...Thursday, start: time }) } content="Start"></CrossPlatformDatePicker>
    <CrossPlatformDatePicker onConfirm={(time) => setThursday({ ...Thursday, end: time }) } content="End"></CrossPlatformDatePicker>
    </View>
    </View>


    <View style={registerStyles.availableItem}>
    <View>
    <AppField label="Friday" content={getLabelText(Friday.start,Friday.end)}></AppField>
    </View>
    <View style={registerStyles.availableItemPickers}>

    <CrossPlatformDatePicker onConfirm={(time) => setFriday({ ...Friday, start: time }) } content="Start"></CrossPlatformDatePicker>
    <CrossPlatformDatePicker onConfirm={(time) => setFriday({ ...Friday, end: time }) } content="End"></CrossPlatformDatePicker>
    </View>
    </View>


    <View style={registerStyles.availableItem}>
    <View>
    <AppField label="Saturday" content={getLabelText(Saturday.start,Saturday.end)}></AppField>
    </View>
    <View style={registerStyles.availableItemPickers}>

    <CrossPlatformDatePicker onConfirm={(time) => setSaturday({ ...Saturday, start: time }) } content="Start"></CrossPlatformDatePicker>
    <CrossPlatformDatePicker onConfirm={(time) => setSaturday({ ...Saturday, end: time }) } content="End"></CrossPlatformDatePicker>
    </View>
    </View>

    <View style={registerStyles.buttonHolder}>
    <AppButton content="Clear" onPress={onClear}>
    </AppButton>
    <AppButton content="Register" onPress={onSubmit}>
    </AppButton>

    <AppButton content="Login" onPress={goToLogin}>
    </AppButton>

    </View>
    </ScrollView>
    )
}

const registerStyles = StyleSheet.create({

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

export default Register
