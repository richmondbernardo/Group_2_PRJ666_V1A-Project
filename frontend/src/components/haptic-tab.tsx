import * as Haptics from "expo-haptics";
import React from "react";
import { Pressable } from "react-native";

// A simple tab bar button that triggers haptic feedback on press
export function HapticTab(props: any) {
  return (
    <Pressable
      {...props}
      onPress={(e) => {
        Haptics.selectionAsync();
        if (props.onPress) props.onPress(e);
      }}
    >
      {props.children}
    </Pressable>
  );
}
