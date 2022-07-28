import { createSignal, JSXElement, useContext } from "solid-js"
import { StateContext } from "../Provider"
import { type Box } from "../State"

import duck from "./duck.svg"
import "./icon.scss"

const getOffset = (el: HTMLDivElement) => {
   const rect = el.getBoundingClientRect()
   return {
      X: (rect.left + rect.right) / 2 + window.scrollX,
      Y: (rect.top + rect.bottom) / 2 + window.scrollY,
   }
}

const MAX_CHANGE = 100
const MIN_SIZE = 100
const MAX_SIZE = 200

interface IconProps {
   type: Box
}

const Icon = ({ type }: IconProps): JSXElement => {

   const appState = useContext(StateContext)
   const [windowSize] = appState.windowSize
   const [mousePosition] = appState.mousePosition
   const [box, setBox] = appState.boxState

   const [selected, setSelected] = createSignal(false)
   let ref: HTMLDivElement | undefined

   const onClick = () => {
      setBox(type)
      setSelected(true)
      appState.setSelectedBox(setSelected)
   }

   const width = () => {
      // Scale to ensure icons grow properly
      const scale = () => (windowSize() / 1000)

      // When no icon has been selected we calculate size
      if (box() === "closed" && ref) {

         // Furthest possible distance that an icon is affected by the mouse
         const furthest = () => 1.3 * (windowSize() / 5)

         // The actual distance the icon is away from the mouse
         const dist = () => Math.sqrt((mousePosition().x - getOffset(ref).X) ** 2 + (mousePosition().y - getOffset(ref).Y) ** 2)

         // Default when the mouse is too far away
         if (dist() >= furthest()) {
            return scale() * MIN_SIZE
         }

         // Proximity scale between 0 and 1 for scaling
         const proximity = () => (furthest() - dist()) / furthest()

         return scale() * (MIN_SIZE + (MAX_CHANGE * proximity()))
      }

      // When selected, all other icons are minimised while the selected is maximised
      if (selected()) {
         return scale() * MAX_SIZE
      }

      return scale() * MIN_SIZE
   }

   return (
      <div ref={ref} class="icon" onClick={onClick}>
         <img src={duck} alt="duck" width={width()} />
      </div>
   )
}

export default Icon
