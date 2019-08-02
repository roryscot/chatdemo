var assert = require("assert");
var Websocket_API = require("../server/api");

describe("API", function() {
  const initial_API = new Websocket_API();
  describe("Initial state", function() {
    it("should be 'empty'", function() {
      assert.deepEqual(initial_API.state, {
        participants: [],
        messages: []
      });
    });
  });

  describe("test state", function() {
    const API = new Websocket_API();

    let time = API.generateTestData();
    it("should have Rick & Morty info", function() {
      assert.deepEqual(API.state, {
        participants: [
          { id: "u000", name: "ChatBot" },
          { id: "u001", name: "Morty" },
          { id: "u002", name: "Summer" },
          { id: "u003", name: "Rick" },
          { id: "u004", name: "Birdman" }
        ],
        messages: [
          {
            id: "m000",
            owner: "u000",
            content: "Welcome, what is my purpose?",
            createdAt: time,
            updatedAt: time
          },
          {
            id: "m002",
            owner: "u003",
            content: "{burps} You facilitate Pexip's chat.",
            createdAt: time,
            updatedAt: time
          },
          {
            id: "m000",
            owner: "u000",
            content: "{looks down} Oh my god",
            createdAt: time,
            updatedAt: time
          },
          {
            id: "m002",
            owner: "u003",
            content: "Welcome to the club, Pal.",
            createdAt: time,
            updatedAt: time
          },
          {
            id: "m001",
            owner: "u001",
            content:
              "You mean this? https://www.youtube.com/watch?v=X7HmltUWXgs",
            createdAt: time,
            updatedAt: time
          }
        ]
      });
    });
  });

  describe("API methods", function() {
    const API = new Websocket_API();

    describe("PUT Message", function() {
      it("should add return an error if no method if provided", function() {
        const error = API.addMessage({
          message: {
            id: "m000",
            owner: "u000",
            content: "Welcome, what is my purpose?"
          }
        });
        assert.equal(typeof error, typeof new Error());
      });
      API.addMessage({
        message: {
          id: "m000",
          owner: "u000",
          content: "Welcome, what is my purpose?"
        },
        method: "POST"
      });
      it("should add a message to the state", function() {
        assert.equal(1, API.state.messages.length);
      });
    });
    const new_API = new Websocket_API();
    new_API.generateTestData();

    const updatedAPI = new Websocket_API();
    updatedAPI.generateTestData();

    describe("PUT Message", function() {
      it("should add return an error if no method if provided", function() {
        const error = API.addMessage({
          message: {
            id: "m000",
            owner: "u000",
            content: "Welcome, what is my purpose?"
          }
        });
        assert.equal(typeof error, typeof new Error());
      });
      const newContent = "Changed content";
      updatedAPI.addMessage({
        message: {
          id: "m000",
          owner: "u000",
          content: newContent
        },
        method: "PUT"
      });

      it("should update a message", function() {
        assert.equal(
          new_API.state.messages.length,
          updatedAPI.state.messages.length
        );
        assert.notDeepEqual(new_API.state.messages, updatedAPI.state.messages);
      });
    });
  });
});
