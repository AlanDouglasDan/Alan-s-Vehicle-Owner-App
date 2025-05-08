import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import ActionSheet, {SheetProps} from 'react-native-actions-sheet';
import {SheetManager} from 'react-native-actions-sheet';

import {useVehicle} from 'store/vehicle/hooks';
import {Button} from 'components/Button';
import {StatusModal} from 'components/StatusModal';
import {navigate} from 'navigation/utils';
import {common, spacing} from 'core/styles';
import styles from './DeleteVehicle.styles';

const DeleteVehicle = (props: SheetProps) => {
  // @ts-expect-error
  const id: string = props?.payload?.id ?? '';

  const {deleteVehicle, loading, error, setError, getVehicles} = useVehicle();

  const navigateToDeleteVehicle = async () => {
    const res = await deleteVehicle(id);

    if (res && !res.error) {
      await getVehicles();

      SheetManager.hide('delete-vehicle');
      navigate('Bottom Tabs');
    }
  };

  return (
    <ActionSheet
      animated
      id={props.sheetId}
      gestureEnabled={true}
      containerStyle={styles.container}>
      <Text style={styles.header20}>Delete car</Text>

      <Text style={styles.text16}>
        Are you sure you want to delete this car ? All records will be erased
        permanently and can't be undone
      </Text>

      <View style={common.line} />

      <View>
        <Button
          title="Yes, Delete car"
          onPress={navigateToDeleteVehicle}
          style={spacing.marginTop16}
          loading={loading}
          disabled={loading}
        />

        <TouchableOpacity onPress={() => SheetManager.hide('delete-vehicle')}>
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

export default DeleteVehicle;
