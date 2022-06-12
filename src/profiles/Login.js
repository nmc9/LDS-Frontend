import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Button, TextInput, Pressable } from 'react-native'
import appStyles from '../appStyles'
import AppButton from '../components/AppButton'
import AppInput from '../components/AppInput'

const Login = ({ route, navigation }) => {
  const data = {
    email: '',
    password: '',
    device_name: 'Test'
  }
  const [form, _setForm] = useState(data)
  const [errors, setErrors] = useState({})

  const setForm = (_key, _value) => {
    _setForm({ ...form, [_key]: _value })
  }

  const onClear = () => {
    _setForm(data) 
    setErrors({})
  }

  const onSubmit = () => {
    axios.post('login', form)
      .then(({ data }) => {
        onClear()
        // Take this data and store it as the user token
        console.log(data)
      }).catch((error) => {
        const _errors = error?.response?.data?.errors
        if (_errors) {
          setErrors(_errors)
        }
      })
  }

  return (
    <View style={registerStyles.container}>
    
    <AppInput
    onChangeText={(e) => { setForm('email', e) }}
    value={form.email}
    error={errors.email}

    placeholder="Email"
    textContentType="emailAddress"
    autoComplete="email"
    keyboardType="email-address"
    ></AppInput>

    <AppInput
    onChangeText={(e) => { setForm('password', e) }}
    value={form.password}
    error={errors.password}

    placeholder="Password"
    autoComplete="password"
    secureTextEntry={true}
    textContentType="password"
    ></AppInput>

    <View style={registerStyles.buttonHolder}>

    <AppButton content="Login" onPress={onSubmit}>
    </AppButton>

    </View>
    </View>
  )
}

const registerStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgrey',
    alignItems: 'left',
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
    flexWrap: 'wrap',
    paddingTop: 0,
    paddingBottom: 0
  }

})

export default Login
