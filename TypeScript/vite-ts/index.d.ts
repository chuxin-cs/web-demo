export function setupCounter(element: HTMLButtonElement): void

const _ButtonType = ["primary", "success", "warning", "danger", "info", "text"] as const
export type ButtonType = typeof _ButtonType[number]


export type ButtonProps = {
  type?: ButtonType
  size?: "large" | "medium" | "small" | "mini"
  round?: boolean
}