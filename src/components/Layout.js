import React from "react";
import { Container, Stack, Heading, Box } from "@chakra-ui/react";

import { Board } from "./Board";


export const Layout = (props) => {
  const element = (
    <Container padding="8">
      <Stack spacing="1">
        <Heading marginLeft="4" fontSize="3xl">Reversi</Heading>
        <Box>
          <Board/>
        </Box>
      </Stack>
    </Container>
  );

  return element;
}
