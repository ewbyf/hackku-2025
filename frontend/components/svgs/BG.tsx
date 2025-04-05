import * as React from "react"
import Svg, { G, Path, Ellipse, Defs, ClipPath } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function BGSvg(props: any) {
  return (
    <Svg
      width={402}
      height={874}
      viewBox="0 0 402 874"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#clip0_37_2)">
        <Path fill="#fff" d="M0 0H402V874H0z" />
        <G filter="url(#filter0_f_37_2)">
          <Ellipse
            cx={399.5}
            cy={116}
            rx={270.5}
            ry={254}
            fill="#F4F3FF"
            fillOpacity={0.75}
          />
        </G>
        <G filter="url(#filter1_f_37_2)">
          <Ellipse cx={-16.5} cy={396} rx={270.5} ry={254} fill="#F3FCFF" />
        </G>
        <G filter="url(#filter2_f_37_2)">
          <Ellipse
            cx={308.5}
            cy={743}
            rx={270.5}
            ry={254}
            fill="#F4F3FF"
            fillOpacity={0.75}
          />
        </G>
      </G>
      <Defs>
        <ClipPath id="clip0_37_2">
          <Path fill="#fff" d="M0 0H402V874H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default BGSvg
