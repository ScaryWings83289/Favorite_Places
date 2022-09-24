// Packages Imports
import { useState } from "react";
import { StyleSheet, ScrollView, View, Text, TextInput } from "react-native";

// Components Imports
import ImagePicker from "../Places/ImagePicker";
import LocationPicker from "../Places/LocationPicker";

// Constants Imports
import { Colors } from "../../constants/colors";

const PlaceForm = ({}) => {
  const [enteredTitle, setEnteredTitle] = useState("");

  // Handle Title Change
  const handleTitleChange = (value) => {
    setEnteredTitle(value);
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
      <ImagePicker />
      <LocationPicker />
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
