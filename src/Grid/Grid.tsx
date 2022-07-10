import type { JSXElement } from "solid-js"
import Icon from "../Icon"
import './grid.scss'

const Grid = (): JSXElement => {
   const grid = Array.from({length:5},(v,k)=>k+1).map(_ => <Icon />)

   return <div class="grid">{grid}</div>
}

export default Grid