import { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Alert, FlatList, Text, View } from "react-native";
import { Dialog, Icon, Image, ListItem } from "react-native-elements";
import { styles } from "./styles";
import * as SQLite from 'expo-sqlite'
import { SavedSubsContext } from "../util/SavedSubsProvider";
import DateC from "./DateC";

const db = SQLite.openDatabase('subreddits.db');

export default function Subreddit( props ){

    const [threads, setThreads] = useState([]);
    const [isSaved, setSaved] = useState(false);
    const {savedSubs, setSavedSubs} = useContext(SavedSubsContext)
    const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
    const [listing, setListing] = useState('');

    //console.log('---------------subreddit-props------------');
    //console.log(props);

    const subreddit = props.route.name.toLowerCase();
    const limit = 50;

    useEffect(()=>{
        updateSavedSubredditList();
        checkSaved();
        setListing('hot');
    },[]);

    useEffect(()=>{
        fetchThreads();
    },[listing]);

    const updateSavedSubredditList = () => {
        db.transaction( tx => {
            tx.executeSql('select * from subreddit;', [], (_, { rows }) => 
                setSavedSubs(rows._array)
            );
        }, null, null)
        //console.log(savedSubs)
    };

    const saveItem = () => {
        db.transaction( tx => {
            tx.executeSql('insert into subreddit (name) values (?);',
                [subreddit]);
        }, null, updateSavedSubredditList)
    };

    const deleteItem = () => {
        db.transaction( tx => {
            tx.executeSql('delete from subreddit where name = ?;', [subreddit]);
        }, null, updateSavedSubredditList )
    };

    const checkSaved = () => {
        savedSubs.forEach(element => {
            if (element.name == subreddit){
                setSaved(true);
                return;
            }
        });
    }

    const fetchThreads = () => {
        //console.log('finding list of subreddit threads; request made to:')
        //console.log(`https://www.reddit.com/r/${subreddit}/${listing}.json?limit=${limit}`)
        fetch(`https://www.reddit.com/r/${subreddit}/${listing}.json?limit=${limit}`)
            .then( response => response.json() )
            .then( resData => {
                setThreads(resData.data.children)
            })
            .catch( e => Alert.alert('Error', e) );
    }

    const handleListItemPress = (item) => {
        //console.log(item.data.id);
        props.navigation.navigate('Post', {subreddit: subreddit, id:item.data.id})
    }

    const handleSave = () => {
        saveItem();
        setSaved(true);
    }

    const handleRemove = () => {
        deleteItem();
        setDeleteDialogVisible(false);
        setSaved(false);
    }

    const toggleDeleteDialog = () => {
        setDeleteDialogVisible(!deleteDialogVisible);
    };

    return (
        <View style={styles.subreddit}>
            <View style={{flexDirection:"row", alignItems:'center'}}>
                
                <Text 
                    style={listing=='hot'?styles.listingSelected:styles.listing}
                    onPress={() => setListing('hot')}
                >  HOT</Text>
                <Text 
                    style={listing=='rising'?styles.listingSelected:styles.listing}
                    onPress={() => setListing('rising')}
                >  RISING</Text>
                <Text 
                    style={listing=='new'?styles.listingSelected:styles.listing}
                    onPress={() => setListing('new')}
                >  NEW</Text>
                
                { //icon button according to whether open subreddit is saved to local storage
                isSaved?
                <Icon
                    reverse
                    name='delete'
                    color='#a00'
                    onPress={toggleDeleteDialog}
                />
                :
                <Icon
                    reverse
                    name='add'
                    color='#0a7'
                    onPress={handleSave}
                />
                }
            </View>
            <View style={styles.sublist}>
                <FlatList
                    data={threads}
                    renderItem={ ({ item }) => (
                        <ListItem topDivider onPress={() => handleListItemPress(item)}>
                            {
                            item.data.thumbnail!=''&&item.data.thumbnail!='self'&&item.data.thumbnail!='default'?
                                <Image
                                    source={{uri: item.data.thumbnail}}
                                    containerStyle={styles.thumbnail}
                                    PlaceholderContent={<ActivityIndicator />}
                                />
                            :null
                            }
                            <View style={styles.listItem}>
                                <ListItem.Content>
                                    <ListItem.Title style={styles.subredditTitle}>{item.data.title}</ListItem.Title>
                                    <ListItem.Subtitle style={styles.subredditSubtitle}>
                                        <Icon
                                            name='thumb-up'
                                            color='#aaa'
                                        />
                                        <Text> {item.data.score}</Text>
                                        <Text>   </Text>
                                        <Icon
                                            name='division'
                                            type='material-community'
                                            color='#aaa'
                                        />
                                        <Text> {item.data.upvote_ratio}</Text>
                                        <Text>   </Text>
                                        <Icon
                                            name='comment'
                                            color='#aaa'
                                        />
                                        <Text> {item.data.num_comments}</Text>
                                        
                                    </ListItem.Subtitle>
                                    <ListItem.Subtitle>
                                        <Text><DateC time={item.data.created}/>     u/{item.data.author}</Text>
                                    </ListItem.Subtitle>
                                </ListItem.Content>
                            </View>
                        </ListItem>
                    )}
                    keyExtractor={ (item, index) => index.toString() }
                />
            </View>
            <Dialog
                isVisible={deleteDialogVisible}
                onBackdropPress={toggleDeleteDialog}
            >
                <Dialog.Title title="Confirm removal"/>
                    <Text style={{fontSize:24}}>Remove subreddit {subreddit} from favourites?</Text>
                <Dialog.Actions>
                    <Dialog.Button title="Remove" onPress={handleRemove}/>
                    <Dialog.Button title="Keep" onPress={toggleDeleteDialog}/>
                </Dialog.Actions>
            </Dialog>
        </View>
    )
}