import React, {FC, useState, useRef} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {AppStackNavParams} from 'navigation/app-stack/AppStackNav';
import {palette, common} from 'core/styles';
import styles from './Images.styles';

const viewConfigRef = {viewAreaCoveragePercentThreshold: 95};

const Images: FC<NativeStackScreenProps<AppStackNavParams, 'Images'>> = ({
  navigation,
  route,
}) => {
  const {images, currentIndex: _currentIndex} = route.params ?? {};

  const [currentIndex, setCurrentIndex] = useState<number>(_currentIndex);

  const flatListref = useRef<any>();

  const onViewRef = useRef(({changed}: {changed: any}) => {
    if (changed[0].isViewable) {
      setCurrentIndex(changed[0].index);
    }
  });

  const renderItem = ({item}) => {
    return (
      <View style={styles.flexedRow}>
        <Image
          source={{uri: item}}
          resizeMode="contain"
          style={styles.hotelImage}
        />
      </View>
    );
  };

  const scrollToIndex = (index: number) => {
    flatListref.current?.scrollToIndex({animated: true, index});
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.innerContainer}>
        <TouchableOpacity
          style={[styles.closeIcon, common.shadow]}
          onPress={() => navigation.goBack()}>
          <Feather name="x" size={24} color={palette.NEUTRAL30} />
        </TouchableOpacity>

        <FlatList
          data={images}
          renderItem={renderItem}
          keyExtractor={item => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          ref={ref => {
            flatListref.current = ref;
          }}
          bounces={false}
          bouncesZoom={false}
          alwaysBounceHorizontal={false}
          viewabilityConfig={viewConfigRef}
          onViewableItemsChanged={onViewRef.current}
          decelerationRate={0}
        />

        <View style={styles.dotView}>
          {images.map(({}, index: number) => {
            return (
              <TouchableOpacity
                key={index.toString()}
                onPress={() => scrollToIndex(index)}
                style={index === currentIndex ? styles.active : {}}>
                <Image
                  source={{
                    uri: images[index],
                  }}
                  resizeMode={'cover'}
                  style={styles.preview}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Images;
