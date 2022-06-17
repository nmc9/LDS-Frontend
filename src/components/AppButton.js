import { Pressable, Text } from 'react-native'
import appStyles from '../appStyles'

const AppButton = (props) => {


  const computedTextStyle = () => {
    return [appStyles.appButtonText, {...props.textStyle}]
  }

  const computedButtonStyle = ({pressed}) => {
    return [appStyles.appButton,
    pressed ? {
      opacity: pressed ? 0.5 : 1
    } : {},
     {...props.buttonStyle}
    ];
  }


  return <Pressable
  onPress={props.onPress}
  style={computedButtonStyle}>
  <Text selectable={false} style={computedTextStyle()}>
  {props.content}
  </Text>
  </Pressable>
}

export default AppButton
