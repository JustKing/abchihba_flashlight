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
} from "@vkontakte/vkui";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const { viewWidth } = useAdaptivity();
  const [currentFlashId, setCurrentFlashId] = useState(1);
  const [flashLights] = useState([
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
    const interval = setInterval(() => {
      if (currentFlashId === 8) {
        setCurrentFlashId(1);
      } else {
        setCurrentFlashId(currentFlashId + 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  });

  const changeActive = (id: number): any => {
    flashLights[id] = !flashLights[id];
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
              <main>
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
                          mode="outline"
                          className={`${
                            currentFlashId === index + 1 ? "light" : ""
                          } ${flashLightState ? "active" : "not-active"}`}
                          stretched
                          size="l"
                          after={<Counter>{index + 1}</Counter>}
                          onClick={() => changeActive(index)}
                        />
                      </Div>
                    )
                  )}
                </Group>
              </main>
            </Panel>
          </View>
        </SplitCol>
      </SplitLayout>
    </AppRoot>
  );
}

export default App;
