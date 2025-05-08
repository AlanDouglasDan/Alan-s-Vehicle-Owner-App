import React, {FC} from 'react';
import {View, Text} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import {common, palette, spacing} from 'core/styles';
import styles from './ServiceProvider.styles';

interface ServiceProviderProps {
  garage: any;
}

const ServiceProvider: FC<ServiceProviderProps> = ({garage}) => {
  return (
    <View>
      <View style={[spacing.marginTop24, common.spacedRow]}>
        <View>
          <Text style={styles.semiheader16}>
            {garage.user.firstName} {garage.user.lastName}
          </Text>
          <Text style={styles.text13}>Garage owner</Text>
        </View>

        <View>
          <Text style={[styles.semiheader16, common.textRight]}>N/A</Text>
          <Text style={styles.text13}>Jobs completed</Text>
        </View>
      </View>

      <View style={spacing.marginTop24}>
        <Text style={styles.text16}>Contact info</Text>

        <View style={[spacing.marginTop4, common.container]}>
          <View style={[common.flexedRow, styles.gap]}>
            <Feather name="phone" size={20} color={palette.DEFAULT} />

            <Text style={styles.text16}>{garage.user.phone}</Text>
          </View>

          <View style={common.line} />

          <View style={[common.flexedRow, styles.gap]}>
            <Feather name="mail" size={20} color={palette.DEFAULT} />

            <Text style={styles.text16}>{garage.user.email}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ServiceProvider;
