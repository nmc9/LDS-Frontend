import { StyleSheet } from 'react-native'

let spinnerColor = "darkblue"
let labelWeight = "600";
let primaryColor = "darkblue";
let errorColor = "darkred";

let appMargin = 12;
let appPadding = 15;


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
    height: 40,
    margin: appMargin,
    marginBottom: 2,
    borderWidth: 2,
    padding: appPadding,
    borderRadius: 6,
    color: primaryColor,
    borderColor: errorColor,
    selectionColor: errorColor,
  },

  appInput: {
    height: 40,
    margin: appMargin,
    marginBottom: appMargin,
    borderWidth: 2,
    padding: appPadding,
    borderRadius: 6,
    color: primaryColor,
    borderColor: 'blue',
  },

  appInputError: {
    height: 10,
    margin: 0,
    fontWeight: labelWeight,
    fontSize: 10,
    paddingStart: appPadding,
    color: errorColor,
  },

  appFieildWrapper:{
    margin:appMargin,
  },

  appFieldLabel: {
    padding:5,
    paddingStart:10,
    paddingEnd:10,
    fontWeight:labelWeight,
    borderTopStartRadius:6,
    borderTopEndRadius:6,
    borderWidth:2,
    borderBottomWidth:0,
    color: primaryColor,
    borderColor: primaryColor,
  },

  appFieldContent:{
    padding:10,
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
    borderTopStartRadius:0,
    color: primaryColor,
    borderColor: primaryColor,
  },

})
