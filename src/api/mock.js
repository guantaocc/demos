import axios from "axios";
var MockAdapter = require("axios-mock-adapter");

console.log(axios);

// This sets the mock adapter on the default instance
var mock = new MockAdapter(axios);

// Mock any GET request to /users
// arguments for reply are (status, data, headers)
mock.onGet("/users").reply(200, {
  users: [
    {
      label: "AAA",
      value: "aaa",
    },
    {
      label: "BBB",
      value: "ccc",
    },
  ],
});

export default axios;
