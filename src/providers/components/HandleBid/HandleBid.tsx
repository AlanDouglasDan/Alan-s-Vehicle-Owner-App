import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import {SheetManager} from 'react-native-actions-sheet';

import {useRequest} from 'store/request/hooks';
import {Button} from 'components/Button';
import {StatusModal} from 'components/StatusModal';
import {navigate} from 'navigation/utils';
import {common, spacing} from 'core/styles';
import styles from './HandleBid.styles';

const HandleBid = (props: any) => {
  const type: string = props?.payload?.type ?? '';
  const bid: string = props?.payload?.bid ?? '';

  const {updateBidStatus, loading, error, setError, getBids} = useRequest();

  const handleSubmit = async () => {
    const res = await updateBidStatus({
      id: bid,
      status: type === 'accept' ? 'Accepted' : 'Rejected',
    });

    if (res && !res.error) {
      await getBids();

      SheetManager.hide('handle-bid');
      navigate('Bottom Tabs');
    }
  };

  return (
    <ActionSheet
      animated
      id={props.sheetId}
      gestureEnabled={true}
      containerStyle={styles.container}>
      <Text style={styles.header20}>
        {type === 'accept' ? 'Accept' : 'Reject'} Bid
      </Text>

      <Text style={styles.text16}>
        {type === 'accept'
          ? 'Are you sure you want to accept this bid? Please note that accepting it will cancel all other bids from different garages'
          : 'Are you sure you want to reject this bid? Please note that rejecting it will delete all records of this bid also'}
      </Text>

      <View style={common.line} />

      <View>
        <Button
          title={type === 'accept' ? 'Accept' : 'Reject'}
          onPress={handleSubmit}
          style={spacing.marginTop16}
          loading={loading}
          disabled={loading}
        />

        <TouchableOpacity onPress={() => SheetManager.hide('handle-bid')}>
          <Text style={styles.semiheader16}>Cancel</Text>
        </TouchableOpacity>
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

export default HandleBid;
