// Packages Imports
import { useCallback, useState } from "react";
import { StyleSheet, ScrollView, View, Text, TextInput } from "react-native";

// Components Imports
import ImagePicker from "../Places/ImagePicker";
import LocationPicker from "../Places/LocationPicker";
import CustomButton from "../Inputs/CustomButton";

// Models Imports
import { Place } from "../../models/place";

// Constants Imports
import { Colors } from "../../constants/colors";

const PlaceForm = ({ onCreatePlace }) => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [selectedImage, setSelectedImage] = useState();
  const [pickedLocation, setPickedLocation] = useState();

  // Handle Title Change
  const handleTitleChange = (value) => {
    setEnteredTitle(value);
  };

  // Handling Selected Image
  const handleCaptureImage = (imageUri) => {
    setSelectedImage(imageUri);
  };

  // Handling picked Location
  const handlePickedLocation = useCallback((location) => {
    setPickedLocation(location);
  }, []);

  // Saving a new place
  const handlePlaceSave = () => {
    const placeData = new Place(enteredTitle, selectedImage, pickedLocation);
    onCreatePlace(placeData);
  };

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={handleTitleChange}
          value={enteredTitle}
        />
      </View>
      <ImagePicker onTakeImage={handleCaptureImage} />
      <LocationPicker onPickLocation={handlePickedLocation} />
      <CustomButton onPress={handlePlaceSave}>Add Place</CustomButton>
    </ScrollView>
  );
};

export default PlaceForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
});
