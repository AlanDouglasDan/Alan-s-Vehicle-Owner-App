import React from 'react';
import {View, Text} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import {SheetManager} from 'react-native-actions-sheet';

import {useRequest} from 'store/request/hooks';
import {Button} from 'components/Button';
import {StatusModal} from 'components/StatusModal';
import {navigate} from 'navigation/utils';
import {common, spacing} from 'core/styles';
import styles from './AcceptRecommendation.styles';

const AcceptRecommendation = (props: any) => {
  const id: string = props?.payload?.id ?? '';
  const currency: string = props?.payload?.currency ?? '';
  const additionalAmount: string = props?.payload?.additionalAmount ?? '';
  const initialAmount: string = props?.payload?.initialAmount ?? '';

  const {updateAdditionalRepairStatus, loading, error, setError} = useRequest();

  const handleSubmit = async () => {
    const res = await updateAdditionalRepairStatus({
      id,
      status: 'Accepted',
    });

    if (res && !res.error) {
      SheetManager.hide('accept-recommendation');
      navigate('Success', {
        title: 'Additional Repair Confirmed',
        nextScreen: 'Bottom Tabs',
      });
    }
  };

  return (
    <ActionSheet
      animated
      id={props.sheetId}
      gestureEnabled={true}
      containerStyle={styles.container}>
      <Text style={styles.header20}>Accept Recommendation</Text>

      <Text style={styles.text16}>
        If you agree to this recommendation, the cost of the additional repairs
        will be added to your initial repair total
      </Text>

      <View style={common.line} />

      <View style={common.container}>
        <View style={common.spacedRow}>
          <Text style={styles.text16}>Initial Repair</Text>
          <Text style={styles.text16}>{currency + ' ' + initialAmount}</Text>
        </View>

        <View style={common.line} />

        <View style={common.spacedRow}>
          <Text style={styles.text16}>Additional Repair</Text>
          <Text style={styles.text16}>{currency + ' ' + additionalAmount}</Text>
        </View>
      </View>

      <View>
        <Button
          title="Continue"
          onPress={handleSubmit}
          style={spacing.marginTop16}
          loading={loading}
          disabled={loading}
        />
      </View>

      <StatusModal
        open={!!error}
        onClose={() => setError(false)}
        message={
          typeof error === 'string' ? error : 'Oops, something went wrong!'
        }
        status="error"
      />
    </ActionSheet>
  );
};

export default AcceptRecommendation;
