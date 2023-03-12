import React, { useState, useRef } from "react";
import { Container, Stack,
         Heading, Box, HStack, Button } from "@chakra-ui/react";

import { Board } from "./Board";
import { Dashboard } from "./Dashboard";


export const Layout = (props) => {
  const [gameID, setGameID] = useState(new Date().getTime());
  const [turn, setTurn] = useState("black");
  const [scores, setScores] = useState({black: 2, white: 2});
  const freeze = useRef(false);

  const restart = () => {
    setTurn("black");
    setScores({black: 2, white: 2});
    setGameID(new Date().getTime());
  }

  const pass = () => {
    if (!freeze.current) {
      const opponent = {black: "white", white: "black"};
      setTurn(opponent[turn]);
    }
  }

  const states = {
    turn: turn, setTurn: setTurn,
    scores: scores, setScores: setScores,
    freeze: freeze,
  };

  const element = (
    <Container padding="8">
      <Stack spacing="1">
        <Heading marginLeft="4" fontSize="3xl">Reversi</Heading>
        <Box>
          <Board key={gameID} states={states}/>
        </Box>
        <Box>
          <Dashboard states={states}/>
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
