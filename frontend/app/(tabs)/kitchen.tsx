import { Bell, ChefHat, Clock } from "@/components/icons";
import { mockOrders, Order } from "@/data/mockData";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useCallback, useEffect, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    View,
} from "react-native";
import { useToast } from "react-native-toast-notifications";

type FilterTab = "all" | "pending" | "completed";

interface DynamicStyles {
  container: any;
  header: any;
  headerTitle: any;
  headerSubtitle: any;
  filterContainer: any;
  filterButton: any;
  filterButtonActive: any;
  filterButtonText: any;
  filterButtonTextActive: any;
  gridContainer: any;
  gridRow: any;
  orderCard: any;
  orderCardHeader: any;
  tableNumber: any;
  orderId: any;
  timeBadge: any;
  timeBadgeText: any;
  progressBar: any;
  progressFill: any;
  itemsList: any;
  itemButton: any;
  itemCheckbox: any;
  itemText: any;
  itemNotesText: any;
  footer: any;
  serverName: any;
  actions: any;
  button: any;
  alertButton: any;
  readyButton: any;
  alertButtonText: any;
  readyButtonText: any;
  completedBadge: any;
  completedBadgeText: any;
  emptyState: any;
  emptyStateText: any;
  emptyStateSubtext: any;
}

function getDynamicStyles(colorScheme: string | null): DynamicStyles {
  const isDark = colorScheme === "dark";
  // SuperFry theme imports
  const { COLORS, TYPOGRAPHY, RADIUS, SPACING } = require("@/constants/theme");

  return {
    container: {
      flex: 1,
      backgroundColor: isDark ? "#1a1a1a" : COLORS.background,
      paddingTop: SPACING.element,
    },
    header: {
      paddingHorizontal: SPACING.element,
      marginBottom: SPACING.gap * 1.5,
    },
    headerTitle: {
      fontSize: 28,
      fontWeight: TYPOGRAPHY.headingWeight,
      marginBottom: 4,
      color: isDark ? COLORS.cardBackground : COLORS.primary,
      letterSpacing: 0.5,
    },
    headerSubtitle: {
      fontSize: TYPOGRAPHY.bodySize,
      color: isDark ? COLORS.textSecondary : COLORS.textSecondary,
      fontWeight: "500",
    },
    filterContainer: {
      flexDirection: "row",
      paddingHorizontal: 16,
      marginBottom: 16,
      gap: 8,
    },
    filterButton: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
      backgroundColor: isDark ? "#2a2a2a" : "#e5e7eb",
    },
    filterButtonActive: {
      backgroundColor: "#1f2937",
    },
    filterButtonText: {
      color: isDark ? "#aaa" : "#666",
      fontSize: 14,
      fontWeight: "500",
    },
    filterButtonTextActive: {
      color: "#fff",
    },
    gridContainer: {
      paddingHorizontal: 16,
      paddingBottom: 24,
    },
    gridRow: {
      flexDirection: "row",
      gap: 12,
      marginBottom: 16,
    },
    orderCard: {
      backgroundColor: isDark ? "#252525" : "#fff",
      borderRadius: 12,
      padding: 16,
      borderWidth: 1,
      borderColor: isDark ? "#333" : "#e5e7eb",
      flex: 1,
    },
    orderCardHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12,
    },
    tableNumber: {
      fontSize: 20,
      fontWeight: "bold",
      marginRight: 8,
      color: isDark ? "#fff" : "#000",
    },
    orderId: {
      fontSize: 12,
      color: isDark ? "#666" : "#999",
    },
    timeBadge: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 20,
    },
    timeBadgeText: {
      fontSize: 12,
      fontWeight: "500",
    },
    progressBar: {
      height: 6,
      backgroundColor: isDark ? "#333" : "#e5e7eb",
      borderRadius: 3,
      overflow: "hidden",
      marginBottom: 12,
    },
    progressFill: {
      height: "100%",
      backgroundColor: "#3b82f6",
    },
    itemsList: {
      marginBottom: 12,
      gap: 8,
    },
    itemButton: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 8,
      paddingVertical: 10,
      borderRadius: 6,
      gap: 8,
    },
    itemCheckbox: {
      width: 16,
      height: 16,
      borderRadius: 2,
      borderWidth: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    itemText: {
      fontSize: 14,
      flex: 1,
      color: isDark ? "#ddd" : "#000",
    },
    itemNotesText: {
      fontSize: 10,
      color: isDark ? "#666" : "#999",
    },
    footer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingTop: 12,
      borderTopWidth: 1,
      borderTopColor: isDark ? "#333" : "#e5e7eb",
    },
    serverName: {
      fontSize: 12,
      color: isDark ? "#666" : "#999",
    },
    actions: {
      flexDirection: "row",
      gap: 8,
    },
    button: {
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 6,
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
    alertButton: {
      backgroundColor: isDark ? "#3a3a3a" : "#e5e7eb",
    },
    readyButton: {
      backgroundColor: "#3b82f6",
    },
    alertButtonText: {
      fontSize: 12,
      fontWeight: "500",
      color: isDark ? "#ddd" : "#333",
    },
    readyButtonText: {
      fontSize: 12,
      fontWeight: "500",
      color: "#fff",
    },
    completedBadge: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
    },
    completedBadgeText: {
      fontSize: 12,
      color: "#22c55e",
      fontWeight: "500",
    },
    emptyState: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 40,
    },
    emptyStateText: {
      fontSize: 16,
      fontWeight: "600",
      marginBottom: 4,
      color: isDark ? "#fff" : "#000",
    },
    emptyStateSubtext: {
      fontSize: 14,
      color: isDark ? "#666" : "#999",
    },
  };
}

function getElapsedMinutes(timestamp: number): number {
  return Math.floor((Date.now() - timestamp) / 60000);
}

function getTimeColor(minutes: number): string {
  if (minutes < 5) return "#22c55e"; // green
  if (minutes < 15) return "#eab308"; // yellow
  return "#ef4444"; // red
}

function getTimeBg(minutes: number): string {
  if (minutes < 5) return "#dcfce7";
  if (minutes < 15) return "#fef08a";
  return "#fee2e2";
}

const staticStyles = StyleSheet.create({
  orderCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  timeBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    overflow: "hidden",
    marginBottom: 12,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#3b82f6",
  },
  itemsList: {
    marginBottom: 12,
    gap: 8,
  },
  itemButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderRadius: 6,
    gap: 8,
  },
  itemCheckbox: {
    width: 16,
    height: 16,
    borderRadius: 2,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 12,
    borderTopWidth: 1,
  },
  actions: {
    flexDirection: "row",
    gap: 8,
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  completedBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
});

function OrderCard({
  order,
  onMarkReady,
  onAlertServer,
  onToggleItem,
  dynamicStyles,
}: {
  order: Order;
  onMarkReady: (id: string) => void;
  onAlertServer: (id: string) => void;
  onToggleItem: (orderId: string, itemId: string) => void;
  dynamicStyles: DynamicStyles;
}) {
  const [elapsed, setElapsed] = useState(getElapsedMinutes(order.timestamp));

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(getElapsedMinutes(order.timestamp));
    }, 10000);
    return () => clearInterval(interval);
  }, [order.timestamp]);

  const isCompleted = order.status === "completed" || order.status === "ready";
  const completedCount = order.items.filter((i: any) => i.completed).length;
  const progressPercent = (completedCount / order.items.length) * 100;

  return (
    <View
      style={[
        dynamicStyles.orderCard,
        elapsed >= 15 &&
          !isCompleted && { borderColor: "#ef4444", borderWidth: 2 },
        isCompleted && { opacity: 0.6 },
      ]}
    >
      {/* Header */}
      <View style={staticStyles.orderCardHeader}>
        <View>
          <Text style={dynamicStyles.tableNumber}>T{order.tableNumber}</Text>
          <Text style={dynamicStyles.orderId}>{order.id}</Text>
        </View>
        <View
          style={[
            staticStyles.timeBadge,
            { backgroundColor: getTimeBg(elapsed) },
          ]}
        >
          <Clock width={12} height={12} color={getTimeColor(elapsed)} />
          <Text
            style={[
              dynamicStyles.timeBadgeText,
              { color: getTimeColor(elapsed) },
            ]}
          >
            {elapsed}m
          </Text>
        </View>
      </View>

      {/* Progress bar */}
      <View
        style={[
          staticStyles.progressBar,
          { backgroundColor: dynamicStyles.progressBar.backgroundColor },
        ]}
      >
        <View
          style={[staticStyles.progressFill, { width: `${progressPercent}%` }]}
        />
      </View>

      {/* Items */}
      <View style={staticStyles.itemsList}>
        {order.items.map((item: any) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => !isCompleted && onToggleItem(order.id, item.id)}
            disabled={isCompleted}
            style={[
              staticStyles.itemButton,
              item.completed && {
                backgroundColor:
                  dynamicStyles.orderCard.backgroundColor === "#252525"
                    ? "rgba(255,255,255,0.05)"
                    : "rgba(0,0,0,0.05)",
              },
            ]}
          >
            <View
              style={[
                staticStyles.itemCheckbox,
                item.completed
                  ? { backgroundColor: "#3b82f6", borderColor: "#3b82f6" }
                  : {
                      borderColor:
                        dynamicStyles.orderCard.backgroundColor === "#252525"
                          ? "#444"
                          : "#d1d5db",
                    },
              ]}
            >
              {item.completed && (
                <Text style={{ color: "#fff", fontSize: 10 }}>✓</Text>
              )}
            </View>
            <Text
              style={[
                dynamicStyles.itemText,
                item.completed && {
                  textDecorationLine: "line-through",
                  color:
                    dynamicStyles.orderCard.backgroundColor === "#252525"
                      ? "#666"
                      : "#999",
                },
              ]}
            >
              {item.quantity}× {item.name}
            </Text>
            {item.notes && (
              <Text style={dynamicStyles.itemNotesText}>({item.notes})</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Footer */}
      <View
        style={[
          staticStyles.footer,
          { borderTopColor: dynamicStyles.footer.borderTopColor },
        ]}
      >
        <Text style={dynamicStyles.serverName}>{order.serverName}</Text>
        {!isCompleted && (
          <View style={staticStyles.actions}>
            <TouchableOpacity
              style={[staticStyles.button, dynamicStyles.alertButton]}
              onPress={() => onAlertServer(order.id)}
            >
              <Bell
                width={12}
                height={12}
                color={dynamicStyles.alertButtonText.color}
              />
              <Text style={dynamicStyles.alertButtonText}>Alert</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[staticStyles.button, dynamicStyles.readyButton]}
              onPress={() => onMarkReady(order.id)}
            >
              <ChefHat width={12} height={12} color="#fff" />
              <Text style={dynamicStyles.readyButtonText}>Ready</Text>
            </TouchableOpacity>
          </View>
        )}
        {isCompleted && (
          <View style={staticStyles.completedBadge}>
            <Text style={dynamicStyles.completedBadgeText}>✓ Done</Text>
          </View>
        )}
      </View>
    </View>
  );
}

export default function KitchenMode() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [filter, setFilter] = useState<FilterTab>("all");
  const colorScheme = useColorScheme();
  const dynamicStyles = getDynamicStyles(colorScheme);
  const toast = useToast();
  const { width } = useWindowDimensions();

  // Calculate number of columns based on screen width
  const getColumns = () => {
    if (width > 1024) return 3; // Tablet landscape or desktop
    if (width > 768) return 2; // Tablet portrait
    return 1; // Mobile
  };

  const columns = getColumns();

  const handleMarkReady = useCallback(
    (id: string) => {
      setOrders((prev: any) =>
        prev.map((o: any) =>
          o.id === id
            ? {
                ...o,
                status: "ready" as const,
                items: o.items.map((i: any) => ({ ...i, completed: true })),
              }
            : o,
        ),
      );
      toast.show("Order marked as ready!", {
        type: "success",
        placement: "top",
        duration: 2000,
      });
    },
    [toast],
  );

  const handleAlertServer = useCallback(
    (id: string) => {
      const order = orders.find((o: any) => o.id === id);
      toast.show(
        `Alert sent to ${order?.serverName} for Table ${order?.tableNumber}`,
        {
          type: "info",
          placement: "top",
          duration: 2000,
        },
      );
    },
    [orders, toast],
  );

  const handleToggleItem = useCallback((orderId: string, itemId: string) => {
    setOrders((prev: any) =>
      prev.map((o: any) =>
        o.id === orderId
          ? {
              ...o,
              items: o.items.map((i: any) =>
                i.id === itemId ? { ...i, completed: !i.completed } : i,
              ),
            }
          : o,
      ),
    );
  }, []);

  const filtered = orders.filter((o) => {
    if (filter === "pending")
      return o.status === "pending" || o.status === "in-progress";
    if (filter === "completed")
      return o.status === "completed" || o.status === "ready";
    return true;
  });

  const activeCount = orders.filter(
    (o) => o.status === "pending" || o.status === "in-progress",
  ).length;

  const tabs: { key: FilterTab; label: string; count: number }[] = [
    { key: "all", label: "All", count: orders.length },
    { key: "pending", label: "Active", count: activeCount },
    { key: "completed", label: "Done", count: orders.length - activeCount },
  ];

  return (
    <View style={dynamicStyles.container}>
      <View style={dynamicStyles.header}>
        <Text style={dynamicStyles.headerTitle}>Kitchen Queue</Text>
        <Text style={dynamicStyles.headerSubtitle}>
          {activeCount} active orders
        </Text>
      </View>

      {/* Filter tabs */}
      <View style={dynamicStyles.filterContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[
              dynamicStyles.filterButton,
              filter === tab.key && dynamicStyles.filterButtonActive,
            ]}
            onPress={() => setFilter(tab.key)}
          >
            <Text
              style={[
                dynamicStyles.filterButtonText,
                filter === tab.key && dynamicStyles.filterButtonTextActive,
              ]}
            >
              {tab.label} ({tab.count})
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Orders */}
      <ScrollView
        style={dynamicStyles.gridContainer}
        showsVerticalScrollIndicator={false}
      >
        {filtered.length > 0 ? (
          <>
            {Array.from({ length: Math.ceil(filtered.length / columns) }).map(
              (_, rowIndex) => (
                <View key={rowIndex} style={dynamicStyles.gridRow}>
                  {filtered
                    .slice(rowIndex * columns, rowIndex * columns + columns)
                    .map((order) => (
                      <View key={order.id} style={{ flex: 1 }}>
                        <OrderCard
                          order={order}
                          onMarkReady={handleMarkReady}
                          onAlertServer={handleAlertServer}
                          onToggleItem={handleToggleItem}
                          dynamicStyles={dynamicStyles}
                        />
                      </View>
                    ))}
                </View>
              ),
            )}
          </>
        ) : (
          <View style={dynamicStyles.emptyState}>
            <Text style={dynamicStyles.emptyStateText}>All caught up!</Text>
            <Text style={dynamicStyles.emptyStateSubtext}>
              No orders in this category
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
