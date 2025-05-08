import React, {FC, useEffect} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
  Image,
  TouchableOpacity,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {BottomTabsNavParams} from 'navigation/bottom-tabs-nav/BottomTabsNav';
import {useVehicle} from 'store/vehicle/hooks';
import {Empty} from 'components/Empty';
import Car from 'components/svg/Car';
import Calendar from 'components/svg/Calendar';
import Gear from 'components/svg/Gear';
import {formatDate} from 'core/utils';
import {images} from 'core/images';
import {common, layout, palette, spacing} from 'core/styles';
import styles from './Cars.styles';

const Cars: FC<NativeStackScreenProps<BottomTabsNavParams, 'Cars'>> = ({
  navigation,
}) => {
  const {loading, getVehicles, vehicles} = useVehicle();

  useEffect(() => {
    getVehicles();
  }, [getVehicles]);

  return (
    <SafeAreaView style={styles.mainContainer}>
      {loading ? (
        <ActivityIndicator
          size={'large'}
          style={layout.flex1}
          color={palette.PRIMARY}
        />
      ) : (
        <ScrollView
          style={styles.innerContainer}
          contentContainerStyle={styles.contentContainer}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={() => getVehicles()}
            />
          }>
          <View style={[common.spacedRow, spacing.marginBottom20]}>
            <Text style={styles.semiheader28}>Cars</Text>

            <TouchableOpacity
              onPress={() =>
                /* @ts-expect-error Action will bubble up to the AppStackNav where "Add Vehicle" screen is defined */
                navigation.navigate('Add Vehicle')
              }
              style={common.flexedRow}>
              <Feather name="plus" size={22} color={palette.PRIMARY} />

              <Text style={[styles.semiheader16, {color: palette.PRIMARY}]}>
                Add car
              </Text>
            </TouchableOpacity>
          </View>

          {vehicles?.length === 0 ? (
            <Empty
              title="No registered cars"
              body="Start by adding your first vehicle"
              buttonText="Add Vehicle"
              /* @ts-expect-error Action will bubble up to the AppStackNav where "Add Vehicle" screen is defined */
              onPress={() => navigation.navigate('Add Vehicle')}
            />
          ) : (
            <>
              {vehicles?.map(vehicle => (
                <TouchableOpacity
                  style={[spacing.marginBottom20, common.container]}
                  key={vehicle._id}
                  onPress={() =>
                    /* @ts-expect-error Action will bubble up to the AppStackNav where "Vehicle Details" screen is defined */
                    navigation.navigate('Vehicle Details', {vehicle})
                  }>
                  <View
                    style={[
                      common.spacedRow,
                      common.alignStart,
                      spacing.marginBottom4,
                    ]}>
                    <View>
                      <Image
                        source={{
                          uri: `https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/${vehicle.make.toLowerCase()}.png`,
                        }}
                        style={styles.logo}
                        resizeMode="contain"
                      />
                    </View>

                    <View
                      style={[
                        styles.statusBar,
                        {
                          backgroundColor:
                            vehicle.vehicleImages.length === 0
                              ? palette.NEUTRAL10
                              : palette.LIGHT_GREEN,
                        },
                      ]}>
                      <Text
                        style={[
                          styles.text12,
                          {
                            color:
                              vehicle.vehicleImages.length === 0
                                ? palette.DEFAULT
                                : palette.SUCCESS,
                          },
                        ]}>
                        {vehicle.vehicleImages.length === 0
                          ? 'Pending'
                          : 'Completed'}
                      </Text>
                    </View>
                  </View>

                  <Text style={styles.semiheader16}>{vehicle.make}</Text>

                  <TouchableOpacity
                    style={[spacing.marginBottom16, spacing.marginTop16]}
                    onPress={() =>
                      vehicle
                        .vehicleImages[0] /* @ts-expect-error Action will bubble up to the AppStackNav where "Images" screen is defined */ &&
                      navigation.navigate('Images', {
                        images: vehicle.vehicleImages,
                        currentIndex: 0,
                      })
                    }>
                    <Image
                      source={
                        vehicle.vehicleImages[0]
                          ? {uri: vehicle.vehicleImages[0]}
                          : images.car
                      }
                      resizeMode="contain"
                      style={styles.car}
                    />
                  </TouchableOpacity>

                  <View style={styles.gap}>
                    <View style={[common.flexedRow, styles.gap4]}>
                      <Car />

                      <Text style={styles.text14}>{vehicle.model}</Text>
                    </View>

                    <View style={[common.flexedRow, styles.gap4]}>
                      <Calendar />

                      <Text style={styles.text14}>
                        {formatDate(vehicle.createdAt)}
                      </Text>
                    </View>

                    <View style={[common.flexedRow, styles.gap4]}>
                      <Gear />

                      <Text style={styles.text14}>{vehicle.plateNumber}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Cars;
