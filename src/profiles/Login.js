import React, { useEffect, useState, useRef } from 'react'
import { StyleSheet, Text, View, Button, TextInput, Pressable } from 'react-native'
import appStyles from '../appStyles'
import AppButton from '../components/AppButton'
import AppInput from '../components/AppInput'

import { useSelector, useDispatch } from 'react-redux';
import { setUser,setToken } from "../redux/actions";

import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ route, navigation }) => {

  const { user,token,auth } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  const userRef = useRef();


  useEffect(() => {
    // userRef.current.focus();
  },[])

  useEffect(() => {
    setErrors({});
  },[form])

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

  const onSubmit = () => {
    axios.post('login', form)
    .then(({ data }) => {

      Auth.set(data.user,data.token);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Profile' }],
      })

    }).catch((error) => {
      const _errors = error?.response?.data?.errors
      if (_errors) {
        setErrors(_errors)
      }
    })
  }

  const goToRegister = () => {
    navigation.navigate('Register')
  }

  return (


    <View style={registerStyles.container}>
    <Text>{JSON.stringify(auth)}</Text>
    <Text>{token}</Text>

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

    <AppButton content="Register" onPress={goToRegister}>
    </AppButton>

    </View>
    </View>
    )
}

const registerStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgrey',
    alignItems: 'stretch',
    justifyContent: 'center',
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
