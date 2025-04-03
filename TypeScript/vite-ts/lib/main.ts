import {ref} from "vue"
import type {ButtonProps} from "../index.d.ts"

const buttons:ButtonProps = {
  size:"mini"
}
export function useState(initialValue: any){
  const state = ref(initialValue)
  const dispatch = (action: any) => {
    console.log(buttons)
    state.value = action
  }
  return [
    state,
    dispatch
  ]
}

export function setupCounter(element: HTMLButtonElement) {
  let counter = 0
  const setCounter = (count: number) => {
    counter = count
    element.innerHTML = `count is ${counter}`
  }
  element.addEventListener('click', () => setCounter(++counter))
  setCounter(0)
}
