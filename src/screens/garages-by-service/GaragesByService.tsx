import React, {FC, useState, useEffect} from 'react';
import {
  Text,
  View,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Platform,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {AppStackNavParams} from 'navigation/app-stack/AppStackNav';
import {useUser} from 'store/user/hooks';
import {images} from 'core/images';
import {common, layout, palette, spacing} from 'core/styles';
import styles from './GaragesByService.styles';

const GaragesByService: FC<
  NativeStackScreenProps<AppStackNavParams, 'Garages By Service'>
> = ({navigation, route}) => {
  const {service} = route.params ?? {};

  const {getBusinesses, loading} = useUser();

  const [businesses, setBusinesses] = useState<any[]>([]);

  useEffect(() => {
    getBusinesses({service: service._id}).then(res =>
      setBusinesses(res.payload.data),
    );
  }, [getBusinesses, service._id]);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <KeyboardAvoidingView
        style={layout.flex1}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        behavior="padding">
        {loading ? (
          <ActivityIndicator
            size={'large'}
            style={layout.flex1}
            color={palette.PRIMARY}
          />
        ) : (
          <ScrollView
            style={styles.innerContainer}
            contentContainerStyle={styles.contentContainer}
            keyboardShouldPersistTaps="always">
            <View style={layout.flex1}>
              <View>
                <Text style={styles.semiheader28}>{service.name}</Text>

                <Text style={styles.text17}>
                  The results show garages that provide the services you need
                </Text>

                {businesses?.length !== 0 &&
                  businesses?.map(garage => (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('Garage Profile', {garage})
                      }
                      style={[spacing.marginTop24, common.spacedRow]}
                      key={garage._id}>
                      <View style={[common.flexedRow, styles.gap]}>
                        <Image
                          source={images.checkers}
                          style={styles.image}
                          resizeMode="cover"
                        />

                        <View>
                          <Text style={styles.semiheader16}>
                            {garage.businessName}
                          </Text>
                          <Text style={styles.text13}>
                            {garage.addressLine1 || 'N/A'}
                          </Text>
                        </View>
                      </View>

                      <View>
                        <View
                          style={[
                            common.flexedRow,
                            styles.gap,
                            common.justifyEnd,
                          ]}>
                          <Ionicons
                            name="star"
                            size={24}
                            color={palette.YELLOW}
                          />

                          <Text style={styles.semiheader16}>
                            {garage.avgRating?.toFixed(1) || 0} (
                            {garage.reviewCount})
                          </Text>
                        </View>

                        <Text style={[styles.text13, common.textRight]}>
                          {(garage.distance / 1000).toFixed(0)} Km away
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
              </View>
            </View>

            {/* {search && (
              <Button
                title="Create repair request"
                // onPress={() => handleSubmit()}
                // style={spacing.marginTop24}
                // loading={loading}
                // disabled={loading}
              />
            )} */}
          </ScrollView>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default GaragesByService;
