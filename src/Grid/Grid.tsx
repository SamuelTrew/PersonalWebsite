import type { JSXElement } from "solid-js"
import Icon from "../Icon"
import "./grid.scss"

const Row = (): JSXElement => {
   return (
      <div class="row">
         <Icon type="duck" />
         <Icon type="duck" />
         <Icon type="duck" />
         <Icon type="duck" />
         <Icon type="duck" />
      </div>
   )
}

const Grid = (): JSXElement => {
   let ref: HTMLDivElement | undefined

   return (
      <div class="grid" ref={ref}>
         <Row />
         <Row />
         <Row />
         <Row />
         <Row />
      </div>
   )
}

export default Grid
