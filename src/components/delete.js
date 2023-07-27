import React from "react";
import { Box, Heading, AspectRatio, Image, Text, Center, HStack, Stack, NativeBaseProvider, Button } from "native-base";
import { useNavigation } from "@react-navigation/native";

function Delete() {

    const navigation = useNavigation(); // Obtiene el objeto de navegación

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
                Nombre del recuerdo
            </Heading>
        </Stack>
        <Text fontWeight="400">
            En este apartado deberá de ir la descripción que el usuario realice según cada recuerdo que vaya guardando.
        </Text>
        <Text> Fecha de creacion:</Text>
        <Stack
        mb="2.5"
        mt="1.5"
        direction={{ base: "column", md: "row" }} // Aquí se establece "row" para que los botones se posicionen horizontalmente en pantallas grandes
        space={2}
        mx={{ base: "auto", md: "0" }}
        justifyContent={{ base: "flex-start", md: "center" }} // Alinea los botones horizontalmente en el eje principal
        alignItems={{ base: "flex-start", md: "center" }} // Alinea los botones verticalmente en el eje cruzado
        >
          <Button size="md" href="#">Si, eliminalo</Button>
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