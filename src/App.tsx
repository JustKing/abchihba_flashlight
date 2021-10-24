import {
  useAdaptivity,
  AppRoot,
  SplitLayout,
  SplitCol,
  ViewWidth,
  View,
  Panel,
  PanelHeader,
  Header,
  Group,
  Div,
  Button,
  Counter,
  PullToRefresh,
  PanelSpinner
} from "@vkontakte/vkui";
import { useEffect, useState } from "react";
import "./App.css";
import bridge from "@vkontakte/vk-bridge";

let flashLightIsAvailable = true; // false

bridge.subscribe((e: any) => {
  // хз почему не работает проверка доступности фонарика
  // if (e.detail.type === "VKWebAppFlashGetInfoResult") {
  //   if (!e.detail.data?.isActive) {
  //     flashLightIsAvailable = false;
  //   } else {
  //     flashLightIsAvailable = true;
  //   }
  // }
});

function App() {
  const { viewWidth } = useAdaptivity();
  const [currentFlashId, setCurrentFlashId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [firstLoading, setFirstLoading] = useState(true);
  const [flashLights, setFlashLights] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  useEffect(() => {
    bridge.send("VKWebAppFlashGetInfo");
    if (firstLoading) {
      setTimeout(() => {
        setFirstLoading(false)
      }, 1000)
    }
    const interval = setInterval(() => {
      if (flashLights[currentFlashId]) {
        bridge.send("VKWebAppFlashSetLevel", { level: 1 });
      } else {
        bridge.send("VKWebAppFlashSetLevel", { level: 0 });
      }
      const nextFlashLightId = currentFlashId >= 7 ? 0 : currentFlashId + 1;
      setCurrentFlashId(nextFlashLightId);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  });

  const changeActive = (id: number): any => {
    flashLights[id] = !flashLights[id];
  };

  const onRefresh = () => {
    setLoading(true);
    bridge.send("VKWebAppFlashGetInfo");
    setTimeout(() => {
      setFlashLights([false, false, false, false, false, false, false, false]);
      setLoading(false);
    }, 1000);
  };

  return (
    <AppRoot mode="full">
      <SplitLayout header={<PanelHeader separator={false} />}>
        <SplitCol spaced={viewWidth && viewWidth > ViewWidth.MOBILE}>
          <View activePanel="main">
            <Panel id="main">
              <header>
                <PanelHeader>Абчихба Бит Фонарик</PanelHeader>
              </header>
              {firstLoading ? (
                <PanelSpinner />
              ) : (
                <PullToRefresh onRefresh={onRefresh} isFetching={loading}>
                  <main>
                    {flashLightIsAvailable ? (
                      <Group
                        header={
                          <Header mode="secondary">Управление фонариком</Header>
                        }
                      >
                        {flashLights.map(
                          (flashLightState: boolean, index: number) => (
                            <Div
                              style={{ display: "flex" }}
                              key={`flashlightbutton_${index + 1}`}
                            >
                              <Button
                                id={(index + 1).toString()}
                                stretched
                                mode="outline"
                                className={`${
                                  currentFlashId === index + 1 ? "light" : ""
                                } ${flashLightState ? "active" : "not-active"}`}
                                size="s"
                                after={<Counter>{index + 1}</Counter>}
                                onClick={() => changeActive(index)}
                              />
                            </Div>
                          )
                        )}
                      </Group>
                    ) : (
                      <Div>Фонарик недоступен</Div>
                    )}
                  </main>
                </PullToRefresh>
              )}
            </Panel>
          </View>
        </SplitCol>
      </SplitLayout>
    </AppRoot>
  );
}

export default App;
