import React, { Component } from "react";
import * as d3 from "d3";
import { Radio } from "antd";
import Api from "../../libs/api";
import Map from "./Map";
import features from "../../data/geoData.json";
import frequencies from "./../../data/frequency.json";
import "antd/dist/antd.css";
import Sidebar from "./Sidebar"
class MapPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      markerPos: [0, 0],
      centerLocation: null,
      searchedRegions: [],
      selectedTermRegions: null,
      clearMap: false,
      isClicked: null
    };
    this.handleListSelection = this.handleListSelection.bind(this);
    this.handleMapSelection = this.handleMapSelection.bind(this);
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

    handleListSelection(e) { // on selecting item on the list
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
        console.log('on select item: ', e.key);
        this.setState({
            markerPos: [center_coordinate_x, center_coordinate_y],
            centerLocation: e.key,
            isClicked: 'list'
        });
    }

  handleMapSelection(selectedRegion) { // on selecting map region
    this.setState({
      centerLocation: selectedRegion,
      isClicked: 'map'
    });
  }

    componentDidMount() {
    try {
      Api.getLocations().then((resp) => {
        this.setState({
          locations: resp
        });
      })
    } catch (err) {
      throw err;
    }
  }

  handleSelectKeyword(keyword) {
    const keywordElClass = '.term_' + keyword.replace(' ', '_');
    d3.select('.term_selected').classed('term_selected', false);
    d3.select(keywordElClass).classed('term_selected', true);
      console.log(frequencies[keyword])
    this.setState({
      selectedTermRegions: frequencies[keyword],
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
        <div style={{ fontStyle: 'italic', color: 'gray', fontSize: '0.8rem' }}>*Click <a target="_blank" href="https://docs.google.com/spreadsheets/d/1jAnGHnQdK9UZK_Iy9fxkdfIlat7krILq/edit#gid=1063952290">here</a> to see how we collected this data.</div>
        <div className="map_list_wrapper">
          <div className="map_wrapper leaflet-container leaflet-touch leaflet-retina leaflet-fade-anim leaflet-grab leaflet-touch-drag leaflet-touch-zoom">
            <Map
              pos={this.state.markerPos}
              center={this.state.centerLocation}
              locations={this.state.locations}
              searchedRegions={this.state.searchedRegions}
              onSelectedRegion={this.handleMapSelection}
              keywordRegions={this.state.selectedTermRegions}
              clearMap={this.state.clearMap}
            />
          </div>
          <div class = "sidebar_panel">
                    <Sidebar
                        handleListSelection={this.handleListSelection}>
                    </Sidebar>
          </div>
        </div>
        <div className="keywords_wrapper" style={{ display: 'flex', background: '#f7f7f7', padding: 5, alignItems: 'center' }}>
          <div style={{ marginRight: 10 }}>Contract keywords &nbsp;&nbsp;&nbsp;&nbsp;</div>
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
          How to use this map:
          <ul>
            <li>Click on a region on the map OR in the panel to view information about the police department in a particular borough/township/municipality in Allegheny County, PA. </li>
            <li>Click on any of these police contract keywords to see the boroughs where they appear. These keywords may relate to policy accountability concerns, 
              such as disqualification of misconduct complaints or destruction of misconduct records (Read more <a target="_blank" href="https://www.grieftoaction.org/#/commentary">here</a>)
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
export default MapPanel;
