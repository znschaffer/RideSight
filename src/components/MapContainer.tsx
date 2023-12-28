import { Play } from "next/font/google";
import { Suspense, useCallback, useEffect, useId, useRef, useState } from "react";
import { Layer, LineLayer, MapRef, Marker, Source } from "react-map-gl/maplibre";
import Map from "react-map-gl/maplibre";
const polyline = require("@mapbox/polyline")

type Point = number[];
type Points = Point[];

export default function MapContainer({ activities }) {

  // function parseGpx(rawGpx: any): Points {
  //   let parser = new DOMParser();
  //   let parsed = parser.parseFromString(rawGpx, "text/xml");
  //   let trkpts = parsed.getElementsByTagName("trkpt");
  //   let pts: Points = [];
  //   for (let trkpt of trkpts) {
  //     let pt: Point = [];
  //     pt[0] = parseFloat(trkpt.getAttribute("lon"));
  //     pt[1] = parseFloat(trkpt.getAttribute("lat"));
  //     pts.push(pt);
  //   }
  //   return pts;
  // }


  // useEffect(() => {
  //   fetch("/data.gpx")
  //     .then((resp) => {
  //       console.log(resp);
  //       return resp.text();
  //     })
  //     .then((resp) => parseGpx(resp))
  //     .then((parsedGpx) => setData(parsedGpx))
  //     .catch((err) => console.error(err));
  // }, []);

  const mapRef = useRef<maplibregl.Map>()
  let layerData: LineLayer = {
    id: "path",
    type: "line",
    source: "route",
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
    paint: {
      "line-color": "#00b",
      "line-width": 2,
    },
  };

  let lineData = {
    type: "Feature",
    geometry: {
      type: "LineString",
      coordinates: []
    },
  };

  const [data, setData] = useState([lineData])
  useEffect(() => {
    if (activities.length) {
      setData(activities.map(activity => ({
        type: "Feature",
        id: activity.id,
        name: activity.name,
        geometry: {
          type: "LineString",
          coordinates: activity.map
        },
      })))
    }
  }, [activities])

  let loaded = false

  const setCenter = useCallback((e) => {
    if (e.isSourceLoaded) {
      loaded = true
    }

    if (loaded) {
      return
    }

    let center = data[0].geometry.coordinates[0]
    mapRef.current?.jumpTo({ center: center, zoom: 12 })
  }, [data])


  useEffect(() => {
    console.log(data)
  }, [data])

  const onHover = useCallback(e => {
    console.log(e)
  }, [])
  return (
    <>
      <link
        href="https://unpkg.com/maplibre-gl@3.6.2/dist/maplibre-gl.css"
        rel="stylesheet"
      />
      <div>
        {activities.length ? (
          <Map
            onMouseMove={onHover}
            ref={mapRef}
            style={{
              width: "100dvw",
              height: "100dvh",
              margin: "auto",
              background: "black"
            }}
            onSourceData={setCenter}
            mapStyle="https://api.maptiler.com/maps/dataviz/style.json?key=0ao44pBZSS8tABLsCiOZ"
          >
            {data.length ? data.map((d, idx) => (
              <Source id={idx.toString()} type="geojson" key={idx} data={d}>
                <Layer
                  layout={{
                    "line-cap": "round",
                    "line-join": "bevel"
                  }}
                  id={idx.toString()}
                  type="line"
                  paint={{ "line-width": 3, "line-color": "#" + Math.floor(Math.random() * 16777215).toString(16) }}
                />
              </Source>
            )) : <></>}
          </Map>
        ) : (<div><h1>Loading...</h1></div>)}
      </div>
    </>
  );
}
