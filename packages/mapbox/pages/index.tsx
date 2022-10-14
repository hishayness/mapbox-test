import { useEffect, useRef } from "react";
import styles from './index.module.less';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import * as turf from "@turf/turf";
import mapboxgl from 'mapbox-gl';
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";

export function Index() {
  const mapContainer = useRef(null);
  const map = useRef(null);

  mapboxgl.accessToken = "pk.eyJ1Ijoic2JhcnRvbiIsImEiOiJja2ozYm8xdTEyOTRxMnFteXhzbWxpcnF2In0.jyeBfYFa4T1swe8sn307tQ";

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/sbarton/cktxfw18d00xe18qhac4xwagi',
      center: [-97.757902, 30.27189],
      zoom: 9
    });

    const draw = new MapboxDraw({
      displayControlsDefault: true,
    });

    map.current.addControl(draw, 'top-right');

    map.current.on('draw.create', updateArea);
    map.current.on('draw.delete', updateArea);
    map.current.on('draw.update', updateArea);

    function updateArea(e) {
      const data = draw.getAll();

      if (data.features.length > 0) {
        const area = turf.area(data);
        const rounded_area = Math.round(area * 100) / 100;

        console.log(rounded_area);
      }
    }
  });

  return (
    <div className={styles.page}>
      <div
        ref={mapContainer}
        style={{
          height: "100vh",
          width: "100%",
          position: "absolute",
        }}
      />
    </div>
  );
}

export default Index;