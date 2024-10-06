import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import { Home, AddBalance, AddExpense, Login, Signup } from './screens';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  function onAuthStateChanged(user: any) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? 'Home' : 'Login'}>
        {!user ? (
          <>
            <Stack.Screen name="Login" component={Login}
              options={{
                headerShown: false,
              }} />
            <Stack.Screen name="Signup" component={Signup}
              options={{
                headerShown: false,
              }} />
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={Home}
              options={{
                headerShown: false,
              }} />
            <Stack.Screen name="AddBalance" component={AddBalance}
              options={{
                headerShown: false,
              }} />
            <Stack.Screen name="AddExpense" component={AddExpense}
              options={{
                headerShown: false,
              }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
