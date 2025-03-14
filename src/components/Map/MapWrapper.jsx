import React, { useState, useCallback, memo } from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'
import TrainMarker from './TrainMarker';
import TrainInfoWindow from './TrainInfoWindow';
import trainData from './mockTrainData.json';

const containerStyle = {
	height: "100%",
	width: "100%"
};

const markerPositions = [
	{ lat: 52.5200, lng: 13.4050 },
	{ lat: 50.1109, lng: 8.6821 },
	{ lat: 52.3759, lng: 9.7320 },
	{ lat: 49.0069, lng: 8.4037 },
	{ lat: 50.9848, lng: 11.0299 },
	{ lat: 53.5511, lng: 9.9937 },
];


const MapWrapper = () => {
	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: 'AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg',
	});

	const [map, setMap] = useState(null);
	const [selectedTrain, setSelectedTrain] = useState(null);
	const setSelectedTrainCallback = useCallback((train) => {
		setSelectedTrain(train);
	}, []);

	const onLoad = useCallback(function callback(map) {
		const bounds = new window.google.maps.LatLngBounds()
		markerPositions.forEach((position) => bounds.extend(position))
		map.fitBounds(bounds)

		setMap(map)
	}, []);

	const onUnmount = useCallback(function callback(map) {
		setMap(null)
	}, []);

	return isLoaded ? (
		<div className='h-96 md:h-[800px]'>
			<GoogleMap
				mapContainerStyle={containerStyle}
				onLoad={onLoad}
				onUnmount={onUnmount}
			>
				{markerPositions.map((position, index) => (
					<Marker key={index} position={position} />
				))}
				{trainData.map(train => (
					<TrainMarker train={train} setSelectedTrain={setSelectedTrainCallback} key={train.id} />
				))}
				{selectedTrain && (
					<TrainInfoWindow selectedTrain={selectedTrain} setSelectedTrain={setSelectedTrainCallback} />
				)}
			</GoogleMap>
		</div>
	) : (
		<></>
	);
}

export default memo(MapWrapper);
