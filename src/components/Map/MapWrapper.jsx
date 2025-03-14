import React, { useState, useCallback } from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'
import TrainMarker from './TrainMarker';

const containerStyle = {
	height: "800px",
	width: "800px"
};

const markerPositions = [
	{ lat: 52.5200, lng: 13.4050 },
	{ lat: 50.1109, lng: 8.6821 },
	{ lat: 52.3759, lng: 9.7320 },
	{ lat: 49.0069, lng: 8.4037 },
	{ lat: 50.9848, lng: 11.0299 },
	{ lat: 53.5511, lng: 9.9937 },
];

const trainData = [
	{ id: 1, trainNumber: 'ICE 123', city: 'Berlin', delay: 'On Time', position: { lat: 52.5200, lng: 13.4050 } },
	{ id: 2, trainNumber: 'ICE 456', city: 'Frankfurt', delay: '5 min delay', position: { lat: 50.1109, lng: 8.6821 } },
	{ id: 3, trainNumber: 'ICE 789', city: 'Hamburg', delay: '10 min delay', position: { lat: 53.1, lng: 9.9937 } },
]


const MapWrapper = () => {
	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: 'AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg',
	});

	const [map, setMap] = React.useState(null);
	const [selectedTrain, setSelectedTrain] = useState(null);
	const setSelectedTrainCallback = useCallback((train) => {
		setSelectedTrain(train);
	}, []);

	const onLoad = React.useCallback(function callback(map) {
		const bounds = new window.google.maps.LatLngBounds()
		markerPositions.forEach((position) => bounds.extend(position))
		map.fitBounds(bounds)

		setMap(map)
	}, []);

	const onUnmount = React.useCallback(function callback(map) {
		setMap(null)
	}, []);

	return isLoaded ? (
		<GoogleMap
			mapContainerStyle={containerStyle}
			onLoad={onLoad}
			onUnmount={onUnmount}
		>
			{markerPositions.map((position, index) => (
				<Marker key={index} position={position} />
			))}
			{trainData.map(train => (
				<TrainMarker train={train} setSelectedTrain={setSelectedTrainCallback} key={train.id}></TrainMarker>
			))}
		</GoogleMap>
	) : (
		<></>
	);
}

export default React.memo(MapWrapper);
