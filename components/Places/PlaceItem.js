// Packages Imports
import { StyleSheet, Image, View, Text, Pressable } from "react-native";

const PlacesItem = ({ place, onSelect }) => {
  return (
    <Pressable onPress={onSelect}>
      <Image source={place.imageUri} />
      <View>
        <Text>{place.title}</Text>
        <Text>{place.address}</Text>
      </View>
    </Pressable>
  );
};

export default PlacesItem;

const styles = StyleSheet.create({});
