import { Redirect } from "expo-router";

export default function Index() {
  const isLoggedIn = false; // TEMP

  if (!isLoggedIn) {
    return <Redirect href="/(auth)/login" />;
  }

  return <Redirect href="/(app)/home" />;
}
