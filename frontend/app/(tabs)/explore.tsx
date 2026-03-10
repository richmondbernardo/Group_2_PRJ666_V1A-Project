import { COLORS, TYPOGRAPHY } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { StyleSheet, Text, View } from "react-native";

export default function TabTwoScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View style={[styles.container, isDark && styles.darkContainer]}>
      <Text style={[styles.title, isDark && styles.darkText]}>About</Text>
      <Text style={[styles.subtitle, isDark && styles.darkSubtitle]}>
        SuperFry Restaurant POS System v1.0
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
