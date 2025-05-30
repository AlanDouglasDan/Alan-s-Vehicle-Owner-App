import React, {FC} from 'react';
import Svg, {Path} from 'react-native-svg';

interface VerifiedProps {}

const Verified: FC<VerifiedProps> = () => {
  return (
    <Svg
      width="18"
      height="19"
      viewBox="0 0 18 19"
      fill="none">
      <Path
        d="M6.45 17.375L5.025 14.975L2.325 14.375L2.5875 11.6L0.75 9.5L2.5875 7.4L2.325 4.625L5.025 4.025L6.45 1.625L9 2.7125L11.55 1.625L12.975 4.025L15.675 4.625L15.4125 7.4L17.25 9.5L15.4125 11.6L15.675 14.375L12.975 14.975L11.55 17.375L9 16.2875L6.45 17.375ZM8.2125 12.1625L12.45 7.925L11.4 6.8375L8.2125 10.025L6.6 8.45L5.55 9.5L8.2125 12.1625Z"
        fill="#295EFF"
      />
    </Svg>
  );
};

export default Verified;
