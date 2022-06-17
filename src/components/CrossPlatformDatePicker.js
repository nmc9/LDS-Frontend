import {
  enGB,
  registerTranslation,
} from 'react-native-paper-dates'

import {useState, useCallback } from 'react'
import { TimePickerModal,DatePickerInput } from 'react-native-paper-dates'
import AppButton from "./AppButton";
import { TextInput, Text, View, ActivityIndicator, Keyboard,StyleSheet } from 'react-native'

const CrossPlatformDatePicker = (props) => {
  const [visible, setVisible] = useState(false)

  const onDismiss = () => {
    props.onDismiss;
    setVisible(false);
  };

  const onConfirm = ({ hours, minutes }) => {
    props.onConfirm ? props.onConfirm({ hours, minutes }) : null;
    setVisible(false);

  };

  return (
    <>
    <TimePickerModal
    visible={visible}
    onDismiss={onDismiss}
    onConfirm={onConfirm}
    hours={12} 
    minutes={0} 
    label="Select time" 
    uppercase={false}        
    cancelLabel="Cancel" 
    confirmLabel="Ok" 
    animationType="fade" 
    locale="en"
    />
    <AppButton onPress={() => setVisible(true)} content={props.content}></AppButton>

    </>
    )
}



export default CrossPlatformDatePicker