import React, { useState } from "react";
import { Box, Text, Heading, VStack, FormControl, Input, Link, Button, HStack, Center, NativeBaseProvider } from "native-base";

function Registra() {

  // Estados para los campos del formulario
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const sendUser = async(nom,ape,corr,pass) => {
    try {
      const response = await fetch(
      'https://practica2.fly.dev/insert-user',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nombres: nom,
          apellidos: ape,
          correo:corr,
          contrasena:pass,
        })
      }
      );
      const json = await response.json();
      console.log('Se registro')
      console.log(response); // Agrega esta línea para imprimir la respuesta
      return json;
      } catch (error) {
        console.log(error)
      }
  };
    
    return <Center w="100%">
    <Box safeArea p="2" py="8" w="90%" maxW="290">
      <Heading>
      <Text color="emerald.500"> chismeApp</Text>
      </Heading>
      <Heading mt="1" _dark={{
      color: "warmGray.200"
    }} color="coolGray.600" fontWeight="medium" size="sm">
        ¡Registrate!
      </Heading>
  
      <VStack space={3} mt="5">
        <FormControl>
          <FormControl.Label>Nombre(s)</FormControl.Label>
          <Input value={nombre} onChangeText={(text) => setNombre(text)} placeholder="Ingresa tu(s) nombre(s)" />
        </FormControl>
        <FormControl>
          <FormControl.Label>Apellido Paterno</FormControl.Label>
          <Input value={apellidos} onChangeText={(text) => setApellidos(text)} placeholder="Ingresa tu apellido paterno" />
        </FormControl>
        <FormControl>
          <FormControl.Label>E-mail</FormControl.Label>
          <Input value={email} onChangeText={(text) => setEmail(text)} placeholder="Ingresa tu e-mail" />
        </FormControl>
        <FormControl>
          <FormControl.Label>Password</FormControl.Label>
          <Input value={password} onChangeText={(text) => setPassword(text)} type="password"  placeholder="Ingresa tu password"/>
        </FormControl>
        <FormControl>
          <FormControl.Label>Confirmar Password</FormControl.Label>
          <Input value={confirmPassword} onChangeText={(text) => setConfirmPassword(text)} type="password"  placeholder="Confirma tu password"/>
        </FormControl>
        <Button onPress={() => sendUser(nombre, apellidos, email, password)} mt="2" colorScheme="indigo">
          Crear perfil
        </Button>
      </VStack>
    </Box>
  </Center>;
}

export default Registra;