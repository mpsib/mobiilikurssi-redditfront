import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import Home from "./components/Home";
import { SearchContextProvider } from './util/SearchContextProvider';
import { SavedSubsProvider } from './util/SavedSubsProvider';


export default function App() {
  
  return (
    <SavedSubsProvider>
      <SearchContextProvider>
        <NavigationContainer>
          <Home/>
        </NavigationContainer>
      </SearchContextProvider>
    </SavedSubsProvider>
  );
}


