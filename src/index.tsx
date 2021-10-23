import ReactDOM from "react-dom";
import "./index.css";
import {
  AdaptivityProvider,
  ANDROID,
  ConfigProvider,
  IOS,
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import App from "./App";

ReactDOM.render(
  <ConfigProvider platform={IOS || ANDROID}>
    <AdaptivityProvider>
      <App />
    </AdaptivityProvider>
  </ConfigProvider>,
  document.getElementById("root")
);
