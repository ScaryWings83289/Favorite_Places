// Packages Imports
import { useState } from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

const Map = () => {
  const [selectedLocation, setSelectedLocation] = useState();

  // Default Region
  const region = {
    latitude: 23.5120086,
    longitude: 80.3289551,
    latitudeDelta: 1,
    longitudeDelta: 1,
  };

  // Handle location select on map
  const handleLocationSelect = (event) => {
    const long = event.nativeEvent.coordinate.longitude;
    const lat = event.nativeEvent.coordinate.latitude;
    setSelectedLocation({ lat, long });
  };

  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={handleLocationSelect}
    >
      {selectedLocation && (
        <Marker
          title='Picked Location'
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.long,
          }}
        />
      )}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
