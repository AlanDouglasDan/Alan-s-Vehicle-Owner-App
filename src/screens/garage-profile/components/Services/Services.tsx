import React, {FC, useEffect} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
// import AntDesign from 'react-native-vector-icons/AntDesign';

import {useVehicle} from 'store/vehicle/hooks';
import {common, palette, spacing} from 'core/styles';
import styles from './Services.styles';

interface ServicesProps {
  garage: any;
}

const Services: FC<ServicesProps> = ({garage}) => {
  const {getServices, services, loading} = useVehicle();

  useEffect(() => {
    !services && getServices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const servicesOffered = garage.services?.map(serviceId => {
    const serviceObj = services?.find(_service => _service._id === serviceId);

    return serviceObj;
  });

  const groupServicesByServiceType = (_data: any): any => {
    const groupedMessages = {};
    _data?.forEach(data => {
      const dateString = data?.serviceType;
      if (!groupedMessages[dateString]) {
        groupedMessages[dateString] = [];
      }

      groupedMessages[dateString].push({id: data?._id, ...data});
    });

    return Object.entries(groupedMessages);
  };

  return loading ? (
    <ActivityIndicator
      size={'large'}
      color={palette.PRIMARY}
      style={{height: '100%'}}
    />
  ) : (
    <View style={spacing.marginTop24}>
      {groupServicesByServiceType(servicesOffered)?.map(
        ([serviceType, _services], _index) => (
          <View
            style={[spacing.marginBottom16, spacing.marginTop12]}
            key={_index}>
            <Text style={styles.semiheader17}>{serviceType}</Text>

            <View style={common.line} />

            {_services.map((service, index) => (
              <Text style={[styles.text16, spacing.marginBottom16]} key={index}>
                {service.name}
              </Text>
            ))}
          </View>
        ),
      )}
    </View>
  );
};

export default Services;
