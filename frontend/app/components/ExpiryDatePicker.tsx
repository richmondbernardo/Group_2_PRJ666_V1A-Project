import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Modal, Platform, Text, TouchableOpacity, View } from "react-native";

interface ExpiryDatePickerProps {
  value: string;
  onChange: (val: string) => void;
}

export default function ExpiryDatePicker({
  value,
  onChange,
}: ExpiryDatePickerProps) {
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());

  const handleConfirm = (event: any, selectedDate?: Date) => {
    setShow(false);
    if (selectedDate) {
      // Format MM/YY
      const mm = String(selectedDate.getMonth() + 1).padStart(2, "0");
      const yy = String(selectedDate.getFullYear()).slice(-2);
      onChange(`${mm}/${yy}`);
    }
  };

  return (
    <View>
      <TouchableOpacity
        style={{ backgroundColor: "#F1F5F9", borderRadius: 8, padding: 14 }}
        onPress={() => setShow(true)}
      >
        <Text style={{ fontSize: 16, color: value ? "#0f172a" : "#CBD5E1" }}>
          {value || "MM/YY"}
        </Text>
      </TouchableOpacity>
      {show && (
        <Modal transparent visible>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,0.2)",
            }}
          >
            <View
              style={{ backgroundColor: "#fff", borderRadius: 16, padding: 24 }}
            >
              <DateTimePicker
                value={date}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={handleConfirm}
                minimumDate={new Date()}
              />
              <TouchableOpacity
                onPress={() => setShow(false)}
                style={{ marginTop: 16 }}
              >
                <Text
                  style={{ color: "#2563eb", fontWeight: "bold", fontSize: 16 }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}
