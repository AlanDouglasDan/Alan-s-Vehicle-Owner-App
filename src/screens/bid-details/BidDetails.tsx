import React, {FC} from 'react';
import {
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {SheetManager} from 'react-native-actions-sheet';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
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
import styles from './BidDetails.styles';

const BidDetails: FC<
  NativeStackScreenProps<AppStackNavParams, 'Bid Details'>
> = ({route}) => {
  const {bid} = route.params ?? {};

  const {services} = useVehicle();

  const additionalCosts = [
    {
      id: 1,
      name: 'Labor tax',
      amount: '0.00',
    },
    {
      id: 2,
      name: 'VAT',
      amount: '0.00',
    },
  ];

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView
        style={styles.innerContainer}
        contentContainerStyle={styles.contentContainer}>
        <View style={layout.flex1}>
          <View>
            <Text style={styles.semiheader28}>Bid details</Text>

            <Text style={styles.text17}>Confirm the details of bid below</Text>
          </View>

          <View style={[common.container, spacing.marginTop16]}>
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

              {/* <View
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
              </View> */}
            </View>

            <Text style={styles.semiheader16}>{bid.request.vehicle.make}</Text>

            <View style={styles.line} />

            <View style={styles.gap}>
              <View style={[common.flexedRow, styles.gap4]}>
                <Car />

                <Text style={styles.text14}>
                  {bid.request.vehicle.make} {bid.request.vehicle.model}
                </Text>
              </View>

              <View style={[common.flexedRow, styles.gap4]}>
                <Calendar />

                <Text style={styles.text14}>
                  {formatDate(bid.request.createdAt)}
                </Text>
              </View>

              <View style={[common.flexedRow, styles.gap4]}>
                <Gear />

                <Text style={[styles.text14, layout.flex1]} numberOfLines={1}>
                  {bid.request.description}
                </Text>
              </View>

              <View style={[common.flexedRow, styles.gap4]}>
                <Location />

                <Text style={[styles.text14, layout.flex1]} numberOfLines={1}>
                  {bid.request.user.location}
                </Text>
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={[common.container, spacing.marginTop16, common.spacedRow]}
            onPress={() =>
              SheetManager.show('contact-information', {
                // @ts-expect-error
                payload: {business: bid.garageOwner},
              })
            }>
            <View>
              <Text style={styles.semiheader16}>
                {bid.garageOwner.businessName}
              </Text>

              <Text style={styles.text13}>Garage owner</Text>
            </View>

            <FontAwesome name="angle-right" size={24} color={palette.DEFAULT} />
          </TouchableOpacity>

          <View style={[spacing.marginTop16, common.container]}>
            {bid.prices.map((serviceBid, index, array) => (
              <View key={index}>
                <View style={[common.spacedRow, styles.gap]}>
                  <View style={layout.flex1}>
                    <Text style={styles.text16} numberOfLines={1}>
                      {
                        services?.find(
                          service => service._id === serviceBid.service,
                        )?.name
                      }
                    </Text>

                    <Text
                      style={[styles.text14, {color: palette.GRAY500}]}
                      numberOfLines={1}>
                      {
                        services?.find(
                          service => service._id === serviceBid.service,
                        )?.serviceType
                      }
                    </Text>
                  </View>

                  <Text style={styles.text16}>
                    {serviceBid.currency} {formatCurrency(serviceBid.amount, 2)}
                  </Text>
                </View>

                {serviceBid !== array[array.length - 1] && (
                  <View style={styles.line} />
                )}
              </View>
            ))}
          </View>

          <View style={[spacing.marginTop16, common.container]}>
            {additionalCosts.map((cost, _, array) => (
              <View key={cost.id}>
                <View style={common.spacedRow}>
                  <Text style={styles.text16}>{cost.name}</Text>

                  <Text style={styles.text16}>
                    {bid.prices[0].currency} {cost.amount}
                  </Text>
                </View>

                {cost.id !== array.length && <View style={styles.line} />}
              </View>
            ))}
          </View>

          <View style={[spacing.marginTop24, common.spacedRow]}>
            <Text style={styles.text16}>Total</Text>

            <Text style={styles.header22}>
              {bid.prices[0].currency}{' '}
              {formatCurrency(
                bid.prices.reduce(
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
          title="Accept bid"
          style={spacing.marginTop36}
          onPress={() =>
            SheetManager.show('handle-bid', {
              // @ts-expect-error
              payload: {bid: bid._id, type: 'accept'},
            })
          }
        />

        <TouchableOpacity
          style={spacing.marginTop20}
          onPress={() =>
            SheetManager.show('handle-bid', {
              // @ts-expect-error
              payload: {bid: bid._id, type: 'reject'},
            })
          }>
          <Text
            style={[
              styles.semiheader16,
              common.textCenter,
              {color: palette.PRIMARY},
            ]}>
            Reject bid
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BidDetails;
