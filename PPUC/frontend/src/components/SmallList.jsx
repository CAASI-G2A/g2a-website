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
      <Menu.Item key={row}> {row} </Menu.Item>
    ));
    return rows;
  }

  render() {
    /* return (
             <>
                 {this.readData()}
             <List
                 bordered
                 dataSource={this.state.listData2}
                 renderItem={item => <List.Item>{item}</List.Item>}
                 />
                 </>
         );
     }*/
    return (
      <>
        <Menu
          theme={this.state.theme}
          onClick={this.handleClick}
          style={{ width: 256 }}
          selectedKeys={this.state.current}
          mode="inline"
        >
          {this.makeList()}
        </Menu>
      </>
    );
  }
}
export default SmallList;
