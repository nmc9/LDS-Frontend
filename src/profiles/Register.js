import React, {useEffect, useState} from 'react'
import { StyleSheet,Text,View,Button,TextInput } from 'react-native';

const Register = ({ route, navigation }) => {

  const [username, onChangeUsername] = useState("");
  const [password, onChangePassword] = useState("");
  const [email, onChangeEmail] = useState("");

  const onClear = () => {
    onChangeUsername("")
    onChangePassword("")
    onChangeEmail("")

  }
  const onSubmit = () => {
    axios.post('register',{
      name: username,
      email: email,
      password: password,
      device_name: 'Test Device'
    })
    .then(({data}) => {

      //Take this data and store it as the user token
      console.log(data);
    }).catch((error) => {
      console.log(error)
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Username:</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeUsername}
        value={username}
        placeholder="Username"
      />

      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeEmail}
        value={email}
        placeholder="Email"
      />

      <Text style={styles.label}>Password:</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangePassword}
        value={password}
        placeholder="Password"
      />



      <View style={styles.buttonHolder}>
        <Button
                onPress={onClear}

        title="Clear"
        ></Button>  
        <Button
        onPress={onSubmit}
        title="Register"
        ></Button>  
      </View>
    </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 300,
    backgroundColor: "pink",
    alignItems:'stretch',
    justifyContent:'center'
  },

  label:{
    paddingLeft:10,
    alignSelf:'flex-start',
    fontSize: 18,
  },

  buttonHolder:{
    padding: 10,
    flexDirection:'row',
    justifyContent:'space-evenly'
  },

  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
})

export default Register;

