import { SWITCH_SIDEBAR, SWITCH_VIEW } from "../_actions/type";
// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = { view: { mode: "home", ids: [] } }, action) {
  switch (action.type) {
    case SWITCH_SIDEBAR:
      return {
        ...state,
        view: action.payload,
      };
    case SWITCH_VIEW:
      return {
        ...state,
        view: action.payload,
      };
    default:
      return state;
  }
}
