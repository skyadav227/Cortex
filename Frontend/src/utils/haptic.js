export const haptic = (duration = 20) => {
  if ("vibrate" in navigator) {
    navigator.vibrate(duration)
  }
}