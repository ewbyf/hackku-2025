import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Cream(props:any) {
  return (
    <Svg
      width={27}
      height={14}
      viewBox="0 0 27 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 1.5c0-1 27-1 27 0C27 .395 20.956 0 13.5 0S0 .5 0 1.5z"
        fill="#ABABAB"
      />
      <Path
        d="M13.5 3.5c7.456 0 13.5-.895 13.5-2 0-1-27-1-27 0s6.044 2 13.5 2z"
        fill="#6DD1FF"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.5 3.5c7.456 0 13.5-.895 13.5-2V3c-6.75 1.5-10.125 2.25-13.5 2.25S6.75 4.5 0 3V1.5c0 1 6.044 2 13.5 2zM0 9.19v.31c0 5 27 5.029 27 0v-.31c-6.75 1.5-10.125 2.25-13.5 2.25S6.75 10.69 0 9.19z"
        fill="#D9D9D9"
      />
      <Path
        d="M0 3v6.19c6.75 1.5 10.125 2.25 13.5 2.25s6.75-.75 13.5-2.25V3c-6.75 1.5-10.125 2.25-13.5 2.25S6.75 4.5 0 3z"
        fill="#9971FF"
      />
      <Path d="M11 7.667h5v1.666h-5V7.667z" fill="#64FF92" />
      <Path d="M12.667 6h1.666v5h-1.666V6z" fill="#64FF92" />
    </Svg>
  )
}

export default Cream
