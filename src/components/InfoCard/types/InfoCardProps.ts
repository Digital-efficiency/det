/**
 * Defines the props for the InfoCard component.
 * 
 * @author youli
 */
import type React from "react"

/**
 * Interface defining the props for the InfoCard component.
 * 
 * @interface InfoCardProps
 * @property {string | React.ReactNode} [title] - The title of the info card. Can be a string or a React node.
 * @property {string | React.ReactNode} [content] - The content of the info card. Can be a string or a React node.
 * @property {number} [width] - The width of the info card in pixels.
 * @property {number} [height] - The height of the info card in pixels.
 * @property {React.ReactNode} [icon] - The icon to display in the info card. 
 */
export interface InfoCardProps {
  title?: string | React.ReactNode,
  content?: string | React.ReactNode,
  width?: number,
  height?: number,
  icon?: React.ReactNode,
  click?: React.MouseEventHandler<HTMLDivElement>
}