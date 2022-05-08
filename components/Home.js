import { createDrawerNavigator } from "@react-navigation/drawer";
import SearchStack from "./SearchStack";
import SubredditStack from "./SubredditStack";
import * as SQLite from 'expo-sqlite'
import { useContext, useEffect } from "react";
import { SavedSubsContext } from "../util/SavedSubsProvider";

const db = SQLite.openDatabase('subreddits.db');

const Drawer = createDrawerNavigator();

export default function Home(){
    
    const {savedSubs, setSavedSubs} = useContext(SavedSubsContext)

    useEffect(()=>{
        /*
        // for resetting table during dev
        db.transaction( tx => {
            tx.executeSql('drop table if exists subreddit');
        }, null, null);
        */

        db.transaction( tx => {
            tx.executeSql('create table if not exists subreddit (name text primary key not null);');
        }, null, updateList);

    },[]);

    const updateList = () => {
        db.transaction( tx => {
            tx.executeSql('select * from subreddit;', [], (_, { rows }) => 
                setSavedSubs(rows._array)
            );
        }, null, null)
        //console.log(savedSubs)
    };

    return (
        <Drawer.Navigator backBehavior="firstRoute">
            <Drawer.Screen name='Home' component={SearchStack}  options={{ title: 'Frontreader' }}/>
            {savedSubs.map(sub=><Drawer.Screen name={sub.name} component={SubredditStack}/>)}
        </Drawer.Navigator>
    )
    
}