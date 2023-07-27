import React, { useState } from "react";
import { Box, Text, Heading, VStack, FormControl, Input, Link, Button, HStack, Center, NativeBaseProvider } from "native-base";

function Edit() {

    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];
    // Estados para los campos del formulario
    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [notas, setNotas] = useState("");
    const [fecha, setFecha] = useState(formattedDate);

    const handleEditRecuerdo = () => {
    // Aquí puedes realizar la lógica para crear el perfil utilizando los valores de los campos del formulario
    console.log('Se guardó tu recuerdo: ',titulo)
    };

    return <Center w="100%">
    <Box safeArea p="2" py="8" w="90%" maxW="290">
      <Heading>
      <Text color="emerald.500"> chismeApp</Text>
      </Heading>
      <Heading mt="1" _dark={{
      color: "warmGray.200"
    }} color="coolGray.600" fontWeight="medium" size="sm">
        Editar recuerdo
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
        <Button onPress={handleEditRecuerdo} mt="2" colorScheme="indigo">
          Editar Recuerdo
        </Button>
      </VStack>
    </Box>
  </Center>;
}

export default Edit;