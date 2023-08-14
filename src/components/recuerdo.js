import React, { useState } from "react";
import { Box, Text, Heading, VStack, FormControl, Input, Link, Button, HStack, Center, NativeBaseProvider } from "native-base";
import { useNavigation, useRoute } from "@react-navigation/native";
import AwesomeAlert from 'react-native-awesome-alerts';



function Recuerdo() {

    const navigation = useNavigation(); // Obtiene el objeto de navegación

    const route = useRoute();
    const userId = route.params?.userId;

    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];
    // Estados para los campos del formulario
    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [notas, setNotas] = useState("");
    const [fecha, setFecha] = useState(formattedDate);

    const sendRecuerdo = async(tit,desc,not,fech,id) => {
      console.log(id);
      try {
        const response = await fetch(
        'https://practica2.fly.dev/insert-recuerdo',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            titulo:tit,
            descripcion:desc,
            notas:not,
            fecha:fech,
            id_user:id
          })
        }
        );        
        const json = await response.json();

        //ALERTA EXITO REGISTRAR
        setAlertMessage("Se ha registrado el recuerdo."); // Establecer mensaje de alerta
        setAlertVisible(true); // Mostrar la alerta
        //TERMINA ALERTA EXITO REGISTRAR

        console.log('Se registro el recuerdo',fecha)
        // Restablecer los estados a su valor inicial ("")
        setTitulo("");
        setDescripcion("");
        setNotas("");
        setFecha(formattedDate);
        // Agregar el mensaje de alerta al estado de la ruta antes de la redirección
        navigation.navigate("inicio", { userId, alertMessage: "Se ha registrado el recuerdo." });
        return json;
        } catch (error) {
          console.log(error)
        }
    };
    //constantes para alerts
    const [alertVisible, setAlertVisible] = useState(false); // Estado para la visibilidad de la alerta
    const [alertMessage, setAlertMessage] = useState(""); // Estado para el mensaje de la alerta
  


    return <Center w="100%">
    <Box safeArea p="2" py="8" w="90%" maxW="290">
      <Heading>
      <Text color="emerald.500"> chismeApp</Text>
      </Heading>
      <Heading mt="1" _dark={{
      color: "warmGray.200"
    }} color="coolGray.600" fontWeight="medium" size="sm">
        Crear recuerdo
      </Heading>
  
      <VStack space={3} mt="5">
        <FormControl>
          <FormControl.Label>Titulo del recuerdo</FormControl.Label>
          <Input value={titulo} onChangeText={(text) => setTitulo(text)} placeholder="Ponle un titulo al recuerdo" />
        </FormControl>
        <FormControl>
          <FormControl.Label>descripción</FormControl.Label>
          <Input value={descripcion} onChangeText={(text) => setDescripcion(text)} placeholder="Describe tu recuerdo" />
        </FormControl>
        <FormControl>
          <FormControl.Label>Notas:</FormControl.Label>
          <Input value={notas} onChangeText={(text) => setNotas(text)} placeholder="Puedes agregar notas adicionales" />
        </FormControl>
        <Button onPress={() => sendRecuerdo(titulo, descripcion, notas, fecha,userId)} mt="2" colorScheme="indigo">
          Guardar Recuerdo
        </Button>
      </VStack>

    </Box>

    {/* Alerta */}
    <AwesomeAlert
        show={alertVisible}
        showProgress={false}
        title="Éxito"
        message={alertMessage}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={true}
        confirmText="OK"
        confirmButtonColor="#50C878"
        onConfirmPressed={() => {
          setAlertVisible(false); // Ocultar la alerta al confirmar
        }}
      />
  </Center>;
}

export default Recuerdo;  