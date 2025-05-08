import React, {FC, useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  Image,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {Asset, launchImageLibrary} from 'react-native-image-picker';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {AppStackNavParams} from 'navigation/app-stack/AppStackNav';
import {useVehicle} from 'store/vehicle/hooks';
import {useAuth} from 'store/auth/hooks';
import Upload from 'components/svg/Upload';
import {Button} from 'components/Button';
import {StatusModal} from 'components/StatusModal';
import {formatFileSize} from 'core/utils';
import {layout, spacing, common, palette} from 'core/styles';
import styles from './VehicleImage.styles';

const VehicleImage: FC<
  NativeStackScreenProps<AppStackNavParams, 'Add Vehicle Image'>
> = ({navigation, route}) => {
  const {id} = route.params ?? {};

  const {loading, error, setError, getVehicles, addVehicleImage} = useVehicle();
  const {setFormData} = useAuth();

  const [images, setImages] = useState<Asset[]>([]);

  const pickImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.5,
      selectionLimit: 5,
    });

    if (!result.didCancel && result.assets) {
      setImages(result.assets);
    }
  };

  const removeImage = (uri: any) => {
    const newArray = images.filter(obj => obj.uri !== uri);

    setImages(newArray);
  };

  const onSubmit = async () => {
    if (images.length === 0) {
      await getVehicles();
      navigation.navigate('Bottom Tabs');
    } else {
      await setFormData(true);

      const formData = new FormData();

      formData.append('id', id);

      images.forEach(image => {
        formData.append('images', {
          uri: image.uri,
          type: 'image/jpg',
          /* @ts-expect-error */
          name: image.uri.split('/').slice(-1)[0],
        });
      });

      const res = await addVehicleImage(formData);

      if (res && !res.error) {
        await getVehicles();
        navigation.navigate('Bottom Tabs');
      }

      await setFormData(false);
    }
  };

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
            <View>
              <Text style={styles.semiheader28}>Add Vehicle</Text>

              <Text style={[styles.text16, spacing.marginTop4]}>
                Upload Images of your Vehicle
              </Text>
            </View>

            <View style={styles.progressBar}>
              <View style={styles.progressValue} />
            </View>

            <View style={spacing.marginTop20}>
              <Text style={styles.semiheader17}>Vehicle images</Text>

              <TouchableOpacity
                style={[styles.dottedContainer, spacing.marginTop8]}
                onPress={pickImage}>
                <View style={styles.circle}>
                  <Upload />
                </View>

                <Text
                  style={[
                    styles.text13,
                    spacing.marginTop12,
                    spacing.marginBottom4,
                  ]}>
                  Click to Upload
                </Text>

                <Text style={styles.text12}>(Max. File size: 25 MB)</Text>
              </TouchableOpacity>
            </View>

            {images.length !== 0 &&
              images.map((image, index) => (
                <View
                  style={[common.container, spacing.marginTop24]}
                  key={index}>
                  <View style={[common.spacedRow, common.alignStart]}>
                    <View
                      style={[common.flexedRowStart, styles.gap, layout.flex1]}>
                      <Image
                        source={{uri: image.uri}}
                        resizeMode="cover"
                        style={styles.image}
                      />

                      <View style={layout.flex1}>
                        <Text style={styles.semiheader13} numberOfLines={1}>
                          {image.fileName}
                        </Text>

                        <Text style={styles.text12}>
                          {formatFileSize(image.fileSize || 0)}
                        </Text>

                        <TouchableOpacity style={spacing.marginTop8}>
                          <Text style={styles.semiheader13}>Click to view</Text>
                        </TouchableOpacity>
                      </View>
                    </View>

                    <Feather
                      name="trash-2"
                      size={20}
                      color={palette.TEXT_HEADING}
                      onPress={() => removeImage(image.uri)}
                    />
                  </View>
                </View>
              ))}
          </View>

          <Button
            title="Add Vehicle"
            onPress={onSubmit}
            style={spacing.marginTop24}
            loading={loading}
            disabled={loading}
          />
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

export default VehicleImage;
