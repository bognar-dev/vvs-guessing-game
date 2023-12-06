import { CircleLayer } from 'react-map-gl';

export const mapConfig = {
    accessKey: "pk.eyJ1IjoibmlraWJnbnIiLCJhIjoiY2xwbXY4eWY5MGR1MzJxcW5sNXNtZXpiMyJ9.2bowtyVE-DbmLOTzcgXhgQ",
    style: "mapbox://styles/nikibgnr/clpmvcg2n00xv01pkhggs0bqv",

    stationLayerStyle: {
        id: 'StationPoint',
        type: 'circle',
        paint: {
            'circle-radius': 3,
            'circle-color': '#ffffff',
            'circle-stroke-color': '#878787',
            'circle-stroke-width': 2
        }
    } as CircleLayer,
    guessedStationLayerStyle: {
        id: 'guessedStationPoint',
        type: 'circle',
        paint: {
            'circle-radius': 3,
            'circle-color': '#000000',
            'circle-stroke-color': '#d3d3d3',
            'circle-stroke-width': 2
        }
    } as CircleLayer,
    

    
    

}