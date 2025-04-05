import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Capsul(props:any) {
  return (
    <Svg
      width={17}
      height={17}
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M2.83 1.214c2.116-1.775 5.197-1.585 6.884.425 1.686 2.01 1.338 5.077-.777 6.852-2.116 1.775-5.197 1.585-6.884-.424C.367 6.057.715 2.989 2.83 1.214z"
        fill="#3995FF"
      />
      <Path
        d="M8.937 8.491c2.115-1.775 5.197-1.584 6.883.425 1.686 2.01 1.339 5.078-.777 6.853-2.115 1.775-5.197 1.585-6.883-.425-1.687-2.01-1.339-5.078.777-6.853z"
        fill="#CDCDCD"
      />
      <Path
        d="M8.16 15.344l-3.054-3.639 7.66-6.428 3.054 3.64-7.66 6.427z"
        fill="#CDCDCD"
      />
      <Path
        d="M5.106 11.705L2.053 8.067l7.66-6.428 3.054 3.638-7.66 6.428z"
        fill="#3995FF"
      />
    </Svg>
  )
}

export default Capsul
