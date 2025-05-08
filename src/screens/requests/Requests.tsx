import React, {FC, useState, useEffect} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {BottomTabsNavParams} from 'navigation/bottom-tabs-nav/BottomTabsNav';
import {useRequest} from 'store/request/hooks';
import {Button} from 'components/Button';
import {Empty} from 'components/Empty';
import {RequestCard} from 'components/RequestCard';
import {common, layout, palette, spacing} from 'core/styles';
import styles from './Requests.styles';

const Requests: FC<NativeStackScreenProps<BottomTabsNavParams, 'Requests'>> = ({
  navigation,
}) => {
  const {getRequests, requests, loading, getBids, bids} = useRequest();

  const fetchRequestsAndBids = async () => {
    getRequests();
    getBids();
  };

  useEffect(() => {
    fetchRequestsAndBids();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [active, setActive] = useState<number>(1);

  const empty = (
    <Empty
      title="No requests"
      body="There are no requests to show"
      buttonText="Create a request"
      onPress={() =>
        // @ts-expect-error
        navigation.navigate('Create Request', {garages: []})
      }
    />
  );

  const createRequestButton = (
    <Button
      title="Create a request"
      onPress={() =>
        // @ts-expect-error
        navigation.navigate('Create Request', {garages: []})
      }
      style={spacing.marginTop24}
    />
  );

  const tabs = [
    {
      id: 1,
      name: 'All',
      component:
        requests?.length !== 0 ? (
          <>
            {requests
              ?.filter(
                request =>
                  request.status !== 'Booked' &&
                  request.status !== 'Started' &&
                  request.status !== 'Accepted',
              )
              ?.map(request => (
                <RequestCard
                  key={request._id}
                  request={request}
                  navigation={navigation}
                  status={request.status}
                />
              ))}

            {createRequestButton}
          </>
        ) : (
          empty
        ),
    },
    {
      id: 2,
      name: 'Pending',
      component:
        requests?.filter(request => request.status === 'Pending')?.length !==
        0 ? (
          <>
            {requests
              ?.filter(request => request.status === 'Pending')
              ?.map(request => (
                <RequestCard
                  key={request._id}
                  request={request}
                  navigation={navigation}
                  status={request.status}
                />
              ))}

            {createRequestButton}
          </>
        ) : (
          empty
        ),
    },
    {
      id: 3,
      name: 'Submitted',
      component:
        bids?.filter(
          bid =>
            bid.status === 'Submitted' ||
            // bid.status === 'Rejected' ||
            bid.status === 'Accepted',
        )?.length !== 0 ? (
          <>
            {bids
              ?.filter(
                bid =>
                  bid.status === 'Submitted' ||
                  // bid.status === 'Rejected' ||
                  bid.status === 'Accepted',
              )
              ?.map(bid => (
                <RequestCard
                  key={bid._id}
                  request={bid.request}
                  navigation={navigation}
                  status={bid.status}
                  bid={bid}
                />
              ))}

            {createRequestButton}
          </>
        ) : (
          empty
        ),
    },
    {
      id: 4,
      name: 'Booked',
      component:
        bids?.filter(bid => bid.status === 'Booked')?.length !== 0 ? (
          <>
            {bids
              ?.filter(bid => bid.status === 'Booked')
              ?.map(bid => (
                <RequestCard
                  key={bid._id}
                  request={bid.request}
                  navigation={navigation}
                  status={bid.status}
                  bid={bid}
                />
              ))}

            {createRequestButton}
          </>
        ) : (
          empty
        ),
    },
    {
      id: 5,
      name: 'Complete',
      component:
        bids?.filter(bid => bid.status === 'Completed')?.length !== 0 ? (
          <>
            {bids
              ?.filter(bid => bid.status === 'Completed')
              ?.map(bid => (
                <RequestCard
                  key={bid._id}
                  request={bid.request}
                  navigation={navigation}
                  status={bid.status}
                  bid={bid}
                  // bidPrices={bid.prices}
                />
              ))}
          </>
        ) : (
          empty
        ),
    },
  ];

  return (
    <SafeAreaView style={styles.mainContainer}>
      {loading ? (
        <ActivityIndicator
          size={'large'}
          style={layout.flex1}
          color={palette.PRIMARY}
        />
      ) : (
        <ScrollView
          style={styles.innerContainer}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={() => fetchRequestsAndBids()}
            />
          }>
          <View style={common.spacedRow}>
            <Text style={styles.semiheader28}>Requests</Text>

            <Ionicons name="filter" size={24} color={palette.TEXT_HEADING} />
          </View>

          <View style={[spacing.marginTop24, styles.flexedRow]}>
            {tabs.map(tab => (
              <TouchableOpacity
                key={tab.id}
                style={[styles.tab, active === tab.id ? styles.active : {}]}
                onPress={() => setActive(tab.id)}>
                <Text style={styles.text13}>{tab.name}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {tabs[active - 1].component}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Requests;
