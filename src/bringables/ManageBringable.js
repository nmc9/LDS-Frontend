import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { StyleSheet, Text, View, Button, TextInput, Pressable,ScrollView,FlatList } from 'react-native'
import appStyles, {appPadding,appMargin,primaryColor} from '../appStyles'
import AppField from '../components/AppField'
import AppInput from '../components/AppInput'
import AppButton from '../components/AppButton'
import SearchBar from "../components/SearchBar";
// 
import { NativeBaseProvider, VStack, Box, Divider, Heading, Stack, HStack } from "native-base";
import debounce from 'lodash.debounce';
import BringableListItem from "./components/BringableListItem";
import BringableFooter from "./components/BringableFooter";
import BringableHeader from "./components/BringableHeader";
import { useIsFocused } from '@react-navigation/native';


const ManageBringable = ({ route, navigation }) => {

  const [searchTerm, setSearchTerm] = useState("");
  const [bringableItem,setBringableItem] = useState([]);

  const event = {
    description: "sdfsdfsdfs",
    end_datetime: "2022-01-01 10:10:10",
    id: 21,
    location: "fdsdfsdfs",
    name: "sf",
    owner_id: 27,
    start_datetime: "2022-01-01 10:10:10"
  } //route.params;

  const bringable = {
    'id' : 1,
    'name' : "SOCKS",
    'notes' : "ASD",
    'importance' : 4,
    'required_count' : 0,
    'acquired_acount' : 0,
    'acquired_all' : false,
    'items' : []
  } // route.bringable;



  const [errors, setErrors] = useState({})


  useEffect(() => {
    Auth.load(() => {

      searchAllBringableItems(null);
    })
  },[])

  // const debManageBringable = useCallback(debounce(query => {
  //   searchAllBringableItems(query);
  // }, 400), [])


  const searchAllBringableItems = (value) => {
    let url = getSearchUrl(event.id,null,value,null);
    axios.get(url).then(({data}) => {
      setBringable(data.data);

    }).catch((error) => {

      onAuthFail(error,navigation);
    });
  }


  const getSearchUrl = (event_id,user_id,value,acquired) => {
    let base = 'event/' + event_id;
    if(user_id){
       base += '/user' + user_id;
    }
    base += "/bringable";
    if(value && acquired){
      base += "?search=" + value + "&acquired=" + acquired
    }else if(value){
      base += "?search=" + value
    }else if(acquired){
      base += "?acquired=" + acquired
    }

    return base;

  }

  const onAuthFail = (error,navigation) => {
    if(error?.response?.status == 401){
      Auth.clear();
      navigation.replace('Login');
    }
  }

  const handleChange = search => { setSearchTerm(search); debManageBringable(search) };


  const renderBringableListItem = ({ item }) => (
    <BringableListItem bringable={item} navigation={navigation}></BringableListItem>
    );

  const renderBringableFooter = ({ item }) => (
    <BringableFooter data={{}} navigation={navigation}></BringableFooter>
    );

  const renderBringableHeader = ({ item }) => (
    <BringableHeader data={{}} navigation={navigation}></BringableHeader>
    );

  return (
    <ScrollView style={ManageBringableStyles.container}>

    <VStack space={1} mt="2" alignItems="center">
    <Heading>Bringables for { event.name }</Heading>
    </VStack>
    <HStack alignItems="center" >
      <Box style={{flex:1}} >
      <SearchBar placeholder="Search Bringable" value={searchTerm} onChangeText={handleChange}></SearchBar>
      </Box>
      <AppButton content="Create Bringable" onPress={ () => {navigation.navigate("CreateBringable");}  }></AppButton>
      
    </HStack>
    
    <FlatList
    data={bringable}
    renderItem={renderBringableListItem}
    keyExtractor={(bringable) => bringable.id}
    ListFooterComponent={renderBringableFooter}
      ListHeaderComponent={renderBringableHeader}

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
