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
import ProfileListItem from "./components/ProfileListItem";
import ProfileFooter from "./components/ProfileFooter";

import { useIsFocused } from '@react-navigation/native';


const SearchUsers = ({ route, navigation }) => {
  const isFocused = useIsFocused();
  
  useEffect(() => {
    isFocused && loadPage()
  },[isFocused]);

  const [searchTerm, setSearchTerm] = useState("");
  const [users,setUsers] = useState([]);

  const [errors, setErrors] = useState({})


  const loadPage = () => {
    Auth.load(() => {
      axios.get('search/profile').then(({data}) => {
        setUsers(data.data);

      }).catch((error) => {

        onAuthFail(error,navigation);
      });
    })
  }

  const debSearchUsers = useCallback(debounce(query => {
    searchUsers(query);
  }, 400), [])


  const searchUsers = (value) => {
      axios.get('search/profile?search=' + value).then(({data}) => {
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

  const handleChange = search => { setSearchTerm(search); debSearchUsers(search) };


  const renderProfileListItem = ({ item }) => (
    <ProfileListItem username={item.name} email={item.email} id={item.id}></ProfileListItem>
  );
  const renderProfileFooter = ({ item }) => (
    <ProfileFooter data={{}}></ProfileFooter>
  );

  return (
    <ScrollView style={searchUsersStyles.container}>
        <AppButton onPress={() => {  navigation.navigate('SearchFriends'); }} content="Current Friends"></AppButton>

    <SearchBar placeholder="Search Username/Email" value={searchTerm} onChangeText={handleChange}></SearchBar>
    <FlatList
        data={users}
        renderItem={renderProfileListItem}
        keyExtractor={(users) => users.id}
        ListFooterComponent={renderProfileFooter}
      />

    </ScrollView>
    )
}

const searchUsersStyles = StyleSheet.create({
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

export default SearchUsers
