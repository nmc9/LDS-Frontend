import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { StyleSheet, Text, View, Button, TextInput, Pressable,ScrollView,FlatList } from 'react-native'
import appStyles, {appPadding,appMargin,primaryColor} from '../appStyles'
import AppField from '../components/AppField'
import AppInput from '../components/AppInput'
import AppButton from '../components/AppButton'
import SearchBar from "../components/SearchBar";
// 
import { NativeBaseProvider, VStack, Box, Divider, Heading, Stack, HStack,Select } from "native-base";
import debounce from 'lodash.debounce';
import BringableItemListItem from "./components/BringableItemListItem";
import BringableFooter from "./components/BringableFooter";
import BringableItemHeader from "./components/BringableItemHeader";
import { useIsFocused } from '@react-navigation/native';


const ManageBringable = ({ route, navigation }) => {
  const isFocused = useIsFocused();
  
  useEffect(() => {
    isFocused && loadPage()
  },[isFocused]);

  const data = {
    'notes':"",
    'importance':4,
  }


  const [searchTerm, setSearchTerm] = useState("");
  const [bringableItem,setBringableItem] = useState([]);
  const [bringable,setBringable] = useState({});
  const [form, setForm] = useState(data)
  const [importance, setImportance] = useState("4");
  const [errors, setErrors] = useState({})
  const [group, setGroup] = useState([]);

  const {event, BringableId} = route.params
  // const event = {
  //   description: "sdfsdfsdfs",
  //   end_datetime: "2022-01-01 10:10:10",
  //   id: 21,
  //   location: "fdsdfsdfs",
  //   name: "sf",
  //   owner_id: 27,
  //   start_datetime: "2022-01-01 10:10:10"
  // } //route.params;

  // const BringableId  = 1;//route.params;



  const loadPage =() => {
    Auth.load(() => {
      axiosGetGroup();
      axios.get('event/' + event.id + '/bringable/' + BringableId).then(({data}) => {
        setBringable(data.data);
        setForm(data.data)


      }).catch((error) => {

        onAuthFail(error,navigation);
      });
    })
  }

  const clearAcquired = () => {
    axios.post('bringable/clearaquired/' + bringable.id)
    .then(({data}) => {
      alert("Bringable Cleared");
      loadPage();
    }).catch((error) => {
      onAuthFail(error,navigation);
    });    
  }

  const updateBringable = () => {
    let _form = {
      //name:form.name,
      notes: form.notes === "" ? null : form.notes,
      importance: importance,
    };
    axios.put('/bringable/' + BringableId, _form)
    .then(({ data }) => {

      navigation.navigate('SearchBringables',{
        event: event
      });

    }).catch((error) => {
              alert(error);

      onErrors(error,setErrors);
    })
  }

    const onErrors = (error, setErrorCallback) => {
    const _errors = error?.response?.data?.errors
    if (_errors) {
      setErrorCallback(_errors)
    }
  }


  const onAuthFail = (error,navigation) => {
    if(error?.response?.status == 401){
      Auth.clear();
      navigation.replace('Login');
    }
  }

  const axiosGetGroup = () => {
    axios.get('event/' + event.id + '/accepted')
    .then(({ data }) => {

      Auth.getUser().then((user) => {
        let users = data.data;
        users.unshift(JSON.parse(user));
        setGroup(users);
      })

    }).catch((error) => {
      onErrors(error,setErrors);
    })
  }

  const deleteBringable = () => {
    axios.delete('bringable/' + bringable.id)
    .then(({data}) => {
      alert("Bringable Deleted");
      navigation.navigate('SearchBringables',{
        event: event
      });
    }).catch((error) => {
      onAuthFail(error,navigation);
    });

  }

  const onRefresh = () => {
    console.log("REFRESH LIST")
    loadPage();
  }

  const renderBringableItemListItem = ({ item }) => (
    <BringableItemListItem group={group} onRefresh={() => {onRefresh() }} event={event} bringableItem={item} navigation={navigation}></BringableItemListItem>
    );

  const renderBringableItemHeader = ({ item }) => (
    <BringableItemHeader event={event} bringable={bringable} data={{}} navigation={navigation}></BringableItemHeader>
    );

  return (
    <ScrollView style={ManageBringableStyles.container}>

    <VStack space={1} mt="2">
    <Heading>Bringables for { event.name }</Heading>
    </VStack>
    <AppField label="Bringable Name" content={bringable?.name}></AppField>


    <AppInput
    error={errors.notes}
    onChangeText={(e) => setForm({ ...form, notes: e })}
    value={form.notes}
    placeholder="Bringable Notes"
    ></AppInput>


    <HStack m="4" space={2} justifyContent="flex-start" alignItems="center">
      <Heading size="sm" style={{textAlign: 'left', width:150 }}>Importance:</Heading>
      <Box style={{flex:1}} >
      <Select m="2" selectedValue={importance} minWidth="200" accessibilityLabel="Assign User" onValueChange={itemValue => { setImportance(itemValue)}}>
        <Select.Item label="Required" value="1"/>
        <Select.Item label="Important" value="2"/>
        <Select.Item label="Useful" value="3"/>
        <Select.Item label="Optional" value="4"/>

      </Select>
      </Box>
    </HStack>   


<HStack alignItems="center" justifyContent="center">
      <AppButton content="Save Changes" onPress={ () => {updateBringable()}  }></AppButton>

      <AppButton content="Completely Delete" onPress={ () => {deleteBringable()}  }></AppButton>
</HStack>
<HStack alignItems="center" justifyContent="center">

      <AppButton content="Clear all items" onPress={ () => {clearAcquired()}  }></AppButton>
</HStack>    
    <FlatList
    data={bringable.items}
    renderItem={renderBringableItemListItem}
    keyExtractor={(bringableItem) => bringableItem.id}
    ListHeaderComponent={renderBringableItemHeader}

    />

    </ScrollView>
    )
}

const ManageBringableStyles = StyleSheet.create({
  container: {
    // flex: 1,
    // maxWidth: 400,
    // padding: 300,
    // backgroundColor: 'lightgrey',
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

export default ManageBringable
