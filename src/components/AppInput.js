import { TextInput,Text,View } from 'react-native';
import { useState} from 'react'

import appStyles from "../appStyles";

const AppInput = (props) => {

return <View style={appStyles.appInputWrapper}>
<TextInput
style={props.error ? appStyles.appInputWithError : appStyles.appInput}
onChangeText={ props.onChangeText}
value={props.value}
placeholder={props.placeholder}
textContentType={props.textContentType}
autoComplete={props.autoComplete}
keyboardType={props.keyboardType}
secureTextEntry={props.secureTextEntry}
/>
{props.error ? (<Text style={appStyles.appInputError}>{props.error}</Text>) : null }
</View>
};

export default AppInput;