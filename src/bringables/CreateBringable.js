import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View,ScrollView, Button, TextInput, Pressable, Platform } from 'react-native'
import appStyles from '../appStyles'
import AppButton from '../components/AppButton'
import AppInput from '../components/AppInput'
import AppField from '../components/AppField'
import { Select } from 'native-base'


import CrossPlatformDatePicker from "../components/CrossPlatformDatePicker"

const CreateBringable = ({ route, navigation }) => {
  const data = {
    'name':'',
    'notes':null,
    'importance':4,
    'assigned_id':null,
    'required': 0,
    'acquired': 0,
  }

  const [assignedUser,setAssignedUser] = useState(null);
  const [form, setForm] = useState(data)
  const [errors, setErrors] = useState({})

  const [group, setGroup] = useState([]);

  const event = {
    description: "sdfsdfsdfs",
    end_datetime: "2022-01-01 10:10:10",
    id: 21,
    location: "fdsdfsdfs",
    name: "sf",
    owner_id: 27,
    start_datetime: "2022-01-01 10:10:10"
  } //route.params;

  useEffect(() => {
    setErrors({});
  },[form])


  const onClear = () => {
    setForm(data)

    setErrors({})
  }

  useEffect(() => {
    Auth.load(() => {

      axiosGetGroup();
    })
  },[])

  const axiosGetGroup = () => {
    axios.get('event/' + event.id + '/accepted')
    .then(({ data }) => {

          setGroup(data.data);

    }).catch((error) => {
      onErrors(error,setErrors);
    })
  }

  const axiosCreateBringable = (data) => {
    form.assigned_id = assignedUser;
    axios.post('/api/event/' + event.id + '/bringable/',form)    
    .then(({ data }) => {

      console.log(data);
      console.log(data.data.id)

      navigation.navigate('SearchBringables',{
        eventId: data.data.id,
      });

    }).catch((error) => {
      onErrors(error,setErrors);
    })
  }

  const onErrors = (error, setErrorCallback) => {
    const _errors = error?.response?.data?.errors
    if (_errors) {
      setErrorCallback(_errors)
    }
  }

  const goToProfile = () => {
    navigation.navigate('Profile')
  }

  const onSubmit = () => {

    axios.post('Bringable', form)
    .then(({ data }) => {

      console.log(data);
      console.log(data.data.id)

      navigation.navigate('Bringable',{
        BringableId: data.data.id,
      });

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
    <ScrollView style={createBringableStyles.container}>

    <AppInput
    error={errors.name}
    onChangeText={(e) => setForm({ ...form, name: e })}
    value={form.name}
    placeholder="Bringable Name"
    ></AppInput>

    <AppInput
    error={errors.description}
    onChangeText={(e) => setForm({ ...form, description: e })}
    value={form.description}
    placeholder="Bringable Details"
    ></AppInput>


    <AppInput
    error={errors.location}
    onChangeText={(e) => setForm({ ...form, location: e })}
    value={form.location}
    placeholder="Where is it?"
    ></AppInput>

    <AppInput
    error={errors.start_datetime}
    onChangeText={(e) => setForm({ ...form, start_datetime: e })}
    value={form.start_datetime}
    placeholder="Start Date Ex: (2022-12-12 12:01:01)"
    ></AppInput>

    <AppInput
    error={errors.end_datetime}
    onChangeText={(e) => setForm({ ...form, end_datetime: e })}
    value={form.end_datetime}
    placeholder="End Date Ex: (2022-12-12 12:01:01)"
    ></AppInput>


    <Select selectedValue={assignedUser} minWidth="200" accessibilityLabel="Assign User" placeholder="Assign User" onValueChange={itemValue => { itemValue > 0 ? setAssignedUser(itemValue) : setAssignedUser(null)}}>
    <Select.Item label="Unassigned" value={-1} />
      {group.map(r => <Select.Item key={r.id} label={r.email} value={r.id} />)}
    </Select>

    <Text>{ assignedUser}</Text>



    <View style={createBringableStyles.buttonHolder}>
    <AppButton content="Clear" onPress={onClear}>
    </AppButton>
    <AppButton content="Create Bringable" onPress={onSubmit}>
    </AppButton>

    <AppButton content="Return To Profile" onPress={goToProfile}>
    </AppButton>

    </View>
    </ScrollView>
    )
}

const createBringableStyles = StyleSheet.create({

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

export default CreateBringable
