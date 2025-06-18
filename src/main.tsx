import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {SandSimulationPage} from "../pages/SandSimulationPage";
import {SandSimulationProvider} from "../components/SandSimulationProvider";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <SandSimulationProvider>
          <SandSimulationPage/>
      </SandSimulationProvider>
  </StrictMode>,
)
