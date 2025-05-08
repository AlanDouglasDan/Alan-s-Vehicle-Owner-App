import React, {FC} from 'react';
import {
  Text,
  View,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Platform,
} from 'react-native';
import {Formik} from 'formik';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {useAuth} from 'store/auth/hooks';
import {AuthStackNavParams} from 'navigation/auth-stack/AuthStackNav';
import {layout, spacing} from 'core/styles';
import {Input} from 'components/Input';
import {Button} from 'components/Button';
import {StatusModal} from 'components/StatusModal';
import * as yup from 'yup';
import styles from './ResetPassword.styles';

interface FormValues {
  email: string;
}

const initialValues: FormValues = {
  email: '',
};

const validationSchema = yup.object({
  email: yup.string().email('Email address is invalid').required(),
});

const ResetPassword: FC<
  NativeStackScreenProps<AuthStackNavParams, 'Reset Password'>
> = ({navigation}) => {
  const {loading, error, setError, forgotPassword} = useAuth();

  const onSubmit = async (values: FormValues) => {
    const {email} = values;

    const res = await forgotPassword({
      email: email.toLocaleLowerCase(),
    });

    if (res && !res.error) {
      navigation.navigate('Email Verification', {email, type: 'password'});
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
          <View>
            <Text style={styles.semiheader28}>Reset Password</Text>

            <Text style={[styles.text16, spacing.marginTop4]}>
              No worries. We'll send you reset instructions to the email you
              registered with
            </Text>
          </View>

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
              return (
                <>
                  <View style={layout.flex1}>
                    <Input
                      label="Email"
                      placeholder=""
                      value={values.email}
                      onChangeText={text => setFieldValue('email', text)}
                      containerStyle={spacing.marginTop24}
                      error={
                        touched.email && errors.email ? errors.email : undefined
                      }
                      onBlur={() => setFieldTouched('email')}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  </View>

                  <Button
                    title="Continue"
                    onPress={() => handleSubmit()}
                    style={spacing.marginTop24}
                    loading={loading}
                    disabled={values.email === '' ? true : loading}
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

export default ResetPassword;
