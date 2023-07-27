import React, { useState } from "react";
import { Button } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./src/components/login";
import Registra from "./src/components/registra";
import Inicio from "./src/components/inicio";
import Recuerdo from "./src/components/recuerdo";
import Edit from "./src/components/edit";
import Delete from "./src/components/delete";

const Tab = createBottomTabNavigator();

export default function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Función para cambiar el estado isLoggedIn cuando el usuario inicie sesión
  const handleLogin = () => {
    console.log("Bienvenido a chismeApp");
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Tab.Navigator initialRouteName="inicio">
          <Tab.Screen
            name="inicio"
            component={Inicio}
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
          options={{
            headerRight: () => (
              <Button onPress={handleLogout} colorScheme="red" title="Cerrar Sesión" />
            ),
          }} />
        </Tab.Navigator>
      ) : (
        <Login handleLogin={handleLogin} />
      )}
    <Tab.Screen name="registra" component={Registra} />
    </NavigationContainer>
  );
}
