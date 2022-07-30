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


const SearchBringable = ({ route, navigation }) => {

  const [searchTerm, setSearchTerm] = useState("");
  const [bringable,setBringable] = useState([]);

  const event = {
    description: "sdfsdfsdfs",
    end_datetime: "2022-01-01 10:10:10",
    id: 21,
    location: "fdsdfsdfs",
    name: "sf",
    owner_id: 27,
    start_datetime: "2022-01-01 10:10:10"
  } //route.params;

  const [assigned, setAssigned] = useState(0);
  const [acquired, setAcquired] = useState("all");

  const applyFilters = (acquired,assigned) => {
    setAssigned(assigned);
    setAcquired(acquired);
    console.log(assigned,acquired,"ASDASD");

  }


  const [errors, setErrors] = useState({})


  useEffect(() => {
    Auth.load(() => {
      searchAllBringables(null,acquired);
    })
  },[])

  const debSearchBringable = useCallback(debounce(query => {
    searchAllBringables(query);
  }, 400), [])


  const triggerSearch = (value) => {

  }


  const searchAllBringables = (value) => {
    console.log(acquired,assigned,"POPO");
    let url = getSearchUrl(event.id,null,value,acquired);
    axios.get(url).then(({data}) => {
      setBringable(data.data);

    }).catch((error) => {

      onAuthFail(error,navigation);
    });
  }

const searchCurrentUserBringables = (value) => {
  Auth.getUser().then(({user}) => {
        searchUserBringables(value,user);
  })
}

  const searchUserBringables = (value, user) => {
    let url = getSearchUrl(event.id,user.id,value,acquired);
    axios.get(url).then(({data}) => {
      setBringable(data.data);

    }).catch((error) => {

      onAuthFail(error,navigation);
    });
  }

  const getSearchUrl = (event_id,user_id,value,acq) => {
    console.log(acq)
    let ac = null;
    if(acq == "notacquired"){
      ac = 0;
    } else if(acq == "acquired"){
      ac = 1;
    }
    let base = 'event/' + event_id;
    if(user_id){
     base += '/user' + user_id;
   }
   base += "/bringable";
   if(value && acq != null){
    base += "?search=" + value + "&acquired=" + ac
  }else if(value){
    base += "?search=" + value
  }else if(acq != null){
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

const handleChange = search => { setSearchTerm(search); debSearchBringable(search) };


const renderBringableListItem = ({ item }) => (
  <BringableListItem bringable={item} navigation={navigation}></BringableListItem>
  );

  const renderBringableFooter = ({ item }) => (
  <BringableFooter data={{}} navigation={navigation}></BringableFooter>
  );

  const renderBringableHeader = ({ item }) => (
  <BringableHeader assigned={assigned} acquired={acquired} onApply={ (acquired,assigned) => applyFilters(acquired,assigned) } navigation={navigation}></BringableHeader>
  );

  return (
  <ScrollView style={SearchBringableStyles.container}>

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

const SearchBringableStyles = StyleSheet.create({
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

export default SearchBringable
