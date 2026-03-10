import { useRouter } from "expo-router";
import { ArrowLeft, Check } from "lucide-react";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useCart } from "../components/CartContext";
import { Colors } from "../constants/theme";

export default function ConfirmationScreen() {
  const router = useRouter();
  const { clearCart } = useCart();
  const orderNumber = "12345";
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#f8fafc",
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
      }}
    >
      {/* Back to Home link - outside card, top left */}
      <View
        style={{
          position: "absolute",
          top: 32,
          left: 32,
          zIndex: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => router.push("/")}
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "transparent",
            borderRadius: 16,
            paddingVertical: 4,
            paddingHorizontal: 8,
            alignSelf: "flex-start",
          }}
        >
          <ArrowLeft color="#111827" width={22} height={22} />
          <Text
            style={{
              color: "#111827",
              fontSize: 16,
              fontWeight: "500",
              marginLeft: 8,
              fontFamily: "Inter, Helvetica, Arial, sans-serif",
            }}
          >
            Back to Home
          </Text>
        </TouchableOpacity>
      </View>

      {/* Card Container */}
      <View
        style={{
          width: 820,
          maxWidth: "98%",
          backgroundColor: "#fff",
          borderRadius: 16,
          borderWidth: 1,
          borderColor: "#E5E7EB",
          paddingTop: 48,
          paddingBottom: 48,
          paddingHorizontal: 40,
          alignItems: "center",
          justifyContent: "center",
          minHeight: 420,
          display: "flex",
        }}
      >
        {/* Success Icon - large, thick, soft-green badge */}
        <View
          style={{
            width: 120,
            height: 120,
            borderRadius: 60,
            backgroundColor: "#E6F9ED",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 32,
            shadowColor: "#10B981",
            shadowOpacity: 0.12,
            shadowRadius: 12,
            borderWidth: 4,
            borderColor: "#A7F3D0",
          }}
        >
          <Check color="#03543F" size={72} strokeWidth={3.5} />
        </View>
        {/* Main Message - much larger, bolder */}
        <Text
          style={{
            fontSize: 38,
            fontWeight: "900",
            color: Colors.light.text,
            textAlign: "center",
            marginBottom: 18,
            fontFamily: "Inter, Helvetica, Arial, sans-serif",
          }}
        >
          Thank you for your order!
        </Text>
        {/* Order Details - smaller, lighter grey */}
        <Text
          style={{
            fontSize: 18,
            color: "#94A3B8",
            textAlign: "center",
            marginBottom: 6,
            fontFamily: "Inter, Helvetica, Arial, sans-serif",
            fontWeight: "500",
          }}
        >
          Order number:{" "}
          <Text style={{ fontWeight: "bold", color: "#64748b" }}>
            #{orderNumber}
          </Text>
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: "#CBD5E1",
            textAlign: "center",
            marginBottom: 32,
            fontFamily: "Inter, Helvetica, Arial, sans-serif",
            fontWeight: "500",
          }}
        >
          Estimated delivery: 25-35 mins
        </Text>
        {/* Divider - very faint */}
        <View
          style={{
            height: 1,
            backgroundColor: "#F1F5F9",
            width: "100%",
            marginBottom: 32,
          }}
        />
        {/* Action Section - vibrant emerald, full-width, rounded, tall */}
        <TouchableOpacity
          style={{
            backgroundColor: "#10B981",
            borderRadius: 12,
            paddingVertical: 22,
            alignItems: "center",
            width: "100%",
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 8,
            shadowColor: "#10B981",
            shadowOpacity: 0.12,
            shadowRadius: 8,
          }}
          onPress={() => {
            clearCart();
            router.push("/menu");
          }}
        >
          <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>
            Go back to Menu
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
