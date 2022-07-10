import { Component, createSignal, onMount } from "solid-js"
import { boxState } from "../State";

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

const Icon: Component = () => {
   const [dist, setDist] = createSignal(MAX_CHANGE)
   let ref: HTMLDivElement | undefined

   const mouseMove = (event: MouseEvent) =>  {
      if (!ref) return
      const currDist = Math.sqrt((event.clientX - getOffset(ref).X) ** 2 + (event.clientY - getOffset(ref).Y) ** 2)
      if (currDist > MAX_CHANGE) return
      setDist(currDist)
   }

   const [_, setBox] = boxState

   const onClick = () => {
      window.removeEventListener('mousemove', mouseMove)
      setBox('Solidatus')
   }

   onMount(() => {
      window.addEventListener('mousemove', mouseMove)
   })

   return (
      <div ref={ref} class="icon" onClick={onClick}>
         <img src={duck} alt="duck" width={Math.min(150 - dist(), 100)}/>
      </div>
   )
}

export default Icon
