import { JSXElement, createSignal, onCleanup, onMount, useContext } from "solid-js"
import Icon from "../Icon"
import "./grid.scss"
import duck from "../Icon/duck.svg"
import { StateContext } from "../Provider"

const CHANGE = 100
const MIN_SIZE = 100
const MAX_SIZE = 200

const getOffset = (el: HTMLDivElement) => {
   const rect = el.getBoundingClientRect()
   return {
      X: (rect.left + rect.right) / 2 + window.scrollX,
      Y: (rect.top + rect.bottom) / 2 + window.scrollY,
   }
}

const Duck = (): JSXElement => {
   const [width, setWidth] = createSignal(100)
   const appState = useContext(StateContext)
   const [mousePosition] = appState.mousePosition
   const [windowWidth] = appState.windowWidth
   const [windowHeight] = appState.windowHeight
   let ref: HTMLDivElement | undefined


   const actualWidth = () => {
      if (!ref) return 0

      const xOffset = () => Math.abs(getOffset(ref).X - mousePosition().x)
      const yOffset = () => Math.abs(getOffset(ref).Y - mousePosition().y)
      const dist = () => Math.sqrt(xOffset()**2 + yOffset()**2)

      const widthLimit = () => windowWidth() / 10
      const heightLimit = () => windowHeight() / 10
      const limit = () => Math.sqrt(widthLimit()**2 + heightLimit()**2)

      if (dist() >= limit()) {
         return MIN_SIZE
      }

      const scale = () => (limit() - dist()) / limit()

      return MIN_SIZE + scale() * CHANGE
   }

   return (
      <div class="duck" ref={ref}>
         <img src={duck} alt="duck" width={`${actualWidth()}vw`} />
      </div>
   )
}

const Row = ({height}: {height: number}): JSXElement => {
   return (
      <div class="row" style={{height: `${height}`}}>
         <Duck />
         <Duck />
         <Duck />
         <Duck />
         <Duck />
      </div>
   )
}

const Grid = (): JSXElement => {
   let ref: HTMLDivElement | undefined

   const [height, setHeight] = createSignal(0)
   const heightSetter = () => setHeight((ref?.offsetHeight ?? 0) / 5)

   onMount(() => {
      ref?.addEventListener("resize", heightSetter)
   })

   onCleanup(() => {
      ref?.removeEventListener("resize", heightSetter)
   })

   return (
      <div class="grid" ref={ref}>
         <Row height={height()} />
         <Row height={height()} />
         <Row height={height()} />
         <Row height={height()} />
         <Row height={height()} />
      </div>
   )
}

export default Grid
