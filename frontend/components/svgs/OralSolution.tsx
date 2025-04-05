import * as React from "react"
import Svg, { Path } from "react-native-svg"

function OralSolution(props:any) {
  return (
    <Svg
      width={15}
      height={15}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M14.903 3.483C14.326 4.91 11.232 6 7.5 6 3.769 6 .674 4.91.097 3.483L2 13c5 2 5 2 11 0l1.903-9.517z"
        fill="#3995FF"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.903 3.483A1.28 1.28 0 0015 3c0-1.657-3.358-3-7.5-3C3.358 0 0 1.343 0 3c0 .164.033.325.097.483C0 2 4.577 1.37 7.5 1.37c2.924 0 7.5.629 7.403 2.112z"
        fill="#8A8686"
      />
      <Path
        d="M7.5 6c3.732 0 6.826-1.09 7.403-2.517C15 2 10.423 1.37 7.5 1.37 4.576 1.37 0 2 .097 3.483.674 4.91 3.769 6 7.5 6z"
        fill="#3995FF"
      />
      <Path
        d="M14.903 3.483C14.326 4.91 11.232 6 7.5 6 3.769 6 .674 4.91.097 3.483L2 13c5 2 5 2 11 0l1.903-9.517z"
        fill="#CDCDCD"
        fillOpacity={0.75}
      />
      <Path
        d="M4 8c3.5.5 3.5.5 7 0M4 9c3.5.5 3.5.5 7 0m-7 1c3.5.5 3.5.5 7 0"
        stroke="#000"
        strokeWidth={0.25}
      />
    </Svg>
  )
}

export default OralSolution
