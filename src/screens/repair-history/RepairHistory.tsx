import React, {FC, useEffect, useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  SafeAreaView,
  Platform,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {AppStackNavParams} from 'navigation/app-stack/AppStackNav';
import {useRequest} from 'store/request/hooks';
import {Empty} from 'components/Empty';
import {ArrowBack} from 'components/ArrowBack';
import Car from 'components/svg/Car';
import Gear from 'components/svg/Gear';
import Calendar from 'components/svg/Calendar';
import {formatCurrency, formatDate} from 'core/utils';
import {images} from 'core/images';
import {layout, spacing, common, palette} from 'core/styles';
import styles from './RepairHistory.styles';

const RepairHistory: FC<
  NativeStackScreenProps<AppStackNavParams, 'Repair History'>
> = ({navigation, route}) => {
  const {vehicle, normalFlow = false} = route.params ?? {};

  const {loading, getRepairHistory} = useRequest();

  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    getRepairHistory(vehicle._id).then(res => setHistory(res.payload.data));
  }, [getRepairHistory, vehicle]);

  useEffect(() => {
    if (!normalFlow) {
      navigation.setOptions({
        // eslint-disable-next-line react/no-unstable-nested-components
        headerLeft: () => (
          <ArrowBack onPress={() => navigation.navigate('Bottom Tabs')} />
        ),
      });
    }
  }, [navigation, normalFlow, vehicle]);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <KeyboardAvoidingView
        style={layout.flex1}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        behavior="padding">
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
            keyboardShouldPersistTaps="always">
            <View style={layout.flex1}>
              <View>
                <Text style={styles.semiheader28}>Repair History</Text>

                <Text style={[styles.text16, spacing.marginTop4]}>
                  View repair history of this vehicle belowe
                </Text>
              </View>

              <View
                style={[
                  common.container,
                  spacing.marginTop20,
                  spacing.marginBottom4,
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

              {history?.length === 0 ? (
                <Empty
                  title="Empty"
                  body="No Repair History added for this vehicle yet"
                />
              ) : (
                history?.map((repairDetails, index) => (
                  <TouchableOpacity
                    style={[common.container, spacing.marginTop16]}
                    key={index}
                    onPress={() =>
                      navigation.navigate('Repair Details', {repairDetails})
                    }>
                    <View style={[common.spacedRow, common.alignStart]}>
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

                        <Text style={styles.text13}>
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

                      <View style={styles.statusContainer}>
                        <Text style={styles.text12}>Complete</Text>
                      </View>
                    </View>

                    <View style={common.line} />

                    <View style={styles.gap8}>
                      <View style={[common.flexedRow, styles.gap]}>
                        <Car />

                        <Text style={styles.text14}>
                          {repairDetails?.requestData.vehicle.make}{' '}
                          {repairDetails?.requestData.vehicle.model}
                        </Text>
                      </View>

                      <View style={[common.flexedRow, styles.gap]}>
                        <Calendar />

                        <Text style={styles.text14} numberOfLines={1}>
                          {formatDate(repairDetails?.createdAt)}
                        </Text>
                      </View>

                      <View style={[common.flexedRow, styles.gap]}>
                        <Gear />

                        <Text style={styles.text14} numberOfLines={1}>
                          {repairDetails?.requestData.description}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))
              )}
            </View>
          </ScrollView>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RepairHistory;
