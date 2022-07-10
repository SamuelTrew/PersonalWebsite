import { createSignal, JSXElement, onMount, useContext } from "solid-js"
import { StateContext } from "../Provider";
import { type Box } from "../State";

import duck from "./duck.svg"
import './icon.scss'

const getOffset = (el: HTMLDivElement) => {
   const rect = el.getBoundingClientRect();
   return {
      X: ((rect.left + rect.right) / 2) + window.scrollX,
      Y: ((rect.top + rect.bottom) / 2) + window.scrollY
   };
}

const MAX_CHANGE = 100

interface IconProps {
   type: Box
}

const Icon = ({type}: IconProps): JSXElement => {
   const [dist, setDist] = createSignal(MAX_CHANGE)
   const [selected, setSelected] = createSignal(false)
   let ref: HTMLDivElement | undefined

   const appState = useContext(StateContext)

   const [box, setBox] = appState.boxState

   const onClick = () => {
      setBox(type)
      setSelected(true)
      appState.setSelectedBox(setSelected)
   }

   onMount(() => {
      const mouseMove = (event: MouseEvent) =>  {
         if (!ref) return
         const currDist = Math.sqrt((event.clientX - getOffset(ref).X) ** 2 + (event.clientY - getOffset(ref).Y) ** 2)
         if (currDist > MAX_CHANGE) return
         setDist(currDist)
      }

      window.addEventListener('mousemove', mouseMove)
   })

   const width = () => box() !== 'closed' ? (selected() ? 100 : 50) : Math.min(150 - dist(), 100)

   return (
      <div ref={ref} class="icon" onClick={onClick}>
         <img src={duck} alt="duck" width={width()}/>
      </div>
   )
}

export default Icon
