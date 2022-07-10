import { createEffect, createSignal, onMount, type Component } from "solid-js"

import "./App.scss"
import Box from "./Box"
import Grid from "./Grid"
import { boxState } from "./State"
import Title from "./Title"


const App: Component = () => {
   const [box] = boxState

   return (
      <div class="crt">
         <div class="App">
            <div class="refresh"/>
            <Title />
            <Grid />
            {box() !== 'closed' && <Box />}
         </div>
      </div>
   )
}

export default App
