import { useEffect } from "react";
import L from "leaflet";

function Legend({ map }) {
  useEffect(() => {
    if (map) {
      const legend = L.control({ position: "bottomleft" });

      legend.onAdd = () => {
        const div = L.DomUtil.create("div", "info legend");
        let labels = [];
        labels.push(
          '<i style = "background: rgba(255, 255, 0, 0.3)">&nbsp;&nbsp;&nbsp;&nbsp</i> NH'
        );
        labels.push(
          '<i style = "background: rgba(128, 0, 128, 0.3)">&nbsp;&nbsp;&nbsp;&nbsp</i> AA'
        );
        labels.push(
          '<i style = "background: rgba(96, 96, 96, 0.3)">&nbsp;&nbsp;&nbsp;&nbsp</i> PGH'
        );
        labels.push(
          '<i style = "background: rgba(0, 255, 0, 0.3)">&nbsp;&nbsp;&nbsp;&nbsp</i> ES'
        );
        labels.push(
          '<i style = "background: rgba(255, 165, 0, 0.3)">&nbsp;&nbsp;&nbsp;&nbsp</i> SH'
        );
        labels.push(
          '<i style = "background: rgba(255, 0, 0, 0.3)">&nbsp;&nbsp;&nbsp;&nbsp</i> MV'
        );

        div.innerHTML = labels.join("<br>");

        return div;
      };

      legend.addTo(map);
    }
  }, [map]);
  return null;
}

export default Legend;
