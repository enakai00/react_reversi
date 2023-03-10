import React, { useState, useRef } from "react";
import { Container, Stack, HStack, Heading, Box, Button } from "@chakra-ui/react";

import { Board } from "./Board";
import { InformationPanel } from "./InformationPanel";


export const Layout = (props) => {
  const [gameID, setGameID] = useState(new Date().getTime());

  const [turn, setTurn] = useState("black");
  const [score_b, setScore_b] = useState(2);
  const [score_w, setScore_w] = useState(2);
  const score = {black: score_b, white: score_w};
  const setScore = {black: setScore_b, white: setScore_w};
  const freeze = useRef(false);

  const gameInfo = {score: score, turn: turn, freeze: freeze};
  const setGameInfo = {score: setScore, turn: setTurn};

 const restart = () => {
    setTurn("black");
    setGameID(new Date().getTime());
  }

  const pass = () => {
    const opponent = {"black": "white", "white": "black"}
    if (!freeze.value) {
      setGameInfo.turn(opponent[gameInfo.turn]);
    }
  }

  const element = (
    <Container p="8" minWidth="2xl" maxWidth="2xl">
      <Stack spacing="1">
        <Heading m="2" as="h1" fontSize="3xl" w="full">Reversi</Heading>
        <Box>
          <Board key={gameID} gameInfo={[gameInfo, setGameInfo]}/>
        </Box>
        <Box>
          <InformationPanel gameInfo={[gameInfo, setGameInfo]}/>
        </Box>
        <Box style={{marginLeft: 10, marginTop: 10, marginBottom: 10}}>
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
