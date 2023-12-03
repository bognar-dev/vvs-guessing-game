import { CircleLayer } from 'react-map-gl';

export const mapConfig = {
    accessKey: "pk.eyJ1IjoibmlraWJnbnIiLCJhIjoiY2xwbXY4eWY5MGR1MzJxcW5sNXNtZXpiMyJ9.2bowtyVE-DbmLOTzcgXhgQ",
    style: "mapbox://styles/mapbox/streets-v9",

    stationLayerStyle: {
        id: 'StationPoint',
        type: 'circle',
        paint: {
            'circle-radius': 3,
            'circle-color': '#007cbf'
        }
    } as CircleLayer,
    guessedStationLayerStyle: {
        id: 'guessedStationPoint',
        type: 'circle',
        paint: {
            'circle-radius': 3,
            'circle-color': '#ff0000'
        }
    } as CircleLayer,
    

    
    

}