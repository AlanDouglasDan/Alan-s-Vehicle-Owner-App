import React, {FC, useState, useEffect} from 'react';
import {
  Text,
  View,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Platform,
  TextInput,
  Keyboard,
  Image,
  TouchableOpacity,
} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {AppStackNavParams} from 'navigation/app-stack/AppStackNav';
import {Button} from 'components/Button';
import {Empty} from 'components/Empty';
import {BottomSheet} from 'components/BottomSheet';
import {images} from 'core/images';
import {common, layout, palette, spacing} from 'core/styles';
import styles from './GarageSearch.styles';

const sortOptions = [
  {
    id: 1,
    value: 'Relevance',
  },
  {
    id: 2,
    value: 'Distance',
  },
];

const ratingOptions = [
  {
    id: 1,
    value: 'Any',
  },
  {
    id: 2,
    value: '3.5',
  },
  {
    id: 3,
    value: '4.0',
  },
  {
    id: 4,
    value: '4.5',
  },
];

const GarageSearch: FC<
  NativeStackScreenProps<AppStackNavParams, 'Garage Search'>
> = ({navigation, route}) => {
  const {businesses} = route.params ?? {};

  const [_businesses, setBusinesses] = useState<any[]>(businesses);

  const [focused, setFocused] = useState<boolean>(false);
  const [open, setOpen] = useState<'' | 'sort' | 'rating'>('');

  const [search, setSearch] = useState<string>('');
  const [sortOption, setSortOption] = useState<string>('');
  const [ratingFilter, setRatingFilter] = useState<string>('');

  useEffect(() => {
    if (sortOption === 'Distance') {
      setBusinesses(_businesses.sort((a, b) => a.distance - b.distance));
    } else if (sortOption === 'Relevance') {
      setBusinesses(
        _businesses.sort((a, b) => Number(b.avgRating) - Number(a.avgRating)),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortOption]);

  let options;
  if (open === 'sort') {
    options = sortOptions;
  } else if (open === 'rating') {
    options = ratingOptions;
  } else {
    options = [];
  }

  const filteredBusinesses = _businesses
    ?.filter(business => {
      if (!ratingFilter || ratingFilter === 'Any') {
        return business;
      } else {
        return Number(ratingFilter) < Number(business.avgRating);
      }
    })
    ?.filter(business =>
      search
        ? business.businessName.toLowerCase().includes(search.toLowerCase())
        : business,
    );

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
          <View style={layout.flex1}>
            <View
              style={[
                styles.searchContainer,
                focused ? styles.inputFocus : {},
              ]}>
              <Ionicons name="search" size={22} color={palette.GRAY500} />

              <TextInput
                style={styles.input2}
                placeholder="Search garages & services"
                placeholderTextColor={palette.SUPPORT}
                onChangeText={text => setSearch(text)}
                value={search}
                onFocus={() => setFocused(true)}
                onBlur={() => !search && setFocused(false)}
                returnKeyLabel="Done"
                returnKeyType="done"
                onSubmitEditing={Keyboard.dismiss}
              />

              <AntDesign
                name="close"
                size={20}
                color={palette.GRAY500}
                onPress={() => setSearch('')}
              />
            </View>

            {filteredBusinesses.length > 0 && (
              <View style={[spacing.marginTop24, common.flexedRow, styles.gap]}>
                <TouchableOpacity
                  style={[
                    styles.filterContainer,
                    {
                      backgroundColor: sortOption
                        ? palette.NEUTRAL20
                        : palette.WHITE,
                    },
                  ]}
                  onPress={() => setOpen('sort')}>
                  <Text style={styles.semiheader16}>
                    {sortOption || 'Sort by'}
                  </Text>

                  <Ionicons
                    name="caret-down-sharp"
                    size={20}
                    color={palette.TEXT_HEADING}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.filterContainer,
                    {
                      backgroundColor: ratingFilter
                        ? palette.NEUTRAL20
                        : palette.WHITE,
                    },
                  ]}
                  onPress={() => setOpen('rating')}>
                  <Text style={styles.semiheader16}>
                    {ratingFilter || 'Rating'}
                  </Text>

                  <Ionicons
                    name="caret-down-sharp"
                    size={20}
                    color={palette.TEXT_HEADING}
                  />
                </TouchableOpacity>
              </View>
            )}

            <View style={spacing.marginTop24}>
              <Text style={styles.semiheader20}>
                {search ? 'Results' : 'Top garages'}
              </Text>

              {filteredBusinesses?.length !== 0 ? (
                filteredBusinesses?.map(garage => (
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
                ))
              ) : (
                <Empty
                  title="No result"
                  body="Keyword not found. Please check again or try a different keyword"
                />
              )}
            </View>
          </View>
        </ScrollView>

        {((search && filteredBusinesses.length !== 0) ||
          (ratingFilter && ratingFilter !== 'Any')) && (
          <Button
            title="Create repair request"
            onPress={() =>
              navigation.navigate('Create Request', {
                garages: filteredBusinesses,
              })
            }
            style={styles.button}
          />
        )}
      </KeyboardAvoidingView>

      <BottomSheet
        open={open !== ''}
        onClose={() => setOpen('')}
        height={hp(30)}>
        <View style={styles.content}>
          <View style={layout.flex1}>
            <View style={[common.spacedRow, spacing.marginBottom16]}>
              <Text style={styles.semiheader20}>
                {open === 'sort' ? 'Sort by' : 'Rating'}
              </Text>

              <Ionicons
                name="close"
                size={24}
                color={palette.DEFAULT}
                onPress={() => setOpen('')}
              />
            </View>

            {open === 'rating' && (
              <Text style={[styles.semiheader16, spacing.marginBottom8]}>
                At least
              </Text>
            )}

            <View style={[spacing.marginBottom16, styles.flexedContainer]}>
              {options.map(option => (
                <TouchableOpacity
                  key={option.id}
                  style={[
                    styles.tab,
                    {
                      backgroundColor:
                        open === 'sort'
                          ? sortOption === option.value
                            ? palette.NEUTRAL30
                            : palette.WHITE
                          : ratingFilter === option.value
                          ? palette.NEUTRAL30
                          : palette.WHITE,
                    },
                  ]}
                  onPress={() =>
                    open === 'sort'
                      ? setSortOption(option.value)
                      : setRatingFilter(option.value)
                  }>
                  <Text style={styles.semiheader16}>{option.value}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <Button title="Apply" onPress={() => setOpen('')} />
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default GarageSearch;
