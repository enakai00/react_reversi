import React, { useState, useRef } from "react";
import { Stack, Box, Button } from "@chakra-ui/react";

import black from "../assets/game_reversi_black.png";
import white from "../assets/game_reversi_white.png";
import blank from "../assets/game_reversi_blank.png";

import "./Board.css";


const Cell = (props) => {
  let x = 25 + 70 * props.pos_x;
  let y = 13 + 70 * props.pos_y;
  const style = {
    position: "absolute",
    width: "67px", height: "67px",
    left: x, top: y,
  };

  var element;
  switch (props.mark) {
    case "b":
      element = (
        <img src={black} alt="black" style={style}/>
      );
    break;
    case "w":
      element = (
        <img src={white} alt="white" style={style}/>
      );
    break;
    default:
      element = (
        <img src={blank} alt="blank" style={style}
             onClick={props.onClick}/>
      );
  }
  return element;
};


class BoardInfo {
  constructor(props) {
    this.size = 8;
    this.turn = "b";
    this.field = new Array(this.size)

    for (let y = 0; y < this.size; y++) {
      this.field[y] = new Array(this.size);
      this.field[y].fill(" ");
    }
    this.field[3][3] = "w";
    this.field[3][4] = "b";
    this.field[4][3] = "b";
    this.field[4][4] = "w";
  }
}


export const Board = (props) => {
  const opponent = {"b": "w", "w": "b"}
  const boardInfo = useRef(new BoardInfo(props));
  const info = boardInfo.current;
  // Since `field` stores an array object, updating it doesn't rerender the component.
  // Instead, dummyState is used to rerender the compoent.
  // eslint-disable-next-line
  const [dummyState, setDummyState] = useState([]);

  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  };

  const pass = async () => {
    info.turn = opponent[info.turn];
    await setDummyState([]);
  };

  const onClick = (x, y) => {
    move(x, y);
  };

  const move = async (x, y) => {
    // 8 directions to search.
    const dx = [1,-1, 0, 0,-1, 1, 1,-1]
    const dy = [0, 0, 1,-1,-1,-1, 1, 1]

    let allowed = false;
    for (let i = 0; i < 8; i++) { // search for 8 directions.
      if (info.field[y][x] !== " ") { // not a blank cell
        break;
      }
      let search_state = 0;
      var j;
      for (j = 1; j < 8; j++) {
        const xx = x + j*dx[i];
        const yy = y + j*dy[i];
        if (xx < 0 || xx >= info.size || yy < 0 || yy >= info.size) {
          break; // search failed.
        }
        if (info.field[yy][xx] === opponent[info.turn]) {
          search_state = 1; // search continues.
          continue;
        }
        if (search_state === 1 && info.field[yy][xx] === info.turn) {
          search_state = 2; // search succeeded.
          break;
        }
        break; // search failed.
      }

      if (search_state === 2) {
        // Animation starts.
        info.field[y][x] = info.turn;
        if (!allowed) {
          await sleep(100);
          await setDummyState([]);
        }
        for (let jj = 1; jj < j; jj++) {
          info.field[y + jj*dy[i]][x + jj*dx[i]] = info.turn;
          await sleep(100);
          await setDummyState([]);
        }
        info.field[y][x] = " ";
        allowed = true;
        // Animation ends.
      }
    }
    if (allowed) {
      info.field[y][x] = info.turn;
      info.turn = opponent[info.turn];
      await setDummyState([]);
    }
  };

  const field_elements = [];
  let black_score = 0;
  let white_score = 0;
  for (let y = 0; y < info.size; y++) {
    for (let x = 0; x < info.size; x++) {
      if (info.field[y][x] === "b"){
        black_score += 1;
      }
      if (info.field[y][x] === "w"){
        white_score += 1;
      }
      // Add the cell value to the unique key so that modified cell will be rerendered.
      field_elements.push(
        <Cell key={y.toString()+x.toString()+info.field[y][x]}
              pos_x={x} pos_y={y} mark={info.field[y][x]}
              onClick={() => onClick(x, y)} />
      );
    }
  }

  var info_elements;
  const style = {width: "24px", height: "24px", float: "left"};
  const black_turn = {"b": ": Your turn", "w": ""};
  const white_turn = {"w": ": Your turn", "b": ""};
  info_elements = (
    <Stack spacing="2">
    <Box>
      <img src={black} alt="black" style={style}/> {black_score}pieces. {black_turn[info.turn]}
    </Box>
    <Box>
      <img src={white} alt="white" style={style}/> {white_score}pieces. {white_turn[info.turn]}
    </Box>
    </Stack>
  );

  const element = (
    <Stack spacing="2">
      <Box className="bg-image">
        {field_elements}
      </Box>
      <Box style={{marginLeft: 40, marginTop: 20, marginBottom: 10}}>
        {info_elements}
      </Box>
      <Box><Button colorScheme="red" size="sm" onClick={pass}>Pass</Button></Box>
    </Stack>
  );

  return element;
}
