/* eslint-disable react/no-unstable-nested-components */
import React, {FC} from 'react';
import {View, Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {BottomTabsNav} from 'navigation/bottom-tabs-nav';
import {
  AddName,
  CreatePassword,
  ChangePassword,
  Success,
  Permissions,
  Welcome,
  AddVehicle,
  VerifyPhone,
  PhoneVerification,
  Notifications,
  ChangeName,
  Terms,
  Privacy,
  VehicleImage,
  CreateRequest,
  CreateRequest2,
  ReviewRequest,
  GarageSearch,
  GarageProfile,
  GaragesByService,
  RequestDetails,
  BidDetails,
  PersonalDetails,
  ContactUs,
  HelpCenter,
  MakeAppointment,
  Images,
  VehicleDetails,
  RepairHistory,
  RepairDetails,
  AdditionalRepairs,
  Receipt,
  Payment,
  DeleteAccount,
} from 'screens';
import {useAuth} from 'store/auth/hooks';
import {ArrowBack} from 'components/ArrowBack';
import {layout, palette, common} from 'core/styles';
import styles from './AppStackNav.styles';

export type AppStackNavParams = {
  'Bottom Tabs': undefined;

  // app stack
  'Add Name': undefined;
  'Create Password': undefined;
  'Change Password': undefined;
  Success: {title: string; body?: string; nextScreen: any; screenObject: any};
  Permissions: undefined;
  Welcome: undefined;
  'Verify Phone': undefined;
  'Phone Verification': {phone: string};
  Notifications: undefined;
  'Change Name': {type: 'first' | 'last'};
  Terms: undefined;
  Privacy: undefined;
  'Add Vehicle': {vehicle?: any};
  'Add Vehicle Image': {id: string};
  'Create Request': {garages: any[]};
  'Create Request 2': {
    garages: any[];
    insurance: string;
    car: string;
    selectedCar: string;
    description: string;
    tempVehicle: string;
  };
  'Review Request': {
    garages: any[];
    insurance: string;
    car: string;
    selectedCar: string;
    description: string;
    tempVehicle: string;
    selectedServices: string[];
  };
  'Garage Search': {businesses: any[]};
  'Garage Profile': {garage: any};
  'Garages By Service': {service: any};
  'Request Details': {request: any; status: string; bid: any};
  'Bid Details': {bid: any};
  'Personal Details': undefined;
  'Contact Us': undefined;
  'Help Center': undefined;
  'Make Appointment': {bid: any; additionalRepair?: boolean};
  Images: {
    images: string[];
    currentIndex: number;
  };
  'Notifications Setting': undefined;
  'Vehicle Details': {vehicle: any};
  'Repair History': {vehicle: any; normalFlow?: boolean};
  'Repair Details': {repairDetails: any};
  'Additional Repairs': {id: string};
  Receipt: {repairDetails: any};
  Payment: {bid: any};
  'Delete Account': undefined;
};

const Stack = createNativeStackNavigator<AppStackNavParams>();

const AppStackNav: FC = () => {
  const {initialAppRoute} = useAuth();

  const header = (
    <View
      style={[
        layout.flex1,
        common.centeredColumn,
        {backgroundColor: palette.WHITE},
      ]}
    />
  );

  return (
    <Stack.Navigator initialRouteName={initialAppRoute}>
      <Stack.Screen
        name="Bottom Tabs"
        component={BottomTabsNav}
        options={{headerShown: false, gestureEnabled: false}}
      />

      <Stack.Screen
        name="Add Name"
        component={AddName}
        options={({}) => ({
          headerBackground: () => header,
          headerTitle: '',
          // headerLeft: () => <ArrowBack onPress={() => navigation.goBack()} />,
          headerRight: () => <Text style={styles.headerRight}>Step 3/4</Text>,
        })}
      />

      <Stack.Screen
        name="Create Password"
        component={CreatePassword}
        options={({navigation}) => ({
          headerBackground: () => header,
          headerTitle: '',
          headerLeft: () => <ArrowBack onPress={() => navigation.goBack()} />,
          headerRight: () => <Text style={styles.headerRight}>Step 4/4</Text>,
        })}
      />

      <Stack.Screen
        name="Change Password"
        component={ChangePassword}
        options={({navigation}) => ({
          headerBackground: () => header,
          headerTitle: '',
          headerLeft: () => <ArrowBack onPress={() => navigation.goBack()} />,
        })}
      />

      <Stack.Screen
        name="Success"
        component={Success}
        options={() => ({
          headerShown: false,
        })}
      />

      <Stack.Screen
        name="Permissions"
        component={Permissions}
        options={() => ({
          headerShown: false,
        })}
      />

      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={() => ({
          headerShown: false,
        })}
      />

      <Stack.Screen
        name="Add Vehicle"
        component={AddVehicle}
        options={({navigation}) => ({
          headerBackground: () => header,
          headerTitle: '',
          headerLeft: () => <ArrowBack onPress={() => navigation.goBack()} />,
        })}
      />

      <Stack.Screen
        name="Add Vehicle Image"
        component={VehicleImage}
        options={({navigation}) => ({
          headerBackground: () => header,
          headerTitle: '',
          headerLeft: () => <ArrowBack onPress={() => navigation.goBack()} />,
        })}
      />

      <Stack.Screen
        name="Verify Phone"
        component={VerifyPhone}
        options={({navigation}) => ({
          headerBackground: () => header,
          headerTitle: '',
          headerLeft: () => <ArrowBack onPress={() => navigation.goBack()} />,
        })}
      />

      <Stack.Screen
        name="Phone Verification"
        component={PhoneVerification}
        options={({navigation}) => ({
          headerBackground: () => header,
          headerTitle: '',
          headerLeft: () => <ArrowBack onPress={() => navigation.goBack()} />,
        })}
      />

      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={({navigation}) => ({
          headerBackground: () => header,
          headerTitle: '',
          headerLeft: () => <ArrowBack onPress={() => navigation.goBack()} />,
        })}
      />

      <Stack.Screen
        name="Change Name"
        component={ChangeName}
        options={({navigation}) => ({
          headerBackground: () => header,
          headerTitle: '',
          headerLeft: () => <ArrowBack onPress={() => navigation.goBack()} />,
        })}
      />

      <Stack.Screen
        name="Terms"
        component={Terms}
        options={({navigation}) => ({
          headerBackground: () => header,
          headerTitle: '',
          headerLeft: () => <ArrowBack onPress={() => navigation.goBack()} />,
        })}
      />

      <Stack.Screen
        name="Privacy"
        component={Privacy}
        options={({navigation}) => ({
          headerBackground: () => header,
          headerTitle: '',
          headerLeft: () => <ArrowBack onPress={() => navigation.goBack()} />,
        })}
      />

      <Stack.Screen
        name="Create Request"
        component={CreateRequest}
        options={({navigation}) => ({
          headerBackground: () => header,
          headerTitle: '',
          headerLeft: () => <ArrowBack onPress={() => navigation.goBack()} />,
        })}
      />

      <Stack.Screen
        name="Create Request 2"
        component={CreateRequest2}
        options={({navigation}) => ({
          headerBackground: () => header,
          headerTitle: '',
          headerLeft: () => <ArrowBack onPress={() => navigation.goBack()} />,
        })}
      />

      <Stack.Screen
        name="Review Request"
        component={ReviewRequest}
        options={({navigation}) => ({
          headerBackground: () => header,
          headerTitle: '',
          headerLeft: () => <ArrowBack onPress={() => navigation.goBack()} />,
        })}
      />

      <Stack.Screen
        name="Garage Search"
        component={GarageSearch}
        options={({navigation}) => ({
          headerBackground: () => header,
          headerTitle: '',
          headerLeft: () => <ArrowBack onPress={() => navigation.goBack()} />,
        })}
      />

      <Stack.Screen
        name="Garage Profile"
        component={GarageProfile}
        options={({navigation}) => ({
          headerBackground: () => header,
          headerTitle: '',
          headerLeft: () => <ArrowBack onPress={() => navigation.goBack()} />,
        })}
      />

      <Stack.Screen
        name="Garages By Service"
        component={GaragesByService}
        options={({navigation}) => ({
          headerBackground: () => header,
          headerTitle: '',
          headerLeft: () => <ArrowBack onPress={() => navigation.goBack()} />,
        })}
      />

      <Stack.Screen
        name="Request Details"
        component={RequestDetails}
        options={({navigation}) => ({
          headerBackground: () => header,
          headerTitle: '',
          headerLeft: () => <ArrowBack onPress={() => navigation.goBack()} />,
        })}
      />

      <Stack.Screen
        name="Bid Details"
        component={BidDetails}
        options={({navigation}) => ({
          headerBackground: () => header,
          headerTitle: '',
          headerLeft: () => <ArrowBack onPress={() => navigation.goBack()} />,
        })}
      />

      <Stack.Screen
        name="Personal Details"
        component={PersonalDetails}
        options={({navigation}) => ({
          headerBackground: () => header,
          headerTitle: '',
          headerLeft: () => <ArrowBack onPress={() => navigation.goBack()} />,
        })}
      />

      <Stack.Screen
        name="Contact Us"
        component={ContactUs}
        options={({navigation}) => ({
          headerBackground: () => header,
          headerTitle: '',
          headerLeft: () => <ArrowBack onPress={() => navigation.goBack()} />,
        })}
      />

      <Stack.Screen
        name="Help Center"
        component={HelpCenter}
        options={({navigation}) => ({
          headerBackground: () => header,
          headerTitle: '',
          headerLeft: () => <ArrowBack onPress={() => navigation.goBack()} />,
        })}
      />

      <Stack.Screen
        name="Make Appointment"
        component={MakeAppointment}
        options={({navigation}) => ({
          headerBackground: () => header,
          headerTitle: '',
          headerLeft: () => <ArrowBack onPress={() => navigation.goBack()} />,
        })}
      />

      <Stack.Screen
        name="Images"
        component={Images}
        options={() => ({
          headerShown: false,
        })}
      />

      <Stack.Screen
        name="Vehicle Details"
        component={VehicleDetails}
        options={({navigation}) => ({
          headerBackground: () => header,
          headerTitle: '',
          headerLeft: () => <ArrowBack onPress={() => navigation.goBack()} />,
        })}
      />

      <Stack.Screen
        name="Repair History"
        component={RepairHistory}
        options={({navigation}) => ({
          headerBackground: () => header,
          headerTitle: '',
          headerLeft: () => <ArrowBack onPress={() => navigation.goBack()} />,
        })}
      />

      <Stack.Screen
        name="Repair Details"
        component={RepairDetails}
        options={({navigation}) => ({
          headerBackground: () => header,
          headerTitle: '',
          headerLeft: () => <ArrowBack onPress={() => navigation.goBack()} />,
        })}
      />

      <Stack.Screen
        name="Additional Repairs"
        component={AdditionalRepairs}
        options={({navigation}) => ({
          headerBackground: () => header,
          headerTitle: '',
          headerLeft: () => <ArrowBack onPress={() => navigation.goBack()} />,
        })}
      />

      <Stack.Screen
        name="Receipt"
        component={Receipt}
        options={() => ({
          headerShown: false,
        })}
      />

      <Stack.Screen
        name="Payment"
        component={Payment}
        options={({navigation}) => ({
          headerBackground: () => header,
          headerTitle: '',
          headerLeft: () => <ArrowBack onPress={() => navigation.goBack()} />,
        })}
      />

      <Stack.Screen
        name="Delete Account"
        component={DeleteAccount}
        options={({navigation}) => ({
          headerBackground: () => header,
          headerTitle: '',
          headerLeft: () => <ArrowBack onPress={() => navigation.goBack()} />,
        })}
      />
    </Stack.Navigator>
  );
};

export default AppStackNav;
