export default defineNuxtPlugin(() => {
  // This runs early on client-side to prevent flash
  const colorMode = useColorMode();

  // Force immediate class application
  if (process.client) {
    const root = document.documentElement;
    if (colorMode.value === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }
});
