// import { SHOWMODAL, HIDEMODAL, SHOWMODAL_ASYNC } from "../const/modal.const";

// export const show = () => ({type: SHOWMODAL});
// export const hide = () => ({type: HIDEMODAL});

// export const show_async = () => ({type: SHOWMODAL_ASYNC});

import { createAction } from "redux-actions";

export const show = createAction("show");
export const hide = createAction("hide");
export const show_async = createAction("show");
