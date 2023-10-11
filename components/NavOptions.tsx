import {
  View,
  Text,
  FlatList,
  TouchableHighlight,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useCallback } from "react";
import tw from "tailwind-react-native-classnames";
import { Icon } from "react-native-elements";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useStackNavigation } from "../hooks";
import { useSelector } from "react-redux";
import { selectOrigin } from "../slices/navSlice";

const data = [
  {
    id: "1",
    title: "Get a ride",
    image: "https://links.papareact.com/3pn",
    screen: "MapScreen",
  },
  {
    id: "2",
    title: "Order food",
    image: "https://links.papareact.com/28w",
    screen: "EatsScreen",
  },
];

const NavOptions = () => {
  const navigation = useStackNavigation();
  const origin = useSelector(selectOrigin);

  const handleNavigation = useCallback(
    (screen: string) => {
      navigation.navigate(screen);
    },
    [navigation]
  );

  return (
    <View>
      <FlatList
        horizontal
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleNavigation(item.screen)}
            style={tw`p-2 pl-6 pb-8 bg-gray-200 m-2 w-40`}
            disabled={!origin}
          >
            <View style={tw`${!origin ? "opacity-20" : ""}`}>
              <Image
                style={{
                  width: 120,
                  height: 120,
                  resizeMode: "contain",
                }}
                source={{
                  uri: item.image,
                }}
              />
              <Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
              <Icon
                style={tw`p-2 bg-black rounded-full w-10 mt-4`}
                name="arrowright"
                type="antdesign"
                color="white"
              />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default NavOptions;
