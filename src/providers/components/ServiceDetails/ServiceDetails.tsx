import React from 'react';
import {View, Text} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import {SheetManager} from 'react-native-actions-sheet';

import {Button} from 'components/Button';
import {common} from 'core/styles';
import styles from './ServiceDetails.styles';

const ServiceDetails = (props: any) => {
  const title: string = props?.payload?.title ?? '';
  const body: string = props?.payload?.body ?? '';

  return (
    <ActionSheet
      animated
      id={props.sheetId}
      gestureEnabled={true}
      containerStyle={styles.container}>
      <Text style={styles.header20}>{title}</Text>

      <Text style={styles.text16}>{body}</Text>

      <View style={common.line} />

      <View>
        <Button
          title="Close"
          onPress={() => SheetManager.hide('service-details')}
        />
      </View>
    </ActionSheet>
  );
};

export default ServiceDetails;
