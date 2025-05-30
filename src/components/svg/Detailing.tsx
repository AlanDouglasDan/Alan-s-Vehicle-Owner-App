import React, {FC} from 'react';
import Svg, {Path} from 'react-native-svg';

interface DetailingProps {}

const Detailing: FC<DetailingProps> = () => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.5438 3C9.25532 3 8.03213 3.61938 7.29529 4.70457C6.57298 5.76835 5.52586 7.35946 4.65579 8.87816C4.22151 9.63621 3.82092 10.3942 3.52598 11.0699C3.24964 11.703 3 12.4063 3 13V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3H10.5438ZM8.94991 5.82805C9.30156 5.31016 9.89467 5 10.5438 5H19V7H11.9368C11.3432 7 10.7797 7.26238 10.4212 7.73539C9.65103 8.75128 8.34617 10.6153 8 12H5.30331C5.32094 11.958 5.33948 11.9146 5.35897 11.87C5.61293 11.2882 5.97409 10.6004 6.39118 9.87236C7.22387 8.4189 8.23805 6.87644 8.94991 5.82805ZM5 14H19V19H5V14Z"
        fill="black"
      />
    </Svg>
  );
};

export default Detailing;
