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
import EventListItem from "./components/EventListItem";
import EventFooter from "./components/EventFooter";


const SearchEvents = ({ route, navigation }) => {

  const [searchTerm, setSearchTerm] = useState("");
  const [events,setEvents] = useState([]);

  const [errors, setErrors] = useState({})


  useEffect(() => {
    Auth.load(() => {
      // setEvents([{
      //   id:3,
      //   name:"Beach Trip",
      //   location: "Virginia Beach",
      //   description: "This is a breach Trip",
      //   time_frame_text: { start:"June 1st 2022 (Monday) 10AM EST", end:"June 2nd 2022 (Tuesday) 3PM EST"},
      //   time_frame_short: { start:"June 1st 10AM", end:"June 2nd 3PM"},
      //   time_frame: {anObject: "Determined by backend"}
      // }]);
      axios.get('search/event').then(({data}) => {
        setUsers(data.data);

      }).catch((error) => {

        onAuthFail(error,navigation);
      });
    })
  },[])

  const debSearchEvents = useCallback(debounce(query => {
    SearchEvents(query);
  }, 400), [])


  const SearchEvents = (value) => {
      axios.get('search/event?search=' + value).then(({data}) => {
        setUsers(data.data);

      }).catch((error) => {

        onAuthFail(error,navigation);
      });
  }

  const onAuthFail = (error,navigation) => {
    if(error?.response?.status == 401){
      Auth.clear();
      navigation.replace('Login');
    }
  }

  const handleChange = search => { setSearchTerm(search); debSearchEvents(search) };


  const renderEventListItem = ({ item }) => (
    <EventListItem event={item} navigation={navigation}></EventListItem>
  );

  const renderEventFooter = ({ item }) => (
    <EventFooter data={{}} navigation={navigation}></EventFooter>
  );

  return (
    <ScrollView style={SearchEventsStyles.container}>
    <Text>{ searchTerm } </Text>
    <SearchBar placeholder="Search Username/Email" value={searchTerm} onChangeText={handleChange}></SearchBar>
    <FlatList
        data={events}
        renderItem={renderEventListItem}
        keyExtractor={(events) => events.id}
        ListFooterComponent={renderEventFooter}
      />

    </ScrollView>
    )
}

const SearchEventsStyles = StyleSheet.create({
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

export default SearchEvents
