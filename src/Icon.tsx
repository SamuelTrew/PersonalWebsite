import { Component, createSignal } from "solid-js"

import duck from "./duck.svg"
import styles from './Icon.module.css'

const getOffset = (el: HTMLDivElement) => {
   const rect = el.getBoundingClientRect();
   return {
      X: rect.left + window.scrollX,
      Y: rect.top + window.scrollY
   };
}

const MAX_CHANGE = 200

const Icon: Component = () => {
   const [dist, setDist] = createSignal(MAX_CHANGE)
   let ref: HTMLDivElement | undefined

   window.addEventListener('mousemove', (event: MouseEvent) =>  {
      if (!ref) return
      const currDist = Math.sqrt((event.clientX - getOffset(ref).X) ** 2 + (event.clientY - getOffset(ref).Y) ** 2)
      if (currDist > MAX_CHANGE) return
      setDist(currDist)
   })

   return (
      <div ref={ref} class={styles.Icon}>
         <img src={duck} alt="duck" width={Math.min(300 - dist(), 200)}/>
      </div>
   )
}

export default Icon
