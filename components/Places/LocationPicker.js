// Packages Imports
import { useEffect, useState } from "react";
import { StyleSheet, Alert, Image, Text, View } from "react-native";
import {
  useNavigation,
  useRoute,
  useIsFocused,
} from "@react-navigation/native";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";

// Components Imports
import CustomOutlinedButton from "../Inputs/CustomOutlinedButton";

// Utils Imports
import { getMapPreview, getAddress } from "../../utils/location";

// Constants Imports
import { Colors } from "../../constants/colors";

const LocationPicker = ({ onPickLocation }) => {
  const [pickedLocation, setPickedLocation] = useState("");
  const [locationCoordinates, setLocationCoordinates] = useState({
    long: "",
    lat: "",
  });

  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();

  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

  // Get picked location from map screen
  useEffect(() => {
    if (isFocused && route.params) {
      const imagePreview = getMapPreview(
        route?.params?.pickedLng,
        route?.params?.pickedLat
      );
      setPickedLocation(imagePreview);
      setLocationCoordinates({
        long: route?.params?.pickedLng,
        lat: route?.params?.pickedLat,
      });
    }
  }, [route, isFocused]);

  // Passing picked location to parent components
  useEffect(() => {
    const handleLocation = async () => {
      if (pickedLocation) {
        const address = await getAddress(
          locationCoordinates.long,
          locationCoordinates.lat
        );
        onPickLocation({ ...locationCoordinates, address: address });
      }
    };
    handleLocation();
  }, [locationCoordinates, onPickLocation]);

  // Verify Location Permission
  const verifyPermissions = async () => {
    if (
      locationPermissionInformation.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant location permissions to use this app."
      );
      return false;
    }

    return true;
  };

  // Handle User Location
  const handleUserLocation = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }

    const location = await getCurrentPositionAsync();
    const imagePreview = getMapPreview(
      location.coords.longitude,
      location.coords.latitude
    );
    setPickedLocation(imagePreview);
    setLocationCoordinates({
      long: location.coords.longitude,
      lat: location.coords.latitude,
    });
  };

  // Handle redirection to map screen
  const handleUserMap = () => {
    navigation.navigate("Map");
  };

  return (
    <View>
      <View style={styles.mapPreviewImage}>
        {pickedLocation ? (
          <Image style={styles.image} source={{ uri: pickedLocation }} />
        ) : (
          <Text>No location taken yet.</Text>
        )}
      </View>
      <View style={styles.actions}>
        <CustomOutlinedButton icon='location' onPress={handleUserLocation}>
          Locate User
        </CustomOutlinedButton>
        <CustomOutlinedButton icon='map' onPress={handleUserMap}>
          Pick on Map
        </CustomOutlinedButton>
      </View>
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  mapPreviewImage: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
