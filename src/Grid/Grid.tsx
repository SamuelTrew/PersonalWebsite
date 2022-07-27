import type { JSXElement } from "solid-js"
import Icon from "../Icon"
import "./grid.scss"

const Grid = (): JSXElement => {
   const row1 = Array.from({ length: 25 }, (v, k) => k + 1).map(_ => <Icon type="duck" />)
   const row2 = Array.from({ length: 5 }, (v, k) => k + 1).map(_ => <Icon type="duck" />)
   const row3 = Array.from({ length: 5 }, (v, k) => k + 1).map(_ => <Icon type="duck" />)
   const row4 = Array.from({ length: 5 }, (v, k) => k + 1).map(_ => <Icon type="duck" />)
   const row5 = Array.from({ length: 5 }, (v, k) => k + 1).map(_ => <Icon type="duck" />)

   return (
      <div class="grid">
         {row1}
         {/* <div class="grid-column">{row1}</div> */}
         {/* <div class="grid-column">{row2}</div>
         <div class="grid-column">{row3}</div>
         <div class="grid-column">{row4}</div>
         <div class="grid-column">{row5}</div> */}
      </div>
   )
}

export default Grid
