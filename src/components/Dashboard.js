import React from "react";
import { Stack, HStack, Box } from "@chakra-ui/react";

import black from "../assets/black.png";
import white from "../assets/white.png";


export const Dashboard = (props) => {
  // Unpack states.
  const turn = props.states.turn;
  const scores = props.states.scores;

  const imageMap = {black: black, white: white};
  const style = {width: "24px", height: "24px"};

  let winner = null;
  if (scores.black === 0) {
    winner = "white";
  }
  if (scores.white === 0) {
    winner = "black";
  }
  if (scores.black + scores.white === 8*8) {
    if (scores.black > scores.white) {
      winner = "black";
    } else if (scores.white > scores.black) {
      winner = "white";
    } else {
      winner = "tie";
    }
  }

  var message;
  switch(winner) {
    case "black":
    case "white":
      message = (
        <HStack>
          <Box>Winner </Box>
          <Box><img src={imageMap[winner]} alt={winner} style={style}/></Box>
        </HStack>
      );
      break;
    case "tie":
      message = (
        <HStack>
          <Box>Tie </Box>
          <Box><img src={imageMap.black} alt={black} style={style}/></Box>
          <Box><img src={imageMap.white} alt={white} style={style}/></Box>
        </HStack>
      );
      break;
    default:
      message = (
        <HStack>
          <Box>Turn </Box>
          <Box><img src={imageMap[turn]} alt={turn} style={style}/></Box>
        </HStack>
    );
  }

  const infoElements = (
    <Stack spacing="2">
    <Box>
      <HStack>
        <Box><img src={black} alt="black" style={style}/></Box>
        <Box>{scores.black} pieces.</Box>
      </HStack>
    </Box>
    <Box>
      <HStack>
        <Box><img src={white} alt="white" style={style}/></Box>
        <Box>{scores.white} pieces.</Box>
      </HStack>
    </Box>
    <Box>
      {message}
    </Box>
    </Stack>
  );

  const element = (
    <Box style={{marginLeft: 40, marginTop: 10, marginBottom: 10}}>
      {infoElements}
    </Box>
  );

  return element;
}
