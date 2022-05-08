import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Subreddit from "./Subreddit";
import Thread from "./Thread";

const Stack = createNativeStackNavigator();

export default function SubredditStack( props ) {
    //console.log( '--- subreddit stack ---' )
    //console.log( props )

    const subredditName = props.route.params? props.route.params.name: props.route.name;
    return (
        <Stack.Navigator>
            <Stack.Screen name={subredditName} component={Subreddit}/>
            
            <Stack.Screen name="Post" component={Thread}/>
        </Stack.Navigator>
    );
}