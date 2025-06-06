import { Stack } from "expo-router";
import { SpinnerProvider } from "./context/SpinnerContext";

export default function RootLayout() {
  return (
    <SpinnerProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#2D0047" },
        }}
      />
    </SpinnerProvider>
  );
}
