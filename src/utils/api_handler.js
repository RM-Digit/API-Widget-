import $ from "./http";

const getLeagues = (force_read) => {
  return $.get(`/all?force_read=${force_read}`);
};

const getGameById = (id) => {
  return $.get(`/api/Games/${id}`);
};

const getTeamById = (id) => {
  return $.get(`/api/Teams/${id}`);
};

export const api = {
  getLeagues,
  getGameById,
  getTeamById,
};
