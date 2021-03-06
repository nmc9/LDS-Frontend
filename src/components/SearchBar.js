import { VStack, Box, Heading, Divider, Input  } from "native-base";

import { appPadding } from '../appStyles'

const SearchBar = (props) => {
  return <VStack my="4" space={5} w="100%" p={appPadding}>
  <VStack w="100%" space={5} alignSelf="center">
  <Input variant="outline" placeholder={props.placeholder} value={props.value} onChangeText={props.onChangeText} width="100%" borderRadius="4" py="3" px="1" fontSize="14" 
  
  />
  </VStack>
  </VStack>;
}

export default SearchBar