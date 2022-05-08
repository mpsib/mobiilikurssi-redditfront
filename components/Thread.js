import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, FlatList, Linking, Text, View } from "react-native";
import { Image, ListItem } from "react-native-elements";
import { styles } from "./styles";
import { Dimensions } from 'react-native';
import DateC from "./DateC";

export default function Thread( props ){
    const [comments, setComments] = useState([]);

    //console.log(props.route.params);
    const subreddit = props.route.params.subreddit;
    const postId = props.route.params.id;

    useEffect(()=>{
        fetchComments();
    },[]);

    const fetchComments = () => {
        //console.log('finding list of comments; request made to:')
        console.log(`https://www.reddit.com/r/${subreddit}/comments/${postId}.json`)
        fetch(`https://www.reddit.com/r/${subreddit}/comments/${postId}.json`)
            .then( response => response.json() )
            .then( resData => {
                setComments(resData)
                //console.log(resData[0])
            })
            .catch( e => Alert.alert('Error', e) );
    }

    
    
    //comments[0] on itse postaus
    //comments[1] on kommentit
    //flatlistien käyttö koko sivun scrollausta varten
    return (
        <View style={styles.postContainer} >
            <FlatList
                data={comments}
                keyExtractor={ (item, index) => index.toString() }
                renderItem={ ({ item }) => (
                    //ylätason flatlist erottaa postauksen ja kommentit
                    item.data.children[0]? // <- tämä koska jos postauksessa ei ole kommentteja, kaatuisi ohjelma muuten
                        item.data.children[0].kind == 't3'?
                            <Post item={item.data.children}/>
                            :item.data.children[0].kind == 't1'?
                                //kommenttilista
                                <View style={styles.comments}>
                                    {
                                    item.data.children?
                                    <FlatList
                                    data={item.data.children}
                                    keyExtractor={ (item, index) => index.toString() }
                                    renderItem={ ({ item }) => (
                                        <Comment item={item} indent={0}/>
                                    )}
                                />
                            :null
                            }
                            </View>
                        :null
                    :null
                )}
            />
        </View>
    );
}

function Post( props ){
    let data = props.item[0].data;
    let areaWidth = Dimensions.get('window').width - 50;
    console.log(data.title)
    console.log(data.url)

    const handlePressPost = () => {
        //open browser if url
        if (data.url){

            Linking.openURL(data.url);
        }
    }

    return (
        <View style={styles.post}>
            

            <Text style={{fontSize:24}}>{data.title}</Text>
            <Text style={{fontSize:18, color:'#aaa'}}>   u/{data.author}   <DateC time={data.created}/></Text>
            {
            data.url.endsWith('jpg')||data.url.endsWith('png')?
            <Image
            source={{uri: data.url}}
            containerStyle={{...styles.postImage,
                width:data.preview.images[0].source.width>areaWidth?
                areaWidth:
                preview.images[0].source.width,
                aspectRatio:data.preview.images[0].source.width/data.preview.images[0].source.height}}
                PlaceholderContent={<ActivityIndicator />}
            /> :null
            }
            {
            data.selftext?
            <Text style={{fontSize:20}}>{data.selftext}</Text> :null
            }
            {
            data.url?
            <ListItem onPress={handlePressPost}>
                <Text style={{fontSize:20, color:'#00a', paddingTop:10}}>{data.url}</Text> 
            </ListItem>:null
            }
            
            <Text style={{fontSize:18, color:'#999'}}>  score: {data.score}  |  comments: {data.num_comments}</Text>
            
        </View>
    );
}

function Comment( props ){
    let areaWidth = Dimensions.get('window').width;
    let indentation = props.indent * 20;
    return (
        <>
            <View style={{...styles.comment, 
                marginLeft:styles.comment.marginLeft+indentation, 
                width:areaWidth-indentation}}>
                <ListItem>
                    <ListItem.Content>
                        <ListItem.Subtitle>
                            u/{props.item.data.author}
                        </ListItem.Subtitle>
                        <ListItem.Title style={{fontSize:20}}>
                            {props.item.data.body}
                        </ListItem.Title>
                        <ListItem.Subtitle>
                            score: {props.item.data.score}  //  <DateC time={props.item.data.created}/>
                        </ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            </View>
    
                {
                props.item.data.replies?
                //luodaan kommenttikomponentit vastauksista
                <FlatList
                    data={props.item.data.replies.data.children}
                    keyExtractor={ (item, index) => index.toString() }
                    renderItem={ ({ item }) => (
                        <Comment item={item} indent={props.indent +1}/>
                    )}
                />
                : null
                }
        </>
    );
}