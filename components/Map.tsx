import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef } from "react";
import MapView, { Marker } from "react-native-maps";
import tw from "tailwind-react-native-classnames";
import { useSelector } from "react-redux";
import { selectDestination, selectOrigin } from "../slices/navSlice";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_API_KEY } from "@env";
const Map = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (!origin || !destination) return;

    // Zoom & fit to markers
    mapRef.current?.fitToSuppliedMarkers(["origin", "destination"], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
    });
  }, [origin, destination]);

  return (
    <MapView
      ref={mapRef}
      style={tw`flex-1`}
      mapType="mutedStandard"
      initialRegion={{
        latitude: origin?.details?.geometry.location.lat ?? 39.90196,
        longitude: origin?.details?.geometry.location.lng ?? 32.692368,
        latitudeDelta: 0.003,
        longitudeDelta: 0.003,
      }}
    >
      {origin && destination && (
        <MapViewDirections
          origin={origin.data.description}
          destination={destination.data.description}
          apikey={GOOGLE_MAPS_API_KEY}
          strokeWidth={3}
          strokeColor="black"
        />
      )}
      {origin?.details?.geometry.location && (
        <Marker
          title={origin.data.structured_formatting.main_text}
          description={origin.data.structured_formatting.secondary_text}
          identifier="origin"
          coordinate={{
            latitude: origin?.details?.geometry.location.lat,
            longitude: origin?.details?.geometry.location.lng,
          }}
        />
      )}
      {destination?.details?.geometry.location && (
        <Marker
          title={destination.data.structured_formatting.main_text}
          description={destination.data.structured_formatting.secondary_text}
          identifier="destination"
          coordinate={{
            latitude: destination?.details?.geometry.location.lat,
            longitude: destination?.details?.geometry.location.lng,
          }}
        />
      )}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({});
