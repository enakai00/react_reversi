import React, { useState } from "react";
import { Container, Stack, Heading, Box, Button } from "@chakra-ui/react";

import { Board } from "./Board";


export const Layout = (props) => {
  const [gameID, setGameID] = useState(new Date().getTime());

  const restart = () => {
    setGameID(new Date().getTime());
  };

  const element = (
    <Container p="8" minWidth="2xl" maxWidth="2xl">
      <Stack spacing="1">
        <Heading m="2" as="h1" fontSize="3xl" w="full">Reversi</Heading>
        <Board key={gameID}/>
        <Box style={{marginTop: 10, marginBottom: 10}}>
          <Button colorScheme="blue" size="sm"
                  onClick={restart}>Restart</Button>
        </Box>
      </Stack>
    </Container>
  );

  return element;
}
