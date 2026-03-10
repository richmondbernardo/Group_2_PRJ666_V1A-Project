import {
  DollarSign,
  ShoppingBag,
  Star,
  Timer,
  Users,
} from "@/components/icons";
import {
  mockCategoryBreakdown,
  mockOrders,
  mockStaff,
  mockWeeklySales,
} from "@/data/mockData";
import { useColorScheme } from "@/hooks/use-color-scheme";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import Svg, { Path } from "react-native-svg";

// Function to calculate layout columns based on screen width
function getLayoutColumns(width: number) {
  if (width > 1024) return 4; // Desktop: 4 KPI cards per row
  if (width > 768) return 3; // Tablet: 3 KPI cards per row
  return 2; // Mobile: 2 KPI cards per row
}

// Function to determine if charts should be side-by-side
function shouldDisplayChartsSideBySide(width: number) {
  return width > 768; // Tablet and larger
}

// Dynamic styles function that returns different colors based on colorScheme and screen width
function getDynamicStyles(
  colorScheme: string | null | undefined,
  width: number,
) {
  const isDark = colorScheme === "dark";
  const columns = getLayoutColumns(width);
  const cardWidth = `${100 / columns - 3}%`; // Account for gaps

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? "#1a1a1a" : "#f8fafc", // Updated to SuperFry background
    },
    content: {
      paddingHorizontal: width > 768 ? 32 : 24,
      paddingTop: 16,
      paddingBottom: 24,
    },
    header: {
      marginBottom: 24,
    },
    headerTitle: {
      fontSize: 28,
      fontWeight: "700",
      marginBottom: 4,
      color: isDark ? "#fff" : "#2563eb", // Action Blue for branding
      letterSpacing: 0.5,
    },
    headerSubtitle: {
      fontSize: 16,
      color: isDark ? "#64748b" : "#64748b", // Text Secondary
      fontWeight: "500",
    },
    kpiGrid: {
      flexDirection: "row",
      gap: 12,
      marginBottom: 24,
      flexWrap: "wrap",
      justifyContent: "space-between",
    },
    metricCard: {
      backgroundColor: isDark ? "#252525" : "#fff",
      borderRadius: 12,
      padding: 16,
      borderWidth: 1,
      borderColor: isDark ? "#333" : "#e5e7eb",
      width: cardWidth,
      marginBottom: 0,
    },
    metricCardHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 12,
    },
    metricTitle: {
      fontSize: 12,
      color: isDark ? "#ddd" : "#666",
      fontWeight: "500",
    },
    metricIcon: {
      width: 36,
      height: 36,
      borderRadius: 8,
      backgroundColor: isDark ? "#333" : "#f3f4f6",
      justifyContent: "center",
      alignItems: "center",
    },
    metricValue: {
      fontSize: 28,
      fontWeight: "bold",
      marginBottom: 4,
      color: isDark ? "#fff" : "#2563eb", // Action Blue for price display
    },
    metricSubtitle: {
      fontSize: 11,
      color: "#999",
    },
    chartsSection: {
      marginBottom: 24,
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 12,
    },
    chartCard: {
      backgroundColor: isDark ? "#252525" : "#fff",
      borderRadius: 12,
      padding: 16,
      borderWidth: 1,
      borderColor: isDark ? "#333" : "#e5e7eb",
      marginBottom: 0,
      flex: shouldDisplayChartsSideBySide(width) ? 1 : undefined,
      minWidth: shouldDisplayChartsSideBySide(width) ? "48%" : "100%",
    },
    chartTitle: {
      fontSize: 16,
      fontWeight: "600",
      marginBottom: 16,
      color: isDark ? "#fff" : "#000",
    },
    salesList: {
      gap: 12,
    },
    salesdayRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    dayLabel: {
      width: 40,
      fontWeight: "600",
      fontSize: 12,
      color: isDark ? "#ddd" : "#000",
    },
    barContainer: {
      flex: 1,
      height: 40,
      backgroundColor: isDark ? "#333" : "#e5e7eb",
      borderRadius: 4,
      overflow: "hidden",
    },
    bar: {
      height: "100%",
      backgroundColor: "#3b82f6",
    },
    salesAmount: {
      width: 60,
      textAlign: "right",
      fontSize: 12,
      fontWeight: "500",
      color: isDark ? "#ddd" : "#000",
    },
    categoryBreakdown: {
      gap: 12,
    },
    categoryRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    categoryColor: {
      width: 12,
      height: 12,
      borderRadius: 6,
    },
    categoryLabel: {
      flex: 1,
      fontSize: 13,
      color: isDark ? "#ddd" : "#000",
    },
    categoryValue: {
      fontSize: 13,
      fontWeight: "600",
      color: isDark ? "#fff" : "#000",
    },
    pieChartContainer: {
      alignItems: "center",
      marginBottom: 24,
    },
    pieSegmentBar: {
      width: "100%",
      height: 40,
      borderRadius: 8,
      overflow: "hidden",
      marginBottom: 16,
      flexDirection: "row",
    },
    legendContainer: {
      width: "100%",
      gap: 12,
      marginTop: 20,
    },
    legendItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 8,
    },
    legendColor: {
      width: 16,
      height: 16,
      borderRadius: 3,
      marginRight: 12,
    },
    legendLabel: {
      flex: 1,
      fontSize: 13,
      color: isDark ? "#ddd" : "#000",
    },
    legendPercent: {
      fontSize: 13,
      fontWeight: "600",
      minWidth: 40,
      textAlign: "right",
      color: isDark ? "#fff" : "#000",
    },
    staffSection: {
      backgroundColor: isDark ? "#252525" : "#fff",
      borderRadius: 12,
      padding: 16,
      borderWidth: 1,
      borderColor: isDark ? "#333" : "#e5e7eb",
      width: "100%",
    },
    staffHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      marginBottom: 16,
    },
    staffTitle: {
      fontSize: 16,
      fontWeight: "600",
      color: isDark ? "#fff" : "#000",
    },
    staffTable: {
      gap: 12,
    },
    staffRow: {
      paddingBottom: 12,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? "#333" : "#f3f4f6",
    },
    staffRowLast: {
      borderBottomWidth: 0,
      paddingBottom: 0,
    },
    staffInfo: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 8,
    },
    staffName: {
      fontSize: 13,
      fontWeight: "500",
      color: isDark ? "#fff" : "#000",
    },
    statusBadge: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
    },
    statusBadgeActive: {
      backgroundColor: isDark ? "#1e4620" : "#dcfce7",
    },
    statusBadgeOnBreak: {
      backgroundColor: isDark ? "#4a4120" : "#fef08a",
    },
    statusBadgeOffDuty: {
      backgroundColor: isDark ? "#333" : "#f3f4f6",
    },
    statusBadgeText: {
      fontSize: 11,
      fontWeight: "500",
    },
    statusBadgeTextActive: {
      color: isDark ? "#86efac" : "#22c55e",
    },
    statusBadgeTextOnBreak: {
      color: isDark ? "#facc15" : "#eab308",
    },
    statusBadgeTextOffDuty: {
      color: isDark ? "#aaa" : "#999",
    },
    roleAndTables: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    role: {
      fontSize: 12,
      color: "#999",
    },
    tables: {
      fontSize: 12,
      color: "#999",
    },
  });
}

function MetricCard({
  title,
  value,
  subtitle,
  Icon,
  styles,
}: {
  title: string;
  value: string;
  subtitle: string;
  Icon: React.ReactNode;
  styles: any;
}) {
  return (
    <View style={styles.metricCard}>
      <View style={styles.metricCardHeader}>
        <Text style={styles.metricTitle}>{title}</Text>
        <View style={styles.metricIcon}>{Icon}</View>
      </View>
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricSubtitle}>{subtitle}</Text>
    </View>
  );
}

function StaffStatusBadge({
  status,
  isDark,
}: {
  status: string;
  isDark: boolean;
}) {
  const styles_badge = {
    active: {
      bg: isDark ? "#1e4620" : "#dcfce7",
      text: isDark ? "#86efac" : "#22c55e",
    },
    "on-break": {
      bg: isDark ? "#4a4120" : "#fef08a",
      text: isDark ? "#facc15" : "#eab308",
    },
    "off-duty": {
      bg: isDark ? "#333" : "#f3f4f6",
      text: isDark ? "#aaa" : "#999",
    },
  } as any;

  const config = styles_badge[status] || styles_badge["off-duty"];

  return (
    <View
      style={[
        { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
        { backgroundColor: config.bg },
      ]}
    >
      <Text
        style={[{ fontSize: 11, fontWeight: "500" }, { color: config.text }]}
      >
        {status.replace("-", " ")}
      </Text>
    </View>
  );
}

function PieChart({
  data,
  styles,
}: {
  data: { name: string; value: number; color: string }[];
  styles: any;
}) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const radius = 80;
  const centerX = 100;
  const centerY = 100;

  const polarToCartesian = (
    centerX: number,
    centerY: number,
    radius: number,
    angleInDegrees: number,
  ) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  const describeArc = (
    x: number,
    y: number,
    radius: number,
    startAngle: number,
    endAngle: number,
  ) => {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    const d = [
      "M",
      centerX,
      centerY,
      "L",
      start.x,
      start.y,
      "A",
      radius,
      radius,
      0,
      largeArcFlag,
      0,
      end.x,
      end.y,
      "Z",
    ].join(" ");
    return d;
  };

  let currentAngle = 0;
  const paths = data.map((item) => {
    const sliceAngle = (item.value / total) * 360;
    const path = describeArc(
      centerX,
      centerY,
      radius,
      currentAngle,
      currentAngle + sliceAngle,
    );
    const startAngle = currentAngle;
    currentAngle += sliceAngle;
    return { path, color: item.color, startAngle };
  });

  return (
    <View style={styles.pieChartContainer}>
      <Svg width={200} height={200} viewBox="0 0 200 200">
        {paths.map((item, idx) => (
          <Path
            key={idx}
            d={item.path}
            fill={item.color}
            stroke="#fff"
            strokeWidth={1}
          />
        ))}
      </Svg>

      {/* Legend */}
      <View style={styles.legendContainer}>
        {data.map((item) => {
          const percentage = ((item.value / total) * 100).toFixed(1);
          return (
            <View key={item.name} style={styles.legendItem}>
              <View
                style={[styles.legendColor, { backgroundColor: item.color }]}
              />
              <Text style={styles.legendLabel}>{item.name}</Text>
              <Text style={styles.legendPercent}>{percentage}%</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

export default function ManagerDashboard() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const { width } = useWindowDimensions();
  const styles = getDynamicStyles(colorScheme, width);

  // Compute metrics
  const totalSales = mockOrders.reduce(
    (s: number, o: any) => s + o.totalPrice,
    0,
  );
  const totalOrders = mockOrders.length;

  // Most popular: count item occurrences
  const itemCounts: Record<string, number> = {};
  mockOrders.forEach((o: any) =>
    o.items.forEach((i: any) => {
      itemCounts[i.name] = (itemCounts[i.name] || 0) + i.quantity;
    }),
  );
  const mostPopular = Object.entries(itemCounts).sort((a, b) => b[1] - a[1])[0];

  // Avg prep time from elapsed
  const activeOrders = mockOrders.filter((o: any) => o.status !== "completed");
  const avgPrep = activeOrders.length
    ? Math.round(
        activeOrders.reduce(
          (s: number, o: any) => s + (Date.now() - o.timestamp) / 60000,
          0,
        ) / activeOrders.length,
      )
    : 0;

  const maxSales = Math.max(...mockWeeklySales.map((d: any) => d.sales));

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>SuperFryPOS</Text>
          <Text style={styles.headerSubtitle}>
            Today&apos;s overview and analytics
          </Text>
        </View>

        {/* KPI Cards */}
        <View style={styles.kpiGrid}>
          <MetricCard
            title="Total Sales"
            value={`$${totalSales.toFixed(2)}`}
            subtitle="Today's revenue"
            Icon={<DollarSign width={18} height={18} />}
            styles={styles}
          />
          <MetricCard
            title="Total Orders"
            value={totalOrders.toString()}
            subtitle={`${activeOrders.length} active`}
            Icon={<ShoppingBag width={18} height={18} />}
            styles={styles}
          />
          <MetricCard
            title="Most Popular"
            value={mostPopular?.[0]?.slice(0, 8) || "—"}
            subtitle={`${mostPopular?.[1] || 0} ordered`}
            Icon={<Star width={18} height={18} />}
            styles={styles}
          />
          <MetricCard
            title="Avg Prep Time"
            value={`${avgPrep}m`}
            subtitle="Active orders"
            Icon={<Timer width={18} height={18} />}
            styles={styles}
          />
        </View>

        {/* Charts Section */}
        <View style={styles.chartsSection}>
          <View style={styles.chartCard}>
            <Text style={styles.chartTitle}>Weekly Sales Trend</Text>
            <View style={styles.salesList}>
              {mockWeeklySales.map((day: any) => {
                const barWidth = (day.sales / maxSales) * 100;
                return (
                  <View key={day.day} style={styles.salesdayRow}>
                    <Text style={styles.dayLabel}>{day.day}</Text>
                    <View style={styles.barContainer}>
                      <View style={[styles.bar, { width: `${barWidth}%` }]} />
                    </View>
                    <Text style={styles.salesAmount}>${day.sales}</Text>
                  </View>
                );
              })}
            </View>
          </View>

          <View style={styles.chartCard}>
            <Text style={styles.chartTitle}>Category Breakdown</Text>
            <PieChart data={mockCategoryBreakdown} styles={styles} />
          </View>
        </View>

        {/* Staff Table */}
        <View style={styles.staffSection}>
          <View style={styles.staffHeader}>
            <Users width={20} height={20} color={isDark ? "#ddd" : "#666"} />
            <Text style={styles.staffTitle}>Active Staff</Text>
          </View>
          <View style={styles.staffTable}>
            {mockStaff.map((staff: any, index: number) => (
              <View
                key={staff.id}
                style={[
                  styles.staffRow,
                  index === mockStaff.length - 1 && styles.staffRowLast,
                ]}
              >
                <View style={styles.staffInfo}>
                  <Text style={styles.staffName}>{staff.name}</Text>
                  <StaffStatusBadge status={staff.status} isDark={isDark} />
                </View>
                <View style={styles.roleAndTables}>
                  <Text style={styles.role}>{staff.role}</Text>
                  <Text style={styles.tables}>
                    {staff.tablesAssigned.length > 0
                      ? staff.tablesAssigned.map((t: any) => `T${t}`).join(", ")
                      : "—"}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
