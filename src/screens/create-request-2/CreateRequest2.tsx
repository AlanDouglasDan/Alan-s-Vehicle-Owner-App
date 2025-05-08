import React, {FC, useState, useEffect} from 'react';
import {
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import {CheckBox} from '@rneui/themed';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {AppStackNavParams} from 'navigation/app-stack/AppStackNav';
import {useVehicle} from 'store/vehicle/hooks';
import {Button} from 'components/Button';
import {images} from 'core/images';
import {common, layout, palette, spacing} from 'core/styles';
import styles from './CreateRequest2.styles';

const CreateRequest2: FC<
  NativeStackScreenProps<AppStackNavParams, 'Create Request 2'>
> = ({navigation, route}) => {
  const {garages} = route.params ?? {};

  const {getServices, services, loading} = useVehicle();

  useEffect(() => {
    !services && getServices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [expanded, setExpanded] = useState<string[]>([]);

  const groupServicesByServiceType = (_data: any): any => {
    const groupedMessages = {};
    _data?.forEach(data => {
      const dateString = data.serviceType;
      if (!groupedMessages[dateString]) {
        groupedMessages[dateString] = [];
      }

      groupedMessages[dateString].push({id: data._id, ...data});
    });

    return Object.entries(groupedMessages);
  };

  const selectService = value => {
    if (selectedServices.includes(value)) {
      const newArr = selectedServices.filter(item => item !== value);

      setSelectedServices(newArr);
    } else {
      setSelectedServices([...selectedServices, value]);
    }
  };

  const selectExpanded = value => {
    if (expanded.includes(value)) {
      const newArr = expanded.filter(item => item !== value);

      setExpanded(newArr);
    } else {
      setExpanded([...expanded, value]);
    }
  };

  const onSubmit = async () => {
    navigation.navigate('Review Request', {
      ...route.params,
      selectedServices,
    });
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
              <Text style={styles.semiheader28}>Create new request</Text>

              <Text style={[styles.text16, spacing.marginTop4]}>
                Fill out the correct details for your repair
              </Text>

              <View style={styles.progressBar}>
                <View style={styles.progressValue} />
              </View>

              <Text style={styles.text14}>Repair type: 2/2</Text>
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

            {loading ? (
              <ActivityIndicator
                size={'large'}
                color={palette.PRIMARY}
                style={layout.flex1}
              />
            ) : (
              <View style={spacing.marginTop36}>
                {groupServicesByServiceType(services)?.map(
                  ([serviceType, _services], _index) => (
                    <View
                      style={[spacing.marginBottom16, common.container]}
                      key={_index}>
                      <TouchableOpacity
                        style={common.spacedRow}
                        activeOpacity={1}
                        onPress={() => selectExpanded(serviceType)}>
                        <Text style={styles.semiheader17}>{serviceType}</Text>

                        <AntDesign
                          name={
                            expanded.includes(serviceType)
                              ? 'minussquareo'
                              : 'plussquareo'
                          }
                          size={22}
                          color={palette.TEXT_HEADING}
                        />
                      </TouchableOpacity>

                      {expanded.includes(serviceType) && (
                        <View>
                          <View style={styles.line} />

                          <View style={styles.marginalize}>
                            {_services.map(service => (
                              <View
                                style={[common.spacedRow]}
                                key={service._id}>
                                <CheckBox
                                  key={service._id}
                                  title={service.name}
                                  checked={selectedServices.includes(
                                    service._id,
                                  )}
                                  onPress={() => {
                                    selectService(service._id);
                                  }}
                                  containerStyle={styles.optionContainer}
                                  textStyle={[
                                    styles.text16,
                                    styles.optionLabel,
                                  ]}
                                  uncheckedIcon={
                                    <Ionicons
                                      name="square-outline"
                                      size={24}
                                      color={palette.NEUTRAL30}
                                    />
                                  }
                                  checkedIcon={
                                    <Ionicons
                                      name="checkbox-sharp"
                                      size={24}
                                      color={palette.PRIMARY}
                                    />
                                  }
                                />
                              </View>
                            ))}
                          </View>
                        </View>
                      )}
                    </View>
                  ),
                )}
              </View>
            )}
          </View>

          <Button
            title={'Review'}
            onPress={onSubmit}
            style={spacing.marginTop24}
            disabled={selectedServices?.length === 0}
          />

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={spacing.marginTop20}>
            <Text style={styles.semiheader16}>Previous</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CreateRequest2;
