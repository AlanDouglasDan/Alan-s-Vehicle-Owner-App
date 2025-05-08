import React, {FC, useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  SafeAreaView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {CheckBox} from '@rneui/themed';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker, {
  DateTimePickerAndroid,
} from '@react-native-community/datetimepicker';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {AppStackNavParams} from 'navigation/app-stack/AppStackNav';
import {useRequest} from 'store/request/hooks';
import {Button} from 'components/Button';
import {StatusModal} from 'components/StatusModal';
import {BottomSheet} from 'components/BottomSheet';
import {formatDate} from 'core/utils';
import {layout, spacing, common, palette} from 'core/styles';
import styles from './MakeAppointment.styles';

const times = [
  {id: 1, value: '08:00'},
  {id: 2, value: '10:00'},
  {id: 3, value: '12:00'},
  {id: 4, value: '14:00'},
  {id: 5, value: '16:00'},
  {id: 6, value: '18:00'},
];

const MakeAppointment: FC<
  NativeStackScreenProps<AppStackNavParams, 'Make Appointment'>
> = ({navigation, route}) => {
  const {bid, additionalRepair = false} = route.params ?? {};

  const {
    scheduleAppointment,
    scheduleAdditionalRepairAppointment,
    getBids,
    getRequests,
    loading,
    error,
    setError,
  } = useRequest();

  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState<string>('');
  const [show, setShow] = useState<boolean>(false);

  const onChangeDate = (_, selectedDate: any) => setDate(selectedDate);

  const showDatepicker = () => {
    DateTimePickerAndroid.open({
      value: date,
      onChange: onChangeDate,
      mode: 'date',
    });
  };

  const handleSubmit = async () => {
    if (additionalRepair) {
      const res = await scheduleAdditionalRepairAppointment({
        id: bid._id,
        date: date.toLocaleDateString(),
        time,
      });

      if (res && !res.error) {
        navigation.navigate('Success', {
          title: 'Additional Repair Appointment Booked',
          body: `Your additional repair appointment with ${
            bid.garageOwner.businessName
          } is confirmed for ${formatDate(String(date))}`,
          nextScreen: 'Bottom Tabs',
        });
      }
    } else {
      const res = await scheduleAppointment({
        id: bid._id,
        date: date.toLocaleDateString(),
        time,
      });

      if (res && !res.error) {
        await getBids();
        await getRequests();

        navigation.navigate('Success', {
          title: 'Repair Appointment Booked',
          body: `Your repair appointment with ${
            bid.garageOwner.businessName
          } is confirmed for ${formatDate(String(date))}`,
          nextScreen: 'Bottom Tabs',
        });
      }
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <KeyboardAvoidingView
        style={layout.flex1}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        behavior="padding">
        <ScrollView
          style={styles.innerContainer}
          contentContainerStyle={styles.contentContainer}
          keyboardShouldPersistTaps="always">
          <View style={layout.flex1}>
            <Text style={styles.semiheader28}>Make an appointment</Text>

            <Text style={styles.text16}>
              Choose a convenient date from the available options to book your
              repair
            </Text>

            <View style={common.line} />

            <View style={spacing.marginTop4}>
              <Text style={styles.semiheader17}>Select day</Text>

              <View style={[styles.gap, common.flexedRow, spacing.marginTop8]}>
                <TouchableOpacity style={[common.container, styles.p14]}>
                  <AntDesign
                    name="calendar"
                    size={20}
                    color={palette.TEXT_HEADING}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    common.container,
                    layout.flex1,
                    common.flexedRow,
                    common.justifyEnd,
                    styles.p14,
                    styles.gap,
                  ]}
                  onPress={() =>
                    Platform.OS === 'ios' ? setShow(true) : showDatepicker()
                  }>
                  <Text style={styles.text17}>{formatDate(String(date))}</Text>

                  <Ionicons
                    name="caret-down-sharp"
                    size={16}
                    color={palette.DEFAULT}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={spacing.marginTop24}>
              <Text style={styles.semiheader17}>Select time</Text>

              <View
                style={[
                  common.container,
                  spacing.marginTop4,
                  styles.marginalize,
                ]}>
                {times.map((_time, _, array) => (
                  <View key={_time.id}>
                    <View style={[common.spacedRow]}>
                      <CheckBox
                        title={_time.value}
                        checked={_time.value === time}
                        onPress={() => setTime(_time.value)}
                        containerStyle={styles.optionContainer}
                        textStyle={[styles.text16, styles.optionLabel]}
                        uncheckedIcon={
                          <Ionicons
                            name="square-outline"
                            size={24}
                            color={palette.PRIMARY}
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

                    {_time.id !== array[array.length - 1].id && (
                      <View style={common.line} />
                    )}
                  </View>
                ))}
              </View>
            </View>
          </View>

          <Button
            title="Confirm"
            onPress={handleSubmit}
            disabled={!time ? true : loading}
            loading={loading}
          />
        </ScrollView>

        <BottomSheet open={show} onClose={() => setShow(false)} height={hp(40)}>
          <View style={styles.content}>
            <View style={spacing.marginBottom20}>
              <Text style={styles.semiheader17}>Select Appointment Date</Text>
            </View>

            {show && (
              <DateTimePicker
                value={date}
                mode="date"
                onChange={onChangeDate}
                display="spinner"
                textColor={palette.DEFAULT}
                accentColor={palette.PRIMARY}
                themeVariant="dark"
              />
            )}
          </View>
        </BottomSheet>
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

export default MakeAppointment;
