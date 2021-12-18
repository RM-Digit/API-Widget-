import { SWITCH_SIDEBAR, SWITCH_VIEW } from "./type";

export function switch_sidebar(page = "home") {
  return {
    type: SWITCH_SIDEBAR,
    payload: page,
  };
}

export function switch_view(filter) {
  return {
    type: SWITCH_VIEW,
    payload: filter,
  };
}
