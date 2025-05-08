import React, {FC, useState} from 'react';
import {
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {BottomTabsNavParams} from 'navigation/bottom-tabs-nav/BottomTabsNav';
import {useAuth} from 'store/auth/hooks';
import {useUser} from 'store/user/hooks';
import User3 from 'components/svg/User3';
import Notifications from 'components/svg/Notifications';
import Biometrics from 'components/svg/Biometrics';
import Passcode from 'components/svg/Passcode';
import Mail from 'components/svg/Mail';
import Support from 'components/svg/Support';
import Trash from 'components/svg/Trash';
import {common, spacing, palette} from 'core/styles';
import styles from './Profile.styles';

const Profile: FC<NativeStackScreenProps<BottomTabsNavParams, 'Profile'>> = ({
  navigation,
}) => {
  const {logOut} = useAuth();
  const {current} = useUser();

  const [isBiometricsEnabled, setIsBiometricsEnabled] = useState(false);

  const logoutFunc = async () => {
    await logOut();
  };

  const menu = [
    {
      header: 'Account',
      subMenu: [
        {
          id: 1,
          property: 'Personal details',
          icon: <User3 />,
          screen: 'Personal Details',
        },
        {
          id: 2,
          property: 'Notifications',
          icon: <Notifications />,
          screen: 'Notifications Setting',
        },
        {
          id: 3,
          property: 'Delete Account',
          icon: <Trash />,
          screen: 'Delete Account',
        },
      ],
    },
    {
      header: 'Security',
      subMenu: [
        {
          id: 1,
          property: 'Biometrics Login',
          icon: <Biometrics />,
          screen: null,
        },
        {
          id: 2,
          property: 'Password',
          icon: <Passcode />,
          screen: 'Change Password',
        },
      ],
    },
    {
      header: 'Support',
      subMenu: [
        {
          id: 1,
          property: 'Contact us',
          icon: <Mail />,
          screen: 'Contact Us',
        },
        {
          id: 2,
          property: 'Help center',
          icon: <Support />,
          screen: 'Help Center',
        },
      ],
    },
  ];

  const toggleSwitch = () => {
    setIsBiometricsEnabled(previousState => !previousState);
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView
        style={styles.innerContainer}
        contentContainerStyle={styles.contentContainer}>
        <View style={common.alignSelfCenter}>
          {current?.profileImage ? (
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
        </View>

        <View style={[spacing.marginTop16, common.alignSelfCenter]}>
          <Text style={styles.semiheader16}>
            {current?.firstName} {current?.lastName}
          </Text>

          <Text style={styles.text13}>{current?.email}</Text>
        </View>

        <View>
          {menu.map((section, index) => (
            <View key={index} style={spacing.marginTop32}>
              <Text style={styles.text16}>{section.header}</Text>

              <View style={[spacing.marginTop4, common.container]}>
                {section.subMenu.map((field, _, array) => (
                  <View key={field.id}>
                    <TouchableOpacity
                      style={common.spacedRow}
                      onPress={() =>
                        field.screen !== null &&
                        // @ts-expect-error
                        navigation.navigate(field.screen)
                      }>
                      <View style={[common.spacedRow, styles.gap]}>
                        {field.icon}

                        <Text style={styles.text16}>{field.property}</Text>
                      </View>

                      {field.screen === null ? (
                        <Switch
                          style={{transform: [{scaleX: 0.8}, {scaleY: 0.8}]}}
                          trackColor={{
                            false: palette.WHITE,
                            true: palette.SUCCESS,
                          }}
                          thumbColor={palette.WHITE}
                          ios_backgroundColor={palette.MID_GRAY}
                          onValueChange={toggleSwitch}
                          value={isBiometricsEnabled}
                        />
                      ) : (
                        <Entypo
                          name="chevron-right"
                          size={20}
                          color={palette.DEFAULT}
                        />
                      )}
                    </TouchableOpacity>

                    {field.id !== array.length && <View style={styles.line} />}
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.button, common.centeredRow, spacing.marginTop32]}
          onPress={logoutFunc}>
          <MaterialIcons name="logout" size={24} color={palette.PRIMARY} />

          <Text style={[styles.semiheader16, {color: palette.PRIMARY}]}>
            Log Out
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
