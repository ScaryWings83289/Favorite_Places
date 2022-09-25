// Packages Imports
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { StyleSheet } from "react-native";

// Components Import
import PlacesList from "../components/Places/PlacesList";

// Utils Imports
import { fetchPlaces } from "../utils/database";

const AllPlaces = ({ route }) => {
  const [loadedPlaces, setLoadedPlaces] = useState([]);

  const isFocused = useIsFocused();

  // Extracting data from the route params
  useEffect(() => {
    const loadPlaces = async () => {
      const places = await fetchPlaces();
      setLoadedPlaces(places);
    };

    if (isFocused && route.params) {
      loadPlaces();
      // setLoadedPlaces((curPlaces) => [...curPlaces, route.params.place]);
    }
  }, [isFocused, route]);

  return <PlacesList places={loadedPlaces} />;
};

export default AllPlaces;

const styles = StyleSheet.create({});
