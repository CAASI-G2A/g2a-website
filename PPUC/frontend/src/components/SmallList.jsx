import React, { Component } from "react";
import "antd/dist/antd.css";
import { Menu, Radio } from "antd";
import Api from "../libs/api";
import SearchParser from "../libs/researcher_search_lang";
import MapComponent from "./MapComponent";
import features from "./geoData.json";

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
      markerPos: [40, -79.9633],
      centerLocation: null,
      searchedRegions: [],
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSelectedRegion = this.handleSelectedRegion.bind(this);
  }

  handleClick(e) {
    console.log("click ", e);
    var center_coordinate_x;
    var center_coordinate_y;
    var t = 0;
    var signal = false;
    while (t < features.features.length && signal === false) {
      if (features.features[t].properties.LABEL === e.key) {
        center_coordinate_x =
          features.features[t].geometry.center_coordinate[1];
        center_coordinate_y =
          features.features[t].geometry.center_coordinate[0];
        signal = true;
      }
      t++;
    }
    // If the location is not in geoJson file, set a default coordinate for the marker.
    if (signal === false) {
      center_coordinate_x = 0;
      center_coordinate_y = 0;
    }
    this.setState({
      current: e.key,
      markerPos: [center_coordinate_x, center_coordinate_y],
      centerLocation: e.key,
    });
  }

  handleSelectedRegion(selectedRegion) {
    this.setState({
      centerLocation: selectedRegion,
    });
  }

  handleSearch(newQuery, autoSearch) {
    // parse query
    try {
      function getQueryWords(query) {
        if (typeof query === "string") {
          return [query];
        } else {
          return getQueryWords(query["operand1"]).concat(
            getQueryWords(query["operand2"])
          );
        }
      }

      const searchQuery = SearchParser.parse(newQuery);
      // parse down to just the words being searched for, for highlighting
      const searchQueryWords = getQueryWords(searchQuery["query"]);

      Api.getResearcherSearchResults(searchQuery).then((resp) => {
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
        // parse states out
        const respRegions = [...new Set(resp.map((a) => a.name))];
        console.log("response on map query: ", respRegions);

        this.setState({
          searchedRegions: [...respRegions],
        });
      });
      // set search query param
      // this.props.history.push({
      //   pathname: routes.researchers,
      //   search:
      //     "?" +
      //     new URLSearchParams({ search: this.state.searchQuery }).toString(),
      // });
    } catch (err) {
      // if (err instanceof SearchParser.SyntaxError) {
      //   this.setState({
      //     searchQueryError: err,
      //   });
      // } else {
      //   throw err;
      // }
    }
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
            color: "dodgerblue",
            marginTop: "50px",
          }}
        >
          Explore police department map
        </h4>
        <Radio.Group value={"default"}>
          <Radio.Button
            value="time limit"
            className="map_search_term"
            onClick={() => this.handleSearch("discipline", true)}
          >
            time limit
          </Radio.Button>
          <Radio.Button value="false arrest" className="map_search_term">
            false arrest
          </Radio.Button>
        </Radio.Group>
        <div style={{ display: "flex" }}>
          <div className="map_wrapper leaflet-container leaflet-touch leaflet-retina leaflet-fade-anim leaflet-grab leaflet-touch-drag leaflet-touch-zoom">
            <MapComponent
              pos={this.state.markerPos}
              center={this.state.centerLocation}
              searchedRegions={this.state.searchedRegions}
              onSelectedRegion={this.handleSelectedRegion}
            />
          </div>
          <div className="region_list">
            <Menu
              theme={this.state.theme}
              onClick={this.handleClick}
              style={{ width: 256 }}
              centerLocation={this.state.centerLocation}
              selectedKeys={this.state.centerLocation}
              mode="inline"
            >
              {this.makeList()}
            </Menu>
          </div>
        </div>
      </div>
    );
  }
}
export default SmallList;
