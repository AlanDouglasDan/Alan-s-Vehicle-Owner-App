/* eslint-disable react-native/no-inline-styles */
import React, {FC} from 'react';
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
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {AppStackNavParams} from 'navigation/app-stack/AppStackNav';
import {useRequest} from 'store/request/hooks';
import {useVehicle} from 'store/vehicle/hooks';
import {Button} from 'components/Button';
import {StatusModal} from 'components/StatusModal';
import {images} from 'core/images';
import {common, layout, palette, spacing} from 'core/styles';
import styles from './ReviewRequest.styles';

const ReviewRequest: FC<
  NativeStackScreenProps<AppStackNavParams, 'Review Request'>
> = ({navigation, route}) => {
  const {
    insurance,
    car,
    description,
    tempVehicle,
    selectedCar,
    selectedServices,
    garages,
  } = route.params ?? {};

  const {createRequest, getRequests, loading, error, setError} = useRequest();
  const {services} = useVehicle();

  const carDetails = [
    {
      id: 1,
      property: 'Car',
      value: selectedCar,
    },
    {
      id: 2,
      property: 'Request description',
      value: description,
    },
    {
      id: 3,
      property: 'Insurance coverage',
      value: insurance,
    },
    {
      id: 4,
      property: 'Temporary vehicle required',
      value: tempVehicle,
    },
  ];

  const onSubmit = async () => {
    const res = await createRequest({
      vehicle: car,
      insurance,
      description,
      temporaryVehicle: tempVehicle,
      services: selectedServices,
      garages: garages.map(garage => garage._id),
    });

    if (res && !res.error) {
      await getRequests();

      navigation.navigate('Success', {
        title: 'Request Successfully Sent',
        body: "Your repair request has been successfully sent. You'll be notified of any updates from garage owners",
        nextScreen: 'Bottom Tabs',
      });
    }
  };

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
              <Text style={styles.semiheader28}>Review</Text>

              <Text style={[styles.text16, spacing.marginTop4]}>
                Check through for errors
              </Text>
            </View>

            {garages?.length === 1 && (
              <View
                style={[
                  spacing.marginTop16,
                  common.container,
                  common.spacedRow,
                ]}>
                <View style={[common.spacedRow, styles.gap8]}>
                  <Image
                    source={images.checkers}
                    resizeMode="cover"
                    style={styles.image}
                  />

                  <View>
                    <Text style={styles.semiheader16Default}>
                      {garages[0].businessName}
                    </Text>
                    <Text style={styles.text13}>{garages[0].addressLine1}</Text>
                  </View>
                </View>

                <View style={[common.flexedRow, styles.gap8]}>
                  <Ionicons name="star" size={24} color={palette.YELLOW} />

                  <Text style={styles.semiheader16}>
                    {garages[0].avgRating?.toFixed(1) || 0}
                  </Text>
                </View>
              </View>
            )}

            <View style={spacing.marginTop24}>
              <Text style={styles.semiheader20}>Car details</Text>

              <View style={[spacing.marginTop16, common.container]}>
                {carDetails.map((field, _, array) => (
                  <View key={field.id}>
                    <TouchableOpacity
                      style={[common.spacedRow, styles.gap]}
                      activeOpacity={1}
                      onPress={() =>
                        navigation.navigate('Create Request', {garages})
                      }>
                      <Text style={styles.text16}>{field.property}</Text>

                      <View
                        style={[common.flexedRow, styles.gap16, layout.flex1]}>
                        <Text
                          style={[
                            styles.text16,
                            layout.flex1,
                            {textAlign: 'right'},
                          ]}
                          numberOfLines={1}>
                          {field.value}
                        </Text>

                        <Octicons
                          name="pencil"
                          color={palette.DEFAULT}
                          size={18}
                        />
                      </View>
                    </TouchableOpacity>

                    {field.id !== array.length && <View style={styles.line} />}
                  </View>
                ))}
              </View>
            </View>

            <View style={spacing.marginTop32}>
              <Text style={styles.semiheader20}>Repair type</Text>

              <View style={[spacing.marginTop16, common.container]}>
                {selectedServices.map((field, index) => (
                  <View key={field}>
                    <TouchableOpacity
                      style={common.spacedRow}
                      activeOpacity={1}
                      onPress={() => navigation.goBack()}>
                      <Text
                        style={[styles.text16, layout.flex1]}
                        numberOfLines={1}>
                        {
                          services?.find(_service => _service._id === field)
                            ?.serviceType
                        }
                      </Text>

                      <View
                        style={[common.flexedRow, styles.gap, layout.flex1]}>
                        <Text
                          style={[
                            styles.text16,
                            layout.flex1,
                            {textAlign: 'right'},
                          ]}
                          numberOfLines={1}>
                          {
                            services?.find(_service => _service._id === field)
                              ?.name
                          }
                        </Text>

                        <Octicons
                          name="pencil"
                          color={palette.DEFAULT}
                          size={18}
                        />
                      </View>
                    </TouchableOpacity>

                    {index !== selectedServices.length - 1 && (
                      <View style={styles.line} />
                    )}
                  </View>
                ))}
              </View>
            </View>
          </View>

          <Button
            title={'Send request'}
            onPress={onSubmit}
            style={spacing.marginTop24}
            loading={loading}
            disabled={loading}
          />

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={spacing.marginTop20}>
            <Text style={styles.semiheader16}>Previous</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

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

export default ReviewRequest;
