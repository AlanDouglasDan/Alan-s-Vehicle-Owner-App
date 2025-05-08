/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, {FC, useState, useEffect, useRef, useCallback} from 'react';
import {
  Text,
  View,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Platform,
  Image,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Slider from '@react-native-community/slider';
import BottomSheet, {
  BottomSheetView,
  BottomSheetTextInput,
} from '@gorhom/bottom-sheet';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {AppStackNavParams} from 'navigation/app-stack/AppStackNav';
import {useUser} from 'store/user/hooks';
import {ServiceProvider} from './components/ServiceProvider';
import {Services} from './components/Services';
import {Reviews} from './components/Reviews';
import {Button} from 'components/Button';
import {ArrowBack} from 'components/ArrowBack';
import {StatusModal} from 'components/StatusModal';
import Verified from 'components/svg/Verified';
import {images} from 'core/images';
import {convertRatingToArray} from 'core/utils';
import {common, layout, palette, spacing} from 'core/styles';
import styles from './GarageProfile.styles';

const tabs = [
  {
    id: 1,
    name: 'Service provider',
  },
  {
    id: 2,
    name: 'Services',
  },
  {
    id: 3,
    name: 'Reviews',
  },
];

const GarageProfile: FC<
  NativeStackScreenProps<AppStackNavParams, 'Garage Profile'>
> = ({navigation, route}) => {
  const {garage} = route.params ?? {};

  const {addReview, loading, error, setError, getReviews} = useUser();

  const sheetRef = useRef<BottomSheet>(null);

  const [activeTab, setActiveTab] = useState<string>('Service provider');
  const [reviewText, setReviewText] = useState<string>('');
  const [bgColor, setBgColor] = useState<string>(palette.WHITE);

  const [success, setSuccess] = useState<boolean>(false);

  const [rating, setRating] = useState<number>(0);

  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View style={[common.flexedRow, styles.gap]}>
          <ArrowBack onPress={() => navigation.goBack()} />

          {activeTab !== 'Service provider' && (
            <Text style={styles.semiheader16}>{garage.businessName}</Text>
          )}
        </View>
      ),
    });
  }, [activeTab, bgColor, garage.businessName, navigation]);

  const fetchReviews = async () =>
    await getReviews({business: garage._id}).then(res =>
      setReviews(res.payload.data),
    );

  useEffect(() => {
    fetchReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [garage._id]);

  let render;
  if (activeTab === 'Service provider') {
    render = <ServiceProvider garage={garage} />;
  } else if (activeTab === 'Services') {
    render = <Services garage={garage} />;
  } else if (activeTab === 'Reviews') {
    render = <Reviews garage={garage} reviews={reviews} />;
  }

  const handleSubmit = async () => {
    const res = await addReview({
      business: garage._id,
      rating,
      reviewText,
    });

    if (res && !res.error) {
      setRating(0);
      setReviewText('');
      setSuccess(true);

      await fetchReviews();
    }
  };

  const closeModal = () => {
    setSuccess(false);
    sheetRef.current?.close();
    Keyboard.dismiss();
  };

  const handleSheetChanges = useCallback(index => {
    if (index === 0) {
      setBgColor('rgba(16, 24, 40, 0.15)');
    } else {
      setBgColor(palette.WHITE);
    }
  }, []);

  return (
    <SafeAreaView style={[styles.mainContainer, {backgroundColor: bgColor}]}>
      <KeyboardAvoidingView
        style={layout.flex1}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        behavior="padding">
        <ScrollView
          style={styles.innerContainer}
          contentContainerStyle={styles.contentContainer}
          keyboardShouldPersistTaps="always">
          <View>
            {activeTab === 'Service provider' && (
              <View style={spacing.marginBottom44}>
                <Image
                  source={images.checkers}
                  style={styles.image}
                  resizeMode="cover"
                />

                <View style={spacing.marginTop12}>
                  <View style={[common.flexedRow, styles.gap]}>
                    <Text style={styles.semiheader20}>
                      {garage.businessName}
                    </Text>

                    <Verified />
                  </View>

                  <Text style={styles.text16}>{garage.location}</Text>
                </View>

                <View style={[spacing.marginTop12, common.spacedRow]}>
                  <View style={styles.statusContainer}>
                    <Text style={[styles.text16, {color: palette.SUCCESS}]}>
                      Active
                    </Text>
                  </View>

                  <View style={[common.flexedRow, styles.gap]}>
                    <Ionicons name="star" size={24} color={palette.YELLOW} />

                    <Text style={styles.semiheader16}>
                      {garage.avgRating?.toFixed(1) || 0} ({garage.reviewCount}{' '}
                      reviews)
                    </Text>
                  </View>
                </View>
              </View>
            )}

            <View style={styles.flexedRow}>
              {tabs.map(tab => (
                <TouchableOpacity
                  key={tab.id}
                  style={[
                    styles.tab,
                    activeTab === tab.name
                      ? styles.active
                      : {paddingBottom: 19},
                  ]}
                  onPress={() => setActiveTab(tab.name)}>
                  <Text
                    style={[
                      styles.text16,
                      {
                        color:
                          activeTab === tab.name
                            ? palette.TEXT_HEADING
                            : palette.SUPPORT,
                      },
                    ]}>
                    {tab.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {render}
          </View>
        </ScrollView>

        <Button
          title={
            activeTab === 'Reviews'
              ? 'Rate and review'
              : 'Create repair request'
          }
          onPress={() =>
            activeTab === 'Reviews'
              ? sheetRef.current?.snapToIndex(0)
              : navigation.navigate('Create Request', {garages: [garage]})
          }
          style={[{paddingHorizontal: 20}, spacing.marginBottom20]}
        />
      </KeyboardAvoidingView>

      <BottomSheet
        ref={sheetRef}
        snapPoints={['70%']}
        index={-1}
        onChange={handleSheetChanges}
        keyboardBehavior="interactive"
        enablePanDownToClose
        // backgroundStyle={{borderRadius: 0}}
        enableDynamicSizing={false}
        enableContentPanningGesture={false}>
        <BottomSheetView style={styles.content}>
          <View style={layout.flex1}>
            <View style={[common.spacedRow, spacing.marginBottom16]}>
              <Text style={styles.semiheader20}>Rate and review</Text>

              <TouchableOpacity onPress={closeModal}>
                <Ionicons name="close" size={24} color={palette.DEFAULT} />
              </TouchableOpacity>
            </View>

            <View style={common.centeredColumn}>
              <View
                style={[
                  common.centeredRow,
                  styles.gap,
                  spacing.marginTop12,
                  spacing.marginBottom8,
                ]}>
                {convertRatingToArray(rating).map((star, index) => (
                  <TouchableOpacity
                    onPress={() => setRating(index + 1)}
                    key={index}>
                    <Ionicons
                      name={
                        star === 1
                          ? 'star'
                          : star === 0.5
                          ? 'star-half'
                          : 'star-outline'
                      }
                      size={wp(100) / 5 - 35}
                      color={palette.YELLOW}
                    />
                  </TouchableOpacity>
                ))}
              </View>

              <Slider
                style={[
                  {height: 40, width: '80%'},
                  spacing.marginTop12,
                  spacing.marginBottom8,
                ]}
                value={rating}
                onValueChange={val => setRating(val)}
                step={0.5}
                minimumValue={0}
                maximumValue={5}
                minimumTrackTintColor={palette.TEXT_HEADING}
                maximumTrackTintColor={palette.NEUTRAL20}
              />

              <Text style={styles.text16}>Slide to rate your experience</Text>
            </View>

            <View style={spacing.marginTop24}>
              <BottomSheetTextInput
                placeholder="Write your review"
                value={reviewText}
                onChangeText={text => setReviewText(text)}
                style={styles.input}
                multiline
                numberOfLines={5}
              />

              <Text style={styles.text11}>{reviewText.length}/100</Text>
            </View>
          </View>

          <Button
            title="Post review"
            onPress={handleSubmit}
            loading={loading}
            disabled={!reviewText || rating === 0 ? true : loading}
          />
        </BottomSheetView>
      </BottomSheet>

      <StatusModal
        open={!!error}
        onClose={() => setError(false)}
        message={
          typeof error === 'string' ? error : 'Oops, something went wrong!'
        }
        status="error"
      />

      <StatusModal
        open={success}
        onClose={closeModal}
        message="Review added successfully!"
        status="success"
      />
    </SafeAreaView>
  );
};

export default GarageProfile;
