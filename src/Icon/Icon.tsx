import { JSXElement, useContext } from "solid-js"
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

interface IconProps {
   type: Box
}

const Icon = ({ type }: IconProps): JSXElement => {
   const appState = useContext(StateContext)
   const [mousePosition] = appState.mousePosition
   const [windowWidth] = appState.windowWidth
   const [windowHeight] = appState.windowHeight
   let ref: HTMLDivElement | undefined


   const actualWidth = () => {
      if (!ref) return 0

      const MIN = window.innerWidth / 11
      const CHANGE = window.innerWidth / 11

      const xOffset = () => Math.abs(getOffset(ref).X - mousePosition().x)
      const yOffset = () => Math.abs(getOffset(ref).Y - mousePosition().y)
      const dist = () => Math.sqrt(xOffset()**2 + yOffset()**2)

      const widthLimit = () => windowWidth() / 11
      const heightLimit = () => windowHeight() / 11
      const limit = () => Math.sqrt(widthLimit()**2 + heightLimit()**2)

      if (dist() >= limit()) {
         return MIN
      }

      const scale = () => (limit() - dist()) / limit()

      return Math.round(MIN + scale() * CHANGE)
   }

   return (
      <div class="duck" ref={ref}>
         <img src={duck} alt="duck" width={`${actualWidth()}vw`} />
      </div>
   )
}

export default Icon
