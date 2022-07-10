import { useContext, type Component } from "solid-js"

import "./App.scss"
import Box from "./Box"
import Grid from "./Grid"
import Provider, { StateContext } from "./Provider"
import Title from "./Title"


const App: Component = () => {
   const [box] = useContext(StateContext).boxState

   return (
      <Provider>
         <div class="crt">
            <div class="App">
               <div class="refresh"/>
               <Title />
               <Grid />
               {box() !== 'closed' && <Box />}
            </div>
         </div>
      </Provider>
   )
}

export default App
