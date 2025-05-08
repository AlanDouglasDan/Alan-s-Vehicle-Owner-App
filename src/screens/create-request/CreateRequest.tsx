import React, {FC, useState, useEffect} from 'react';
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
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {CheckBox} from '@rneui/themed';
import {Formik} from 'formik';
import * as yup from 'yup';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {AppStackNavParams} from 'navigation/app-stack/AppStackNav';
import {useVehicle} from 'store/vehicle/hooks';
import {Input} from 'components/Input';
import {SelectInput} from 'components/SelectInput';
import {Button} from 'components/Button';
import {VehicleSelector} from 'components/VehicleSelector';
import {images} from 'core/images';
import {common, layout, palette, spacing} from 'core/styles';
import styles from './CreateRequest.styles';

interface FormValues {
  insurance: string;
  car: string;
  description: string;
}

const initialValues: FormValues = {
  insurance: '',
  car: '',
  description: '',
};

const validationSchema = yup.object({
  insurance: yup.string().required(),
  car: yup.string().required(),
  description: yup.string().required().max(200),
});

const CreateRequest: FC<
  NativeStackScreenProps<AppStackNavParams, 'Create Request'>
> = ({navigation, route}) => {
  const {garages} = route.params ?? {};

  const {vehicles, getVehicles} = useVehicle();

  useEffect(() => {
    !vehicles && getVehicles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [tempVehicle, setTempVehicle] = useState<string>('');
  const [selectedCar, setSelectedCar] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);

  const onSubmit = async (values: FormValues) => {
    navigation.navigate('Create Request 2', {
      ...values,
      tempVehicle,
      selectedCar,
      garages,
    });
  };

  const options = [
    {
      id: 1,
      name: 'Yes',
    },
    {
      id: 2,
      name: 'No',
    },
  ];

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
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}>
            {({
              values,
              touched,
              errors,
              setFieldValue,
              handleSubmit,
              setFieldTouched,
            }) => {
              // //   eslint-disable-next-line react-hooks/rules-of-hooks
              //   useEffect(() => {
              //     if (business) {
              //       setFieldValue(
              //         'businessRegistrationNo',
              //         business?.businessRegistrationNo,
              //       );
              //       setSelectedBrands(business?.brandSpecialization);
              //       setFieldValue('employeeCount', business?.employeeCount);
              //       setFieldValue('description', business?.description);
              //     }
              //   }, [setFieldValue]);

              return (
                <>
                  <View style={layout.flex1}>
                    <View>
                      <Text style={styles.semiheader28}>
                        Create new request
                      </Text>

                      <Text style={[styles.text16, spacing.marginTop4]}>
                        Fill out the correct details for your repair
                      </Text>

                      <View style={styles.progressBar}>
                        <View style={styles.progressValue} />
                      </View>

                      <Text style={styles.text14}>Car details: 1/2</Text>
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
                            <Text style={styles.semiheader16}>
                              {garages[0].businessName}
                            </Text>
                            <Text style={styles.text13}>
                              {garages[0].addressLine1}
                            </Text>
                          </View>
                        </View>

                        <View style={[common.flexedRow, styles.gap8]}>
                          <Ionicons
                            name="star"
                            size={24}
                            color={palette.YELLOW}
                          />

                          <Text style={styles.semiheader16}>
                            {garages[0].avgRating?.toFixed(1) || 0}
                          </Text>
                        </View>
                      </View>
                    )}

                    <View style={spacing.marginTop24}>
                      <Text style={styles.label}>Car</Text>

                      <TouchableOpacity
                        style={styles.input}
                        onPress={() => setOpen(true)}>
                        <Text style={styles.inputText}>
                          {selectedCar || 'Select a car'}
                        </Text>

                        <Entypo
                          name="chevron-down"
                          size={20}
                          color={palette.PRIMARY}
                        />
                      </TouchableOpacity>
                    </View>

                    <View style={spacing.marginTop24}>
                      <Input
                        label="Describe your request"
                        placeholder="Enter details"
                        value={values.description}
                        onChangeText={text =>
                          setFieldValue('description', text)
                        }
                        containerStyle={spacing.marginBottom4}
                        textBoxStyle={{height: 120, textAlignVertical: 'top'}}
                        error={
                          touched.description && errors.description
                            ? errors.description
                            : undefined
                        }
                        onBlur={() => setFieldTouched('description')}
                        rows={5}
                      />

                      <Text style={styles.text11}>
                        {values.description.length}/200
                      </Text>
                    </View>

                    <View style={spacing.marginTop24}>
                      <SelectInput
                        label="Do you have insurance"
                        placeholder="Select option"
                        value={values.insurance}
                        onSelect={brandSpecialization => {
                          setFieldValue('insurance', brandSpecialization.name);
                        }}
                        containerStyle={spacing.marginBottom4}
                        onBlur={() => setFieldTouched('insurance')}
                        selectorHeight={hp(30)}
                        options={[
                          {
                            label: 'Yes',
                            value: {name: 'Yes', id: 'Yes'},
                          },
                          {
                            label: 'No',
                            value: {name: 'No', id: 'No'},
                          },
                        ]}
                      />

                      <Text style={styles.text16}>
                        Only if this is a repair from an accident
                      </Text>
                    </View>

                    <View style={spacing.marginTop24}>
                      <Text style={styles.text16}>
                        Would you require a temporary vehicle during the period
                        of repairs
                      </Text>

                      <View style={styles.marginalize}>
                        {options.map(option => (
                          <CheckBox
                            key={option.id}
                            title={option.name}
                            checked={tempVehicle === option.name}
                            onPress={() => {
                              setTempVehicle(option.name);
                            }}
                            containerStyle={styles.optionContainer}
                            textStyle={[styles.text16, styles.optionLabel]}
                            uncheckedIcon={
                              <Ionicons
                                name="radio-button-off"
                                size={24}
                                color={palette.NEUTRAL30}
                              />
                            }
                            checkedIcon={
                              <Ionicons
                                name="checkmark-circle-sharp"
                                size={24}
                                color={palette.SUCCESS}
                              />
                            }
                          />
                        ))}
                      </View>
                    </View>
                  </View>

                  <Button
                    title={'Continue'}
                    onPress={() => handleSubmit()}
                    style={spacing.marginTop24}
                    // loading={loading}
                    // disabled={values.insurance === '' ? true : loading}
                  />

                  <VehicleSelector
                    open={open}
                    setOpen={setOpen}
                    vehicles={vehicles}
                    selectedCar={values.car}
                    setFieldValue={setFieldValue}
                    setSelectedCar={setSelectedCar}
                  />
                </>
              );
            }}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CreateRequest;
