import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './pages/login';
import DadosBasicos from './pages/cadastro/dadosBasicos';
import DadosContato from './pages/cadastro/dadosContato';
import GlobalStyles from './styles/globalStyles';
import CadastroProvider from './context/providers/cadastroProvider';


  
const Stack = createStackNavigator();

const App = (navigation) => {

  return (
    <NavigationContainer>
      <CadastroProvider>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: GlobalStyles.Colors.HEADER_BACKGROUND,
            },
            headerTintColor: GlobalStyles.Colors.HEADER_TINT,
            headerTitleStyle: {
              //fontWeight: 'bold',
            },
          }}
        >
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ title: 'Login', headerShown: false}}
            />
             <Stack.Screen
              name="Register"
              component={DadosBasicos}
              options={{ title: 'Register'}}
            />
            <Stack.Screen
              name="ContactInfo"
              component={DadosContato}
              options={{ title: 'Contact'}}
            />
        </Stack.Navigator>
      </CadastroProvider>
        
    </NavigationContainer>
        
  );
};

const styles = StyleSheet.create({
  
});

export default App;
