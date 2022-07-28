import { onMount, useContext, type Component } from "solid-js"

import "./App.scss"
import Box from "./Box"
import Grid from "./Grid"
import Provider, { StateContext } from "./Provider"
import Title from "./Title"
import isMobile from "./utils/isMobile"

const App: Component = () => {
   const appState = useContext(StateContext)
   const [box] = appState.boxState
   const [, setWindowSize] = appState.windowSize
   const [, setMousePosition] = appState.mousePosition

   onMount(() => {
      const windowResize = () => {
         setWindowSize(window.innerWidth)
      }

      window.addEventListener("resize", windowResize)
   })

   // Setup mouse position depending on platform of user
   onMount(() => {
      if (isMobile()) {
         const fingerMove = ({touches}: TouchEvent) => {
            setMousePosition({x: touches[0].clientX, y: touches[0].clientY})
         }
         window.addEventListener("touchmove", fingerMove)
      } else {
         const mouseMove = (event: MouseEvent) => {
            setMousePosition({x: event.clientX, y: event.clientY})
         }

         window.addEventListener("mousemove", mouseMove)
      }
   })

   return (
      <Provider>
         <div class="crt">
            <div class="App">
               <div class="refresh" />
               <Title />
               <Grid />
               {box() !== "closed" && <Box />}
            </div>
         </div>
      </Provider>
   )
}

export default App
