import React, { useState, useEffect } from "react";
import { Box, Heading, AspectRatio, Image, Text, Center, HStack, Stack, NativeBaseProvider, Button } from "native-base";
import { useNavigation, useRoute, useIsFocused } from "@react-navigation/native";
import * as LocalAuthentication from 'expo-local-authentication';

function Delete() {

  const navigation = useNavigation(); // Obtiene el objeto de navegación

  const route = useRoute();
  const userId = route.params?.userId;
  const recId = route.params?.recuerdoId;
  const isFocused = useIsFocused(); // Obtiene el estado de enfoque de la pantalla

  const [recuerdo, setRecuerdo] = useState([]); // Estado para almacenar recuerdo

  useEffect(() => {
    if (isFocused) {
      fetchRecuerdo(recId);
    }
  }, [isFocused, recId, userId]);

  const fetchRecuerdo = async (rec) => {
    try {
      const response = await fetch(`https://practica2.fly.dev/recuerdo/${rec}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      setRecuerdo(json);
    } catch (error) {
      console.log("Error al obtener recuerdo:", error);
    }
  };

  const confirmDel = async () => {
    try {
      const hasHardwareSupport = await LocalAuthentication.hasHardwareAsync();
      if (hasHardwareSupport) {
          const isEnrolled = await LocalAuthentication.isEnrolledAsync();
          if (isEnrolled) {
              const result = await LocalAuthentication.authenticateAsync({
                  promptMessage: "se elimina con huella digital",
              });
              if (result.success) {
                  console.log("Se va a borrar el recuerdo");
                  delRecuerdo(recId); // Realizar el inicio de sesión si la autenticación es exitosa
              } else {
                  console.log("Error en la deteccion de huella");
              }
          } else {
              console.log("No hay huellas digitales registradas en el dispositivo");
          }
      } else {
          console.log("El dispositivo no tiene soporte para huella digital");
      }
  } catch (error) {
      console.log("Error en la confirmacion con huella digital:", error);
  }
  }

  const delRecuerdo = async(id) => {
    try {
      const response = await fetch(
        `https://practica2.fly.dev/delete-recuerdo/${id}`, // Cambia la URL y la ruta según tu servidor
      {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
      }
      );        
      const json = await response.json();
      if (response.ok) {
          console.log('Recuerdo eliminado exitosamente');
      } else {
          console.log('Error al eliminar recuerdo:', json.message);
      }
    } catch (error) {
      console.log(error);
    }
    navigation.navigate("inicio",{userId})
      return json;
  };

    const handleRegresa = () => {
        // Navega a la pantalla de registro (Registra)
        navigation.navigate("inicio");
    };

    return <Center>
    <Box alignItems="center">
    <Heading>
      <Text color="emerald.500"> chismeApp</Text>
    </Heading>
    <Heading mt="3" _dark={{
      color: "warmGray.200"
    }} color="coolGray.600" fontWeight="medium" size="sm">
        Eliminar Recuerdo:
    </Heading>
    <Heading mt="3" _dark={{
      color: "warmGray.200"
    }} color="coolGray.600" fontWeight="medium" size="sm">
        ¿Está seguro que desea eliminar el siguiente recuerdo...?
    </Heading>

    <Box maxW="80" rounded="lg" overflow="hidden" borderColor="coolGray.200" mt="6" borderWidth="1" _dark={{
    borderColor: "coolGray.600",
    backgroundColor: "gray.700"
    }} _web={{
        shadow: 2,
        borderWidth: 0
    }} _light={{
        backgroundColor: "gray.50"
    }}>
    <Stack p="4" space={3}>
        <Stack space={2}>
            <Heading size="md" ml="-1">
                {recuerdo.length > 0 ? recuerdo[0].titulo : ""}
            </Heading>
        </Stack>
        <Text fontWeight="400">
            {recuerdo.length > 0 ? recuerdo[0].descripcion : ""}
        </Text>
        <Text> Fecha de creacion: {recuerdo.length > 0 ? recuerdo[0].fecha : ""}</Text>
        <Stack
        mb="2.5"
        mt="1.5"
        direction={{ base: "column", md: "row" }} // Aquí se establece "row" para que los botones se posicionen horizontalmente en pantallas grandes
        space={2}
        mx={{ base: "auto", md: "0" }}
        justifyContent={{ base: "flex-start", md: "center" }} // Alinea los botones horizontalmente en el eje principal
        alignItems={{ base: "flex-start", md: "center" }} // Alinea los botones verticalmente en el eje cruzado
        >
          <Button size="md" onPress={() => confirmDel()}>Si, eliminalo</Button>
          <Button size="md" colorScheme="secondary" onPress={handleRegresa}>
            No, regresa
          </Button>
        </Stack>
    </Stack>
    </Box>
</Box>;
</Center>
}

export default Delete;