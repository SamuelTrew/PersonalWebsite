import { createSignal, JSXElement, onMount, useContext } from "solid-js"
import { StateContext } from "../Provider"
import { type Box } from "../State"
import isMobile from "../utils/isMobile"

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
   const [dist, setDist] = createSignal(MAX_CHANGE)
   const [selected, setSelected] = createSignal(false)
   let ref: HTMLDivElement | undefined

   const appState = useContext(StateContext)

   const [box, setBox] = appState.boxState
   const [windowSize] = appState.windowSize

   const onClick = () => {
      setBox(type)
      setSelected(true)
      appState.setSelectedBox(setSelected)
   }

   onMount(() => {
      if (isMobile()) {

         const fingerMove = ({touches}: TouchEvent) => {
            if (!ref || !touches[0]) return
            const currDist = Math.sqrt((touches[0].clientX - getOffset(ref).X) ** 2 + (touches[0].clientY - getOffset(ref).Y) ** 2)
            if (currDist > MAX_CHANGE) return
            setDist(currDist)
         }
         window.addEventListener("touchmove", fingerMove)
         return
      }

      const mouseMove = (event: MouseEvent) => {
         if (!ref) return
         const currDist = Math.sqrt((event.clientX - getOffset(ref).X) ** 2 + (event.clientY - getOffset(ref).Y) ** 2)
         if (currDist > MAX_CHANGE) return
         setDist(currDist)
      }

      window.addEventListener("mousemove", mouseMove)
   })

   const scale = () => (windowSize() / 1000)

   const width = () => scale() * (box() !== "closed" ? (selected() ? MAX_SIZE : MIN_SIZE) : Math.max(MAX_SIZE - dist(), MIN_SIZE))

   return (
      <div ref={ref} class="icon" onClick={onClick}>
         <img src={duck} alt="duck" width={width()} />
      </div>
   )
}

export default Icon
