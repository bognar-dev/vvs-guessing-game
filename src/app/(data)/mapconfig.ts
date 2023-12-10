import { CircleLayer, LngLatBounds, LngLatBoundsLike } from 'react-map-gl';

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
            'circle-radius': 4,
            'circle-color': '#ffffff',
            'circle-stroke-color': '#878787',
            'circle-stroke-width': 2,
            'circle-pitch-scale': 'viewport',
            'circle-pitch-alignment': 'viewport',
        }
    } as CircleLayer,
    guessedStationLayerStyle: {
        id: 'guessedStationPoint',
        type: 'circle',
    
        paint: {
            'circle-radius': 4,
            'circle-color': '#000000',
            'circle-stroke-color': '#ffffff',
            'circle-stroke-width': 2,
            'circle-pitch-scale': 'viewport',
            'circle-pitch-alignment': 'viewport',
            
        }
    } as CircleLayer,
   

    
    

}