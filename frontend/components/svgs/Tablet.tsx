import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Tablet(props:any) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M19.865 4.662c4.198 4.198 4.198 11.005 0 15.203-4.198 4.198-11.005 4.198-15.203 0C.464 15.667.464 8.86 4.662 4.662 8.86.464 15.667.464 19.865 4.662z"
        fill="#FF8B8C"
        stroke="#EEEDF5"
        strokeWidth={1.5}
      />
    </Svg>
  )
}

export default Tablet
