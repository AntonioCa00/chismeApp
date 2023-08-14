import React, { useState, useEffect } from "react";
import { Box, Heading, Text, Center, Stack, Button, ScrollView  } from "native-base";
import { useNavigation, useIsFocused, useRoute } from "@react-navigation/native";
import AwesomeAlert from 'react-native-awesome-alerts';


function Inicio() {

    const navigation = useNavigation(); // Obtiene el objeto de navegación
    const route = useRoute();
    const { userId, alertMessage,deleteAlertMessage } = route.params; // Extraer userId y alertMessage de los parámetros de ruta

    const [showAddEditAlert, setShowAddEditAlert] = useState(false);
    const [addEditAlertTitle, setAddEditAlertTitle] = useState("");
    const [addEditAlertText, setAddEditAlertText] = useState("");

    const [showDeleteAlert, setShowDeleteAlert] = useState(false);
    const [deleteAlertTitle, setDeleteAlertTitle] = useState("");
    const [deleteAlertText, setDeleteAlertText] = useState("");

    useEffect(() => {
        if (alertMessage) {
            setAddEditAlertTitle("Proceso exitoso!...");
            setAddEditAlertText(alertMessage);
            setShowAddEditAlert(true);
        }
    }, [alertMessage]);

    useEffect(() => {
        if (deleteAlertMessage) {
            setShowAddEditAlert(false);
            setAddEditAlertTitle("");
            setAddEditAlertText("");

            setDeleteAlertTitle("Proceso exitoso!...");
            setDeleteAlertText(deleteAlertMessage);
            setShowDeleteAlert(true);
        }
    }, [deleteAlertMessage]);



    const [recuerdos, setRecuerdos] = useState([]); // Estado para almacenar los recuerdos
    const isFocused = useIsFocused(); // Verifica si la pantalla tiene enfoque

    useEffect(() => {
        // Llama a la función que obtiene los recuerdos del usuario usando el userId
        fetchRecuerdos(userId);
    }, [userId, isFocused]);

    const fetchRecuerdos = async (userId) => {
        try {
            const response = await fetch(
                `https://practica2.fly.dev/recuerdos/${userId}`, // Cambia la URL a la correcta
                {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
            );
            const json = await response.json();
            setRecuerdos(json);
        } catch (error) {
            console.log('Error al obtener recuerdos:', error);
        }
    };

return (
    <ScrollView>
    <Center>
                <Heading size="lg" mb="4">
                    Bienvenido chisme amigo
                </Heading>

                {showAddEditAlert && (
                    <AwesomeAlert
                        show={true}
                        showProgress={false}
                        title={addEditAlertTitle}
                        message={addEditAlertText}
                        closeOnTouchOutside={true}
                        closeOnHardwareBackPress={false}
                        showCancelButton={false}
                        showConfirmButton={true}
                        confirmText="OK"
                        confirmButtonColor="#50C878"
                        onConfirmPressed={() => {
                            setShowAddEditAlert(false);
                        }}
                    />
                )}

                {showDeleteAlert && (
                    <AwesomeAlert
                        show={true}
                        showProgress={false}
                        title={deleteAlertTitle}
                        message={deleteAlertText}
                        closeOnTouchOutside={true}
                        closeOnHardwareBackPress={false}
                        showCancelButton={false}
                        showConfirmButton={true}
                        confirmText="OK"
                        confirmButtonColor="#50C878"
                        onConfirmPressed={() => {
                            setShowDeleteAlert(false);
                        }}
                    />
                )}
        {recuerdos.map((recuerdo, index) => (
            <Box
                key={index}
                maxW="80"
                rounded="lg"
                overflow="hidden"
                borderColor="coolGray.200"
                mt="6"
                borderWidth="1"
                _dark={{
                    borderColor: "coolGray.600",
                    backgroundColor: "gray.700"
                }}
                _web={{
                    shadow: 2,
                    borderWidth: 0
                }}
                _light={{
                    backgroundColor: "gray.50"
                }}
            >
                <Stack p="4" space={3}>
                    <Stack space={2}>
                        <Heading size="md" ml="-1">
                            {recuerdo.titulo}
                        </Heading>
                    </Stack>
                    <Text fontWeight="400">{recuerdo.descripcion}</Text>
                    <Text> Fecha de creacion: {recuerdo.fecha}</Text>
                    <Stack
                        mb="2.5"
                        mt="1.5"
                        direction={{ base: "column", md: "row" }}
                        space={2}
                        mx={{ base: "auto", md: "0" }}
                        justifyContent={{ base: "flex-start", md: "center" }}
                        alignItems={{ base: "flex-start", md: "center" }}
                    >
                        <Button size="md" 
                            onPress={() => navigation.navigate("edit", { userId, recuerdoId: recuerdo.id })}>
                            Editar
                        </Button>
                        <Button
                            size="md"
                            colorScheme="secondary"
                            onPress={() => navigation.navigate("delete", { userId, recuerdoId: recuerdo.id })}
                        >
                            Eliminar
                        </Button>
                    </Stack>
                </Stack>
            </Box>
        ))}
    </Center>
    </ScrollView>
);

}

export default Inicio;