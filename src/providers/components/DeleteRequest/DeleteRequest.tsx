import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import ActionSheet, {SheetProps} from 'react-native-actions-sheet';
import {SheetManager} from 'react-native-actions-sheet';

import {useRequest} from 'store/request/hooks';
import {Button} from 'components/Button';
import {StatusModal} from 'components/StatusModal';
import {navigate} from 'navigation/utils';
import {common, spacing} from 'core/styles';
import styles from './DeleteRequest.styles';

const DeleteRequest = (props: SheetProps) => {
  // @ts-expect-error
  const id: string = props?.payload?.id ?? '';

  const {updateRequest, loading, error, setError, getRequests} = useRequest();

  const navigateToDeleteRequest = async () => {
    const res = await updateRequest({id, isDeleted: true});

    if (res && !res.error) {
      await getRequests();

      SheetManager.hide('delete-request');
      navigate('Bottom Tabs');
    }
  };

  return (
    <ActionSheet
      animated
      id={props.sheetId}
      gestureEnabled={true}
      containerStyle={styles.container}>
      <Text style={styles.header20}>Delete Request</Text>

      <Text style={styles.text16}>
        Are you sure you want to delete this request ? All records of this bid
        will be deleted also
      </Text>

      <View style={common.line} />

      <View>
        <Button
          title="Delete"
          onPress={navigateToDeleteRequest}
          style={spacing.marginTop16}
          loading={loading}
          disabled={loading}
        />

        <TouchableOpacity onPress={() => SheetManager.hide('delete-request')}>
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

export default DeleteRequest;
