import React, {FC, useState, useEffect} from 'react';
import {
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  SafeAreaView,
  Platform,
  Image,
  TouchableOpacity,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {SheetManager} from 'react-native-actions-sheet';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {AppStackNavParams} from 'navigation/app-stack/AppStackNav';
import {useVehicle} from 'store/vehicle/hooks';
import {AccordionList} from 'components/AccordionList';
import Car from 'components/svg/Car';
import Gear from 'components/svg/Gear';
import Calendar from 'components/svg/Calendar';
import {formatDate, formatCurrency} from 'core/utils';
import {layout, spacing, common, palette} from 'core/styles';
import styles from './RepairDetails.styles';

const RepairDetails: FC<
  NativeStackScreenProps<AppStackNavParams, 'Repair Details'>
> = ({route}) => {
  const {repairDetails} = route.params ?? {};

  const {getServices, services} = useVehicle();

  useEffect(() => {
    !services && getServices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [active, setActive] = useState<number>(1);

  const tabs = [
    {id: 1, name: 'Details'},
    {id: 2, name: 'Cost'},
  ];

  const serviceDetails = [
    {
      id: 1,
      title: 'Date of service',
      body: formatDate(repairDetails?.createdAt),
    },
    {
      id: 2,
      title: 'Service type',
      body: repairDetails?.requestData.services
        .map(
          service =>
            services?.find(mainService => mainService?._id === service)?.name,
        )
        .join(', '),
    },
    {
      id: 3,
      title: 'Additional repairs',
      body:
        repairDetails?.additionalRepair?.prices
          .map(
            price =>
              services?.find(service => service?._id === price.service)?.name,
          )
          .join(', ') || 'N/A',
    },
    {
      id: 4,
      title: 'Repair request ID',
      body: repairDetails?._id,
    },
    {
      id: 5,
      title: 'Notes',
      body: '-',
    },
  ];

  const additionalCosts = [
    {
      id: 1,
      name: 'VAT',
      amount: '0.00',
    },
  ];

  console.log(repairDetails.requestData.vehicle);

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
              <Text style={styles.semiheader28}>Repair Details</Text>

              <Text
                style={[
                  styles.text16,
                  spacing.marginTop4,
                  {color: palette.SUPPORT},
                ]}>
                View details of this repair service below
              </Text>
            </View>

            <View style={[spacing.marginTop24, styles.flexedRow]}>
              {tabs.map(tab => (
                <TouchableOpacity
                  key={tab.id}
                  style={[styles.tab, active === tab.id ? styles.active : {}]}
                  onPress={() => setActive(tab.id)}>
                  <Text style={styles.text13}>{tab.name}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {active === 1 ? (
              <View>
                <View style={spacing.marginTop24}>
                  <Text style={styles.text16}>Service Provider</Text>

                  <View style={[common.container, spacing.marginTop8]}>
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
                  </View>
                </View>

                <View style={spacing.marginTop24}>
                  <Text style={styles.text16}>Vehicle</Text>

                  <TouchableOpacity
                    style={[common.container, spacing.marginTop12]}
                    onPress={() =>
                      SheetManager.show('car-details', {
                        // @ts-expect-error
                        payload: {vehicle: repairDetails.requestData.vehicle},
                      })
                    }>
                    <View style={common.spacedRow}>
                      <View style={[common.spacedRow, styles.gap16]}>
                        <View style={styles.circle}>
                          <Car size="20" />
                        </View>

                        <Text style={styles.semiheader16}>
                          {repairDetails.requestData.vehicle.make}{' '}
                          {repairDetails.requestData.vehicle.model}
                        </Text>
                      </View>

                      <Feather
                        name="chevron-right"
                        size={20}
                        color={palette.DEFAULT}
                      />
                    </View>
                  </TouchableOpacity>
                </View>

                <View style={spacing.marginTop24}>
                  <Text style={styles.text16}>Service Details</Text>

                  <View style={[common.container, spacing.marginTop12]}>
                    {serviceDetails.map((item, index) => (
                      <View key={item.id}>
                        <AccordionList title={item.title} body={item.body} />

                        {index < serviceDetails.length - 1 && (
                          <View style={common.line} />
                        )}
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            ) : (
              <View>
                <View style={spacing.marginTop24}>
                  <Text style={styles.text16}>Repairs</Text>

                  <View style={[common.container, spacing.marginTop8]}>
                    {repairDetails.prices.map((price, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() =>
                          SheetManager.show('service-details', {
                            // @ts-expect-error
                            payload: {
                              title: services?.find(
                                mainService =>
                                  mainService?._id === price.service,
                              )?.name,
                              body: services?.find(
                                mainService =>
                                  mainService?._id === price.service,
                              )?.serviceType,
                            },
                          })
                        }>
                        <View style={[common.spacedRow, styles.gap]}>
                          <View style={layout.flex1}>
                            <Text style={styles.text16}>
                              {
                                services?.find(
                                  mainService =>
                                    mainService?._id === price.service,
                                )?.name
                              }
                            </Text>
                            <Text style={styles.text13}>
                              {
                                services?.find(
                                  mainService =>
                                    mainService?._id === price.service,
                                )?.serviceType
                              }
                            </Text>
                          </View>

                          <Text style={styles.text16}>
                            {price.currency} {formatCurrency(price.amount)}
                          </Text>
                        </View>

                        {index < repairDetails.prices.length - 1 && (
                          <View style={common.line} />
                        )}
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                {repairDetails.additionalRepair && (
                  <View style={spacing.marginTop24}>
                    <Text style={styles.text16}>Additional Repairs</Text>

                    <View style={[common.container, spacing.marginTop8]}>
                      {repairDetails.additionalRepair?.prices.map(
                        (price, index) => (
                          <TouchableOpacity
                            key={index}
                            onPress={() =>
                              SheetManager.show('service-details', {
                                // @ts-expect-error
                                payload: {
                                  title: services?.find(
                                    mainService =>
                                      mainService?._id === price.service,
                                  )?.name,
                                  body: price.description,
                                },
                              })
                            }>
                            <View style={[common.spacedRow, styles.gap]}>
                              <View style={layout.flex1}>
                                <Text style={styles.text16}>
                                  {
                                    services?.find(
                                      mainService =>
                                        mainService?._id === price.service,
                                    )?.name
                                  }
                                </Text>

                                <Text style={styles.text13} numberOfLines={1}>
                                  {price.description}
                                </Text>
                              </View>

                              <Text style={styles.text16}>
                                {price.currency} {formatCurrency(price.amount)}
                              </Text>
                            </View>

                            {index <
                              repairDetails?.additionalRepair.prices.length -
                                1 && <View style={common.line} />}
                          </TouchableOpacity>
                        ),
                      )}
                    </View>
                  </View>
                )}

                <View
                  style={[
                    spacing.marginTop24,
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

                      {cost.id !== array.length && <View style={common.line} />}
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
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RepairDetails;
