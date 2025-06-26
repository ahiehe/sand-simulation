import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {SandSimulationPage} from "./pages/SandSimulationPage";
import {MainSandGridProvider} from "./components/MainSandGridProvider";
import {BrushProvider} from "./components/BrushProvider";
import {ControlsProvider} from "./components/ControlsProvider";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ControlsProvider>
          <BrushProvider>
              <MainSandGridProvider>
                  <SandSimulationPage/>
              </MainSandGridProvider>
          </BrushProvider>
      </ControlsProvider>
  </StrictMode>,
)
