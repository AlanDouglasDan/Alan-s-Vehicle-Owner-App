import React, {FC} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {CheckBox} from '@rneui/themed';

import {BottomSheet} from 'components/BottomSheet';
import {Button} from 'components/Button';
import {images} from 'core/images';
import {palette, common, spacing, layout} from 'core/styles';
import styles from './VehicleSelector.styles';

interface VehicleSelectorProps {
  open: boolean;
  setOpen: any;
  vehicles: any[] | undefined;
  selectedCar: string;
  setFieldValue?: any;
  setSelectedCar?: any;
  setSelectedVehicle?: any;
}

const VehicleSelector: FC<VehicleSelectorProps> = ({
  open,
  setOpen,
  vehicles,
  selectedCar,
  setFieldValue = undefined,
  setSelectedCar = undefined,
  setSelectedVehicle = undefined,
}) => {
  return (
    <BottomSheet
      open={open}
      onClose={() => setOpen(false)}
      // height={hp(50)}
    >
      <View style={styles.content}>
        <View style={[common.spacedRow, spacing.marginBottom16]}>
          <Text style={styles.semiheader20}>
            Select your Registered Vehicle
          </Text>

          <Ionicons
            name="close"
            size={24}
            color={palette.DEFAULT}
            onPress={() => setOpen(false)}
          />
        </View>

        {vehicles?.length !== 0 &&
          vehicles?.map(vehicle => (
            <TouchableOpacity
              key={vehicle._id}
              onPress={() => {
                setFieldValue && setFieldValue('car', vehicle._id);
                setSelectedCar &&
                  setSelectedCar(vehicle.make + ' ' + vehicle.model);
                setSelectedVehicle && setSelectedVehicle(vehicle._id);
              }}
              style={[common.container, spacing.marginBottom16]}>
              <View style={common.spacedRow}>
                <View style={[common.flexedRow, layout.flex1, styles.gap]}>
                  <Image
                    source={
                      vehicle.vehicleImages[0]
                        ? {uri: vehicle.vehicleImages[0]}
                        : images.car
                    }
                    resizeMode="contain"
                    style={styles.carImage}
                  />

                  <View>
                    <Text style={styles.semiheader16}>
                      {vehicle.make} {vehicle.model}
                    </Text>

                    <Text style={styles.text13}>{vehicle.plateNumber}</Text>
                  </View>
                </View>

                <CheckBox
                  key={vehicle.id}
                  title=""
                  checked={selectedCar === vehicle._id}
                  onPress={() => {
                    setFieldValue && setFieldValue('car', vehicle._id);
                    setSelectedCar &&
                      setSelectedCar(vehicle.make + ' ' + vehicle.model);
                    setSelectedVehicle && setSelectedVehicle(vehicle._id);
                  }}
                  containerStyle={styles.optionContainer}
                  uncheckedIcon={
                    <Ionicons
                      name="radio-button-off"
                      size={24}
                      color={palette.NEUTRAL30}
                    />
                  }
                  checkedIcon={
                    <Ionicons
                      name="checkmark-circle-sharp"
                      size={24}
                      color={palette.SUCCESS}
                    />
                  }
                />
              </View>
            </TouchableOpacity>
          ))}

        <Button
          title="Select"
          onPress={() => setOpen(false)}
          disabled={selectedCar === ''}
        />
      </View>
    </BottomSheet>
  );
};

export default VehicleSelector;
