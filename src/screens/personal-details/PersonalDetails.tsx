import React, {FC, useState} from 'react';
import {
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import {Asset, launchImageLibrary} from 'react-native-image-picker';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {AppStackNavParams} from 'navigation/app-stack/AppStackNav';
import {useUser} from 'store/user/hooks';
import {useAuth} from 'store/auth/hooks';
import {Button} from 'components/Button';
import {StatusModal} from 'components/StatusModal';
import Pencil from 'components/svg/Pencil';
import {common, spacing, palette, layout} from 'core/styles';
import styles from './PersonalDetails.styles';

const PersonalDetails: FC<
  NativeStackScreenProps<AppStackNavParams, 'Personal Details'>
> = ({navigation}) => {
  const {current, updateProfile, loading, error, setError, getProfile} =
    useUser();
  const {setFormData} = useAuth();

  const [profileImage, setProfileImage] = useState<Asset | undefined>();

  const pickImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.5,
      selectionLimit: 1,
    });

    if (!result.didCancel && result.assets) {
      setProfileImage(result.assets[0]);
    }
  };

  const handleSubmit = async () => {
    await setFormData(true);

    const formData = new FormData();

    formData.append('profileImage', {
      uri: profileImage?.uri,
      type: 'image/jpg',
      /* @ts-expect-error */
      name: profileImage.uri.split('/').slice(-1)[0],
    });

    const res = await updateProfile(formData);

    if (res && !res.error) {
      await getProfile();
      navigation.navigate('Bottom Tabs');
    }

    await setFormData(false);
  };

  const fields = [
    {
      id: 1,
      key: 'First name',
      value: current?.firstName,
      onPress: () => navigation.navigate('Change Name', {type: 'first'}),
    },
    {
      id: 2,
      key: 'Last name',
      value: current?.lastName,
      onPress: () => navigation.navigate('Change Name', {type: 'last'}),
    },
    {
      id: 3,
      key: 'Email',
      value: current?.email,
    },
    // {
    //   id: 4,
    //   key: 'Address',
    //   value: current?.firstName,
    // },
    {
      id: 5,
      key: 'Phone number',
      value: current?.phone,
      onPress: () => navigation.navigate('Verify Phone'),
    },
  ];

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView
        style={styles.innerContainer}
        contentContainerStyle={styles.contentContainer}>
        <View style={layout.flex1}>
          <TouchableOpacity style={common.alignSelfCenter} onPress={pickImage}>
            <View style={[styles.absoluteCircle, common.centeredRow]}>
              <Pencil />
            </View>

            {profileImage ? (
              <Image
                source={profileImage}
                style={styles.imgCircle}
                resizeMode="cover"
              />
            ) : current?.profileImage ? (
              <Image
                source={{uri: current?.profileImage}}
                style={styles.imgCircle}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.imgCircle}>
                <Text style={styles.semiheader22}>
                  {current?.firstName.charAt(0).toUpperCase()}
                  {current?.lastName.charAt(0).toUpperCase()}
                </Text>
              </View>
            )}
          </TouchableOpacity>

          <View style={[spacing.marginTop24, common.container]}>
            {fields.map((field, _, array) => (
              <View key={field.id}>
                <TouchableOpacity
                  style={common.spacedRow}
                  onPress={field.onPress}
                  activeOpacity={field.onPress ? 0.2 : 1}>
                  <View style={[common.spacedRow, styles.gap]}>
                    {field.value && (
                      <Ionicons
                        name="checkmark-circle"
                        size={20}
                        color={palette.SUCCESS}
                      />
                    )}

                    <Text style={styles.text16}>{field.key}</Text>
                  </View>

                  <View style={[common.flexedRow, styles.gap]}>
                    <Text style={styles.text16}>{field.value || 'N/A'}</Text>

                    {field.onPress && (
                      <Octicons
                        name="pencil"
                        size={18}
                        color={palette.DEFAULT}
                      />
                    )}
                  </View>
                </TouchableOpacity>

                {field !== array[array.length - 1] && (
                  <View style={styles.line} />
                )}
              </View>
            ))}
          </View>
        </View>

        <Button
          title="Save Changes"
          disabled={loading}
          loading={loading}
          onPress={handleSubmit}
        />
      </ScrollView>

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

export default PersonalDetails;
