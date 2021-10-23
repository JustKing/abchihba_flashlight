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
import bridge from "@vkontakte/vk-bridge";

bridge.send("VKWebAppInit", {});

ReactDOM.render(
  <ConfigProvider platform={IOS || ANDROID}>
    <AdaptivityProvider>
      <App />
    </AdaptivityProvider>
  </ConfigProvider>,
  document.getElementById("root")
);
