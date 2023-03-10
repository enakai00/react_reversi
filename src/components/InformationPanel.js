import React from "react";
import { Stack, HStack, Box } from "@chakra-ui/react";

import black from "../assets/black.png";
import white from "../assets/white.png";


export const InformationPanel = (props) => {
  // eslint-disable-next-line
  const [info, setInfo] = props.gameInfo;

  const imageMap = {black: black, white: white};
  const style = {width: "24px", height: "24px"}; //, float: "left", marginRight: "10px"};
  const infoElements = (
    <Stack spacing="2">
    <Box>
      <HStack>
        <Box><img src={black} alt="black" style={style}/></Box>
        <Box>{info.score.black} pieces.</Box>
      </HStack>
    </Box>
    <Box>
      <HStack>
        <Box><img src={white} alt="white" style={style}/></Box>
        <Box>{info.score.white} pieces.</Box>
      </HStack>
    </Box>
    <Box>
      <HStack>
        <Box>Turn </Box>
        <Box><img src={imageMap[info.turn]} alt={info.turn} style={style}/></Box>
      </HStack>
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
