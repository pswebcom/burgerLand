import axios from "axios";

const instance = axios.create({
  baseURL: "https://burgerland-b7bc3.firebaseio.com/",
});

export default instance;
