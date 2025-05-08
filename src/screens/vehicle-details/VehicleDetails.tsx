/* eslint-disable react/no-unstable-nested-components */
import React, {FC, useEffect} from 'react';
import {
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SheetManager} from 'react-native-actions-sheet';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {AppStackNavParams} from 'navigation/app-stack/AppStackNav';
import {Button} from 'components/Button';
import {images} from 'core/images';
import {layout, spacing, common, palette} from 'core/styles';
import styles from './VehicleDetails.styles';

const VehicleDetails: FC<
  NativeStackScreenProps<AppStackNavParams, 'Vehicle Details'>
> = ({navigation, route}) => {
  const {vehicle} = route.params ?? {};

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Repair History', {vehicle, normalFlow: true})
          }>
          <Text style={styles.semiheader16}>Repair History</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, vehicle]);

  const details = [
    {
      id: 1,
      name: 'Vehicle Type',
      value: vehicle.vehicleType,
    },
    {
      id: 2,
      name: 'Make',
      value: vehicle.make,
    },
    {
      id: 3,
      name: 'Model',
      value: vehicle.model,
    },
    {
      id: 4,
      name: 'Year',
      value: vehicle.year,
    },
    {
      id: 5,
      name: 'Color',
      value: vehicle.color,
    },
    {
      id: 6,
      name: 'License plate number',
      value: vehicle.plateNumber,
    },
    {
      id: 7,
      name: 'Engine',
      value: vehicle.engineType,
    },
    {
      id: 8,
      name: 'Transmission',
      value: vehicle.transmissionType,
    },
    {
      id: 9,
      name: 'Fuel Type',
      value: vehicle.fuelType,
    },
  ];

  return (
    <SafeAreaView style={styles.mainContainer}>
      <KeyboardAvoidingView
        style={layout.flex1}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        behavior="padding">
        <ScrollView
          style={styles.innerContainer}
          contentContainerStyle={styles.contentContainer}
          keyboardShouldPersistTaps="always">
          <View style={layout.flex1}>
            <View>
              <Text style={styles.semiheader28}>Vehicle Details</Text>

              <Text style={[styles.text16, spacing.marginTop4]}>
                View details of this vehicle below
              </Text>
            </View>

            <View
              style={[
                common.container,
                spacing.marginTop20,
                spacing.marginBottom28,
              ]}>
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

                <Ionicons
                  name="checkmark-circle-sharp"
                  size={24}
                  color={palette.SUCCESS}
                />
              </View>
            </View>

            {details.map(item => (
              <View key={item.id}>
                <View style={[common.spacedRow, styles.pad]}>
                  <Text style={styles.text17}>{item.name}</Text>
                  <Text style={styles.text17}>{item.value}</Text>
                </View>

                <View style={common.line} />
              </View>
            ))}
          </View>

          <Button
            title="Edit vehicle details"
            onPress={() => navigation.navigate('Add Vehicle', {vehicle})}
            style={spacing.marginTop24}
          />

          <TouchableOpacity
            style={[spacing.marginTop24, common.centeredRow]}
            onPress={() =>
              SheetManager.show('delete-vehicle', {
                // @ts-expect-error
                payload: {id: vehicle._id},
              })
            }>
            <Text style={styles.semiheader16}>Delete car</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default VehicleDetails;
