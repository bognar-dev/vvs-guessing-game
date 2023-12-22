import { CircleLayer, LngLatBounds, LngLatBoundsLike, SymbolLayer } from 'react-map-gl';

export const mapConfig = {
    accessKey: "pk.eyJ1IjoibmlraWJnbnIiLCJhIjoiY2xwbXY4eWY5MGR1MzJxcW5sNXNtZXpiMyJ9.2bowtyVE-DbmLOTzcgXhgQ",
    style: "mapbox://styles/nikibgnr/clpmvcg2n00xv01pkhggs0bqv",
        maxBounds: [
            [8.7234746,48.5474083],// Southwest coordinates
            [9.7642234,49.0693651] // Northeast coordinates
        ] as LngLatBoundsLike,
    
    stationLayerStyle: {
        id: 'StationPoint',
        type: 'circle',
        paint: {
            'circle-radius': ['interpolate', ['linear'], ['zoom'], 10, 2.2, 15, 4],
            'circle-color': '#ffffff',
            'circle-stroke-color': '#878787',
            'circle-stroke-width': ['interpolate', ['linear'], ['zoom'], 10, 1, 15, 2],
            'circle-pitch-scale': 'map',
            'circle-pitch-alignment': 'map',
            
        }
    } as CircleLayer,
    guessedStationLayerStyle: {
        id: 'guessedStationPoint',
        type: 'circle',
    
        paint: {
            'circle-radius': ['interpolate', ['linear'], ['zoom'], 10, 2.2, 15, 4],
            'circle-color': '#000000',
            'circle-stroke-color': '#ffffff',
            'circle-stroke-width': ['interpolate', ['linear'], ['zoom'], 10, 1, 15, 2],
            'circle-pitch-scale': 'map',
            'circle-pitch-alignment': 'map',
            
        }
    } as CircleLayer,
    guessedStationNameLayerStyle: {
        id: "guessedStationNames",
        type: "symbol",
        source: "guessedStations",
        layout: {
          "text-field": ["get", "Station Name"],
          "text-size": [
            "interpolate",
            ["linear"],
            ["zoom"],
            9, 0,
            10.2, 6, // At zoom level 10, text size will be 8
            11, 12, // At zoom level 15, text size will be 12
            
          ],
          "text-offset": [0, -1.5],
          
        },
        paint: {
          "text-color": "#000000",
          "text-halo-color": "#ffffff",
          "text-halo-width": 1,
        },
    } as SymbolLayer,
   

    
    

}