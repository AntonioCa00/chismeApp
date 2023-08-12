import React from "react";
import Navigation from "./navigation";
import { NativeBaseProvider } from "native-base";
import Login from "./src/components/login";

export default function App() {
  return (  
  <NativeBaseProvider>
       <Navigation/>
   </NativeBaseProvider>
  );
}

  