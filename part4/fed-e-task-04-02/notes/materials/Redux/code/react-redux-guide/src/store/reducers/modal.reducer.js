// import { SHOWMODAL, HIDEMODAL } from "../const/modal.const";

// const initialState = {
//   show: false
// }

// export default (state = initialState, action) => {
//   switch(action.type) {
//     case SHOWMODAL:
//       return {
//         ...state,
//         show: true
//       }
//     case HIDEMODAL:
//       return {
//         ...state,
//         show: false
//       }
//     default:
//       return state;
//   }
// }

import { handleActions as createReducer } from "redux-actions";
import { show, hide, show_async } from "../actions/modal.actions";

const initialState = {
  show: false,
};

const handleShow = (state, action) => ({ show: true });
const handleHide = (state, action) => ({ show: false });
const handleShowAsync = (state, action) => ({ show: true });

export default createReducer(
  {
    [show]: handleShow,
    [hide]: handleHide,
    [show_async]: handleShowAsync,
  },
  initialState
);
