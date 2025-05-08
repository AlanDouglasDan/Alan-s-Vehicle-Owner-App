import React, {FC, useState, useEffect} from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {AuthStackNavParams} from 'navigation/auth-stack/AuthStackNav';
import {useAuth} from 'store/auth/hooks';
import {OtpVerification} from 'components/OtpVerification';
import {StatusModal} from 'components/StatusModal';
import {spacing} from 'core/styles';
import styles from './EmailVerification.styles';

const EmailVerification: FC<
  NativeStackScreenProps<AuthStackNavParams, 'Email Verification'>
> = ({navigation, route}) => {
  const {email, type} = route.params ?? {};

  const {verifyOtp, verifyPasswordOtp, loading, error, setError} = useAuth();

  const [value, setValue] = useState<string>('');

  useEffect(() => {
    if (type === 'password') {
      navigation.setOptions({
        // eslint-disable-next-line react/no-unstable-nested-components
        headerRight: () => <View />,
      });
    }
  }, [navigation, type]);

  const onSubmit = async () => {
    if (type === 'account') {
      await verifyOtp({
        email: email.toLocaleLowerCase(),
        otp: value,
        type: 'account',
        userType: 'car_owner',
      });
    } else {
      const res = await verifyPasswordOtp({
        email: email.toLocaleLowerCase(),
        otp: value,
        type: 'reset',
        userType: 'car_owner',
      });

      if (res && !res.error) {
        navigation.navigate('Set Password', {token: res.payload.data.token});
      }
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView
        style={styles.innerContainer}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="always">
        <OtpVerification
          value={value}
          setValue={setValue}
          onSubmit={onSubmit}
          title={
            type === 'account' ? 'Verify your account' : 'Check Your Messages'
          }
          text={
            <Text style={[styles.text16, spacing.marginTop4]}>
              Please enter code sent to{' '}
              <Text style={styles.mediumText}>{email}</Text>, remember to check
              your inbox and spam
            </Text>
          }
          loading={loading}
        />
      </ScrollView>

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

export default EmailVerification;
