import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";

const LIGHT_BLUE = "#3b82f6";

// Icon wrapper component
interface IconProps {
  width?: number;
  height?: number;
  color?: string;
}

export const Bell: React.FC<IconProps> = ({
  width = 24,
  height = 24,
  color = LIGHT_BLUE,
}) => <Ionicons name="notifications" size={width} color={color} />;

export const ChefHat: React.FC<IconProps> = ({
  width = 24,
  height = 24,
  color = LIGHT_BLUE,
}) => <MaterialCommunityIcons name="chef-hat" size={width} color={color} />;

export const Clock: React.FC<IconProps> = ({
  width = 24,
  height = 24,
  color = LIGHT_BLUE,
}) => <Ionicons name="time" size={width} color={color} />;

export const DollarSign: React.FC<IconProps> = ({
  width = 24,
  height = 24,
  color = LIGHT_BLUE,
}) => <MaterialCommunityIcons name="currency-usd" size={width} color={color} />;

export const ShoppingBag: React.FC<IconProps> = ({
  width = 24,
  height = 24,
  color = LIGHT_BLUE,
}) => <Ionicons name="bag" size={width} color={color} />;

export const Star: React.FC<IconProps> = ({
  width = 24,
  height = 24,
  color = LIGHT_BLUE,
}) => <Ionicons name="star" size={width} color={color} />;

export const Timer: React.FC<IconProps> = ({
  width = 24,
  height = 24,
  color = LIGHT_BLUE,
}) => <MaterialCommunityIcons name="timer" size={width} color={color} />;

export const Users: React.FC<IconProps> = ({
  width = 24,
  height = 24,
  color = LIGHT_BLUE,
}) => <Ionicons name="people" size={width} color={color} />;

export const CheckCircle: React.FC<IconProps> = ({
  width = 24,
  height = 24,
  color = LIGHT_BLUE,
}) => <Ionicons name="checkmark-circle" size={width} color={color} />;

export const LayoutDashboard: React.FC<IconProps> = ({
  width = 24,
  height = 24,
  color = LIGHT_BLUE,
}) => (
  <MaterialCommunityIcons name="view-dashboard" size={width} color={color} />
);
