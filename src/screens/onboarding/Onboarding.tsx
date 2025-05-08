/* eslint-disable react-native/no-inline-styles */
import React, {FC, useRef, useState, useEffect} from 'react';
import {
  Text,
  TouchableOpacity,
  Image,
  View,
  FlatList,
  Dimensions,
  ScrollView,
  SafeAreaView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {AuthStackNavParams} from 'navigation/auth-stack/AuthStackNav';
import {useAuth} from 'store/auth/hooks';
import {getAccessToken} from 'core/security';
import {images} from 'core/images';
import {layout, palette, spacing} from 'core/styles';
import styles from './Onboarding.styles';

interface CarouselItems {
  id: number;
  title: string;
  body: string;
  imageUrl: any;
}

const carousels: Array<CarouselItems> = [
  {
    id: 1,
    title: 'Welcome to Aucarga',
    body: 'Discover a seamless way to find and connect with trusted garages for prompt and reliable vehicle maintenance and service.',
    imageUrl: images.carDiscover,
  },
  {
    id: 2,
    title: 'Quick & Effortless Repair Requests',
    body: 'Easily submit and manage repair requests with a few taps. Aucarga puts you in control, making vehicle maintenance a breeze.',
    imageUrl: images.repair,
  },
  {
    id: 3,
    title: 'Personalized Service Recommendations',
    body: "Receive personalized service recommendations based on your vehicle's make, model, and maintenance history.",
    imageUrl: images.personalizedCar,
  },
  {
    id: 4,
    title: 'Real-time Service Tracking',
    body: "Stay informed throughout the repair process with real-time service tracking. Track the progress of your vehicle's maintenance easily.",
    imageUrl: images.tracking,
  },
  {
    id: 5,
    title: 'Secure and Convenient Payments',
    body: 'Easily complete transactions within the app after the service is done, ensuring a seamless and trustworthy payment process for all your vehicle maintenance needs.',
    imageUrl: images.coinWallet,
  },
];

const viewConfigRef = {viewAreaCoveragePercentThreshold: 95};
const {height} = Dimensions.get('window');

const Onboarding: FC<
  NativeStackScreenProps<AuthStackNavParams, 'Onboarding'>
> = ({navigation}) => {
  const {setAccessToken} = useAuth();

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [screenHeight, setScreenHeight] = useState<number>(0);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getAccessToken()
      .then(res => {
        if (res) {
          setAccessToken(res.password);
        }
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, [setAccessToken]);

  const flatListref = useRef<FlatList<CarouselItems> | null>();

  const onViewRef = useRef(({changed}: {changed: any}) => {
    if (changed[0].isViewable) {
      setCurrentIndex(changed[0].index);
    }
  });

  const onContentSizeChange = (
    _contentWidth: number,
    contentHeight: number,
  ) => {
    setScreenHeight(contentHeight);
  };

  // const scrollToIndex = (index: number) => {
  //   flatListref.current?.scrollToIndex({animated: true, index});
  // };

  // const nextFrame = () => {
  //   currentIndex + 1 < carousels.length && scrollToIndex(currentIndex + 1);
  // };

  const renderItem: FC<{item: CarouselItems}> = ({item}) => {
    return (
      <TouchableOpacity activeOpacity={1}>
        <View style={styles.body}>
          <Text style={[styles.semiheader28, spacing.marginBottom4]}>
            {item.title}
          </Text>
          <Text style={styles.text17}>{item.body}</Text>
        </View>

        <View style={styles.imageContainer}>
          <Image
            source={item.imageUrl}
            resizeMode="cover"
            style={styles.w100}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.mainContainer}>
      {loading ? (
        <ActivityIndicator
          size={'large'}
          color={palette.PRIMARY}
          style={layout.flex1}
        />
      ) : (
        <ScrollView
          scrollEnabled={screenHeight > height}
          onContentSizeChange={onContentSizeChange}
          contentContainerStyle={{height: hp(100)}}>
          <SafeAreaView style={layout.flex1}>
            <View style={styles.dotView}>
              {carousels.map((_, index: number) => {
                return (
                  <View
                    key={index.toString()}
                    style={[
                      styles.circle,
                      {
                        backgroundColor:
                          index <= currentIndex
                            ? palette.NEUTRAL70
                            : palette.NEUTRAL30,
                      },
                    ]}
                    // onPress={() => scrollToIndex(index)}
                  />
                );
              })}
            </View>

            <FlatList
              data={carousels}
              //   @ts-expect-error
              renderItem={renderItem}
              keyExtractor={item => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              ref={ref => {
                flatListref.current = ref;
              }}
              windowSize={carousels.length}
              bounces={false}
              bouncesZoom={false}
              alwaysBounceHorizontal={false}
              removeClippedSubviews
              initialNumToRender={2}
              viewabilityConfig={viewConfigRef}
              onViewableItemsChanged={onViewRef.current}
            />

            <View
              style={[
                Platform.OS === 'ios'
                  ? spacing.marginBottom44
                  : spacing.marginBottom80,
                {paddingHorizontal: 20},
              ]}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Get Started')}>
                <Text style={styles.semiheader16}>Skip</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </ScrollView>
      )}
    </View>
  );
};

export default Onboarding;
