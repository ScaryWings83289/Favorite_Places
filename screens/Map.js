// Packages Imports
import { useCallback, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

// Components Imports
import IconButton from "../components/Inputs/IconButton";

const Map = ({ navigation, route }) => {
  // Initial Location
  const initialLocation = route?.params && {
    lat: route?.params?.initialLat,
    long: route?.params?.initialLng,
  };

  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  // Default Region
  const region = {
    latitude: initialLocation ? initialLocation.lat : 23.5120086,
    longitude: initialLocation ? initialLocation.long : 80.3289551,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  // Handle location select on map
  const handleLocationSelect = (event) => {
    if (initialLocation) {
      return;
    }
    const long = event.nativeEvent.coordinate.longitude;
    const lat = event.nativeEvent.coordinate.latitude;
    setSelectedLocation({ lat, long });
  };

  // Save picked location on map
  const handlePickedLocation = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        "No location picked!",
        "You have to pick a location (by tapping on the map) first!"
      );
      return;
    }

    navigation.navigate("AddPlace", {
      pickedLat: selectedLocation.lat,
      pickedLng: selectedLocation.long,
    });
  }, [navigation, selectedLocation]);

  // Setting Icon Button in the header
  useLayoutEffect(() => {
    if (initialLocation) {
      return;
    }

    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon='save'
          size={24}
          color={tintColor}
          onPress={handlePickedLocation}
        />
      ),
    });
  }, [navigation, handlePickedLocation, initialLocation]);

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
