import React, {FC, useEffect, useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import {SheetManager} from 'react-native-actions-sheet';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {AppStackNavParams} from 'navigation/app-stack/AppStackNav';
import {useRequest} from 'store/request/hooks';
import {useVehicle} from 'store/vehicle/hooks';
import {Button} from 'components/Button';
import {StatusModal} from 'components/StatusModal';
import Car from 'components/svg/Car';
import Gear from 'components/svg/Gear';
import Location from 'components/svg/Location';
import {formatCurrency} from 'core/utils';
import {common, layout, palette, spacing} from 'core/styles';
import styles from './AdditionalRepairs.styles';

export type SelectedService = {
  _id: string;
  description: string;
  amount: number;
  currency: string | undefined;
};

const AdditionalRepairs: FC<
  NativeStackScreenProps<AppStackNavParams, 'Additional Repairs'>
> = ({route, navigation}) => {
  const {id} = route.params ?? {};

  const {
    getAdditionalRepair,
    loading,
    loading2,
    updateAdditionalRepairStatus,
    error,
    setError,
  } = useRequest();
  const {getServices, services} = useVehicle();

  useEffect(() => {
    !services && getServices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [repairDetails, setRepairDetails] = useState<any>();

  useEffect(() => {
    getAdditionalRepair(id).then(res => {
      setRepairDetails(res.payload.data);
    });
  }, [getAdditionalRepair, id]);

  const rejectRecommendation = async () => {
    const res = await updateAdditionalRepairStatus({
      id,
      status: 'Rejected',
    });

    if (res && !res.error) {
      navigation.navigate('Bottom Tabs');
    }
  };

  const additionalCosts = [
    {
      id: 1,
      name: 'VAT',
      amount: '0.00',
    },
  ];

  console.log(repairDetails);

  return (
    <SafeAreaView style={styles.mainContainer}>
      {loading2 ? (
        <ActivityIndicator
          size={'large'}
          style={layout.flex1}
          color={palette.PRIMARY}
        />
      ) : (
        <ScrollView
          style={styles.innerContainer}
          contentContainerStyle={styles.contentContainer}>
          <View style={layout.flex1}>
            <Text style={styles.semiheader28}>Additional repairs</Text>
            <Text style={[styles.text16, spacing.marginTop4]}>
              View details of this repair below
            </Text>

            <View style={[common.container, spacing.marginTop16]}>
              <View style={common.spacedRow}>
                <View>
                  {repairDetails?.garageOwner.user.profileImage ? (
                    <Image
                      source={{
                        uri: repairDetails?.garageOwner.user.profileImage,
                      }}
                      style={styles.image}
                      resizeMode="cover"
                    />
                  ) : (
                    <View style={styles.image}>
                      <Text style={styles.semiheader22}>
                        {repairDetails?.garageOwner.user.firstName
                          .charAt(0)
                          .toUpperCase()}
                        {repairDetails?.garageOwner.user.lastName
                          .charAt(0)
                          .toUpperCase()}
                      </Text>
                    </View>
                  )}

                  <Text
                    style={[
                      styles.semiheader16,
                      spacing.marginTop4,
                      {color: palette.TEXT_HEADING},
                    ]}>
                    {repairDetails?.garageOwner.businessName}
                  </Text>
                </View>

                {/* <View style={[common.flexedRow, styles.gap8]}>
                  <Ionicons name="star" size={24} color={palette.YELLOW} />

                  <Text style={styles.semiheader16}>
                    {repairDetails?.garageOwner.avgRating?.toFixed(1) || 0}
                  </Text>
                </View> */}
              </View>

              <View style={common.line} />

              <View style={styles.gap8}>
                <View style={[common.flexedRow, styles.gap]}>
                  <Car />

                  <Text style={styles.text14}>
                    {repairDetails?.request.vehicle.make}{' '}
                    {repairDetails?.request.vehicle.model}
                  </Text>
                </View>

                <View style={[common.flexedRow, styles.gap]}>
                  <Gear />

                  <Text style={styles.text14} numberOfLines={1}>
                    {repairDetails?.request.description}
                  </Text>
                </View>

                <View style={[common.flexedRow, styles.gap]}>
                  <Location />

                  <Text style={styles.text14}>
                    {repairDetails?.request.user.location}
                  </Text>
                </View>
              </View>
            </View>

            <TouchableOpacity
              style={[common.container, spacing.marginTop16, common.spacedRow]}
              onPress={() =>
                SheetManager.show('contact-information', {
                  // @ts-expect-error
                  payload: {business: repairDetails.garageOwner},
                })
              }>
              <View>
                <Text style={styles.semiheader16}>
                  {repairDetails?.garageOwner.businessName}
                </Text>

                <Text style={styles.text13}>Garage owner</Text>
              </View>

              <FontAwesome
                name="angle-right"
                size={24}
                color={palette.DEFAULT}
              />
            </TouchableOpacity>

            <View style={[spacing.marginTop16, common.container]}>
              {repairDetails?.prices.map((serviceBid, index, array) => (
                <View key={index}>
                  <TouchableOpacity
                    style={[common.spacedRow, styles.gap8]}
                    onPress={() =>
                      SheetManager.show('service-details', {
                        payload: {
                          title: services?.find(
                            _service => _service._id === serviceBid.service,
                          )?.name,
                          body: serviceBid.description,
                        },
                      } as any)
                    }>
                    <View style={layout.flex1}>
                      <Text style={styles.text16}>
                        {
                          services?.find(
                            _service => _service._id === serviceBid.service,
                          )?.name
                        }
                      </Text>

                      <Text
                        style={[styles.text14, {color: palette.GRAY500}]}
                        numberOfLines={1}>
                        {serviceBid.description}
                      </Text>
                    </View>

                    <Text style={styles.text16}>
                      {serviceBid.currency}{' '}
                      {formatCurrency(serviceBid.amount, 2)}
                    </Text>
                  </TouchableOpacity>

                  {serviceBid !== array[array.length - 1] && (
                    <View style={styles.line} />
                  )}
                </View>
              ))}
            </View>

            <View
              style={[
                spacing.marginTop16,
                common.container,
                {backgroundColor: palette.NEUTRAL10},
              ]}>
              {additionalCosts.map((cost, _, array) => (
                <View key={cost.id}>
                  <View style={common.spacedRow}>
                    <Text style={styles.text16}>{cost.name}</Text>

                    <Text style={styles.text16}>
                      {repairDetails?.prices[0].currency} {cost.amount}
                    </Text>
                  </View>

                  {cost.id !== array.length && <View style={styles.line} />}
                </View>
              ))}
            </View>

            <View style={[spacing.marginTop16, common.spacedRow]}>
              <Text style={styles.text16}>Total</Text>

              <Text style={styles.header22}>
                {repairDetails?.prices[0].currency}{' '}
                {formatCurrency(
                  repairDetails?.prices.reduce(
                    (accumulator, currentValue) =>
                      accumulator + currentValue.amount,
                    0,
                  ),
                  2,
                )}
              </Text>
            </View>
          </View>

          <Button
            title={'Accept recommendation'}
            style={spacing.marginTop24}
            onPress={() =>
              SheetManager.show('accept-recommendation', {
                // @ts-expect-error
                payload: {
                  id,
                  currency: repairDetails?.prices[0].currency,
                  additionalAmount: formatCurrency(
                    repairDetails?.prices.reduce(
                      (accumulator, currentValue) =>
                        accumulator + currentValue.amount,
                      0,
                    ),
                    2,
                  ),
                },
              })
            }
          />

          <Button
            title={'Reject recommendation'}
            opaque={false}
            style={spacing.marginTop8}
            disabled={loading}
            loading={loading}
            onPress={rejectRecommendation}
          />

          <TouchableOpacity
            style={spacing.marginTop20}
            onPress={() =>
              navigation.navigate('Make Appointment', {
                bid: repairDetails,
                additionalRepair: true,
              })
            }>
            <Text
              style={[
                styles.semiheader16,
                common.textCenter,
                {color: palette.PRIMARY},
              ]}>
              Reschedule for later
            </Text>
          </TouchableOpacity>
        </ScrollView>
      )}

      <StatusModal
        open={!!error}
        onClose={() => setError(false)}
        message={
          typeof error === 'string' ? error : 'Oops, something went wrong!'
        }
        status="error"
      />
    </SafeAreaView>
  );
};

export default AdditionalRepairs;
