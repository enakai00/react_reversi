import React, { useState } from "react";
import { Container, Stack,
         Heading, Box, HStack, Button } from "@chakra-ui/react";

import { Board } from "./Board";


export const Layout = (props) => {
  const [gameID, setGameID] = useState(new Date().getTime());

  const restart = () => {
    setGameID(new Date().getTime());
  }

  const pass = () => {
  }

  const element = (
    <Container padding="8">
      <Stack spacing="1">
        <Heading marginLeft="4" fontSize="3xl">Reversi</Heading>
        <Box>
          <Board key={gameID} />
        </Box>
        <Box>
          <HStack>
            <Button colorScheme="red" size="sm"
                    onClick={pass}>Pass</Button>
            <Button colorScheme="blue" size="sm"
                    onClick={restart}>Restart</Button>
          </HStack>
        </Box>
      </Stack>
    </Container>
  );

  return element;
}
