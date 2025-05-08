import React, {FC} from 'react';
import {
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  SafeAreaView,
  Platform,
} from 'react-native';
import {Formik} from 'formik';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {AuthStackNavParams} from 'navigation/auth-stack/AuthStackNav';
import {useAuth} from 'store/auth/hooks';
import {layout, spacing} from 'core/styles';
import {PasswordInput} from 'components/PasswordInput';
import {StatusModal} from 'components/StatusModal';
import {Button} from 'components/Button';
// import {StatusModal} from 'components/StatusModal';
import * as yup from 'yup';
import styles from './SetPassword.styles';

interface FormValues {
  password: string;
  confirmPassord: string;
}

const initialValues: FormValues = {
  password: '',
  confirmPassord: '',
};

const validationSchema = yup.object({
  password: yup.string().required(),
  confirmPassord: yup
    .string()
    .required()
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

const SetPassword: FC<
  NativeStackScreenProps<AuthStackNavParams, 'Set Password'>
> = ({navigation, route}) => {
  const {token} = route.params ?? {};

  console.log(token);

  const {setPassword, loading, error, setError} = useAuth();

  const onSubmit = async (values: FormValues) => {
    const {password} = values;

    const res = await setPassword({password, token});

    if (res && !res.error) {
      navigation.navigate('Success', {
        title: 'Password Successfully Reset',
        body: '',
        nextScreen: 'Login',
      });
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
                    <View>
                      <Text style={styles.semiheader28}>Set New Password</Text>

                      <Text style={[styles.text16, spacing.marginTop4]}>
                        Your new password must be different from previously used
                        passwords.
                      </Text>
                    </View>

                    <PasswordInput
                      label="Password"
                      placeholder=""
                      value={values.password}
                      onChangeText={text => setFieldValue('password', text)}
                      containerStyle={spacing.marginTop24}
                      error={
                        touched.password && errors.password
                          ? errors.password
                          : undefined
                      }
                      onBlur={() => setFieldTouched('password')}
                    />

                    <Text style={[styles.text16, spacing.marginTop4]}>
                      Your password must be at least 8 characters long and
                      include 1 symbol and 1 number.
                    </Text>

                    <PasswordInput
                      label="Re-enter Password"
                      placeholder=""
                      value={values.confirmPassord}
                      onChangeText={text =>
                        setFieldValue('confirmPassord', text)
                      }
                      containerStyle={spacing.marginTop24}
                      error={
                        touched.confirmPassord && errors.confirmPassord
                          ? errors.confirmPassord
                          : undefined
                      }
                      onBlur={() => setFieldTouched('confirmPassord')}
                    />
                  </View>

                  <Button
                    title="Reset"
                    onPress={() => handleSubmit()}
                    style={spacing.marginTop24}
                    loading={loading}
                    disabled={values.confirmPassord === '' ? true : loading}
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

export default SetPassword;
