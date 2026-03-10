import { useRouter } from "expo-router";
import { ArrowLeft, CreditCard } from "lucide-react";
import React, { useState } from "react";
import {
    ActivityIndicator,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function CheckoutScreen() {
  const total = 42.0;
  const router = useRouter();
  const { cart } = useCart();

  const [cardNumber, setCardNumber] = useState("");
  const [processing, setProcessing] = useState(false);
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const isPaymentEnabled =
    cardNumber.length === 19 &&
    expiry.length === 5 &&
    cvv.length === 3 &&
    !processing;

  const handleCardNumberChange = (text: string) => {
    const digits = text.replace(/[^0-9]/g, "");
    const limited = digits.slice(0, 16);
    const formatted = limited.replace(/(.{4})/g, "$1-").replace(/-$/, "");
    setCardNumber(formatted);
  };

  const handleExpiryChange = (text: string) => {
    const digits = text.replace(/[^0-9]/g, "");
    let formatted = digits;

    if (digits.length > 2) {
      formatted = digits.slice(0, 2) + "/" + digits.slice(2, 4);
    }

    setExpiry(formatted);
  };

  const handleCvvChange = (text: string) => {
    const digits = text.replace(/[^0-9]/g, "").slice(0, 3);
    setCvv(digits);
  };

  const handlePayment = () => {
    setProcessing(true);

    setTimeout(() => {
      setProcessing(false);
      // Compose order info
      const orderId = Math.floor(100000 + Math.random() * 900000).toString();
      const last4 = cardNumber.replace(/[^0-9]/g, "").slice(-4);
      const orderInfo = {
        orderId,
        cart,
        total,
        cardLast4: last4,
        expiry,
        time: new Date().toISOString(),
      };
      // Print order info to console
      console.log("Order Placed:", orderInfo);
      router.push("/ConfirmationScreen");
    }, 3000);
  };

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
      {/* Header */}
      <View
        style={{
          width: "100%",
          alignItems: "center",
          marginBottom: 24,
          marginTop: 40,
        }}
      >
        <View
          style={{
            width: 820,
            maxWidth: "98%",
            alignItems: "flex-start",
          }}
        >
          <TouchableOpacity
            onPress={() => router.push("/CartScreen")}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <ArrowLeft color="#111827" width={22} height={22} />
            <Text
              style={{
                color: "#111827",
                fontSize: 16,
                marginLeft: 8,
              }}
            >
              Back to cart
            </Text>
          </TouchableOpacity>

          <Text
            style={{
              fontSize: 32,
              fontWeight: "bold",
              color: Colors.light.text,
            }}
          >
            Payment
          </Text>
        </View>
      </View>

      {/* Card */}
      <View
        style={{
          width: 820,
          maxWidth: "98%",
          backgroundColor: "#fff",
          borderRadius: 16,
          borderWidth: 1,
          borderColor: "#E5E7EB",
          padding: 32,
        }}
      >
        {/* Title */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 32,
          }}
        >
          <View
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              backgroundColor: "#e0e7ff",
              justifyContent: "center",
              alignItems: "center",
              marginRight: 16,
            }}
          >
            <CreditCard color="#2563eb" size={28} />
          </View>

          <View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: Colors.light.text,
              }}
            >
              Card Payment
            </Text>

            <Text style={{ fontSize: 14, color: "#64748b" }}>
              Enter your payment details below
            </Text>
          </View>
        </View>

        {/* Card Number */}
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            color: Colors.light.text,
            marginBottom: 8,
          }}
        >
          Card Number
        </Text>

        <TextInput
          style={{
            backgroundColor: "#F1F5F9",
            borderRadius: 8,
            padding: 14,
            fontSize: 16,
            marginBottom: 24,
          }}
          placeholder="XXXX-XXXX-XXXX-XXXX"
          placeholderTextColor="#CBD5E1"
          value={cardNumber}
          onChangeText={handleCardNumberChange}
          keyboardType="number-pad"
          maxLength={19}
        />

        {/* Expiry + CVV */}
        <View style={{ flexDirection: "row", gap: 16 }}>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: Colors.light.text,
                marginBottom: 8,
              }}
            >
              Expiry Date
            </Text>

            <TextInput
              style={{
                backgroundColor: "#F1F5F9",
                borderRadius: 8,
                padding: 14,
                fontSize: 16,
              }}
              placeholder="MM/YY"
              placeholderTextColor="#CBD5E1"
              value={expiry}
              onChangeText={handleExpiryChange}
              keyboardType="number-pad"
              maxLength={5}
            />
          </View>

          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: Colors.light.text,
                marginBottom: 8,
              }}
            >
              CVV
            </Text>

            <TextInput
              style={{
                backgroundColor: "#F1F5F9",
                borderRadius: 8,
                padding: 14,
                fontSize: 16,
              }}
              placeholder="123"
              placeholderTextColor="#CBD5E1"
              value={cvv}
              onChangeText={handleCvvChange}
              keyboardType="number-pad"
              maxLength={3}
            />
          </View>
        </View>

        {/* Footer */}
        <View style={{ marginTop: 32 }}>
          <View
            style={{
              height: 1,
              backgroundColor: "#E5E7EB",
              marginBottom: 24,
            }}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 24,
            }}
          >
            <Text style={{ fontSize: 16, color: Colors.light.text }}>
              Total Amount
            </Text>

            <Text
              style={{
                fontSize: 28,
                fontWeight: "bold",
                color: Colors.light.text,
              }}
            >
              ${total.toFixed(2)}
            </Text>
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: isPaymentEnabled ? "#2563eb" : "#cbd5e1",
              borderRadius: 10,
              paddingVertical: 18,
              alignItems: "center",
              opacity: isPaymentEnabled ? 1 : 0.6,
              flexDirection: "row",
              justifyContent: "center",
            }}
            disabled={!isPaymentEnabled}
            onPress={handlePayment}
          >
            {processing ? (
              <>
                <ActivityIndicator
                  size="small"
                  color="#fff"
                  style={{ marginRight: 10 }}
                />
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                >
                  Processing
                </Text>
              </>
            ) : (
              <Text
                style={{
                  color: "#fff",
                  fontSize: 18,
                  fontWeight: "bold",
                }}
              >
                Complete Payment
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <Text
        style={{
          marginTop: 24,
          fontSize: 13,
          color: "#64748b",
          textAlign: "center",
        }}
      >
        This is a simulated payment interface. No actual charges will be made.
      </Text>
    </View>
  );
}
