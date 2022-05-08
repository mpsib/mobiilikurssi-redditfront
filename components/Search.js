import { useContext, useState } from "react";
import { Alert, FlatList, Text, View } from "react-native";
import { Button, Input, ListItem } from "react-native-elements";
import { SearchContext } from "../util/SearchContextProvider";
import { styles } from "./styles";

export default function Search( props ) {
    const [inputText, setInputText] = useState('');
    const {searchResults, setSearchResults} = useContext(SearchContext)

    const searchUrl = 'https://www.reddit.com/subreddits/search.json?q='

    const getSubreddits = () => {
        if (inputText.length > 0){
            fetch(searchUrl + inputText)
                .then( response => response.json() )
                .then( resData => setSearchResults(resData.data.children) )
                .catch( e => Alert.alert('Error', e) );
        }
    }

    const handlePress = (subreddit) => {
        props.navigation.navigate('Subreddit', {name: subreddit})
    }

    return (
        <View style={styles.container}>
            <View style={styles.homecontainer}>
                <View style={{flex:1}}></View>
                <View style={styles.searchbar}>
                    <Input 
                        label = 'Subreddit'
                        placeholder = "Input Subreddit Name"
                        labelStyle={{fontSize:22}}
                        inputStyle={{fontSize:20}}
                        onChangeText = { text => setInputText(text) }
                        value = {inputText}
                        />
                </View>

                <View style={styles.searchbutton}>
                    <Button  titleStyle={{fontSize:16}}
                        title='Search'
                        icon={{name: 'search', color:'white'}}
                        onPress={getSubreddits}
                        />
                </View>
            </View>

            <View style={styles.list}>
                {
                    //list all results
                    //press result to navigate to sub
                }    
                <FlatList
                    data={searchResults}
                    renderItem={ ({ item }) => (
                        <ListItem topDivider onPress={() => handlePress(item.data.display_name)}>
                            <ListItem.Content>
                                <ListItem.Title style={{fontSize:24}}>{item.data.display_name}</ListItem.Title>
                                <ListItem.Subtitle style={{fontSize:20}}>{item.data.title}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    )}
                    keyExtractor={ (item, index) => index.toString() }
                />
            </View>

        </View>
    )
}