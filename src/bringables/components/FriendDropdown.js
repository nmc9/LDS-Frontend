import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { StyleSheet, Text, View, Button, TextInput, Pressable,ScrollView } from 'react-native'
// 
import { HStack,Heading,Box,Select } from "native-base";
import debounce from 'lodash.debounce';
import AppButton from "../../components/AppButton";
import AppInput from "../../components/AppInput";
import appStyles, {appPadding, appMargin, primaryColor} from '../../appStyles'


const FriendDropdown = ({event_id, presetGroup,onErrors, assignedUser, setAssignedUser}) => {

  const [group, setGroup] = useState([]);

  useEffect(() => {
    Auth.load(() => {
      // if(presetGroup){
        // setGroup(presetGroup)
      // }else{
        axiosGetGroup();
      // }
    })
  },[])

  const axiosGetGroup = () => {
    axios.get('event/' + event_id + '/accepted')
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


    return (
    <HStack m="4" space={2} justifyContent="flex-start" alignItems="center">
      <Heading size="sm" style={{textAlign: 'left', width:150 }}>Assigned To:</Heading>
      <Box style={{flex:1}} >
        <Select selectedValue={assignedUser} minWidth="200" accessibilityLabel="Assign User" onValueChange={itemValue => { setAssignedUser(itemValue) }}>
        <Select.Item label="Unassigned" value={"-1"} />
          {group.map(r => <Select.Item key={r.id} label={r.email} value={r.id + ""} />)}
        </Select>
      </Box>
    </HStack> 
      )
  }

  export default FriendDropdown
