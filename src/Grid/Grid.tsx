import type { JSXElement } from "solid-js"
import Icon from "../Icon"
import "./grid.scss"

const Grid = (): JSXElement => {
   const row1 = Array.from({ length: 25 }, (v, k) => k + 1).map(_ => <Icon type="duck" />)

   return (
      <div class="grid">
         {row1}
      </div>
   )
}

export default Grid
