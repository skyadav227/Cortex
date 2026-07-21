import "../CSS/LoadingScreen.css";

export default function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="loader-ring"></div>

      <h2>CORTEX</h2>

      <p>Preparing your workspace...</p>
    </div>
  );
}