import { Pressable, Text } from 'react-native'
import appStyles from '../appStyles'

const AppButton = (props) => {
  return <Pressable
  onPress={props.onPress}
  style={props.buttonStyle
    ? props.buttonStyle
    : ({ pressed }) => [
        appStyles.appButton,
        {
          opacity: pressed ? 0.5 : 1
        }
      ]}>
  <Text selectable={false} style={props.textStyle ? props.textStyle : appStyles.appButtonText}>
  {props.content}
  </Text>
  </Pressable>
}

export default AppButton
