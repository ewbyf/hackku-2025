import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Checkmark(props: any) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-check-circle"
      {...props}
    >
      <Path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
      <Path d="M22 4L12 14.01 9 11.01" />
    </Svg>
  )
}

export default Checkmark
