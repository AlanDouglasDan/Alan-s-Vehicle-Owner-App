import React, {FC, useEffect, useState} from 'react';
import {SafeAreaView, View, ActivityIndicator, ScrollView} from 'react-native';
import {useStripe} from '@stripe/stripe-react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {AppStackNavParams} from 'navigation/app-stack/AppStackNav';
import {useRequest} from 'store/request/hooks';
import {StatusModal} from 'components/StatusModal';
import {formatCurrency} from 'core/utils';
import {palette, layout} from 'core/styles';
import styles from './Payment.styles';

const Payment: FC<NativeStackScreenProps<AppStackNavParams, 'Payment'>> = ({
  navigation,
  route,
}) => {
  const {bid} = route.params;

  const {createPaymentIntent, loading, savePayment, getBids, error, setError} =
    useRequest();

  const {initPaymentSheet, presentPaymentSheet} = useStripe();

  const [paymentIntentId, setPaymentIntentId] = useState<string>('');

  useEffect(() => {
    createPaymentIntent({
      amount: bid.prices.reduce((a, b) => a + b.amount, 0) * 100,
      currency: bid.prices[0].currency,
      garageOwnerStripeConnectId: bid.garageOwner.stripeAccountId,
    }).then(res => {
      setPaymentIntentId(res.payload.data.client_secret);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const initializePaymentSheet = async () => {
      await initPaymentSheet({
        paymentIntentClientSecret: paymentIntentId,
        merchantDisplayName: bid.garageOwner.businessName,
        defaultBillingDetails: {
          name:
            bid.garageOwner.user.firstName +
            ' ' +
            bid.garageOwner.user.lastName,
          email: bid.garageOwner.user.email,
          phone: bid.garageOwner.user.phone,
        },
      });

      const paymentSheetResponse = await presentPaymentSheet();

      console.log(paymentSheetResponse, 'paymentSheetResponse');

      if (!paymentSheetResponse.error) {
        const res = await savePayment({
          paymentIntentId,
          bid: bid._id,
        });

        if (res && !res.error) {
          getBids();

          navigation.navigate('Success', {
            title: 'Payment Successful',
            body: `Your payment of ${bid.prices[0].currency} ${formatCurrency(
              bid.prices.reduce((a, b) => a + b.amount, 0),
            )} has been processed.`,
            nextScreen: 'Repair History',
            screenObject: {vehicle: bid.request.vehicle},
          });
        }
      }

      // const res = await confirmPayment(paymentIntentId);

      // console.log(res);

      // if (res.paymentIntent?.status === 'Succeeded') {
      //   navigation.navigate('Success', {
      //     title: 'Payment Successful',
      //     body: `Your payment of ${formatCurrency(
      //       bid.prices.reduce((a, b) => a + b.amount, 0),
      //     )} has been processed.`,
      //     nextScreen: 'Bottom Tabs',
      //   });
      // }

      if (paymentSheetResponse.error?.code === 'Canceled') {
        navigation.goBack();
      }
    };

    paymentIntentId && initializePaymentSheet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentIntentId]);

  return (
    <SafeAreaView style={styles.mainContainer}>
      {loading ? (
        <ActivityIndicator
          size={'large'}
          style={layout.flex1}
          color={palette.PRIMARY}
        />
      ) : (
        <ScrollView
          style={styles.innerContainer}
          contentContainerStyle={styles.contentContainer}>
          <View />
        </ScrollView>
      )}

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

export default Payment;
