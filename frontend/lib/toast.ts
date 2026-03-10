import { Toast } from "react-native-toast-notifications";

export function showSuccessToast(
  message: string,
  action?: { label: string; onPress: () => void },
) {
  Toast.show(message, {
    type: "success",
    placement: "bottom",
    duration: 2500,
    animationType: "slide-in",
    action,
  });
}
