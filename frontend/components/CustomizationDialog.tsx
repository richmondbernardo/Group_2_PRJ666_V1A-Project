import React from "react";
import {
    Image,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
// Replace MaterialIcons import with lucide-react icons
import { Check, X } from "lucide-react";

// Add styles definition
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  dialog: {
    backgroundColor: "#fff",
    borderRadius: 16, // Less roundy
    overflow: "hidden",
    padding: 0,
    shadowColor: "#2563eb",
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 2,
    width: "min(70vw, 98%)", // Less wide
    maxWidth: 520, // More narrow
    minWidth: 320,
    alignSelf: "center",
    maxHeight: "90vh",
  },
  itemHeader: {
    display: "none",
  },
  itemImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    backgroundColor: "#f1f5f9",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  heroWrap: {
    width: "100%",
    aspectRatio: 16 / 9,
    backgroundColor: "#f1f5f9",
    overflow: "hidden",
    minHeight: 120,
    maxHeight: 340,
  },
  heroImage: {
    width: "100%",
    height: "auto", // Let height be determined by aspect ratio
    aspectRatio: 16 / 9,
    resizeMode: "cover",
    backgroundColor: "#f1f5f9",
    borderTopLeftRadius: 16, // Match dialog roundness
    borderTopRightRadius: 16, // Match dialog roundness
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    minHeight: 120,
    maxHeight: 340,
  },
  contentWrap: {
    padding: 32,
    width: "100%",
    maxWidth: 704,
    alignSelf: "center",
  },
  title: {
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "left",
    color: "#111",
    letterSpacing: 0.2,
    fontSize: 28,
    height: undefined,
  },
  desc: {
    fontSize: 18,
    color: "#444",
    marginBottom: 24,
    textAlign: "left",
    fontWeight: "500",
    lineHeight: 28,
  },
  itemMeta: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 8, // Reduced gap for closer spacing
    marginBottom: 32,
    height: undefined,
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2563eb",
    backgroundColor: "transparent",
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderRadius: 0,
    height: undefined,
    marginRight: 16,
    textAlign: "left",
  },
  calories: {
    fontSize: 16,
    color: "#64748b",
    backgroundColor: "#f1f5f9",
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 999,
    height: undefined,
    alignSelf: "center",
    textAlign: "left",
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#e5e7eb",
    marginVertical: 18,
    alignSelf: "center",
  },
  section: {
    marginBottom: 0,
    backgroundColor: "#fff",
    borderRadius: 0,
    padding: 0,
    borderWidth: 0,
    borderColor: "transparent",
    shadowColor: "transparent",
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sectionSpacing: {
    marginTop: 32,
  },
  sectionLabel: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    color: "#2563eb",
    height: 28,
  },
  optionCard: {
    height: 64,
    width: "100%",
    padding: 16,
    borderWidth: 2,
    borderColor: "#e5e7eb", // soft dark gray accent
    borderRadius: 12,
    backgroundColor: "#fff", // white center
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    shadowColor: "#e5e7eb",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 1,
  },
  optionCardSelected: {
    borderColor: "#2563eb",
    backgroundColor: "#e0e7ff",
  },
  optionCardMulti: {
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#e5e7eb", // soft dark gray accent
    backgroundColor: "#fff", // white center
    shadowColor: "#e5e7eb",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 1,
  },
  optionCardMultiSelected: {
    borderColor: "#2563eb",
    backgroundColor: "#e0e7ff", // Light blue only when selected
  },
  optionIndicatorWrap: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#2563eb",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#2563eb",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#2563eb",
    backgroundColor: "#fff",
  },
  checkboxSelected: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#2563eb",
    backgroundColor: "#2563eb",
    justifyContent: "center",
    alignItems: "center",
  },
  checkmark: {
    width: 16,
    height: 16,
    borderRadius: 2,
    backgroundColor: "#fff",
  },
  optionText: {
    fontSize: 16,
    color: "#222",
    fontWeight: "500",
  },
  addBtn: {
    width: "100%",
    height: 56,
    borderRadius: 8,
    marginTop: 32,
    backgroundColor: "#2563eb",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#2563eb",
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 2,
  },
  addBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    letterSpacing: 0.2,
  },
  closeBtn: {
    position: "absolute",
    top: 18,
    right: 18,
    zIndex: 10,
    backgroundColor: "transparent",
    padding: 8,
  },
  checkboxSelectedWithV: {
    justifyContent: "center",
    alignItems: "center",
  },
  checkmarkV: {
    position: "absolute",
    top: 3,
    left: 3,
    right: 3,
    bottom: 3,
    justifyContent: "center",
    alignItems: "center",
    pointerEvents: "none",
  },
  customizeTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#111",
    marginBottom: 16,
    textAlign: "left",
  },
});

export const CustomizationDialog = ({ visible, item, onClose, onAdd }) => {
  const [selected, setSelected] = React.useState({});

  React.useEffect(() => {
    setSelected({});
  }, [item]);

  // Calculate total price
  const getTotalPrice = () => {
    let total = item.price;
    if (item.customizations) {
      item.customizations.forEach((custom) => {
        if (custom.multiSelect) {
          const arr = selected[custom.label] || [];
          custom.options.forEach((opt) => {
            const optName = typeof opt === "string" ? opt : opt.name;
            const optPrice = typeof opt === "string" ? 0 : opt.price || 0;
            if (arr.includes(optName)) total += optPrice;
          });
        } else {
          const optName = selected[custom.label];
          const found = custom.options.find(
            (opt) => (typeof opt === "string" ? opt : opt.name) === optName,
          );
          if (found && typeof found !== "string") total += found.price || 0;
        }
      });
    }
    return total;
  };

  if (!item) return null;

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.dialog}>
              {/* Close X Icon */}
              <TouchableOpacity
                style={styles.closeBtn}
                onPress={onClose}
                accessibilityLabel="Close dialog"
              >
                <X size={32} color="white" style={{ opacity: 0.7 }} />
              </TouchableOpacity>
              <ScrollView
                style={{ flex: 1, scrollbarWidth: "none" }}
                contentContainerStyle={{ flexGrow: 1, paddingBottom: 32 }}
                showsVerticalScrollIndicator={false}
                bounces={true}
                alwaysBounceVertical={true}
                nestedScrollEnabled={true}
              >
                {/* Hero Image Section */}
                <View style={styles.heroWrap}>
                  <Image
                    source={{ uri: item.image }}
                    style={styles.heroImage}
                    accessibilityLabel={item.name}
                    resizeMode="cover"
                  />
                </View>
                {/* Content Section */}
                <View style={styles.contentWrap}>
                  <Text style={styles.title}>{item.name}</Text>
                  <Text style={styles.desc}>{item.description}</Text>
                  <View style={styles.itemMeta}>
                    <Text style={styles.price}>${item.price.toFixed(2)}</Text>
                    <Text style={styles.calories}>{item.calories} cal</Text>
                  </View>
                  <View style={styles.divider} />
                  {/* Customization Title */}
                  {item.customizations?.length > 0 && (
                    <Text style={styles.customizeTitle}>
                      Customize your order
                    </Text>
                  )}
                  {/* Customization Sections */}
                  {item.customizations?.map((custom, idx) => (
                    <View
                      key={custom.label}
                      style={[styles.section, idx > 0 && styles.sectionSpacing]}
                    >
                      <Text style={styles.sectionLabel}>{custom.label}</Text>
                      {custom.options.map((opt) => {
                        const optName =
                          typeof opt === "string" ? opt : opt.name;
                        const optPrice =
                          typeof opt === "string" ? 0 : opt.price || 0;
                        let isSelected;
                        if (custom.multiSelect) {
                          isSelected =
                            Array.isArray(selected[custom.label]) &&
                            selected[custom.label].includes(optName);
                        } else {
                          isSelected = selected[custom.label] === optName;
                        }
                        return (
                          <TouchableOpacity
                            key={optName}
                            style={[
                              styles.optionCard,
                              custom.multiSelect && styles.optionCardMulti,
                              custom.multiSelect &&
                                isSelected &&
                                styles.optionCardMultiSelected,
                              !custom.multiSelect &&
                                isSelected &&
                                styles.optionCardSelected,
                            ]}
                            onPress={() => {
                              setSelected((prev) => {
                                if (custom.multiSelect) {
                                  const arr = Array.isArray(prev[custom.label])
                                    ? prev[custom.label]
                                    : [];
                                  return {
                                    ...prev,
                                    [custom.label]: isSelected
                                      ? arr.filter((v) => v !== optName)
                                      : [...arr, optName],
                                  };
                                }
                                return { ...prev, [custom.label]: optName };
                              });
                            }}
                          >
                            <View style={styles.optionIndicatorWrap}>
                              {custom.multiSelect ? (
                                <View
                                  style={
                                    isSelected
                                      ? [
                                          styles.checkboxSelected,
                                          styles.checkboxSelectedWithV,
                                        ]
                                      : styles.checkbox
                                  }
                                >
                                  {isSelected && (
                                    <View style={styles.checkmarkV}>
                                      <Check
                                        size={18}
                                        color="white"
                                        style={{ alignSelf: "center" }}
                                      />
                                    </View>
                                  )}
                                </View>
                              ) : (
                                <View style={styles.radioOuter}>
                                  {isSelected && (
                                    <View style={styles.radioInner} />
                                  )}
                                </View>
                              )}
                            </View>
                            <Text style={styles.optionText}>
                              {optName}
                              {optPrice > 0
                                ? ` (+$${optPrice.toFixed(2)})`
                                : ""}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  ))}
                  <TouchableOpacity
                    style={styles.addBtn}
                    onPress={() => onAdd(item, selected)}
                  >
                    <Text style={styles.addBtnText}>
                      Add to Cart - ${getTotalPrice().toFixed(2)}
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
