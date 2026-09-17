import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router";

import App from "./App";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element not found");
}

createRoot(root).render(
  <Router>
    <App />
  </Router>
);
