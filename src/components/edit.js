import React, { useState, useEffect } from "react";
import { Box, Text, Heading, VStack, FormControl, Input, Button, Center } from "native-base";
import { useRoute, useIsFocused, useNavigation } from "@react-navigation/native";

function Edit() {
  const route = useRoute();
  const userId = route.params?.userId;
  const recId = route.params?.recuerdoId;

  const navigation = useNavigation(); // Obtiene el objeto de navegación

  const [recuerdo, setRecuerdo] = useState([]); // Estado para almacenar recuerdo

  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split("T")[0];

  const isFocused = useIsFocused(); // Obtiene el estado de enfoque de la pantalla

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

  const editRecuerdo = async (recid, tit, desc, not, fech, id) => {
    try {
      const response = await fetch(`https://practica2.fly.dev/update-recuerdo/${recid}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          titulo: tit,
          descripcion: desc,
          notas: not,
          fecha: fech,
          id_user: id,
        }),
      });
      const json = await response.json();
      console.log("Se actualizó el recuerdo", formattedDate);
      console.log(response);
      navigation.navigate("inicio",{userId})
      return json;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Center w="100%">
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading>
          <Text color="emerald.500"> chismeApp</Text>
        </Heading>
        <Heading mt="1" _dark={{ color: "warmGray.200" }} color="coolGray.600" fontWeight="medium" size="sm">
          Editar recuerdo
        </Heading>

        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Titulo del recuerdo</FormControl.Label>
            <Input
              value={recuerdo.length > 0 ? recuerdo[0].titulo : ""}
              onChangeText={(text) => setRecuerdo([{ ...recuerdo[0], titulo: text }])}
              placeholder="Ponle un titulo al recuerdo"
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>descripción</FormControl.Label>
            <Input
              value={recuerdo.length > 0 ? recuerdo[0].descripcion : ""}
              onChangeText={(text) => setRecuerdo([{ ...recuerdo[0], descripcion: text }])}
              placeholder="Describe tu recuerdo"
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Notas:</FormControl.Label>
            <Input
              value={recuerdo.length > 0 ? recuerdo[0].notas : ""}
              onChangeText={(text) => setRecuerdo([{ ...recuerdo[0], notas: text }])}
              placeholder="Puedes agregar notas adicionales"
            />
          </FormControl>
          <Button
            onPress={() =>
              editRecuerdo(recId, recuerdo[0].titulo, recuerdo[0].descripcion, recuerdo[0].notas, formattedDate, userId)
            }
            mt="2"
            colorScheme="indigo"
          >
            Guardar Recuerdo
          </Button>
        </VStack>
      </Box>
    </Center>
  );
}

export default Edit;
