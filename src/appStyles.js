import { StyleSheet,Platform } from 'react-native'

let spinnerColor = "darkblue"
let labelWeight = "600";
let primaryColor = "darkblue";
let errorColor = "darkred";

let appMargin = Platform.select({
native: 24,
default: 12
});
let appPadding = Platform.select({
native: 3, // TODO bug with padding on different devices
default: 15
});


export { spinnerColor,appMargin,primaryColor,errorColor,appPadding };

export default StyleSheet.create({
  appButton: {
    minWidth: 120,
    height: 40,
    margin: appMargin,
    borderWidth: 1,
    padding: appPadding,
    borderRadius: 6,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: primaryColor,
    justifyContent: 'center',
  },

  appButtonText: {
    fontWeight: labelWeight,
    color: 'lightgrey',
  },

  appInputWithError: {
    height: 'auto',
    margin: appMargin,
    marginBottom: 2,
    borderWidth: 2,
    padding: appPadding,
    borderRadius: 6,
    color: primaryColor,
    borderColor: errorColor,
    // selectionColor: errorColor,
  },

  appInput: {
    height: 'auto',
    margin: appMargin,
    marginBottom: appMargin,
    borderWidth: 2,
    padding: appPadding,
    paddingStart: 15,
    paddingEnd: 15,
    borderRadius: 6,
    color: primaryColor,
    borderColor: 'blue',
  },

  appInputError: {
    height: 'auto',
    margin: 0,
    fontWeight: labelWeight,
    fontSize: 10,
    paddingStart: 30 /* TODO SET TO APP PADDING */,
    color: errorColor,
  },

  appFieldWrapper:{
    margin:appMargin,

  },

  appFieldLabel: {
    padding:5,
    paddingStart:10,
    paddingEnd:10,
    fontWeight:labelWeight,

    borderBottomWidth:0,
    color: primaryColor,
    borderColor: primaryColor,
  },

  appFieldContent:{
    // padding:10,
    borderRadius:6,
    borderWidth:2,
    borderTopStartRadius:0,
    color: primaryColor,
    borderColor: primaryColor,
  },

  appFieldLoading:{
    alignSelf:"flex-start",
    minWidth: 100,
    padding:10,
    borderRadius:6,
    borderWidth:2,
    // borderTopStartRadius:0,
    color: primaryColor,
    borderColor: primaryColor,
  },

  appFieldLabelView:{
    alignSelf: 'flex-start',
    borderColor:primaryColor,
    borderWidth:2,
        borderTopStartRadius:6,
    borderTopEndRadius:6,
    borderBottomWidth:0,
  },

  appInputWrapper:{
    minHeight: 80,
    minWidth: 120,

    // backgroundColor:'green',
    // borderColor: 'yellow',
    // borderWidth: 3.

  }


})


// appInputWrapper
// appInputWithError
// appInput