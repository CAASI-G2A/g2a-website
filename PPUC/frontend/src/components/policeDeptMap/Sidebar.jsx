import React, { Component } from "react";
import { Menu } from "antd";
import Api from "../../libs/api";
import features from "../../data/geoData.json";
import "antd/dist/antd.css";

class Sidebar extends Component {

    constructor(props) {
        // Copy all "LABEL" (Municipality Name) values from geoData.json 
        // into a plain list, and sort it
        var locationList = [];
        for (var t = 0; t < features.features.length; t++){
            locationList.push(features.features[t].properties.LABEL);
        }
        locationList.sort();

        super(props);
        this.state = {
            // Turn locationList from above into a stateful list
            listData: locationList,
            theme: "light",
            centerLocation: null
        };
        this.initialSideBar = this.initialSideBar.bind(this)
        this.inGeoData = this.inGeoData.bind(this)
        
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