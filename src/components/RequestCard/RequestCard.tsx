import React, {FC} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {BottomTabsNavParams} from 'navigation/bottom-tabs-nav/BottomTabsNav';
import {AppStackNavParams} from 'navigation/app-stack/AppStackNav';
import Car from 'components/svg/Car';
import Calendar from 'components/svg/Calendar';
import Gear from 'components/svg/Gear';
import Location from 'components/svg/Location';
import {formatDate, formatCurrency} from 'core/utils';
import {common, palette, spacing} from 'core/styles';
import styles from './RequestCard.styles';

interface RequestCardProps {
  request: any;
  navigation:
    | NativeStackNavigationProp<BottomTabsNavParams, 'Requests', undefined>
    | NativeStackNavigationProp<AppStackNavParams, 'Repair History', undefined>;
  status: string;
  bid?: any;
}

const RequestCard: FC<RequestCardProps> = ({
  request,
  navigation,
  status,
  bid,
}) => {
  let bg, color, name;

  if (status === 'Pending') {
    bg = palette.NEUTRAL10;
    color = palette.DEFAULT;
    name = request.vehicle.make;
  } else if (status === 'Submitted') {
    bg = palette.LIGHT_BLUE;
    color = palette.BLUE;
    name = bid.garageOwner.businessName;
  } else if (status === 'Rejected') {
    bg = '#fae5e3';
    color = palette.DANGER;
    name = bid.garageOwner.businessName;
  } else if (status === 'Accepted') {
    bg = palette.SUCCESS_LIGHTEST;
    color = palette.SUCCESS;
    name =
      bid?.garageOwner.businessName ||
      request.user.firstName + ' ' + request.user.lastName;
  } else if (status === 'Booked') {
    bg = '#FFFAEB';
    color = '#B54708';
    name =
      bid?.garageOwner.businessName ||
      request.user.firstName + ' ' + request.user.lastName;
  } else if (status === 'Completed') {
    bg = palette.LIGHT_GREEN;
    color = palette.GREEN;
    name =
      bid?.garageOwner.businessName ||
      request.user.firstName + ' ' + request.user.lastName;
  }

  return (
    <TouchableOpacity
      style={[common.container, spacing.marginTop16]}
      key={request._id}
      onPress={() =>
        status === 'Pending'
          ? // @ts-expect-error
            navigation.navigate('Request Details', {request, status})
          : status === 'Submitted'
          ? // @ts-expect-error
            navigation.navigate('Bid Details', {bid})
          : status === 'Accepted' && bid
          ? // @ts-expect-error
            navigation.navigate('Make Appointment', {bid})
          : status === 'Completed' && bid // @ts-expect-error
          ? navigation.navigate('Request Details', {request, status, bid})
          : {}
      }>
      <View
        style={[common.spacedRow, common.alignStart, spacing.marginBottom4]}>
        {request.user.profileImage ? (
          <Image
            source={{uri: request.user.profileImage}}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.image}>
            <Text style={styles.semiheader22}>
              {request.user.firstName.charAt(0).toUpperCase()}
              {request.user.lastName.charAt(0).toUpperCase()}
            </Text>
          </View>
        )}

        <View
          style={[
            styles.statusContainer,
            {
              backgroundColor: bg,
            },
          ]}>
          <Text style={[styles.text12, {color}]}>{status}</Text>
        </View>
      </View>

      <View style={common.spacedRow}>
        <Text style={[styles.semiheader16]}>{name}</Text>

        {bid && (
          <Text style={styles.semiheader16}>
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
        )}
      </View>

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

          <Text style={styles.text14}>{formatDate(request.createdAt)}</Text>
        </View>

        <View style={[common.flexedRow, styles.gap4]}>
          <Gear />

          <Text style={styles.text14} numberOfLines={1}>
            {request.description}
          </Text>
        </View>

        <View style={[common.flexedRow, styles.gap4]}>
          <Location />

          <Text style={styles.text14}>{request.user.location}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RequestCard;
