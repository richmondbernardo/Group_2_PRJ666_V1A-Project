import { useRouter } from "expo-router";
import { Cake, Coffee, ShoppingCart, Utensils } from "lucide-react";
import React, { useRef, useState } from "react";
import {
    Animated,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { useCart } from "../components/CartContext";
import { CustomizationDialog } from "../components/CustomizationDialog";
import { ChefHat } from "../components/icons";
import { COLORS, RADIUS } from "../constants/theme";
import { menuData } from "../data/menu";

const categories = [
  { key: "appetizers", label: "Appetizers", icon: ChefHat },
  { key: "mains", label: "Mains", icon: Utensils },
  { key: "drinks", label: "Drinks", icon: Coffee },
  { key: "desserts", label: "Desserts", icon: Cake },
];

export default function MenuScreen() {
  const [activeCategory, setActiveCategory] = useState(categories[0].key);
  const filteredMenu = menuData.filter(
    (item) => item.category === activeCategory,
  );
  const [imageErrorIds, setImageErrorIds] = useState<string[]>([]);
  const handleImageError = (id: string) =>
    setImageErrorIds((prev) => [...prev, id]);

  // Customization dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { addToCart, cart } = useCart();
  const router = useRouter();

  const handleCardPress = (item: any) => {
    setSelectedItem(item);
    setDialogOpen(true);
  };

  const [notification, setNotification] = useState<{
    visible: boolean;
    productName: string;
    type: "add" | "remove";
  } | null>(null);

  // Notification timer
  React.useEffect(() => {
    if (notification?.visible) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Handler for removing product from cart
  const handleRemoveFromCart = (item: any) => {
    // Remove logic (assume removeFromCart exists in context)
    if (typeof removeFromCart === "function") {
      removeFromCart(item);
    }
    setNotification({ visible: true, productName: item.name, type: "remove" });
  };

  return (
    <View style={styles.container}>
      {/* Notification */}
      {notification?.visible && notification.type === "add" && (
        <View style={styles.notificationOverlay} pointerEvents="box-none">
          <View style={styles.notificationContainer}>
            <View style={styles.notificationIconRow}>
              {/* V sign icon, black, left side */}
              <View style={styles.notificationVSign}>
                {/* Use lucide-react Check icon */}
                {React.createElement(require("lucide-react").Check, {
                  color: "#111",
                  size: 24,
                })}
              </View>
              <Text style={styles.notificationTitle}>
                {notification.productName} added to cart!
              </Text>
            </View>
            <Text style={styles.notificationSubtitle}>
              Continue your shopping or view your cart
            </Text>
            <Pressable
              style={styles.notificationButton}
              onPress={() => router.push("/CartScreen")}
              accessibilityRole="button"
              accessibilityLabel="View Cart notification"
            >
              <Text style={styles.notificationButtonText}>View Cart</Text>
            </Pressable>
          </View>
        </View>
      )}
      {notification?.visible && notification.type === "remove" && (
        <View style={styles.notificationCenterOverlay} pointerEvents="box-none">
          <View style={styles.notificationContainer}>
            <View style={styles.notificationIconRow}>
              <View style={styles.notificationRemoveIcon}>
                {React.createElement(require("lucide-react").MinusCircle, {
                  color: "#ef4444",
                  size: 24,
                })}
              </View>
              <Text style={styles.notificationTitle}>
                {notification.productName} has been removed from the cart
              </Text>
            </View>
          </View>
        </View>
      )}
      {/* Sidebar Navigation */}
      <View style={styles.sidebar}>
        <Text style={styles.sidebarHeader}>Categories</Text>
        <View style={styles.sidebarSeparator} />
        {categories.map((cat) => {
          const isActive = activeCategory === cat.key;
          return (
            <Pressable
              key={cat.key}
              onPress={() => setActiveCategory(cat.key)}
              style={({ pressed }) => [
                styles.sidebarButton,
                isActive && styles.sidebarButtonActive,
                { opacity: pressed ? 0.85 : 1 },
              ]}
              accessibilityRole="button"
              accessibilityState={{ selected: isActive }}
            >
              {React.createElement(cat.icon, {
                color: isActive ? "#fff" : COLORS.textSecondary,
                width: 22,
                height: 22,
              })}
              <Text
                style={[
                  styles.sidebarLabel,
                  isActive && styles.sidebarLabelActive,
                ]}
              >
                {cat.label}
              </Text>
            </Pressable>
          );
        })}
        <View style={{ flex: 1 }} />
        <View style={styles.sidebarSeparator} />
        <Pressable
          style={styles.sidebarCartButton}
          onPress={() => router.push("/CartScreen")}
          accessibilityRole="button"
          accessibilityLabel="View Cart"
        >
          <ShoppingCart color="#fff" width={28} height={28} />
          <Text style={styles.sidebarCartButtonText}>View Cart</Text>
          {cart.length > 0 && (
            <View style={styles.cartCountBadge}>
              <Text style={styles.cartCountBadgeText}>
                {cart.reduce((sum, ci) => sum + ci.quantity, 0)}
              </Text>
            </View>
          )}
        </Pressable>
      </View>
      {/* Menu Grid */}
      <ScrollView style={styles.menuArea} contentContainerStyle={styles.grid}>
        {filteredMenu.map((item: any) => (
          <MenuCard
            key={item.id}
            item={item}
            onPress={() => handleCardPress(item)}
            imageErrorIds={imageErrorIds}
            handleImageError={handleImageError}
          />
        ))}
      </ScrollView>
      {/* Animated dialog overlay and scale */}
      {dialogOpen && (
        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.18)",
            opacity: 1,
            zIndex: 99,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CustomizationDialog
            visible={dialogOpen}
            item={selectedItem}
            onClose={() => {
              setDialogOpen(false);
              setSelectedItem(null);
            }}
            onAdd={(item: any, customizations: any) => {
              addToCart(item, customizations);
              setDialogOpen(false);
              setSelectedItem(null);
              setNotification({
                visible: true,
                productName: item.name,
                type: "add",
              });
            }}
          />
        </Animated.View>
      )}
      {/* View Cart Button - fixed at bottom */}
      {/* Removed bottom center cart button */}
    </View>
  );
}

const styles = StyleSheet.create({
  cartButtonContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
    backgroundColor: "transparent",
    alignItems: "center",
    zIndex: 100,
  },
  cartButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    borderRadius: 32,
    paddingVertical: 16,
    paddingHorizontal: 32,
    minWidth: 320,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 4,
  },
  cartButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 12,
    letterSpacing: 0.5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.textPrimary,
    marginBottom: 4,
    width: "100%",
    overflow: "hidden",
  },
  cardDesc: {
    fontSize: 14,
    color: COLORS.textSecondary,
    width: "100%",
    overflow: "hidden",
  },
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: COLORS.background,
  },
  sidebar: {
    width: "22%", // Slightly smaller sidebar
    minWidth: 200,
    maxWidth: 320,
    backgroundColor: COLORS.cardBackground,
    paddingVertical: 32,
    paddingHorizontal: 24,
    borderTopRightRadius: RADIUS.card,
    borderBottomRightRadius: RADIUS.card,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  sidebarHeader: {
    fontSize: 26, // Slightly smaller title
    fontWeight: "700",
    color: COLORS.primary,
    marginBottom: 18, // Less space below title
    textAlign: "left",
    marginLeft: 0,
    alignSelf: "flex-start",
  },
  sidebarSeparator: {
    width: "100%",
    height: 1,
    backgroundColor: "#D1D5DB", // Tailwind gray-300
    marginBottom: 8, // Less space after separator when above button
    opacity: 0.8,
  },
  sidebarButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14, // Slightly smaller touch area
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 12, // Less space between buttons
    backgroundColor: "transparent",
    width: "100%",
    minWidth: 0,
  },
  sidebarButtonActive: {
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },
  sidebarIcon: {
    marginRight: 12,
  },
  sidebarLabel: {
    fontSize: 18, // Slightly smaller text
    marginLeft: 16,
    flexShrink: 1,
  },
  sidebarLabelActive: {
    color: "#fff",
    fontWeight: "bold",
  },
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: RADIUS.card,
    margin: 8,
    padding: 0,
    width: "32%", // Responsive card width
    minWidth: 220,
    maxWidth: 340,
    minHeight: 360,
    maxHeight: 380,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexGrow: 1,
    flexBasis: "32%",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    transitionProperty: "box-shadow, border-color, transform",
    transitionDuration: "200ms",
    transitionTimingFunction: "ease",
  },
  cardHover: {
    shadowColor: COLORS.primary,
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 6,
    transform: [{ translateY: -6 }],
  },
  cardImage: {
    width: "100%",
    aspectRatio: 1.8,
    borderTopLeftRadius: RADIUS.card,
    borderTopRightRadius: RADIUS.card,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    marginBottom: 28, // Bigger margin between image and content
    backgroundColor: COLORS.background,
    resizeMode: "cover",
    alignSelf: "flex-start",
  },
  cardImageHover: {
    transform: [{ scale: 1.06 }],
  },
  cardContent: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    minHeight: 120,
    maxHeight: 140,
    overflow: "hidden",
    paddingHorizontal: 16, // Add horizontal padding
    paddingBottom: 16, // Add bottom padding for spacing from card edge
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    width: "100%",
  },
  caloriesBadge: {
    fontSize: 12,
    color: COLORS.textSecondary,
    backgroundColor: COLORS.background,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignSelf: "flex-start",
    marginTop: 4,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 16,
    gap: 24,
  },
  menuArea: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.primary,
    alignSelf: "flex-end",
  },
  plusButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  plusButtonText: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  sidebarCartButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.card,
    paddingVertical: 18,
    paddingHorizontal: 32,
    marginTop: 32,
    marginBottom: 12,
    width: "100%",
    alignSelf: "center",
    shadowColor: COLORS.primary,
    shadowOpacity: 0.14,
    shadowRadius: 8,
    elevation: 4,
  },
  sidebarCartButtonText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 14,
    letterSpacing: 0.5,
  },
  notificationOverlay: {
    position: "absolute",
    top: 32,
    right: 32,
    zIndex: 999,
    width: 360,
    pointerEvents: "box-none",
  },
  notificationContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  notificationIconRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 4,
  },
  notificationVSign: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginRight: 8,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111",
  },
  notificationSubtitle: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 8,
  },
  notificationButton: {
    backgroundColor: "#111",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 24,
    alignSelf: "flex-start",
    marginTop: 8,
  },
  notificationButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  cartCountBadge: {
    marginLeft: 12,
    backgroundColor: "#fff",
    borderRadius: 8,
    minWidth: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: COLORS.primary,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cartCountBadgeText: {
    color: COLORS.primary,
    fontWeight: "bold",
    fontSize: 18,
  },
  notificationCenterOverlay: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -180 }, { translateY: -60 }],
    zIndex: 999,
    width: 360,
    pointerEvents: "box-none",
  },
  notificationRemoveIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginRight: 8,
  },
});

function MenuCard({ item, onPress, imageErrorIds, handleImageError }: any) {
  const animatedValue = useRef(new Animated.Value(0)).current;
  return (
    <Pressable
      onPress={onPress}
      onHoverIn={() => {
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }}
      onHoverOut={() => {
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }}
      style={({ hovered, pressed }) => [
        styles.card,
        hovered && styles.cardHover,
        pressed && { opacity: 0.95 },
      ]}
      accessibilityLabel={`Customize ${item.name}`}
    >
      <Animated.View
        style={[
          styles.cardImage,
          {
            transform: [
              {
                scale: animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 1.06],
                }),
              },
            ],
          },
        ]}
      >
        <Image
          source={
            imageErrorIds.includes(item.id)
              ? {
                  uri: "https://images.unsplash.com/photo-1767469576689-968335dbabb5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmlzcHklMjBzcHJpbmclMjByb2xscyUyMGFwcGV0aXplcnxlbnwxfHx8fDE3NzA3NzI0NzF8MA&ixlib=rb-4.1.0&q=80&w=1080",
                }
              : { uri: item.image }
          }
          style={{
            width: "100%",
            height: "100%",
            borderTopLeftRadius: RADIUS.card,
            borderTopRightRadius: RADIUS.card,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            resizeMode: "cover",
          }}
          onError={() => handleImageError(item.id)}
          accessibilityLabel={item.name}
        />
      </Animated.View>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardDesc}>{item.description}</Text>
        <View style={styles.cardFooter}>
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        </View>
        <Text style={styles.caloriesBadge}>{item.calories} cal</Text>
      </View>
    </Pressable>
  );
}
