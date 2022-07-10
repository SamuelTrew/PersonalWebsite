import type { Component } from "solid-js"

import logo from "./logo.svg"
import styles from "./App.module.css"
import Icon from "./Icon"

const App: Component = () => {
   const grid = Array.from({length:5},(v,k)=>k+1).map(_ => <Icon />)

   return (
      <div class={styles.crt}>
      <div class={styles.refresh}/>

      <div class={styles.App}>
         {grid}
      </div>
      </div>
   )
}

export default App
