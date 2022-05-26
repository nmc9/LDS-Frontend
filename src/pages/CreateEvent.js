import React, {useEffect, useState} from 'react'
import { Text,View } from 'react-native';




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
    <View>
    <Text>Hello, {route.params.user?.name}. You are {example?.name} </Text>
    </View>
  );
}

export default CreateEvent;