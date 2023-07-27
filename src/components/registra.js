import React, { useState } from "react";
import { Box, Text, Heading, VStack, FormControl, Input, Link, Button, HStack, Center, NativeBaseProvider } from "native-base";

function Registra() {

      // Estados para los campos del formulario
    const [nombre, setNombre] = useState("");
    const [apellidoPaterno, setApellidoPaterno] = useState("");
    const [apellidoMaterno, setApellidoMaterno] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleCrearPerfil = () => {
    // Aquí puedes realizar la lógica para crear el perfil utilizando los valores de los campos del formulario
    if (password === confirmPassword){
        console.log("Bienvenido a chismeApp")
    } else{
        console.log('Passwords no coinciden')
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
          <Input value={apellidoPaterno} onChangeText={(text) => setApellidoPaterno(text)} placeholder="Ingresa tu apellido paterno" />
        </FormControl>
        <FormControl>
          <FormControl.Label>Apellido Materno</FormControl.Label>
          <Input value={apellidoMaterno} onChangeText={(text) => setApellidoMaterno(text)} placeholder="Ingresa tu apellido materno" />
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
        <Button onPress={handleCrearPerfil} mt="2" colorScheme="indigo">
          Crear perfil
        </Button>
      </VStack>
    </Box>
  </Center>;
}

export default Registra;