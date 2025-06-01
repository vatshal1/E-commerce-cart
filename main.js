import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import { store } from "./src/store/index";
import App from "./src/app";

const root = createRoot(document.querySelector("#root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
