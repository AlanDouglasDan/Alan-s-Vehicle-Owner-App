import React, {FC} from 'react';
import Svg, {Path, Defs, ClipPath, Rect, G} from 'react-native-svg';

interface NotificationsProps {}

const Notifications: FC<NotificationsProps> = () => {
  return (
    <Svg
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none">
      <G clipPath="url(#clip0_2389_22853)">
        <Path
          d="M18.3334 17.123H1.66675V15.4564H2.50008V9.64888C2.50008 5.49221 5.85841 2.12305 10.0001 2.12305C14.1417 2.12305 17.5001 5.49221 17.5001 9.64888V15.4564H18.3334V17.123ZM4.16675 15.4564H15.8334V9.64888C15.8334 6.41305 13.2217 3.78971 10.0001 3.78971C6.77841 3.78971 4.16675 6.41305 4.16675 9.64888V15.4564ZM7.91675 17.9564H12.0834C12.0834 18.5089 11.8639 19.0388 11.4732 19.4295C11.0825 19.8202 10.5526 20.0397 10.0001 20.0397C9.44755 20.0397 8.91764 19.8202 8.52694 19.4295C8.13624 19.0388 7.91675 18.5089 7.91675 17.9564Z"
          fill="#667085"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_2389_22853">
          <Rect
            width="20"
            height="20"
            fill="white"
            transform="translate(0 0.457031)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default Notifications;
