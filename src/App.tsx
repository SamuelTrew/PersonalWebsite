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
   const [, setWindowWidth] = appState.windowWidth
   const [, setWindowHeight] = appState.windowHeight
   const [, setMousePosition] = appState.mousePosition

   onMount(() => {
      const windowResize = () => {
         setWindowWidth(window.innerWidth)
         setWindowHeight(window.innerHeight)
      }

      window.addEventListener("resize", windowResize)
   })

   // Setup mouse position depending on platform of user
   onMount(() => {
      if (isMobile()) {
         const fingerMove = ({touches}: TouchEvent) => {
            setMousePosition({x: touches[0]?.clientX ?? 0, y: touches[0]?.clientY ?? 0})
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
