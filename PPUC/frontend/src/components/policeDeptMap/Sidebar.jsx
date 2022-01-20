import React, { Component } from "react";
import { Menu } from "antd";
import Api from "../../libs/api";
import features from "../../data/geoData.json";
import "antd/dist/antd.css";

class Sidebar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listData: [],
            theme: "light",
            centerLocation: null
        };
        this.initialSideBar = this.initialSideBar.bind(this)
        this.inGeoData = this.inGeoData.bind(this)

        // Add each location to the listData list
        for (var t = 0; t < features.features.length; t++) {
            var locationName = features.features[t].properties.LABEL;
            this.setState({
                listData: [...this.state.listData, locationName],
            });
        }
    }

    componentDidMount() {
        /*
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
                    if (this.inGeoData(row.name)) {
                        this.setState({
                            listData: [...this.state.listData, row.name],
                        });
                    }
                });
            });
        } catch (err) {
            throw err;
        }
        */
    }

    // Checks to see if data from database Location table is in the geodata
    // JSON file
    inGeoData(location) {
        var sign = false
        for (var t = 0; t < features.features.length && !sign; t++) {
            if (location == features.features[t].properties.LABEL) {
                sign = true
            }
        }
        return sign
    }

    initialSideBar() {
        const rows = this.state.listData.map((row) => (
            <Menu.Item
                key={row}
                style={{
                    borderBottom: "1px solid #f1f1f1",
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
                <Menu
                    className="region_list"
                    theme={this.state.theme}
                    onClick={this.props.handleListSelection}
                    centerLocation={this.state.centerLocation}
                    selectedKeys={this.state.centerLocation}
                    mode="inline"
                >
                    {this.initialSideBar()}
                </Menu>
        )
    }
}

export default Sidebar;