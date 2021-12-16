import axios from "axios";

export default axios.create({
  baseURL: "",
  headers: {
    "x-plee-apikey": "5FE36FD25FB1516CD2DE582DB75C9",
  },
});
