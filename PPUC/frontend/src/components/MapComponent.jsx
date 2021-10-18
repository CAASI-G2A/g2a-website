import React, { Component, useState } from "react";
import Api from "../libs/api";
import "antd/dist/antd.css";
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
import { icon } from "leaflet";

class MapComponent extends Component {
  constructor() {
    super();
    this.state = {
      position: [40.446, -79.9633],
      center: null,
    };
    this.eachArea = this.eachArea.bind(this);
  }

  componentDidMount() {
    console.log("mapComponent rendered:" + this.props.pos);
  }

  /*componentDidUpdate(prevProps) {
        if (prevProps.center != this.props.center) {
            
        }
    }*/

  getJson() {
    return fetch(
      "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_admin_1_states_provinces_shp.geojson"
    ).then((response) => response.json());
  }

  eachArea(feature, layer) {
    const areaName = feature.properties.LABEL;
    const centerName = this.props.center;
    const groupName = feature.properties.REGION;
    layer.bindPopup(areaName);
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

    if (areaName == centerName) {
      console.log(centerName + " + " + areaName);
      console.log(layer);
      layer.setStyle({ color: "red" });
      layer.options.color = "red";

      console.log("yes");
    }
  }

  render() {
    const { position } = this.state;
    const iconFile = icon({
      iconUrl: "https://z3.ax1x.com/2021/10/16/5GCDkq.jpg",
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
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors &copy; <a href="http://cartodb.com/attributions">CartoDB</a> attributions'
              url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
            />
            <GeoJSON data={geoData.features} onEachFeature={this.eachArea} />
            <Marker position={this.props.pos} icon={iconFile}>
              <Tooltip permanent>
                <span>Smaple</span>
              </Tooltip>
            </Marker>
          </MapContainer>
        </div>
      </>
    );
  }
}

export default MapComponent;
