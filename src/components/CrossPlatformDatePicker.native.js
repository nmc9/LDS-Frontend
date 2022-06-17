
import DateTimePicker from '@react-native-community/datetimepicker';

import {useState, useCallback } from 'react'
import { TimePickerModal,DatePickerInput } from 'react-native-paper-dates'
import AppButton from "./AppButton";
import { TextInput, Text, View, ActivityIndicator, Keyboard,StyleSheet } from 'react-native'

const CrossPlatformDatePicker = (props) => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;

    if(event.type == "dismissed"){
      props.onDismiss;
    }
    else if(event.type == "set"){
      props.onConfirm ? props.onConfirm({
        hours: currentDate.getHours(),
        minutes: currentDate.getMinutes(),
      }) : null;
    }

    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <View>
    <AppButton onPress={() => setShow(true)} content={props.content}></AppButton>
    {show && (
      <DateTimePicker
      testID="dateTimePicker"
      value={date}
      mode="time"
      is24Hour={false}
      onChange={onChange}
      />
      )}
    </View>
    );
}


export default CrossPlatformDatePicker