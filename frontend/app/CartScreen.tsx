import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { ArrowLeft, ShoppingCart, Trash2 } from "lucide-react";
import React from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useCart } from "../components/CartContext";
import { COLORS, RADIUS } from "../constants/theme";

export default function CartScreen() {
  const router = useRouter();
  const { cart, removeFromCart, addToCart } = useCart();
  const hasItems = cart && cart.length > 0;

  // Calculate subtotal for all items
  const subtotal = cart.reduce(
    (sum, cartItem) => sum + cartItem.item.price * cartItem.quantity,
    0,
  );
  const tax = +(subtotal * 0.13).toFixed(2);
  const [tipPercent, setTipPercent] = React.useState(0.15);
  const [customTip, setCustomTip] = React.useState("");
  const tip =
    tipPercent === "custom" && customTip
      ? parseFloat(customTip || "0")
      : +(
          subtotal * (typeof tipPercent === "number" ? tipPercent : 0.15)
        ).toFixed(2);
  const total = +(subtotal + tax + tip).toFixed(2);

  // Helper to decrement quantity
  const decrementQuantity = (cartItem) => {
    if (cartItem.quantity > 1) {
      // Remove one from quantity
      cartItem.quantity -= 1;
      // Update cart state
      removeFromCart(cartItem.item.id);
      for (let i = 0; i < cartItem.quantity; i++) {
        addToCart(cartItem.item, cartItem.customizations);
      }
    } else {
      removeFromCart(cartItem.item.id);
    }
  };

  // Helper to increment quantity
  const incrementQuantity = (cartItem) => {
    addToCart(cartItem.item, cartItem.customizations);
  };

  const [showTipDropdown, setShowTipDropdown] = React.useState(false);

  return (
    <View style={styles.container} accessibilityLabel="Cart Page" accessible>
      <View style={styles.headerBlock}>
        <TouchableOpacity
          style={styles.backBtn}
          accessibilityLabel="Back to Menu"
          onPress={() => router.replace("/MenuScreen")}
          accessible
        >
          <ArrowLeft color="#111" width={22} height={22} />
          <Text style={styles.backBtnText}>Back to menu</Text>
        </TouchableOpacity>
        <Text style={styles.heading}>Your Order</Text>
      </View>
      {hasItems ? (
        <ScrollView
          style={styles.cartScroll}
          contentContainerStyle={styles.cartColumn}
        >
          {/* Product Cards for all cart items */}
          {cart.map((cartItem, idx) => (
            <View key={cartItem.item.id + "-" + idx} style={styles.productCard}>
              <View style={styles.productTopRow}>
                <Image
                  source={{ uri: cartItem.item.image }}
                  style={styles.productImage}
                  accessibilityLabel={cartItem.item.name}
                />
                <View style={{ flex: 1 }} />
                <Text style={styles.productPrice}>
                  ${cartItem.item.price * cartItem.quantity}
                </Text>
              </View>
              <View style={styles.productDetails}>
                <View style={styles.productTitleRow}>
                  <Text style={styles.productTitle}>{cartItem.item.name}</Text>
                </View>
                <Text style={styles.productCalories}>
                  {cartItem.item.calories} cal
                </Text>
                {cartItem.customizations && (
                  <Text style={styles.productModifier}>
                    {Object.entries(cartItem.customizations)
                      .map(([label, value]) => `${label}: ${value}`)
                      .join(", ")}
                  </Text>
                )}
                <View style={styles.productControlsRow}>
                  <View style={styles.quantitySelector}>
                    <TouchableOpacity
                      disabled={cartItem.quantity === 1}
                      onPress={() => decrementQuantity(cartItem)}
                    >
                      <Text
                        style={
                          cartItem.quantity === 1
                            ? [styles.quantityBtn, { color: "#cbd5e1" }]
                            : styles.quantityBtn
                        }
                      >
                        –
                      </Text>
                    </TouchableOpacity>
                    <Text style={styles.quantityValue}>
                      {cartItem.quantity}
                    </Text>
                    <TouchableOpacity
                      onPress={() => incrementQuantity(cartItem)}
                    >
                      <Text style={styles.quantityBtn}>+</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    style={styles.removeBtn}
                    onPress={() => removeFromCart(cartItem.item.id)}
                    accessibilityLabel="Remove item"
                  >
                    <Trash2 color={COLORS.error} width={20} height={20} />
                    <Text style={styles.removeBtnText}>Remove</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
          {/* Order Summary Card */}
          <View style={styles.summaryCard}>
            <View style={styles.summaryTableRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryTableRow}>
              <Text style={styles.summaryLabel}>Tax (13%)</Text>
              <Text style={styles.summaryValue}>${tax.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryTableRow}>
              <Text style={styles.summaryLabel}>Tip</Text>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 12 }}
              >
                <Picker
                  selectedValue={
                    tipPercent === "custom" ? "custom" : tipPercent
                  }
                  style={{ width: 120, marginLeft: 12 }}
                  onValueChange={(value) => {
                    if (value === "custom") {
                      setTipPercent("custom");
                    } else {
                      setTipPercent(value);
                      setCustomTip("");
                    }
                  }}
                  accessibilityLabel="Select tip percentage"
                >
                  <Picker.Item label="15%" value={0.15} />
                  <Picker.Item label="18%" value={0.18} />
                  <Picker.Item label="20%" value={0.2} />
                  <Picker.Item label="25%" value={0.25} />
                  <Picker.Item label="Custom" value="custom" />
                </Picker>
                {tipPercent === "custom" && (
                  <TextInput
                    style={{
                      width: 40,
                      height: 36,
                      borderWidth: 1,
                      borderColor: "#E5E7EB",
                      borderRadius: 8,
                      paddingHorizontal: 8,
                      fontSize: 16,
                      textAlign: "center",
                    }}
                    value={customTip}
                    onChangeText={(text) => {
                      // Only allow positive numbers, max two digits
                      const sanitized = text.replace(/[^0-9]/g, "").slice(0, 2);
                      setCustomTip(sanitized);
                    }}
                    keyboardType="numeric"
                    placeholder="Custom"
                    accessibilityLabel="Custom tip amount"
                  />
                )}
                <Text style={styles.summaryValue}>
                  $
                  {tipPercent === "custom" && customTip
                    ? parseFloat(customTip || "0").toFixed(2)
                    : tip.toFixed(2)}
                </Text>
              </View>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryTotalRow}>
              <Text style={styles.summaryTotalLabel}>Total</Text>
              <Text style={styles.summaryTotalValue}>${total.toFixed(2)}</Text>
            </View>
            <TouchableOpacity
              style={styles.checkoutBtn}
              accessibilityLabel="Proceed to Checkout"
              onPress={() => router.push("/CheckoutScreen")}
            >
              <Text style={styles.checkoutBtnText}>Proceed to Checkout</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : (
        <View style={styles.emptyCartWrapper}>
          <View
            style={styles.emptyCard}
            accessibilityLabel="Empty Cart State"
            accessible
          >
            <ShoppingCart
              color="#A3A3A3"
              width={72}
              height={72}
              style={styles.emptyIcon}
            />
            <Text style={styles.emptyHeading}>Your cart is empty</Text>
            <Text style={styles.emptyDesc}>
              Add some delicious items from our menu to get started
            </Text>
            <TouchableOpacity
              style={styles.ctaBtn}
              accessibilityLabel="Browse Menu"
              onPress={() => router.replace("/MenuScreen")}
            >
              <Text style={styles.ctaBtnText}>Browse menu</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 32,
    fontFamily: "Inter, Helvetica, Arial, sans-serif",
  },
  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    marginLeft: 0,
    marginBottom: 16,
    backgroundColor: "transparent",
    borderRadius: RADIUS.card,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignSelf: "flex-start",
  },
  backBtnText: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 8,
    fontFamily: "Inter, Helvetica, Arial, sans-serif",
  },
  heading: {
    fontSize: 32,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 32,
    fontFamily: "Inter, Helvetica, Arial, sans-serif",
  },
  cartContent: {
    flexDirection: "row",
    gap: 32,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  productCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 32,
    marginBottom: 0,
    shadowColor: "transparent",
    alignItems: "flex-start",
    width: "100%",
    maxWidth: 1000,
    minWidth: 420,
    alignSelf: "center",
    position: "relative",
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginBottom: 18,
    backgroundColor: COLORS.background,
    resizeMode: "cover",
    alignSelf: "flex-start",
  },
  productDetails: {
    width: "100%",
  },
  productPrice: {
    position: "absolute",
    top: 32,
    right: 32,
    fontSize: 22,
    fontWeight: "bold",
    color: "#111827",
    fontFamily: "Inter, Helvetica, Arial, sans-serif",
    textAlign: "right",
    marginTop: 0,
  },
  productTopRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 12,
  },
  productTitleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "100%",
    marginBottom: 4,
    marginTop: 0,
  },
  productTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    fontFamily: "Inter, Helvetica, Arial, sans-serif",
  },
  productCalories: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 2,
    fontFamily: "Inter, Helvetica, Arial, sans-serif",
  },
  productModifier: {
    fontSize: 13,
    color: "#94a3b8",
    marginBottom: 8,
    fontFamily: "Inter, Helvetica, Arial, sans-serif",
  },
  productControlsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 24,
    gap: 12,
  },
  quantitySelector: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f5f9",
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 24,
    minWidth: 120,
    marginRight: 8,
  },
  quantityBtn: {
    fontSize: 28,
    color: "#64748b",
    fontWeight: "700",
    paddingHorizontal: 16,
    fontFamily: "Inter, Helvetica, Arial, sans-serif",
  },
  quantityValue: {
    fontSize: 22,
    color: "#111827",
    fontWeight: "700",
    paddingHorizontal: 16,
    fontFamily: "Inter, Helvetica, Arial, sans-serif",
  },
  removeBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f5f9",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 18,
    minWidth: 100,
    marginLeft: 8,
  },
  removeBtnText: {
    color: COLORS.error,
    fontSize: 15,
    fontWeight: "700",
    marginLeft: 6,
    fontFamily: "Inter, Helvetica, Arial, sans-serif",
  },
  summaryCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 32,
    marginTop: 0,
    shadowColor: "transparent",
    width: "100%",
    maxWidth: 1000,
    minWidth: 420,
    alignSelf: "center",
  },
  summaryTableRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  summaryLabel: {
    fontSize: 16,
    color: "#374151",
    fontWeight: "500",
    fontFamily: "Inter, Helvetica, Arial, sans-serif",
  },
  summaryValue: {
    fontSize: 16,
    color: "#111827",
    fontWeight: "400",
    fontFamily: "Inter, Helvetica, Arial, sans-serif",
  },
  tipDropdownRowHorizontal: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    position: "relative",
  },
  tipDropdownMenu: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f5f9",
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  tipDropdownText: {
    fontSize: 15,
    color: "#374151",
    fontFamily: "Inter, Helvetica, Arial, sans-serif",
    marginRight: 4,
  },
  tipDropdownMenuActive: {
    borderColor: COLORS.primary,
    backgroundColor: "#e0e7ff",
  },
  summaryDivider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 20,
    width: "100%",
    opacity: 0.5,
  },
  summaryTotalRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 32,
  },
  summaryTotalLabel: {
    fontSize: 22,
    color: "#111827",
    fontWeight: "700",
    fontFamily: "Inter, Helvetica, Arial, sans-serif",
  },
  summaryTotalValue: {
    fontSize: 28,
    color: "#111827",
    fontWeight: "700",
    fontFamily: "Inter, Helvetica, Arial, sans-serif",
  },
  checkoutBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 22,
    alignItems: "center",
    marginTop: 0,
    width: "100%",
    shadowColor: COLORS.primary,
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 2,
  },
  checkoutBtnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    fontFamily: "Inter, Helvetica, Arial, sans-serif",
  },
  headerBlock: {
    width: "100%",
    maxWidth: 1000,
    minWidth: 420,
    marginBottom: 24,
    marginLeft: 0,
    marginRight: 0,
    alignSelf: "center",
  },
  cartColumn: {
    width: "100%",
    maxWidth: 1000,
    minWidth: 420,
    flexDirection: "column",
    gap: 24,
    alignSelf: "center",
  },
  productCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 32,
    marginBottom: 0,
    shadowColor: "transparent",
    alignItems: "flex-start",
    width: "100%",
    maxWidth: 1000,
    minWidth: 420,
    alignSelf: "center",
  },
  summaryCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 32,
    marginTop: 0,
    shadowColor: "transparent",
    width: "100%",
    maxWidth: 1000,
    minWidth: 420,
    alignSelf: "center",
  },
  emptyCartWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  emptyCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    padding: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 0,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    minWidth: 380,
    maxWidth: 480,
    width: "40%",
  },
  emptyIcon: {
    marginBottom: 18,
  },
  emptyHeading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111",
    marginBottom: 10,
    textAlign: "center",
  },
  emptyDesc: {
    fontSize: 16,
    color: "#888",
    marginBottom: 28,
    textAlign: "center",
    maxWidth: 320,
  },
  ctaBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 32,
    marginTop: 0,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 2,
    minWidth: 220,
    maxWidth: 320,
    alignSelf: "center",
  },
  ctaBtnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  cartScroll: {
    flex: 1,
    width: "100%",
    alignSelf: "center",
  },
  tipDropdownList: {
    position: "absolute",
    top: 40,
    left: 0,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOpacity: 0.16,
    shadowRadius: 12,
    elevation: 8,
    zIndex: 10,
    minWidth: 80,
  },
  tipDropdownOption: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginVertical: 2,
  },
});
