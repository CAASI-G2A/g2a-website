import React, { Component, useState } from "react";
import * as d3 from "d3";
import Api from "../libs/api";
import "antd/dist/antd.css";
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  GeoJSON,
  Tooltip,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import geoData from "./../geoData.json";
import locationID from "./../location_id.json";
import contentText from "./../merge_data_allegheny_map.json";
import { icon } from "leaflet";
import Legend from "./Legend";

class MapComponent extends Component {
  constructor() {
    super();
    this.state = {
      position: [40.446, -79.9633],
      last_selected_location: "nowhere",
      last_selected_location_color: null,
      last_frequency_color: [],
      map: null,
      last_clicked_color: null,
      last_clicked_location: null,
      prev_keyword: null,
      is_frequency_selected: false,
      repeat_time: 0,
    };

    this.eachArea = this.eachArea.bind(this);
    this.highlightLayers = this.highlightRegion.bind(this);
    this.getText = this.getText.bind(this);
    this.highlightRegion = this.highlightRegion.bind(this);
  }

  componentDidMount() {
    console.log("mapComponent rendered:" + this.props.pos);
  }

  componentDidUpdate(prevProps) {
    //console.log("prevProps: ", prevProps, this.props);
    if (prevProps.center !== this.props.center) {
      var last_color;
      if (
        d3.select("." + this.props.center.split(" ").join("_"))
          ._groups[0][0] !== null
      ) {
        last_color = d3
          .select("." + this.props.center.split(" ").join("_"))
          .style("fill");
      }
      d3.select("." + this.props.center.split(" ").join("_"))
        .style("fill", "red")
        .style("fill-opacity", 0.6);
      var opa = 0.2;
      if (this.state.last_selected_location_color == "blue") {
        opa = 0.6;
      }
      d3.select("." + this.state.last_selected_location.split(" ").join("_"))
        .style("fill", this.state.last_selected_location_color)
        .style("fill-opacity", opa);
      this.setState({
        last_selected_location: this.props.center,
        last_selected_location_color: last_color,
      });
    }

    if (prevProps.keywordRegions !== this.props.keywordRegions) {
      if (prevProps.keywordRegions != null) {
        var t = -1;
        prevProps.keywordRegions.forEach((r) => {
          t++;
          const selectedRegion = d3.select(
            "." +
              r
                .replace(")", "")
                .replace("(", "")
                .replace("/", "")
                .split(" ")
                .join("_")
          );
          if (!selectedRegion.empty()) {
            d3.select("." + r.split(" ").join("_"))
              .style("fill", this.state.last_frequency_color[t])
              .style("fill-opacity", 0.2);
          }
        });
      }
      var last_frequency_color = [];
      this.props.keywordRegions.forEach((r) => {
        last_frequency_color = [
          ...last_frequency_color,
          d3.select("." + r.split(" ").join("_")).style("fill"),
        ];
        const selectedRegion = d3.select(
          "." +
            r
              .replace(")", "")
              .replace("(", "")
              .replace("/", "")
              .split(" ")
              .join("_")
        );
        if (!selectedRegion.empty()) {
          d3.select("." + r.split(" ").join("_"))
            .style("fill", "blue")
            .style("fill-opacity", 0.6);
        }
      });
      this.setState({
        last_frequency_color: last_frequency_color,
        is_frequency_selected: true,
      });
    }

    if (this.props.clearMap && prevProps.keywordRegions != null) {
      var t = -1;
      prevProps.keywordRegions.forEach((r) => {
        t++;
        const selectedRegion = d3.select(
          "." +
            r
              .replace(")", "")
              .replace("(", "")
              .replace("/", "")
              .split(" ")
              .join("_")
        );
        if (!selectedRegion.empty()) {
          d3.select("." + r.split(" ").join("_"))
            .style("fill", this.state.last_frequency_color[t])
            .style("fill-opacity", 0.2);
        }
      });
    }
  }

  highlightRegion(e) {
    const selectedRegion = e.target.options.className.split("_").join(" ");
    this.props.onSelectedRegion(selectedRegion);
  }

  getJson() {
    return fetch(
      "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_admin_1_states_provinces_shp.geojson"
    ).then((response) => response.json());
  }

  eachArea(feature, layer) {
    const areaName = feature.properties.LABEL;
    const groupName = feature.properties.REGION;
    layer.bindPopup(this.getText(areaName));
    layer.options.color = "black";
    if (groupName === "MV") {
      layer.options.fillColor = "red";
    } else if (groupName === "NH") {
      layer.options.fillColor = "yellow";
    } else if (groupName === "SH") {
      layer.options.fillColor = "orange";
    } else if (groupName === "ES") {
      layer.options.fillColor = "green";
    } else if (groupName === "AA") {
      layer.options.fillColor = "purple";
    } else if (groupName === "PGH") {
      layer.options.fillColor = "black";
    }
    //console.log(centerName + " + " + areaName);
    layer.setStyle({ className: areaName.split(" ").join("_") });

    layer.on({
      click: this.highlightRegion,
    });
  }

  getContent(content) {
    if (content === null || content == "NA" || content == "") {
      return "No info";
    } else {
      return content;
    }
  }

    getText(center) {
        if (center in this.props.searchedRegions) {
            // do someting to let this function know how to generate the extra link.
        }
        var id
        for (var i in locationID) {
            if (locationID[i].name == center) {
                id = locationID[i].id
                break
            }
        }

    var t = 1;
    var length = contentText.length;
    while (t < length) {
      if (contentText[t].LABEL === center) {
        if (
          contentText[t].Link_to_police_department == "" ||
          contentText[t].Link_to_police_department == null ||
          contentText[t].Link_to_police_department == "NA"
        ) {
            var contract_link = "<br><a  href=/PxPUC/#/location/" +
                id +
                " target='_blank'>Link to contract detail page</a>"
            if (id == null) {
                contract_link = "No contract detail"
            }
          return (
            contentText[t].LABEL +
            "<br>" +
            "<br >No link for police department</br>" +
            "<br> Full time police officers as of 2019: " +
            this.getContent(
              contentText[t].Total_Number_Police_Officers_as_of_2019
            ) +
            "<br> Police bill of rights: " +
            this.getContent(
              contentText[t].Do_they_use_a_police_bill_of_rights
              ) +
              "<br> Police budget percentage 2019: " +
              this.getContent(contentText[t].Budget) +
            "<br> <br> Keywords in contract: " +
              this.getContent(contentText[t].Keywords_found_in_contract) +
              contract_link
          );
        } else {
            var contract_link = "<br><a  href=/PxPUC/#/location/" +
                id +
                " target='_blank'>Link to contract detail page</a>"
            if (id == null) {
                contract_link = "No contract detail"
            }
          return (
            contentText[t].LABEL +
            "<br>" +
            "<a  href=" +
            contentText[t].Link_to_police_department +
            " target='_blank'>Link to police department website</a>" +
            "<br> Full time police officers as of 2019: " +
            this.getContent(
              contentText[t].Total_Number_Police_Officers_as_of_2019
            ) +
            "<br> Police bill of rights: " +
            this.getContent(
              contentText[t].Do_they_use_a_police_bill_of_rights
              ) +
              "<br> Police budget percentage 2019: " +
              this.getContent(contentText[t].Budget) +
            "<br> <br> Keywords in contract: " +
              this.getContent(contentText[t].Keywords_found_in_contract) +
              contract_link
          );
        }
      }
      t++;
    }
    return "no data";
  }

  render() {
    const { position } = this.state;
    const iconFile = icon({
      iconUrl: "https://z3.ax1x.com/2021/10/21/5rZ6c6.png",
    });
    return (
      <>
        <div
          className="leaflet-container leaflet-touch leaflet-retina leaflet-fade-anim leaflet-grab leaflet-touch-drag leaflet-touch-zoom"
          style={{ height: 500 }}
        >
          <MapContainer
            center={position}
            zoom={10}
            scrollWheelZoom={true}
            style={{ height: 500 }}
            whenCreated={(map) => {
              this.setState({ map: map });
            }}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors &copy; <a href="http://cartodb.com/attributions">CartoDB</a> attributions <a href = "mailto: gishelp@alleghenycounty.us">GIS Help</a> Legend credit'
              url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
            />
            <GeoJSON data={geoData.features} onEachFeature={this.eachArea} />
            <Marker position={this.props.pos} icon={iconFile}>
              <Tooltip interactive={true} permanent>
                <div
                  dangerouslySetInnerHTML={{
                    __html: this.getText(this.props.center),
                  }}
                />
              </Tooltip>
            </Marker>
            <Legend map={this.state.map} />
          </MapContainer>
        </div>
      </>
    );
  }
}

export default MapComponent;
