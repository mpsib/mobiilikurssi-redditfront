import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Search from "./Search";
import SubredditStack from "./SubredditStack";

const Stack = createNativeStackNavigator();

export default function SearchStack( props ) {

    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Search} options={{ headerShown: false }}/>
            <Stack.Screen name="Subreddit" component={SubredditStack} options={{ headerShown: false }}/>
        </Stack.Navigator>
    );
}