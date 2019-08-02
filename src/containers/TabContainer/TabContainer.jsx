import React from "react";
import INITIAL_STATE from "initialState";
import { TabContent, TabPane, Nav, NavItem, NavLink, Col } from "reactstrap";
import { ChatContainer } from "containers";
import classnames from "classnames";

import "./style.css";

export default class App extends React.Component {
  state = INITIAL_STATE.tabContainer;

  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  };

  render() {
    const { participants } = this.state;
    return (
      <div>
        <Nav tabs className={"tab-bg"}>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "1" })}
              onClick={() => {
                this.toggle("1");
              }}
            >
              Participants ({participants.length})
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "2" })}
              onClick={() => {
                this.toggle("2");
              }}
            >
              Chat
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Col>Participants Container</Col>
          </TabPane>
          <TabPane tabId="2">
            <Col>
              <ChatContainer />
            </Col>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}
