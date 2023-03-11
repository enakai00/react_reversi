import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from "@chakra-ui/react";

import theme from "./theme/theme";
import { Layout } from './components/Layout';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider theme={theme}>
    <Layout />
  </ChakraProvider>
);
