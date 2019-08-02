import React from "react";
import { TabContainer } from "containers";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header id={"title"}>{process.env.REACT_APP_TITLE}</header>
      <TabContainer />
    </div>
  );
}

export default App;
