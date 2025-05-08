import React, {FC, useEffect, useState, useMemo, useCallback} from 'react';
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
  TextInput,
  Keyboard,
  RefreshControl,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {BottomTabsNavParams} from 'navigation/bottom-tabs-nav/BottomTabsNav';
import {useRequest} from 'store/request/hooks';
import {useVehicle} from 'store/vehicle/hooks';
import {VehicleSelector} from 'components/VehicleSelector';
import {Empty} from 'components/Empty';
import {formatCurrency, formatDateTime} from 'core/utils';
import {images} from 'core/images';
import {layout, spacing, common, palette} from 'core/styles';
import styles from './History.styles';

interface RepairDetails {
  _id: string;
  garageOwner: {
    businessName: string;
    user: {
      firstName: string;
      lastName: string;
      profileImage?: string;
    };
  };
  totalAmount: number;
  createdAt: string;
  requestData: any;
  prices: any[];
}

const History: FC<NativeStackScreenProps<BottomTabsNavParams, 'History'>> = ({
  navigation,
}) => {
  const {loading, getRepairHistory} = useRequest();
  const {getVehicles, vehicles, loading: loading2} = useVehicle();

  const [history, setHistory] = useState<RepairDetails[]>([]);
  const [selectedCar, setSelectedCar] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);

  const [focused, setFocused] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    !vehicles && getVehicles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!selectedCar && vehicles) {
      setSelectedCar(vehicles[0]?._id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vehicles]);

  const fetchRepairHistory = () =>
    selectedCar &&
    getRepairHistory(selectedCar).then(res => setHistory(res.payload.data));

  useEffect(() => {
    fetchRepairHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCar]);

  const getSelectedCarObj = useMemo(() => {
    return vehicles?.find(vehicle => vehicle._id === selectedCar);
  }, [vehicles, selectedCar]);

  const filteredHistory = useMemo(() => {
    if (!search) {
      return history;
    }
    return history.filter(item =>
      item.garageOwner.businessName
        .toLowerCase()
        .includes(search.toLowerCase()),
    );
  }, [history, search]);

  const handleRepairPress = useCallback(
    (repairDetails: RepairDetails) => {
      /* @ts-expect-error Action will bubble up to the AppStackNav where "Receipt" screen is defined */
      navigation.navigate('Receipt', {repairDetails});
    },
    [navigation],
  );

  return (
    <SafeAreaView style={styles.mainContainer}>
      <KeyboardAvoidingView
        style={layout.flex1}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        behavior="padding">
        {loading || loading2 ? (
          <ActivityIndicator
            size={'large'}
            style={layout.flex1}
            color={palette.PRIMARY}
          />
        ) : (
          <ScrollView
            style={styles.innerContainer}
            contentContainerStyle={styles.contentContainer}
            keyboardShouldPersistTaps="always"
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={() => fetchRepairHistory()}
              />
            }>
            <View style={layout.flex1}>
              <View>
                <Text style={styles.semiheader28}>Repair History</Text>

                <Text style={[styles.text16, spacing.marginTop4]}>
                  View repair history of this vehicle below
                </Text>
              </View>

              <TouchableOpacity
                key={getSelectedCarObj?._id}
                onPress={() => setOpen(true)}
                style={[common.container, spacing.marginTop16]}>
                <View style={common.spacedRow}>
                  <View style={[common.flexedRow, layout.flex1, styles.gap]}>
                    <Image
                      source={
                        getSelectedCarObj?.vehicleImages[0]
                          ? {
                              uri: getSelectedCarObj?.vehicleImages[0],
                            }
                          : images.car
                      }
                      resizeMode="contain"
                      style={styles.carImage}
                    />

                    <View>
                      <Text style={styles.semiheader16}>
                        {getSelectedCarObj?.make} {getSelectedCarObj?.model}
                      </Text>

                      <Text style={[styles.text13, {color: palette.DEFAULT}]}>
                        {getSelectedCarObj?.plateNumber}
                      </Text>
                    </View>
                  </View>

                  <Feather name="chevron-down" size={24} color={'#101828'} />
                </View>
              </TouchableOpacity>

              {history?.length === 0 ? (
                <Empty
                  title="No repair yet"
                  body="You have no repairs to show"
                />
              ) : (
                <View>
                  <View
                    style={[
                      styles.searchContainer,
                      focused ? styles.inputFocus : {},
                    ]}>
                    <Ionicons name="search" size={22} color={palette.GRAY500} />

                    <TextInput
                      style={styles.input2}
                      placeholder="Search by repair service or provider"
                      placeholderTextColor={palette.SUPPORT}
                      onChangeText={setSearch}
                      value={search}
                      onFocus={() => setFocused(true)}
                      onBlur={() => !search && setFocused(false)}
                      returnKeyLabel="Done"
                      returnKeyType="done"
                      onSubmitEditing={Keyboard.dismiss}
                      accessibilityLabel="Search repairs input"
                    />
                  </View>

                  <View style={common.container}>
                    {filteredHistory?.map((repairDetails, index) => (
                      <TouchableOpacity
                        key={repairDetails._id || index}
                        onPress={() => handleRepairPress(repairDetails)}
                        accessibilityLabel={`View repair details for ${repairDetails.garageOwner.businessName}`}>
                        <View style={[common.spacedRow, styles.gap30]}>
                          <View
                            style={[
                              common.flexedRow,
                              layout.flex1,
                              styles.gap8,
                            ]}>
                            <View>
                              {repairDetails.garageOwner.user.profileImage ? (
                                <Image
                                  source={{
                                    uri: repairDetails.garageOwner.user
                                      .profileImage,
                                  }}
                                  style={styles.image}
                                  resizeMode="cover"
                                />
                              ) : (
                                <View style={styles.image}>
                                  <Text style={styles.semiheader22}>
                                    {repairDetails.garageOwner.user.firstName
                                      .charAt(0)
                                      .toUpperCase()}
                                    {repairDetails.garageOwner.user.lastName
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
                                {repairDetails.garageOwner.businessName}
                              </Text>

                              <Text style={styles.text13} numberOfLines={1}>
                                {repairDetails?.requestData.description}
                              </Text>
                            </View>
                          </View>

                          <View style={layout.flex1}>
                            <Text
                              style={[
                                styles.semiheader16,
                                {color: palette.TEXT_HEADING},
                                common.textRight,
                              ]}>
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

                            <Text style={[styles.text13, common.textRight]}>
                              {formatDateTime(repairDetails.createdAt)}
                            </Text>
                          </View>
                        </View>

                        {filteredHistory.length - 1 > index && (
                          <View style={common.line} />
                        )}
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}
            </View>
          </ScrollView>
        )}
      </KeyboardAvoidingView>

      <VehicleSelector
        open={open}
        setOpen={setOpen}
        vehicles={vehicles}
        selectedCar={selectedCar}
        setSelectedVehicle={setSelectedCar}
      />
    </SafeAreaView>
  );
};

export default History;
