import React, { useState } from "react";
import { Button } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, createNavigationContainerRef  } from "@react-navigation/native";
import Registra from './src/components/registra';
import Inicio from "./src/components/inicio";
import Recuerdo from "./src/components/recuerdo";
import Edit from "./src/components/edit";
import Delete from "./src/components/delete";
import Login from "./src/components/login";

const Tab = createBottomTabNavigator();

export const navigationRef = createNavigationContainerRef()

export default function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  // Función para cambiar el estado isLoggedIn cuando el usuario inicie sesión
  const handleLogin = (userId) => {
    console.log("Bienvenido a chismeApp");
    setIsLoggedIn(true);
    setUserId(userId); // Guarda el userId en el estado
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <NavigationContainer ref={navigationRef}>
      {isLoggedIn ? (
        <Tab.Navigator initialRouteName="inicio">
          <Tab.Screen
            name="inicio"
            component={Inicio}
            initialParams={{ userId }} // Añade esta línea para pasar el userId como parámetro inicial
            options={{
              headerRight: () => (
                <Button onPress={handleLogout} colorScheme="red" title="Cerrar Sesión" />
              ),
            }}
          />
          <Tab.Screen name="recuerdo" component={Recuerdo}
          options={{
            headerRight: () => (
              <Button onPress={handleLogout} colorScheme="red" title="Cerrar Sesión" />
            ),
          }} />
          <Tab.Screen listeners={{
            tabPress: (e) => {
              e.preventDefault(); // Evita la navegación
            },
          }} 
          name="edit" 
          component={Edit}
          initialParams={{ userId }} // Añade esta línea para pasar el userId como parámetro inicial
          options={{
            headerRight: () => (
              <Button onPress={handleLogout} colorScheme="red" title="Cerrar Sesión" />
            ),
          }} />
          <Tab.Screen listeners={{
            tabPress: (e) => {
              e.preventDefault(); // Evita la navegación
            },
          }} 
          name="delete" 
          component={Delete}
          initialParams={{ userId }} // Añade esta línea para pasar el userId como parámetro inicial
          options={{
            headerRight: () => (
              <Button onPress={handleLogout} colorScheme="red" title="Cerrar Sesión" />
            ),
          }} />
        </Tab.Navigator>
      ) : (
        <Tab.Navigator>
          <Tab.Screen name="login">
            {() => <Login handleLogin={handleLogin} />}
          </Tab.Screen>
          <Tab.Screen name="registra" component={Registra} />
        </Tab.Navigator>)
      }
    </NavigationContainer>
  );
}
