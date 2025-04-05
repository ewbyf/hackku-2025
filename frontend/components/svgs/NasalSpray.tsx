import * as React from "react"
import Svg, { G, Path, Defs } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function NasalSpray(props:any) {
  return (
    <Svg
      width={19}
      height={29}
      viewBox="0 0 19 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G filter="url(#filter0_d_27_267)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.5 10h-8v4c2.5 1 5.5 1 8 0v-4zm0 8c-2.5 1-5.5 1-8 0a3 3 0 003 3h2a3 3 0 003-3z"
          fill="#B5B4B4"
        />
        <Path
          d="M5.5 14v4c2.5 1 5.5 1 8 0v-4c-2.5 1-5.5 1-8 0z"
          fill="#70FF9A"
        />
        <Path
          d="M15 10c0 1.105-2.462 2-5.5 2S4 11.105 4 10s2.462-2 5.5-2 5.5.895 5.5 2z"
          fill="#D9D9D9"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.5 0c-.568 0-1.043.43-1.1.995l-.563 5.638h3.326L10.6.995A1.105 1.105 0 009.5 0z"
          fill="#D9D9D9"
        />
        <Path
          d="M7.5 10c0 1 4 1 4 0s-.337-3.367-.337-3.367H7.837S7.5 9 7.5 10z"
          fill="#D9D9D9"
        />
        <Path
          d="M7.5 10c0 1 4 1 4 0s-.337-3.367-.337-3.367H7.837S7.5 9 7.5 10z"
          fill="#D9D9D9"
        />
        <Path
          d="M7.5 10c0 1 4 1 4 0s-.337-3.367-.337-3.367H7.837S7.5 9 7.5 10z"
          fill="#D9D9D9"
        />
      </G>
      <Defs></Defs>
    </Svg>
  )
}

export default NasalSpray
