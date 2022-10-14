import { useEffect } from 'react';
import styles from './index.module.less';
import { MapProvider } from "react-map-gl";
import MapBox, { useMap } from "react-map-gl";
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import * as turf from "@turf/turf";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";

function Map() {
  const MAPBOX_PK = "pk.eyJ1Ijoic2JhcnRvbiIsImEiOiJja2ozYm8xdTEyOTRxMnFteXhzbWxpcnF2In0.jyeBfYFa4T1swe8sn307tQ";
  const { myMap } = useMap();

  const updateArea = (draw) => {
    const data = draw.getAll();

    if (data.features.length > 0) {
      const area = turf.area(data);
      const rounded_area = Math.round(area * 100) / 100;
      console.log(rounded_area);
    }

  }

  useEffect(() => {
    console.log(myMap)
    if (myMap) {
      const map = myMap.getMap();
      const draw = new MapboxDraw({
        displayControlsDefault: true,
      });

      map.addControl(draw, 'top-right');

      map.on('draw.create', e => updateArea(draw));
      map.on('draw.delete', e => updateArea(draw));
      map.on('draw.update', e => updateArea(draw));
    }
  }, [myMap]);

  return (
    <MapBox
      id="myMap"
      mapboxAccessToken={MAPBOX_PK}
      style={{
        height: "100vh",
        width: "100%",
        position: "absolute",
      }}
      preserveDrawingBuffer
      mapStyle="mapbox://styles/sbarton/cktxfw18d00xe18qhac4xwagi"
      initialViewState={{
        latitude: 30.27189,
        longitude: -97.757902,
        zoom: 9,
      }}
    />
  );
}

export function Index() {
  return (
    <div className={styles.page}>
      <MapProvider>
        <Map />
      </MapProvider>
    </div>
  );
}

export default Index;