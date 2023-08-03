import React, { useState } from "react";
import { Box, Text, Heading, VStack, FormControl, Input, Link, Button, HStack, Center } from "native-base";
import { useNavigation } from "@react-navigation/native";
import * as LocalAuthentication from 'expo-local-authentication';

function Login({ handleLogin }) {
    const navigation = useNavigation(); // Obtiene el objeto de navegación

    // Estados de los inputs
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLoginButtonPress = () => {
        console.log("Bienvenido a chismeApp");
        handleLogin(); // Llama a la función handleLogin que viene como prop desde el componente Navigation
    };

    const handleRegisterLinkPress = () => {
        // Navega a la pantalla de registro (Registra)
        navigation.navigate("registra");
    };

    const handleFingerprintLogin = async () => {
        try {
            const hasHardwareSupport = await LocalAuthentication.hasHardwareAsync();
            if (hasHardwareSupport) {
                const isEnrolled = await LocalAuthentication.isEnrolledAsync();
                if (isEnrolled) {
                    const result = await LocalAuthentication.authenticateAsync({
                        promptMessage: "Inicia sesión usando tu huella digital",
                    });
                    if (result.success) {
                        console.log("Inicio de sesión exitoso con huella digital");
                        handleLogin(); // Realizar el inicio de sesión si la autenticación es exitosa
                    } else {
                        console.log("Error en la autenticación con huella digital");
                    }
                } else {
                    console.log("No hay huellas digitales registradas en el dispositivo");
                }
            } else {
                console.log("El dispositivo no tiene soporte para huella digital");
            }
        } catch (error) {
            console.log("Error en la autenticación con huella digital:", error);
        }
    };

    return (
        <Center w="100%">
            <Box safeArea p="2" py="8" w="90%" maxW="290">
                <Heading>
                    <Text color="emerald.500"> chismeApp</Text>
                </Heading>
                <Heading mt="1" _dark={{
                    color: "warmGray.200"
                }} color="coolGray.600" fontWeight="medium" size="sm">
                    Iniciar Sesión
                </Heading>
                <VStack space={3} mt="5">
                    <FormControl>
                        <FormControl.Label>E-mail</FormControl.Label>
                        <Input type="email" value={email} onChangeText={(text) => setEmail(text)} placeholder="Ingresa tu e-mail" />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label>Password</FormControl.Label>
                        <Input value={password} onChangeText={(text) => setPassword(text)} type="password" placeholder="Ingresa tu password" />
                    </FormControl>
                    <Button onPress={handleLoginButtonPress} mt="2" colorScheme="indigo">
                        Iniciar Sesión
                    </Button>
                    <HStack mt="6" justifyContent="center">
                        <Text fontSize="sm" color="coolGray.600" _dark={{
                            color: "warmGray.200"
                        }}>
                            ¿No tienes cuenta?{" "}
                        </Text>
                        <Link onPress={handleRegisterLinkPress} _text={{
                            color: "indigo.500",
                            fontWeight: "medium",
                            fontSize: "sm"
                        }}>
                            Registrate.
                        </Link>
                    </HStack>
                    <Button onPress={handleFingerprintLogin} mt="2" colorScheme="indigo">
                        Iniciar sesión con huella digital
                    </Button>
                </VStack>
            </Box>
        </Center>
    );
}

export default Login;
