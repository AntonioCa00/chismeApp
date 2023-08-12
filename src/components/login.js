import React, { useState } from "react";
import { Box, Text, Heading, VStack, FormControl, Input, Link, Button, HStack, Center } from "native-base";
import { useNavigation } from "@react-navigation/native";
import {navigate} from '../../navigation';

function Login({ handleLogin }) {
    const navigation = useNavigation(); // Obtiene el objeto de navegación

    // Estados de los inputs
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const checkUser = async (corr, pass) => {
    try {
        const response = await fetch(
            `https://practica2.fly.dev/login/${corr}/${pass}`,
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        );
        const textResponse = await response.text(); // Obtener la respuesta como texto
        const json = JSON.parse(textResponse); // Intentar analizar el texto como JSON
        return json;
        } catch (parseError) {
            console.log('Error al verificar usuario:', parseError);
        }
};

const handleLoginButtonPress = async () => {
    try {
        const user = await checkUser(email, password);
        
        if (user.length !== 0) {
            console.log('Inicio de sesión exitoso');
            handleLogin();
            const userId = user[0].id_user; // Obtiene el userId del primer usuario
            navigation.navigate("recuerdo", { userId }); // Agrega esta línea
            navigation.navigate("inicio", { userId }); // Pasa el userId a la pantalla de inicio
        } else {
            console.log('Usuario no encontrado o credenciales incorrectas');
        }
    } catch (error) {
        console.log('Error al verificar usuario:', error);
    }
};  

    const handleRegisterLinkPress = () => {
        // Navega a la pantalla de registro (Registra)
        navigate("registra");
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
                </VStack>
            </Box>
        </Center>
    );
}

export default Login;
