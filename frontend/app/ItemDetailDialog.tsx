import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from "@/constants/theme";
import { MenuItem } from "@/data/menu";
import React, { useState } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function ItemDetailDialog({
  item,
  onClose,
  onAddToCart,
}: {
  item: MenuItem;
  onClose: () => void;
  onAddToCart: (customizations: any, addOnPrice: number) => void;
}) {
  // Customization state logic here
  const [selectedCustomizations, setSelectedCustomizations] = useState<
    Record<string, any>
  >({});
  const [quantity, setQuantity] = useState(1);
  const [addOnPrice, setAddOnPrice] = useState(0);

  // Calculate add-on price
  // ...logic for add-on price calculation based on selectedCustomizations...

  return (
    <View
      style={styles.overlay}
      accessibilityLabel="Item Customization Dialog"
      accessible
    >
      <View
        style={styles.dialog}
        accessibilityRole="dialog"
        accessibilityLabel={`Customize ${item.name}`}
      >
        {/* Close Button */}
        <TouchableOpacity
          style={styles.closeButton}
          onPress={onClose}
          accessibilityLabel="Close dialog"
          accessible
        >
          <Text style={styles.closeButtonText}>×</Text>
        </TouchableOpacity>
        {/* Hero Image */}
        <Image
          source={{ uri: item.image }}
          style={styles.heroImage}
          resizeMode="cover"
          accessibilityLabel={item.name + " image"}
        />
        <ScrollView style={styles.content}>
          <Text style={styles.header} accessibilityRole="header">
            {item.name}
          </Text>
          <Text style={styles.desc}>{item.description}</Text>
          <View style={styles.priceRow}>
            <Text style={styles.price}>${item.price.toFixed(2)}</Text>
            <Text style={styles.caloriesBadge}>{item.calories} cal</Text>
          </View>
          {/* Customization Section */}
          {item.customizations && (
            <View style={styles.customSection}>
              <Text style={styles.customHeader}>Customize Your Order</Text>
              {/* Render customization options here */}
            </View>
          )}
          {/* Quantity Controls */}
          <View style={styles.qtyRow}>
            <TouchableOpacity
              onPress={() => setQuantity(Math.max(1, quantity - 1))}
              style={styles.qtyBtn}
              accessibilityLabel="Decrease quantity"
              accessible
            >
              <Text>-</Text>
            </TouchableOpacity>
            <Text
              style={styles.qtyText}
              accessibilityLabel={`Quantity: ${quantity}`}
            >
              {quantity}
            </Text>
            <TouchableOpacity
              onPress={() => setQuantity(quantity + 1)}
              style={styles.qtyBtn}
              accessibilityLabel="Increase quantity"
              accessible
            >
              <Text>+</Text>
            </TouchableOpacity>
          </View>
          {/* Add to Cart Button */}
          <TouchableOpacity
            style={styles.addToCartBtn}
            onPress={() => onAddToCart(selectedCustomizations, addOnPrice)}
            accessibilityLabel={`Add ${item.name} to cart`}
            accessible
          >
            <Text style={styles.addToCartText}>
              Add to Cart - ${(item.price + addOnPrice) * quantity}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
  },
  dialog: {
    width: 768,
    maxHeight: "90%",
    backgroundColor: COLORS.cardBackground,
    borderRadius: RADIUS.interactive,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  closeButtonText: {
    fontSize: 24,
    color: COLORS.textPrimary,
    fontWeight: "bold",
  },
  heroImage: {
    width: "100%",
    aspectRatio: 16 / 9,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SPACING.page,
  },
  header: {
    fontSize: 28,
    fontWeight: TYPOGRAPHY.headingWeight,
    marginBottom: 8,
    color: COLORS.textPrimary,
  },
  desc: {
    fontSize: 18,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 12,
  },
  price: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  caloriesBadge: {
    backgroundColor: COLORS.background,
    color: COLORS.textSecondary,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    fontSize: TYPOGRAPHY.smallSize,
    fontWeight: "500",
  },
  customSection: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    marginTop: 24,
    paddingTop: 24,
    marginBottom: 24,
  },
  customHeader: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
    color: COLORS.textPrimary,
  },
  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 24,
  },
  qtyBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  qtyText: {
    fontSize: 18,
    fontWeight: "500",
    width: 32,
    textAlign: "center",
  },
  addToCartBtn: {
    width: "100%",
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.interactive,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 8,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  addToCartText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
