import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { StyleSheet, Text, View, Button, TextInput, Pressable,ScrollView } from 'react-native'
// 
import { NativeBaseProvider, VStack, Box, Divider, Heading, Stack, HStack, Center } from "native-base";
import debounce from 'lodash.debounce';
import AppButton from "../../components/AppButton";
import AppInput from "../../components/AppInput";
import appStyles, {appPadding, appMargin, primaryColor} from '../../appStyles'


const BringableFooter = ({navigation}) => {

  const [imaginaryEmail,setImaginaryEmail] = useState([]);

  const [wasCreated,setWasCreated] = useState(false);

  const goToCreateBringable = () => {
      navigation.navigate("CreateBringable");
  }


    return (
      <View style={BringableFooterStyles.container}>
      <Box p="3" rounded="sm" overflow="hidden" borderColor="coolGray.500" borderWidth="2">
      <Stack p="4" space={0}>
        <HStack space={2}>
          <Heading size="md">
          { "You Can Also Create A New Bringable! "}
          </Heading>     
        </HStack>
        
        <Divider my="2" />

        <HStack space={2} justifyContent="space-evenly">
            <AppButton buttonStyle={{margin:0}} content="Create Bringable" onPress={goToCreateBringable}>
            </AppButton>    
          <View></View>
        </HStack>

      </Stack>
      </Box>
      </View>
      )
  }

  const BringableFooterStyles = StyleSheet.create({

    container:{
      padding: appPadding

    },

  })

  export default BringableFooter
