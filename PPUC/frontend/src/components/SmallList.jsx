import React, { Component } from "react";
import Api from "../libs/api";
import "antd/dist/antd.css";
import { Menu, Switch, List } from "antd";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const { SubMenu } = Menu;

class SmallList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: [],
      smallList: null,
      collapsed: false,
      theme: "light",
      listKeyNumber: 1,
      current: 0,
      listData2: "",
    };
  }

  handleClick(e) {
    console.log("click ", e);
    this.setState({
      current: e.key,
    });
  }

  componentDidMount() {
    try {
      Api.getSListData().then((resp) => {
        // sort based on city name
        resp.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
        resp.map((row) => {
          this.setState({
            listData: [...this.state.listData, row.name],
          });
        });
      });
    } catch (err) {
      throw err;
    }

    this.handleClick = this.handleClick.bind(this);
  }

  makeList() {
    const rows = this.state.listData.map((row) => (
      <Menu.Item
        key={row}
        style={{
          borderBottom: "1px solid #f1f1f1",
          marginLeft: "20px",
        }}
      >
        {" "}
        {row}{" "}
      </Menu.Item>
    ));
    return rows;
  }

  render() {
    return (
      <div>
        <h4
          style={{
            fontFamily: "Helvetica",
            position: "relative",
            left: 101,
            color: "dodgerblue",
            marginTop: "50px",
          }}
        >
          Explore police department map
        </h4>
        <>
          <div className="div-for-map">
            <iframe
              title="resg"
              src="test.html"
              className="map"
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
              scrolling="auto"
            />
            <div>
              <Menu
                theme={this.state.theme}
                onClick={this.handleClick}
                style={{
                  width: 250,
                  height: 500,
                  border: "1px solid #ebebeb",
                  overflowY: "scroll",
                  color: "gray",
                  fontWeight: 600,
                }}
                selectedKeys={this.state.current}
                mode="inline"
              >
                {this.makeList()}
              </Menu>
            </div>
          </div>
        </>
      </div>
    );
  }
}
export default SmallList;
