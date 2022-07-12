import { JSXElement, useContext } from "solid-js"
import { StateContext } from "../Provider"

import "./box.scss"

const Box = (): JSXElement => {
   const appState = useContext(StateContext)

   return (
      <div id="box" class="box container">
         <div class="box-title">Box</div>
         <div class="exit" onClick={appState.closeBox}>
            ✖
         </div>
      </div>
   )
}

export default Box
