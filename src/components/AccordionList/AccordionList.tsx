import React, {FC, useState} from 'react';
import {
  View,
  Text,
  LayoutAnimation,
  Platform,
  UIManager,
  TouchableOpacity,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

import {palette} from 'core/styles';
import styles from './AccordionList.styles';

interface AccordionListProps {
  title?: string;
  body?: string;
}

const AccordionList: FC<AccordionListProps> = ({title, body}) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.row}
        onPress={() => toggleExpand()}
        activeOpacity={1}>
        <Text style={styles.text16}>{title}</Text>

        {expanded ? (
          <Entypo name="chevron-small-up" size={20} color={palette.DEFAULT} />
        ) : (
          <Entypo name="chevron-small-down" size={20} color={palette.DEFAULT} />
        )}
      </TouchableOpacity>

      {expanded && (
        <View style={styles.child}>
          <Text style={styles.text14}>{body}</Text>
        </View>
      )}
    </View>
  );
};

export default AccordionList;
