import React, {FC} from 'react';
import Svg, {Path, G, Defs, ClipPath, Rect} from 'react-native-svg';

interface HistoryProps {
  color: string;
  size?: string;
}

const History: FC<HistoryProps> = ({color, size = 24}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 25 24" fill="none">
      <G clipPath="url(#clip0_4274_443)">
        <Path
          d="M12.5 2C18.023 2 22.5 6.477 22.5 12C22.5 17.523 18.023 22 12.5 22C6.977 22 2.5 17.523 2.5 12H4.5C4.5 16.418 8.082 20 12.5 20C16.918 20 20.5 16.418 20.5 12C20.5 7.582 16.918 4 12.5 4C10.036 4 7.832 5.114 6.365 6.865L8.5 9H2.5V3L4.947 5.446C6.78 3.336 9.484 2 12.5 2ZM13.5 7V11.585L16.743 14.828L15.328 16.243L11.5 12.413V7H13.5Z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_4274_443">
          <Rect
            width="24"
            height="24"
            fill="white"
            transform="translate(0.5)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default History;
