import React from 'react';
import {View, Text} from 'react-native';
import ActionSheet, {SheetProps} from 'react-native-actions-sheet';
import Feather from 'react-native-vector-icons/Feather';
import {SheetManager} from 'react-native-actions-sheet';

import {Button} from 'components/Button';
import {common, palette, spacing} from 'core/styles';
import styles from './ContactInformation.styles';

const ContactInformation = (props: SheetProps) => {
  // @ts-expect-error
  const business: any = props?.payload?.business ?? '';

  const navigateToContactInformation = async () => {
    SheetManager.hide('contact-information');
  };

  return (
    <ActionSheet
      animated
      id={props.sheetId}
      gestureEnabled={true}
      containerStyle={styles.container}>
      <Text style={styles.header20}>Contact Information</Text>

      <View style={common.line} />

      <View style={[spacing.marginTop4, common.container]}>
        <View style={[common.flexedRow, styles.gap]}>
          <Feather name="phone" size={20} color={palette.DEFAULT} />

          <Text style={styles.text16}>{business.user.phone}</Text>
        </View>

        <View style={common.line} />

        <View style={[common.flexedRow, styles.gap]}>
          <Feather name="mail" size={20} color={palette.DEFAULT} />

          <Text style={styles.text16}>{business.user.email}</Text>
        </View>
      </View>

      <View>
        <Button
          title="Close"
          onPress={navigateToContactInformation}
          style={spacing.marginTop16}
        />
      </View>
    </ActionSheet>
  );
};

export default ContactInformation;
