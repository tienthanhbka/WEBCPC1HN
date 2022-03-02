<template>
  <div id="map"></div>
</template>

<script>
import L from "leaflet";
import { GetLocation } from "@/api/call";
import mapData from "./component/data.json";

export default {
  data() {
    return {};
  },
  methods: {
    viewMap() {
      var map = L.map("map").setView([21.0819, 105.6363], 8.5);

      L.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidGhhbmhpdCIsImEiOiJja3hsaWxrYnIzZW43Mm5zdHFjMDk1aXZ3In0.tJHVaY19XEUsASah4tNyMg",
        {
          id: "mapbox/street-v9",
          attribution: "",
          tileSize: 512,
          zoomOffset: -1
        }
      ).addTo(map);
      function getColor(d) {
        return d > 1000
          ? "#800026"
          : d > 500
          ? "#BD0026"
          : d > 200
          ? "#E31A1C"
          : d > 100
          ? "#FC4E2A"
          : d > 50
          ? "#FD8D3C"
          : d > 20
          ? "#FEB24C"
          : d > 10
          ? "#FED976"
          : "#FFEDA0";
      }
      function style(feature) {
        return {
          fillColor: getColor(feature.properties.Dan_So),
          weight: 2,
          opacity: 1,
          color: "white",
          dashArray: "3",
          fillOpacity: 0.7
        };
      }

      function highlightFeature(e) {
        var layer = e.target;

        layer.setStyle({
          weight: 5,
          color: "#666",
          dashArray: "",
          fillOpacity: 0.7
        });

        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
          layer.bringToFront();
        }
      }
      function resetHighlight(e) {
        geojson.resetStyle(e.target);
      }
      function zoomToFeature(e) {
        map.fitBounds(e.target.getBounds());
      }
      function onEachFeature(feature, layer) {
        layer.on({
          mouseover: highlightFeature,
          mouseout: resetHighlight,
          click: zoomToFeature
        });
      }
      L.geoJson(mapData, {
        style: style,
        onEachFeature: onEachFeature
      }).addTo(map);
    }
  },
  mounted() {
    this.viewMap();
  }
};
</script>

<style lang="scss" scoped>
#map {
  height: 100%;
}
</style>
