import React, {FC} from 'react';
import {View, Text, Image, ActivityIndicator} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {useUser} from 'store/user/hooks';
import {images} from 'core/images';
import {formatDate, convertRatingToArray} from 'core/utils';
import {common, layout, palette, spacing} from 'core/styles';
import styles from './Reviews.styles';

interface ReviewsProps {
  garage: any;
  reviews: any[];
}

const Reviews: FC<ReviewsProps> = ({reviews}) => {
  const {loading2} = useUser();

  const avgRating =
    reviews.length > 0
      ? (
          reviews.reduce((acc, review) => acc + review.rating, 0) /
          reviews.length
        )?.toFixed(1)
      : 0;

  return (
    <View style={spacing.marginTop24}>
      {loading2 ? (
        <ActivityIndicator
          size={'large'}
          color={palette.PRIMARY}
          style={layout.flex1}
        />
      ) : (
        <>
          <View style={[common.alignSelfCenter, spacing.marginBottom4]}>
            <Text style={styles.header32}>{avgRating}</Text>

            <View
              style={[
                common.flexedRow,
                styles.gap,
                spacing.marginTop12,
                spacing.marginBottom8,
              ]}>
              {convertRatingToArray(avgRating).map(
                (star, index) => (
                  <Ionicons
                    name={
                      star === 1
                        ? 'star'
                        : star === 0
                        ? 'star-outline'
                        : 'star-half'
                    }
                    size={24}
                    color={palette.YELLOW}
                    key={index}
                  />
                ),
              )}
            </View>

            <Text style={[styles.text16, common.textCenter]}>
              Based on {reviews.length} reviews
            </Text>
          </View>

          <View style={common.line} />

          {reviews.length !== 0 &&
            reviews.map(review => (
              <View style={spacing.marginBottom20} key={review._id}>
                <View style={[common.spacedRow, spacing.marginBottom16]}>
                  <View style={[common.flexedRow, styles.gap]}>
                    <Image
                      source={images.checkers}
                      style={styles.image}
                      resizeMode="cover"
                    />

                    <View>
                      <Text style={styles.semiheader16}>
                        {review.user.firstName} {review.user.lastName}
                      </Text>
                      <Text style={styles.text13}>
                        {formatDate(review.createdAt)}
                      </Text>
                    </View>
                  </View>

                  <View style={[common.flexedRow, styles.gap]}>
                    <Ionicons name="star" size={24} color={palette.YELLOW} />

                    <Text style={styles.semiheader16}>
                      {review.rating.toFixed(1)}
                    </Text>
                  </View>
                </View>

                <Text style={styles.text16}>{review.reviewText}</Text>
              </View>
            ))}
        </>
      )}
    </View>
  );
};

export default Reviews;
