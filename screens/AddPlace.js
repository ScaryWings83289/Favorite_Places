// Packages Imports
import { StyleSheet } from "react-native";

// Components Imports
import PlaceForm from "../components/Places/PlaceForm";

// Utils Imports
import { insertPlace } from "../utils/database";

const AddPlace = ({ navigation }) => {
  // Creating a new Place
  const handlePlaceCreate = async (place) => {
    await insertPlace(place);
    navigation.navigate("AllPlaces", {
      place,
    });
  };

  return <PlaceForm onCreatePlace={handlePlaceCreate} />;
};

export default AddPlace;

const styles = StyleSheet.create({});
