import React from "react";
import Navigation from "./navigation";
import { NativeBaseProvider } from "native-base";

export default function App() {
  return (
    <NativeBaseProvider>
      <Navigation/>
    </NativeBaseProvider>
  );
}

  