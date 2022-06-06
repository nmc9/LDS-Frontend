import React, {useEffect, useState} from 'react'
import { StyleSheet,Text,View } from 'react-native';




const CreateEvent = ({ route, navigation }) => {
      const [example,setExample] = useState({})

    useEffect(() => {
        axios.get('example')
        .then(({data}) => {
          setExample(data);
        }).catch((error) => {
        })





    }, []) 
  return (
    <View style={createEventStyles.smaallview}>
    <Text>Hello, {route.params.user?.name}. You are {example?.name} </Text>
    </View>
  );
}

const createEventStyles = StyleSheet.create({
  smaallview: {
    flex: 2,
    padding: 300,
    backgroundColor: "#eaeaea"
  },
})

export default CreateEvent;