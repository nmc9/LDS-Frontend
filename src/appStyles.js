import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  appButton: {
    minWidth:80,
    flex:1,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 15,
    borderRadius: 6,
    borderColor:'lightblue',
    alignItems:"center",
    flexDirection:'row',
    backgroundColor: "darkblue",
    justifyContent:'center',
  },

  appButtonText:{
    fontWeight: 600,
    color:"lightgrey"
  },


  appInputWithError:{
    height: 40,
    margin: 12,
    marginBottom:2,
    borderWidth: 2,
    padding: 15,
    borderRadius: 6,
    color:'darkblue',
    borderColor:'darkred',
    selectionColor:'darkred'
  },

  appInput: {
    height: 40,
    margin: 12,
    marginBottom: 12,
    borderWidth: 2,
    padding: 15,
    borderRadius: 6,
    color:'darkblue',
    borderColor:'blue',
  },

  appInputError:{
    height:10,
    margin:0,
    fontWeight:600,
    fontSize:10,
    paddingStart: 15,
    color:'darkred',
  }

});