import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function StackNav({ route }) {
  const Stack = createNativeStackNavigator();
  const { name } = route.params

  // add subreddit stuff to components
  return (
    <Stack.Navigator>
      <Stack.Screen name={'Sub: '+name} component={Thread} />
      <Stack.Screen name={'Comments: '+name} component={ThreadComment} />
    </Stack.Navigator>
  )
}