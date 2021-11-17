import React, { Component } from "react";
import * as d3 from "d3";
import { Menu, Radio } from "antd";
import Api from "../libs/api";
import SearchParser from "../libs/researcher_search_lang";
import MapComponent from "./MapComponent";
import features from "../geoData.json";
import frequencies from "./../frequency.json";

import "antd/dist/antd.css";
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
      selectedRegionsForTerm: null,
      clearMap: false,
      isClicked: null
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSelectedRegion = this.handleSelectedRegion.bind(this);
    this.handleSelectKeyword = this.handleSelectKeyword.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    // Make only one tooltip appear (either leaflet-tooltip or leaflet-popup)
    if (this.state.isClicked == 'list') {
      d3.selectAll('.leaflet-popup').style('visibility', 'hidden');
      d3.selectAll('.leaflet-marker-icon').style('visibility', 'hidden');
      d3.select('.leaflet-tooltip-pane').style('visibility', 'visible');
    } else if (this.state.isClicked == 'map') {
      d3.select('.leaflet-tooltip-pane').style('visibility', 'hidden');
      d3.selectAll('.leaflet-popup').style('visibility', 'visible');
    }
    
  }

  handleClick(e) { // on selecting item on the list
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
      isClicked: 'list'
    });
  }

  handleSelectedRegion(selectedRegion) { // on selecting map region
    this.setState({
      centerLocation: selectedRegion,
      isClicked: 'map'
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
  }

    inGeoData(location) {
        var sign = false
        for (var t = 0; t < features.features.length && !sign; t++) {
            if (location == features.features[t].properties.LABEL) {
                sign = true
            }
        }
        return sign
    }

    makeList() {
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

  handleSelectKeyword(keyword) {
    const keywordElClass = '.term_' + keyword.replace(' ', '_');
    d3.select('.term_selected').classed('term_selected', false);
    d3.select(keywordElClass).classed('term_selected', true);

    this.setState({
      selectedRegionsForTerm: frequencies[keyword],
      clearMap: false,
    });
  }

  handleClear() {
    this.setState({ clearMap: true });
  }

  render() {
    return (
      <div>
        <h3
          style={{
            color: "darkblue",
            fontWeight: 700,
            marginTop: "50px",
          }}
        >
          Explore police department map
        </h3>
        <div className="keywords_wrapper" style={{ display: 'flex', background: '#f7f7f7', padding: 5, alignItems: 'center', marginBottom: 10 }}>
          <div style={{ marginRight: 10 }}>Keywords &nbsp;&nbsp;&nbsp;&nbsp;</div>
          <Radio.Group value={"default"}>
            <Radio.Button
              value="unfounded"
              className="map_search_term term_unfounded"
              onClick={() => this.handleSelectKeyword("unfounded")}
            >
              unfounded
            </Radio.Button>
            <Radio.Button
              value="interview"
              className="map_search_term term_interview"
              onClick={() => this.handleSelectKeyword("interview")}
            >
              interview
            </Radio.Button>
            <Radio.Button
              value="interrogation"
              className="map_search_term term_interrogation"
              onClick={() => this.handleSelectKeyword("interrogation")}
            >
              interrogation
            </Radio.Button>
            <Radio.Button
              value="false arrest"
              className="map_search_term term_false_arrest"
              onClick={() => this.handleSelectKeyword("false arrest")}
            >
              false arrest
            </Radio.Button>
            <Radio.Button
              value="reprimand"
              className="map_search_term term_reprimand"
              onClick={() => this.handleSelectKeyword("reprimand")}
            >
              reprimand
            </Radio.Button>
            <Radio.Button
              value="public comment"
              className="map_search_term"
              onClick={() => this.handleSelectKeyword("public comment")}
            >
              public comment
            </Radio.Button>
            <Radio.Button
              value="clear"
              className="clear_button"
              onClick={() => this.handleClear()}
            >
              clear
            </Radio.Button>
          </Radio.Group>
        </div>
        <div style={{ padding: 10, color: 'gray', fontStyle: 'italic' }}>
          Below is a map of Allegheny County, PA. Above the map are some keywords from 
          police contracts that  may relate to police accountability, 
          such as disqualification of misconduct complaints or destruction of misconduct records. 
          Read more about these keywords <a target="_blank" href="https://www.grieftoaction.org/#/commentary">here</a>.
          <br/>What you can do:
          <ul>
            <li>Click on a region on the map OR in the panel to view information about the police department in a particular borough/township/municipality. </li>
            <li>Click on any of the keywords to see the boroughs where they appear. </li>
          </ul>
        </div>
        <div style={{ fontStyle: 'italic', color: 'gray', fontSize: '0.8rem' }}>*For more information in the tooltip, refer to <a target="_blank" href="https://docs.google.com/spreadsheets/d/1jAnGHnQdK9UZK_Iy9fxkdfIlat7krILq/edit#gid=1063952290">link</a>.</div>
        <div className="map_list_wrapper">
          <div className="map_wrapper leaflet-container leaflet-touch leaflet-retina leaflet-fade-anim leaflet-grab leaflet-touch-drag leaflet-touch-zoom">
            <MapComponent
              pos={this.state.markerPos}
              center={this.state.centerLocation}
              searchedRegions={this.state.searchedRegions}
              onSelectedRegion={this.handleSelectedRegion}
              keywordRegions={this.state.selectedRegionsForTerm}
              clearMap={this.state.clearMap}
            />
          </div>
          <div className="region_list_wrapper">
            <Menu
              className="region_list"
              theme={this.state.theme}
              onClick={this.handleClick}
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
