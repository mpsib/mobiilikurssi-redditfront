import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },

    
    //search
    homecontainer: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'space-around',
      width:'100%',
    },
    searchbar: {flex:2, width:'80%', justifyContent:'flex-end' },
    searchbutton: {flex:2, width:'40%', margin:10, justifyContent:'flex-start'},
    list: {flex:2, width:'100%', height:'100%'},

    //subreddit
    sublist: {flex:1, width:'100%', height:'100%'},
    thumbnail: {
      height:100,
      flex:1,
    },
    listItem: {
      flex:5, 
      height:150,
    },
    subreddit: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center', 
      alignItems:'flex-end', 
      paddingRight:20
    },
    subredditTitle:{fontSize:18},
    subredditSubtitle:{fontSize:16},
    listing: {fontSize:18, flex:1, paddingLeft:20, },
    listingSelected: {fontSize:22, flex:1, paddingLeft:20, fontWeight:'bold', borderWidth:1, borderRadius:20},

    //thread
    postContainer: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      width:'100%',
      flexDirection:'row',
    },
    post: {
      width:'100%',
      borderWidth: 2,
      padding:5,
    },
    comment:{
      borderLeftWidth: 2,
      borderBottomWidth: 2,
      borderColor: '#55f',
      width:'100%',
      marginLeft:2,
      marginTop:5,
      padding:5,
    },
    comments:{
      width:'100%',
    },
    postImage: {
      flex:1,
    },
  });