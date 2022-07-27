import { createSignal, Setter } from "solid-js"
import bind from "bind-decorator"

export type Box = "closed" | "duck" | "Solidatus" | "Hadean" | "Occam"

export default class AppState {
   // Determines the contents of the boxes and which is opened
   boxState = createSignal("closed")
   windowSize = createSignal(window.innerWidth)

   // Handling of closing boxes and duck sizing
   private _boxCloser?: Setter<boolean>

   @bind
   setSelectedBox(setter: Setter<boolean>) {
      this._boxCloser = setter
   }

   @bind
   closeBox() {
      this.boxState[1]("closed")
      this._boxCloser?.(false)
      this._boxCloser = undefined
   }
}
