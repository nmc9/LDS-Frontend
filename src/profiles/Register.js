import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Button, TextInput, Pressable, Platform } from 'react-native'
import appStyles from '../appStyles'
import AppButton from '../components/AppButton'
import AppInput from '../components/AppInput'

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

  const goToLogin = () => {
    navigation.navigate('Login')
  }

  const onSubmit = () => {
    axios.post('register', form)
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

  return (
    <View style={registerStyles.container}>
    <Text>{JSON.stringify(form)}</Text>

    <Text>
    {JSON.stringify(Platform.constants)}
    </Text>
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

    <View style={registerStyles.buttonHolder}>
    <AppButton content="Clear" onPress={onClear}>
    </AppButton>
    <AppButton content="Register" onPress={onSubmit}>
    </AppButton>

    <AppButton content="Login" onPress={goToLogin}>
    </AppButton>

    </View>
    </View>
    )
  }

  const registerStyles = StyleSheet.create({
    container: {
      flex: 1,
      // maxWidth: 400,
      // padding: 300,
      backgroundColor: 'lightgrey',
      alignItems: 'stretch',
      justifyContent: 'center'
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
