import { COLORS, TYPOGRAPHY } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View style={[styles.container, isDark && styles.darkContainer]}>
      <Text style={[styles.title, isDark && styles.darkText]}>SuperFry</Text>
      <Text style={[styles.subtitle, isDark && styles.darkSubtitle]}>
        Swipe to Kitchen or Manager to get started
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
  },
  darkContainer: {
    backgroundColor: "#1a1a1a",
  },
  title: {
    fontSize: 32,
    fontWeight: TYPOGRAPHY.headingWeight,
    marginBottom: 12,
    color: COLORS.primary,
    letterSpacing: 0.5,
  },
  darkText: {
    color: "#fff",
  },
  subtitle: {
    fontSize: TYPOGRAPHY.bodySize,
    color: COLORS.textSecondary,
    textAlign: "center",
    paddingHorizontal: 24,
  },
  darkSubtitle: {
    color: "#999",
  },
});
