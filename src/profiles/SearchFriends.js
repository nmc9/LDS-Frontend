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
import FriendListItem from "./components/FriendListItem";
// import FriendFooter from "./components/FriendFooter";
import { useIsFocused } from '@react-navigation/native';


const SearchFriends = ({ route, navigation }) => {
  const isFocused = useIsFocused();
  
  useEffect(() => {
    isFocused && loadPage()
  },[isFocused]);

  const [searchTerm, setSearchTerm] = useState("");
  const [friends,setFriends] = useState([]);

  const [errors, setErrors] = useState({})


  const loadPage = () => {
    Auth.load(() => {
      axios.get('search/friend').then(({data}) => {
        setFriends(data.data);

      }).catch((error) => {

        onAuthFail(error,navigation);
      });
    })
  }

  const debSearchFriends = useCallback(debounce(query => {
    SearchFriends(query);
  }, 400), [])


  const SearchFriends = (value) => {
      axios.get('search/friend?search=' + value).then(({data}) => {
        setFriends(data.data);

      }).catch((error) => {

        onAuthFail(error,navigation);
      });
  }

  const removeFriend = (friend_id) => {
      axios.delete('friend/' + friend_id).then(({data}) => {
        debSearchFriends(searchTerm)

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

  const handleChange = search => { setSearchTerm(search); debSearchFriends(search) };


  const renderFriendListItem = ({ item }) => (
    <FriendListItem username={item.name} email={item.email} id={item.id} removeFriend={(id) => {removeFriend(id) }}></FriendListItem>
  );
  // const renderFriendFooter = ({ item }) => (
  //   <FriendFooter data={{}}></FriendFooter>
  // );

  return (
    <ScrollView style={SearchFriendsStyles.container}>
    <SearchBar placeholder="Search Username/Email" value={searchTerm} onChangeText={handleChange}></SearchBar>
    <FlatList
        data={friends}
        renderItem={renderFriendListItem}
        keyExtractor={(friends) => friends.id}
        // ListFooterComponent={renderFriendFooter}
      />

    </ScrollView>
    )
}

const SearchFriendsStyles = StyleSheet.create({
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

export default SearchFriends
