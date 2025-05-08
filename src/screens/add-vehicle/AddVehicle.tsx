import React, {FC, useEffect, useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {AppStackNavParams} from 'navigation/app-stack/AppStackNav';
import {vinLookup} from 'http/vehicle';
import {useUser} from 'store/user/hooks';
import {useVehicle} from 'store/vehicle/hooks';
import {common, layout, palette, spacing} from 'core/styles';
import {Input} from 'components/Input';
import {SelectInput} from 'components/SelectInput';
import {Button} from 'components/Button';
import {StatusModal} from 'components/StatusModal';
import styles from './AddVehicle.styles';

interface FormValues {
  vehicleType: string;
  vin: string;
  make: string;
  model: string;
  year: string;
  color: string;
  plateNumber: string;
  engineType: string;
  transmissionType: string;
  fuelType: string;
}

const initialValues: FormValues = {
  vehicleType: '',
  vin: '',
  make: '',
  model: '',
  year: '',
  color: '',
  plateNumber: '',
  engineType: '',
  transmissionType: '',
  fuelType: '',
};

const validationSchema = yup.object({
  vehicleType: yup.string().required(),
  vin: yup
    .string()
    .required()
    .length(17, 'VIN must be exactly 17 characters')
    .test('vin-validation', 'Invalid VIN number', () => true), // We'll update this dynamically
  make: yup.string().required(),
  model: yup.string().required(),
  year: yup.string(),
  color: yup.string().required(),
  plateNumber: yup.string().required(),
  engineType: yup.string(),
  transmissionType: yup.string(),
  fuelType: yup.string(),
});

const AddVehicle: FC<
  NativeStackScreenProps<AppStackNavParams, 'Add Vehicle'>
> = ({navigation, route}) => {
  const {vehicle} = route.params ?? {};

  const {getCarRecords} = useUser();
  const {createVehicle, editVehicle, loading, error, setError} = useVehicle();

  const [carRecords, setCarRecords] = useState<Array<any>>([]);
  const [carModels, setCarModels] = useState<Array<any>>([]);
  const [carYears, setCarYears] = useState<Array<any>>([]);
  const [carEngines, setCarEngines] = useState<Array<any>>([]);
  const [carTransmissions, setCarTransmissions] = useState<Array<any>>([]);
  const [carFuelTypes, setCarFuelTypes] = useState<Array<any>>([]);
  const [isValidatingVin, setIsValidatingVin] = useState(false);

  useEffect(() => {
    getCarRecords({group_by: 'make'}).then(res =>
      setCarRecords(res.payload.data.results),
    );
  }, [getCarRecords]);

  const handleVinValidation = async (
    vin: string,
    setFieldValue: (field: string, value: any) => void,
    setFieldError: (field: string, message: string | undefined) => void,
  ) => {
    if (vin.length !== 17) {
      return;
    }

    setIsValidatingVin(true);
    try {
      const response = await vinLookup(vin);

      console.log(response);

      if (response?.success) {
        setFieldValue('year', response.data.year.toString());
        setFieldError('vin', undefined);
      } else {
        setFieldError('vin', 'Invalid VIN number');
      }
    } catch (err) {
      setFieldError('vin', 'Invalid VIN number');
    } finally {
      setIsValidatingVin(false);
    }
  };

  const onSubmit = async (values: FormValues) => {
    const res = vehicle
      ? await editVehicle({...values, id: vehicle._id})
      : await createVehicle(values);

    if (res && !res.error) {
      navigation.navigate('Add Vehicle Image', {id: res.payload.data._id});
    }
  };

  const getModels = (make: string) => {
    getCarRecords({group_by: 'make, model', refine: `make:${make}`}).then(res =>
      setCarModels(res.payload.data.results),
    );
  };

  const getYears = (model: string) => {
    getCarRecords({group_by: 'year, model', refine: `model:${model}`}).then(
      res => setCarYears(res.payload.data.results),
    );
  };

  const getEngineTypes = (model: string) => {
    getCarRecords({group_by: 'eng_dscr, model', refine: `model:${model}`}).then(
      res => setCarEngines(res.payload.data.results),
    );
  };

  const getTransmissionTypes = (model: string) => {
    getCarRecords({group_by: 'trany, model', refine: `model:${model}`}).then(
      res => setCarTransmissions(res.payload.data.results),
    );
  };

  const getFuelTypes = (model: string) => {
    getCarRecords({group_by: 'fueltype, model', refine: `model:${model}`}).then(
      res => setCarFuelTypes(res.payload.data.results),
    );
  };

  const carMakes =
    carRecords?.map(car => {
      return {
        label: car.make,
        value: {name: car.make, id: car.make},
      };
    }) || [];

  const models =
    carModels?.map(car => {
      return {
        label: car.model,
        value: {name: car.model, id: car.model},
      };
    }) || [];

  const years =
    carYears?.map(car => {
      const year = String(new Date(car.year).getFullYear());

      return {
        label: year,
        value: {
          name: year,
          id: year,
        },
      };
    }) || [];

  const engineTypes =
    carEngines
      ?.filter(_engine => _engine.eng_dscr !== null)
      .map(car => {
        return {
          label: car.eng_dscr,
          value: {
            name: car.eng_dscr,
            id: car.eng_dscr,
          },
        };
      }) || [];

  const transmissionTypes =
    carTransmissions?.map(car => {
      return {
        label: car.trany,
        value: {
          name: car.trany,
          id: car.trany,
        },
      };
    }) || [];

  const fuelTypes =
    carFuelTypes?.map(car => {
      return {
        label: car.fueltype,
        value: {
          name: car.fueltype,
          id: car.fueltype,
        },
      };
    }) || [];

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
              setFieldError,
              handleChange,
              handleBlur,
            }) => {
              // eslint-disable-next-line react-hooks/rules-of-hooks
              useEffect(() => {
                if (vehicle) {
                  setFieldValue('vehicleType', vehicle?.vehicleType);
                  setFieldValue('vin', vehicle?.vin);
                  setFieldValue('make', vehicle?.make);
                  setFieldValue('model', vehicle?.model);
                  setFieldValue('year', vehicle?.year);
                  setFieldValue('color', vehicle?.color);
                  setFieldValue('plateNumber', vehicle?.plateNumber);
                  setFieldValue('engineType', vehicle?.engineType);
                  setFieldValue('transmissionType', vehicle?.transmissionType);
                  setFieldValue('fuelType', vehicle?.fuelType);

                  getModels(vehicle?.make);
                  getYears(vehicle?.model);
                  getEngineTypes(vehicle?.model);
                  getTransmissionTypes(vehicle?.model);
                  getFuelTypes(vehicle?.model);
                }
              }, [setFieldValue]);

              return (
                <>
                  <View style={layout.flex1}>
                    <View>
                      <Text style={styles.semiheader28}>
                        {vehicle ? 'Edit' : 'Add'} Vehicle
                      </Text>

                      <Text style={[styles.text16, spacing.marginTop4]}>
                        Enter your car details
                      </Text>
                    </View>

                    <View style={styles.progressBar}>
                      <View style={styles.progressValue} />
                    </View>

                    <SelectInput
                      label="Vehicle Type"
                      placeholder=""
                      value={values.vehicleType}
                      onSelect={vehicleType => {
                        setFieldValue('vehicleType', vehicleType.name);
                      }}
                      containerStyle={spacing.marginTop20}
                      error={
                        touched.vehicleType && errors.vehicleType
                          ? errors.vehicleType
                          : undefined
                      }
                      onBlur={() => setFieldTouched('vehicleType')}
                      selectorHeight={hp(30)}
                      options={[
                        {
                          label: 'New',
                          value: {
                            id: 'New',
                            name: 'New',
                          },
                        },
                        {
                          label: 'Old',
                          value: {
                            id: 'Old',
                            name: 'Old',
                          },
                        },
                      ]}
                    />

                    <Input
                      label="VIN"
                      placeholder=""
                      value={values.vin}
                      containerStyle={spacing.marginTop20}
                      onChangeText={handleChange('vin')}
                      onBlur={() => {
                        handleBlur('vin');
                        handleVinValidation(
                          values.vin,
                          setFieldValue,
                          setFieldError,
                        );
                      }}
                      error={errors.vin ? errors.vin : undefined}
                      autoCapitalize="characters"
                    />

                    {isValidatingVin ? (
                      <ActivityIndicator
                        style={[spacing.marginTop4, common.alignStart]}
                        color={palette.PRIMARY}
                      />
                    ) : (
                      <TouchableOpacity style={spacing.marginTop4}>
                        <Text style={styles.text16}>What is a VIN?</Text>
                      </TouchableOpacity>
                    )}

                    <SelectInput
                      label="Make"
                      placeholder=""
                      value={values.make}
                      onSelect={make => {
                        setFieldValue('make', make.name);
                        getModels(make.name);
                      }}
                      containerStyle={spacing.marginTop20}
                      error={
                        touched.make && errors.make ? errors.make : undefined
                      }
                      onBlur={() => setFieldTouched('make')}
                      selectorHeight={hp(80)}
                      options={carMakes}
                      searchable
                    />

                    <SelectInput
                      label="Model"
                      placeholder=""
                      value={values.model}
                      onSelect={model => {
                        setFieldValue('model', model.name);
                        getYears(model.name);
                      }}
                      containerStyle={spacing.marginTop20}
                      error={
                        touched.model && errors.model ? errors.model : undefined
                      }
                      onBlur={() => setFieldTouched('model')}
                      selectorHeight={hp(80)}
                      options={models}
                      searchable
                    />

                    <SelectInput
                      label="Year"
                      placeholder=""
                      value={values.year}
                      onSelect={year => {
                        setFieldValue('year', year.name);
                        getEngineTypes(values.model);
                      }}
                      containerStyle={spacing.marginTop20}
                      error={
                        touched.year && errors.year ? errors.year : undefined
                      }
                      onBlur={() => setFieldTouched('year')}
                      selectorHeight={hp(50)}
                      options={years}
                    />

                    <Input
                      label="Vehicle Color"
                      placeholder=""
                      value={values.color}
                      onChangeText={text => setFieldValue('color', text)}
                      containerStyle={spacing.marginTop24}
                      error={
                        touched.color && errors.color ? errors.color : undefined
                      }
                      onBlur={() => setFieldTouched('color')}
                    />

                    <Input
                      label="License Plate Number"
                      placeholder=""
                      value={values.plateNumber}
                      onChangeText={text => setFieldValue('plateNumber', text)}
                      containerStyle={spacing.marginTop24}
                      error={
                        touched.plateNumber && errors.plateNumber
                          ? errors.plateNumber
                          : undefined
                      }
                      onBlur={() => setFieldTouched('plateNumber')}
                      autoCapitalize="characters"
                    />

                    <SelectInput
                      label="Engine Type"
                      placeholder=""
                      value={values.engineType}
                      onSelect={engineType => {
                        setFieldValue('engineType', engineType.name);
                        getTransmissionTypes(values.model);
                      }}
                      containerStyle={spacing.marginTop20}
                      error={
                        touched.engineType && errors.engineType
                          ? errors.engineType
                          : undefined
                      }
                      onBlur={() => setFieldTouched('engineType')}
                      selectorHeight={hp(50)}
                      options={engineTypes}
                    />

                    <SelectInput
                      label="Transmission Type"
                      placeholder=""
                      value={values.transmissionType}
                      onSelect={transmissionType => {
                        setFieldValue(
                          'transmissionType',
                          transmissionType.name,
                        );
                        getFuelTypes(values.model);
                      }}
                      containerStyle={spacing.marginTop20}
                      error={
                        touched.transmissionType && errors.transmissionType
                          ? errors.transmissionType
                          : undefined
                      }
                      onBlur={() => setFieldTouched('transmissionType')}
                      selectorHeight={hp(50)}
                      options={transmissionTypes}
                    />

                    <SelectInput
                      label="Fuel Type"
                      placeholder=""
                      value={values.fuelType}
                      onSelect={fuelType => {
                        setFieldValue('fuelType', fuelType.name);
                      }}
                      containerStyle={spacing.marginTop20}
                      error={
                        touched.fuelType && errors.fuelType
                          ? errors.fuelType
                          : undefined
                      }
                      onBlur={() => setFieldTouched('fuelType')}
                      selectorHeight={hp(50)}
                      options={fuelTypes}
                    />
                  </View>

                  <Button
                    title="Save"
                    onPress={() => handleSubmit()}
                    style={spacing.marginTop24}
                    loading={loading}
                    disabled={values.plateNumber === '' ? true : loading}
                  />
                </>
              );
            }}
          </Formik>
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

export default AddVehicle;
