import { View, Text, SafeAreaView, StyleSheet, Image } from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";
import NavOptions from "../components/NavOptions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_API_KEY } from "@env";
import { useAppDispatch } from "../hooks";
import { setDestination, setOrigin } from "../slices/navSlice";
import NavFavourites from "../components/NavFavourites";
const HomeScreen = () => {
  const dispatch = useAppDispatch();
  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`p-5`}>
        <Image
          style={{
            width: 100,
            height: 100,
            resizeMode: "contain",
          }}
          source={{
            uri: "https://links.papareact.com/gzs",
          }}
        />
        <GooglePlacesAutocomplete
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
          placeholder="Where From?"
          minLength={2}
          enablePoweredByContainer={false}
          fetchDetails={true}
          onPress={(data, details = null) => {
            dispatch(
              setOrigin({
                data: data,
                details: details,
              })
            );
            dispatch(setDestination(null));
          }}
          styles={{
            container: {
              flex: 0,
            },
            textInput: {
              fontSize: 18,
            },
          }}
          query={{
            key: GOOGLE_MAPS_API_KEY,
            language: "en",
          }}
        />
        <NavOptions />
        <NavFavourites />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
