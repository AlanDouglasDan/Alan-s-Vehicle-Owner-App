import React, {FC, useRef} from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
  Text,
  ScrollView,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {captureRef} from 'react-native-view-shot';
import Share from 'react-native-share';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {AppStackNavParams} from 'navigation/app-stack/AppStackNav';
import {formatDateTime, formatDate, formatCurrency} from 'core/utils';
import {images} from 'core/images';
import {palette, common, spacing, layout} from 'core/styles';
import styles from './Receipt.styles';

const Receipt: FC<NativeStackScreenProps<AppStackNavParams, 'Receipt'>> = ({
  navigation,
  route,
}) => {
  const {repairDetails} = route.params ?? {};

  const viewRef = useRef<any>();

  const captureAndSave = async () => {
    try {
      // Capture the view as an image
      const uri = await captureRef(viewRef, {
        format: 'png',
        quality: 1,
      });

      // Share the image
      await Share.open({
        url: uri,
        type: 'image/png',
      });
    } catch (error) {
      console.error('Error capturing or sharing view:', error);
    }
  };

  const receiptDetails = [
    {
      id: 1,
      key: 'Customer Name',
      value: [
        `${repairDetails.carOwner.firstName} ${repairDetails.carOwner.lastName}`,
      ],
    },
    {
      id: 2,
      key: 'Vehicle',
      value: [
        `${repairDetails.requestData.vehicle?.make}`,
        `${repairDetails.requestData.vehicle?.model}`,
      ],
    },
    {
      id: 3,
      key: 'VIN',
      value: [`${repairDetails.requestData.vehicle?.vin}`],
    },
    {
      id: 4,
      key: 'Service Date',
      value: [`${formatDate(repairDetails.createdAt)}`],
    },
    {
      id: 5,
      key: 'Description of Work',
      value: [`${repairDetails.requestData.description}`],
    },
    {
      id: 6,
      key: 'Subtotal',
      value: [
        `${repairDetails.prices[0].currency} ${formatCurrency(
          repairDetails.prices.reduce(
            (accumulator, value) => accumulator + value.amount,
            0,
          ),
          2,
        )}`,
      ],
    },
    {
      id: 7,
      key: 'Tax',
      value: [`${repairDetails.prices[0].currency} 0`],
    },
    {
      id: 8,
      key: 'Total Amount Due',
      value: [
        `${repairDetails.prices[0].currency} ${formatCurrency(
          repairDetails.prices.reduce(
            (accumulator, value) => accumulator + value.amount,
            0,
          ),
          2,
        )}`,
      ],
    },
    {
      id: 9,
      key: 'Amount Paid',
      value: [
        `${repairDetails.prices[0].currency} ${formatCurrency(
          repairDetails.prices.reduce(
            (accumulator, value) => accumulator + value.amount,
            0,
          ),
          2,
        )}`,
      ],
    },
    {
      id: 10,
      key: 'Payment Method',
      value: ['Credit Card (Visa)'],
    },
  ];

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView style={styles.innerContainer}>
        <View style={styles.upperBanner}>
          <TouchableOpacity
            style={[styles.closeIcon]}
            onPress={() => navigation.goBack()}>
            <Feather name="x" size={24} color={palette.WHITE} />
          </TouchableOpacity>

          <View
            style={[spacing.marginTop20, styles.innerReceipt, common.shadow]}
            ref={viewRef}>
            <View style={common.spacedRow}>
              <View style={[common.flexedRow, layout.flex1, styles.gap8]}>
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
                </View>

                <View>
                  <Text
                    style={[
                      styles.semiheader16,
                      {color: palette.TEXT_HEADING},
                    ]}>
                    {repairDetails?.garageOwner.businessName}
                  </Text>

                  <Text style={styles.text13} numberOfLines={1}>
                    {repairDetails?.requestData.description}
                  </Text>
                </View>
              </View>

              <Image
                source={images.logo}
                resizeMode="contain"
                style={styles.logo}
              />
            </View>

            <View style={spacing.marginTop16}>
              <Text style={styles.semiheader14}>Repair Receipt</Text>

              <Text style={styles.text10}>
                Generated from Aucararga on {formatDateTime(new Date(), false)}
              </Text>
            </View>

            <View style={spacing.marginTop16}>
              {receiptDetails.map(detail => (
                <View key={detail.id}>
                  <View style={common.spacedRow}>
                    <Text
                      style={[styles.text10, {color: palette.TEXT_HEADING}]}>
                      {detail.key}
                    </Text>

                    <View>
                      {detail.value.map((val, index) => (
                        <Text
                          key={index}
                          style={[styles.text10, common.textRight]}>
                          {val}
                        </Text>
                      ))}
                    </View>
                  </View>

                  <View style={common.line} />
                </View>
              ))}
            </View>
          </View>

          <View style={[common.flexedRow, styles.gap, spacing.marginTop24]}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.semiheader14}>PDF Receipt</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={captureAndSave}>
              <Text style={styles.semiheader14}>Image Receipt</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Receipt;
