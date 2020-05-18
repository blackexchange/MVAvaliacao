import { combineReducers } from "redux";
import { dJogador } from "./dJogador";
import { dPartida } from "./dPartida";
import { dTime } from "./dTime";

export const reducers = combineReducers({
 
  dJogador,
    dPartida,
    dTime
})