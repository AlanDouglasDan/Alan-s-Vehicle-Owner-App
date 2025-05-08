import React, {
  FC,
  useEffect,
  useMemo,
  useRef,
  useCallback,
  useState,
} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Geolocation from '@react-native-community/geolocation';
import MapView, {Marker} from 'react-native-maps';
import {OneSignal} from 'react-native-onesignal';
import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {BottomTabsNavParams} from 'navigation/bottom-tabs-nav/BottomTabsNav';
import {useUser} from 'store/user/hooks';
import {useVehicle} from 'store/vehicle/hooks';
import Bell from 'components/svg/Bell';
import Navigation from 'components/svg/Navigation';
import Location from 'components/svg/Location';
import Lights from 'components/svg/Lights';
import Wiper from 'components/svg/Wiper';
import Tires from 'components/svg/Tires';
import Droplets from 'components/svg/Droplets';
import Plug from 'components/svg/Plug';
import Brakes from 'components/svg/Brakes';
import Detailing from 'components/svg/Detailing';
import Battery from 'components/svg/Battery';
import {images} from 'core/images';
import {darkMapStyle} from 'core/constants';
import {common, layout, palette, spacing} from 'core/styles';
import styles from './Home.styles';

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;

const Home: FC<NativeStackScreenProps<BottomTabsNavParams, 'Home'>> = ({
  navigation,
}) => {
  const {getProfile, getBusinesses, current, updateLocation} = useUser();
  const {getServices, loading, services} = useVehicle();

  const sheetRef = useRef<BottomSheet>(null);
  const mapRef = useRef<MapView>(null);

  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005 * ASPECT_RATIO, // Adjusted for screen size
  });

  const [businesses, setBusinesses] = useState<any[]>([]);

  useEffect(() => {
    getProfile().then(res => {
      OneSignal.Notifications.requestPermission(true);
      OneSignal.login(res.payload.data._id);
    });

    !services && getServices();

    getBusinesses({}).then(res => setBusinesses(res.payload.data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Start tracking the user's location
    const watchId = Geolocation.watchPosition(
      async position => {
        const {latitude, longitude} = position.coords;

        const newRegion = {
          ...region,
          latitude,
          longitude,
        };
        setRegion(newRegion);

        // Animate the map to the new user location
        mapRef.current?.animateToRegion(newRegion, 1000);

        updateLocation({longitude, latitude});
      },
      error => console.log(error),
      {
        enableHighAccuracy: true,
        distanceFilter: 15, // Adjust to control how often the location updates
        interval: 10000, // Time in ms between updates
        fastestInterval: 5000,
      },
    );

    // Clean up the watcher on unmount
    return () => Geolocation.clearWatch(watchId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const snapPoints = useMemo(() => [35, 170, 260], []);

  const getIcon = (shortName: string) => {
    if (shortName === 'Lights') {
      return <Lights />;
    } else if (shortName === 'Wiper Blades') {
      return <Wiper />;
    } else if (shortName === 'Tires') {
      return <Tires />;
    } else if (shortName === 'Oil Change') {
      return <Droplets />;
    } else if (shortName === 'Spark Plug') {
      return <Plug />;
    } else if (shortName === 'Brakes') {
      return <Brakes />;
    } else if (shortName === 'Detailing') {
      return <Detailing />;
    } else if (shortName === 'Battery') {
      return <Battery />;
    }
  };

  const renderItem = useCallback(
    ({item}) => (
      <TouchableOpacity
        style={[common.centeredColumn, styles.w25]}
        onPress={() =>
          /* @ts-expect-error Action will bubble up to the AppStackNav where "Garage By Service" screen is defined */
          navigation.navigate('Garages By Service', {service: item})
        }>
        <View style={styles.whiteCircle}>{getIcon(item.shortName)}</View>

        <Text style={styles.text12} numberOfLines={1}>
          {item.shortName}
        </Text>
      </TouchableOpacity>
    ),
    [navigation],
  );

  return (
    <SafeAreaView style={styles.mainContainer}>
      {loading ? (
        <ActivityIndicator
          size={'large'}
          style={layout.flex1}
          color={palette.PRIMARY}
        />
      ) : (
        <View style={layout.flex1}>
          <View style={styles.innerContainer}>
            <View style={common.spacedRow}>
              <Text style={[styles.semiheader20, styles.capitalize]}>
                Hi {current?.firstName} 👋
              </Text>

              <TouchableOpacity
                /* @ts-expect-error Action will bubble up to the AppStackNav where "Account Setup" screen is defined */
                onPress={() => navigation.navigate('Notifications')}>
                <Bell />
              </TouchableOpacity>
            </View>

            <View style={[spacing.marginTop4, common.flexedRow, styles.gap]}>
              <Navigation />

              <Text style={styles.text16} numberOfLines={1}>
                {current?.location.replace('undefined', '')}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.searchContainer}
              onPress={() =>
                /* @ts-expect-error Action will bubble up to the AppStackNav where "Garage Search" screen is defined */
                navigation.navigate('Garage Search', {businesses})
              }>
              <Ionicons name="search" size={22} color={palette.GRAY500} />

              <Text style={[styles.text16, {color: palette.GRAY500}]}>
                Search garages & services
              </Text>

              <Location size={24} />
            </TouchableOpacity>
          </View>

          <View style={layout.flex1}>
            {region.latitude !== 0 && (
              <MapView
                ref={mapRef}
                // provider={PROVIDER_GOOGLE}
                // initialRegion={{
                //   latitude: coords?.latitude || 51.6133816,
                //   longitude: coords?.longitude || -0.2463566,
                //   // latitude: 51.6133816,
                //   // longitude: -0.2463566,
                //   latitudeDelta: 0.005,
                //   longitudeDelta: 0.005 * ASPECT_RATIO, // Adjusted for screen size
                //   // ...calculateDelta(coords?.latitude, coords?.longitude, 500),
                // }}
                region={region}
                // showsCompass
                // showsUserLocation
                // followsUserLocation
                style={layout.flex1}
                customMapStyle={darkMapStyle}>
                <Marker
                  coordinate={
                    region.latitude !== 0
                      ? {
                          latitude: region.latitude,
                          longitude: region.longitude,
                        }
                      : {latitude: 51.5133816, longitude: -0.2463566}
                  }
                  image={images.marker}
                  title="Me"
                />

                {businesses?.length !== 0 &&
                  businesses?.map(
                    _business =>
                      _business.coordinates.coordinates[0] !== 0 && (
                        <Marker
                          key={_business._id}
                          coordinate={{
                            longitude: _business.coordinates.coordinates[0],
                            latitude: _business.coordinates.coordinates[1],
                          }}
                          image={images.garageMarker}
                          title={_business.businessName}
                        />
                      ),
                  )}
              </MapView>
            )}

            <BottomSheet
              ref={sheetRef}
              snapPoints={snapPoints}
              index={1}
              backgroundStyle={{borderRadius: 0}}
              enableDynamicSizing={false}>
              <View style={styles.bottomContentContainer}>
                <Text style={styles.semiheader20}>
                  What do you want to do today ?
                </Text>

                <BottomSheetFlatList
                  data={services?.slice(0, 8)}
                  renderItem={renderItem}
                  numColumns={4}
                  contentContainerStyle={styles.bottomInnerContainer}
                  columnWrapperStyle={common.justifyBetween}
                />
              </View>
            </BottomSheet>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Home;
