import { Context, createContext, JSXElement } from "solid-js"
import AppState from "./State"

interface ProviderProps {
   children: JSXElement
}

// AppState
const state = new AppState()
export const StateContext = createContext<AppState>(state)

type PossibleStates = AppState
type States = [Context<PossibleStates>, PossibleStates][]

const Provider = ({children}: ProviderProps) => {
   const states: States = [
      [StateContext, state]
   ]

   return states.reduce(
      (acc, [Context, state]) => <Context.Provider value={state}>{acc}</Context.Provider>,
      children
   )
}

export default Provider