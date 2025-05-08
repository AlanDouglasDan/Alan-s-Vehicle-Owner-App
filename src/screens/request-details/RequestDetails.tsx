import React, {FC, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {SheetManager} from 'react-native-actions-sheet';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {AppStackNavParams} from 'navigation/app-stack/AppStackNav';
import {useVehicle} from 'store/vehicle/hooks';
import {Button} from 'components/Button';
import Car from 'components/svg/Car';
import Calendar from 'components/svg/Calendar';
import Gear from 'components/svg/Gear';
import Location from 'components/svg/Location';
import {images} from 'core/images';
import {formatCurrency, formatDate} from 'core/utils';
import {common, layout, palette, spacing} from 'core/styles';
import styles from './RequestDetails.styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const RequestDetails: FC<
  NativeStackScreenProps<AppStackNavParams, 'Request Details'>
> = ({navigation, route}) => {
  const {request, status, bid} = route.params ?? {};

  const {getServices, services} = useVehicle();

  useEffect(() => {
    !services && getServices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(bid?.paymentIntentId);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView
        style={styles.innerContainer}
        contentContainerStyle={styles.contentContainer}>
        <View style={layout.flex1}>
          <View>
            <Text style={styles.semiheader28}>Repair details</Text>

            <Text style={styles.text17}>View details of this repair below</Text>
          </View>

          <View style={[common.container, spacing.marginTop32]}>
            <View
              style={[
                common.spacedRow,
                common.alignStart,
                spacing.marginBottom4,
              ]}>
              <Image
                source={images.checkers}
                style={styles.image}
                resizeMode="cover"
              />

              <View
                style={[
                  styles.statusContainer,
                  {
                    backgroundColor:
                      request.status === 'Pending'
                        ? palette.NEUTRAL10
                        : palette.SUCCESS_LIGHTEST,
                  },
                ]}>
                <Text
                  style={[
                    styles.text12,
                    {
                      color:
                        request.status === 'Pending'
                          ? palette.DEFAULT
                          : palette.SUCCESS,
                    },
                  ]}>
                  {request.status}
                </Text>
              </View>
            </View>

            <Text style={styles.semiheader16}>{request.vehicle.make}</Text>

            <View style={styles.line} />

            <View style={styles.gap}>
              <View style={[common.flexedRow, styles.gap4]}>
                <Car />

                <Text style={styles.text14}>
                  {request.vehicle.make} {request.vehicle.model}
                </Text>
              </View>

              <View style={[common.flexedRow, styles.gap4]}>
                <Calendar />

                <Text style={styles.text14}>
                  {formatDate(request.createdAt)}
                </Text>
              </View>

              <View style={[common.flexedRow, styles.gap4]}>
                <Gear />

                <Text style={[styles.text14, layout.flex1]} numberOfLines={1}>
                  {request.description}
                </Text>
              </View>

              <View style={[common.flexedRow, styles.gap4]}>
                <Location />

                <Text style={[styles.text14, layout.flex1]} numberOfLines={1}>
                  {request.user.location}
                </Text>
              </View>
            </View>
          </View>

          {status === 'Completed' && (
            <>
              <TouchableOpacity
                style={[
                  common.container,
                  spacing.marginTop16,
                  common.spacedRow,
                ]}
                onPress={() =>
                  SheetManager.show('contact-information', {
                    // @ts-expect-error
                    payload: {business: bid.garageOwner},
                  })
                }>
                <View>
                  <Text style={styles.semiheader16}>
                    {bid?.garageOwner.businessName}
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
                {bid?.prices.map((serviceBid, index, array) => (
                  <View key={index}>
                    <TouchableOpacity
                      style={[common.spacedRow, styles.gap]}
                      activeOpacity={1}
                      // onPress={() =>
                      //   SheetManager.show('service-details', {
                      //     payload: {
                      //       title: services?.find(
                      //         _service => _service._id === serviceBid.service,
                      //       )?.name,
                      //       body: serviceBid.description,
                      //     },
                      //   } as any)
                      // }
                    >
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
                          {
                            services?.find(
                              _service => _service._id === serviceBid.service,
                            )?.serviceType
                          }
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
            </>
          )}
        </View>

        {!bid?.paymentIntentId && (
          <Button
            title={
              status === 'Completed' ? 'Proceed to payment' : 'Delete request'
            }
            onPress={() =>
              status === 'Completed'
                ? navigation.navigate('Payment', {bid})
                : SheetManager.show('delete-request', {
                    // @ts-expect-error
                    payload: {id: request._id},
                  })
            }
            style={spacing.marginTop24}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default RequestDetails;
