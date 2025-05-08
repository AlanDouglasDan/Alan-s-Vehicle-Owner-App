/* eslint-disable react/no-unstable-nested-components */
import React, {FC} from 'react';
import {Text, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  Onboarding,
  GetStarted,
  Login,
  Signup,
  ResetPassword,
  SetPassword,
  EmailVerification,
  Success,
} from 'screens';
import {ArrowBack} from 'components/ArrowBack';
import {useAuth} from 'store/auth/hooks';
import {layout, palette, common} from '@src/core/styles';
import styles from './AuthStackNav.styles';

export type AuthStackNavParams = {
  Onboarding: undefined;
  'Get Started': undefined;
  Login: undefined;
  'Sign Up': undefined;
  'Reset Password': undefined;
  'Set Password': {token: string};
  'Email Verification': {email: string; type: 'password' | 'account'};
  Success: {title: string; body?: string; nextScreen: any};
};

const Stack = createNativeStackNavigator<AuthStackNavParams>();

const AuthStackNav: FC = () => {
  const {initialAuthRoute} = useAuth();

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
    <Stack.Navigator initialRouteName={initialAuthRoute}>
      <Stack.Screen
        name="Onboarding"
        component={Onboarding}
        options={() => ({
          headerShown: false,
        })}
      />

      <Stack.Screen
        name="Get Started"
        component={GetStarted}
        options={() => ({
          headerShown: false,
        })}
      />

      <Stack.Screen
        name="Sign Up"
        component={Signup}
        options={({navigation}) => ({
          headerBackground: () => header,
          headerTitle: '',
          headerLeft: () => <ArrowBack onPress={() => navigation.goBack()} />,
          headerRight: () => <Text style={styles.headerRight}>Step 1/4</Text>,
        })}
      />

      <Stack.Screen
        name="Email Verification"
        component={EmailVerification}
        options={({navigation}) => ({
          headerBackground: () => header,
          headerTitle: '',
          headerLeft: () => <ArrowBack onPress={() => navigation.goBack()} />,
          headerRight: () => <Text style={styles.headerRight}>Step 2/4</Text>,
        })}
      />

      <Stack.Screen
        name="Login"
        component={Login}
        options={({navigation}) => ({
          headerBackground: () => header,
          headerTitle: '',
          headerLeft: () =>
            navigation.canGoBack() ? (
              <ArrowBack onPress={() => navigation.goBack()} />
            ) : (
              <View />
            ),
        })}
      />

      <Stack.Screen
        name="Reset Password"
        component={ResetPassword}
        options={({navigation}) => ({
          headerBackground: () => header,
          headerTitle: '',
          headerLeft: () => <ArrowBack onPress={() => navigation.goBack()} />,
        })}
      />

      <Stack.Screen
        name="Set Password"
        component={SetPassword}
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
    </Stack.Navigator>
  );
};

export default AuthStackNav;
