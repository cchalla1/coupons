import React from 'react';
import {StyleSheet} from 'react-native';
import LoginScreen from './app/components/Login';
import RegisterScreen from './app/components/Register';
import HomeScreen from './app/components/Home';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  // const [loggedIn, setLoggedIn] = useState(false);
  // const [user, setUser] = useState();
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    // <View style={styles.container}>
    //   {!loggedIn ? (
    //     <Login isLoggedIn={setLoggedIn} user={setUser} />
    //   ) : (
    //     <Text>{user}</Text>
    //   )}
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 30,
  },
});
