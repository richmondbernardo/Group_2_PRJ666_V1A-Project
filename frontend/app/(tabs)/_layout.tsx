import { Tabs } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

import { HapticTab } from "@/components/haptic-tab";
import { ChefHat, LayoutDashboard } from "@/components/icons";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

function RestaurantLogo() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        paddingLeft: 16,
      }}
    >
      <View
        style={{
          width: 36,
          height: 36,
          borderRadius: 14,
          backgroundColor: "#3b82f6",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ChefHat width={20} height={20} color="#fff" />
      </View>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          color: isDark ? "#fff" : "#000",
        }}
      >
        SuperFryPOS
      </Text>
    </View>
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: true,
        tabBarButton: HapticTab,
        headerTitle: "",
        headerBackTitle: "",
        headerStyle: {
          backgroundColor: colorScheme === "dark" ? "#1a1a1a" : "#fff",
          borderBottomWidth: 1,
          borderBottomColor: colorScheme === "dark" ? "#333" : "#e5e7eb",
        },
        headerLeft: () => <RestaurantLogo />,
      }}
    >
      <Tabs.Screen
        name="menu"
        options={{
          title: "Menu",
          tabBarIcon: ({ color }) => (
            <LayoutDashboard width={24} height={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="kitchen"
        options={{
          title: "Kitchen",
          tabBarIcon: ({ color }) => (
            <ChefHat width={24} height={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="manager"
        options={{
          title: "Manager",
          tabBarIcon: ({ color }) => (
            <LayoutDashboard width={24} height={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
