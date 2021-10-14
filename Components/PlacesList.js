import React from 'react';
import {
  StyleSheet,
  FlatList,
  SafeAreaView,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import { ListItem, Text, Icon, Avatar, Divider } from 'react-native-elements';
import { _fetchPlaces } from '../store/places';
import { useDispatch, useSelector } from 'react-redux';

const ReviewStars = (props) => {
  const FullStar = (key) => (
    <Icon color="#FFC300" key={key} type="ionicon" name="ios-star" size={12} />
  );

  const HalfStar = (key) => (
    <Icon
      color="#FFC300"
      key={key}
      type="ionicon"
      name="md-star-half"
      size={12}
    />
  );

  const EmptyStar = (key) => (
    <Icon
      color="#FFC300"
      key={key}
      type="ionicon"
      name="ios-star-outline"
      size={12}
    />
  );

  const { stars } = props;
  let starReviews = [];
  for (let i = 1; i <= 5; i++) {
    let star = FullStar(i);
    if (stars + 1 - i > 0 && stars + 1 - i < 1) {
      star = HalfStar(i);
    } else if (i > stars) {
      star = EmptyStar(i);
    }
    starReviews.push(star);
  }
  return <View style={{ flex: 1, flexDirection: 'row' }}>{starReviews}</View>;
};

const PlacesList = (props) => {
  const dispatch = useDispatch();
  const places = useSelector((state) => state.places);

  if (!places.length) {
    return (
      <SafeAreaView style={styles.container2}>
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => dispatch(_fetchPlaces())}
          >
            <Image
              style={styles.nudgie}
              source={require('../public/nudgie2.png')}
            />
            <Text style={styles.buttonText}>Press to complete a task!</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const baseImage =
    'https://images.unsplash.com/photo-1552334405-4929565998d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80';
  return (
    <SafeAreaView style={styles.container2}>
      {places.length <= 0 && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" />
        </View>
      )}
      {places.length > 0 && (
        <>
          <TouchableOpacity
            style={styles.button}
            onPress={() => dispatch(_fetchPlaces())}
          >
            <Image
              style={styles.nudgie}
              source={require('../public/nudgie2.png')}
            />
            <Text style={styles.buttonText}>Press to complete a task!</Text>
          </TouchableOpacity>

          <FlatList
            data={places}
            renderItem={({ item }) => (
              <TouchableOpacity>
                <ListItem chevron={{ color: '#e90000', size: 30 }}>
                  <Avatar
                    title={item.name}
                    rounded={false}
                    size={'large'}
                    source={
                      item.photos && {
                        uri: baseImage,
                      }
                    }
                    containerStyle={{ marginLeft: 20 }}
                  />
                  <ListItem.Content>
                    <ListItem.Title>
                      <View style={styles.rowDirection}>
                        <Text>{item.name}</Text>
                        <Text>distance</Text>
                      </View>
                    </ListItem.Title>
                    <ListItem.Subtitle>
                      {item.rating && (
                        <View>
                          <View style={styles.startReviewsContainer}>
                            <ReviewStars stars={item.rating} />
                            <Text style={styles.rarting}>
                              {item.rating.toFixed(1)}
                            </Text>
                          </View>
                          <View>
                            <Text>{item.vicinity}</Text>
                          </View>
                        </View>
                      )}
                    </ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
                <Divider orientation="horizontal" />
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default PlacesList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  container2: {
    flex: 1,
    justifyContent: 'center',
  },
  menuTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#575757',
    marginLeft: 20,
    marginTop: 10,
  },
  mapView: {
    flex: 1,
    justifyContent: 'center',
  },
  restaurantList: {
    flex: 1,
    justifyContent: 'center',
  },
  chevron: {
    color: '#e90000',
  },
  rowDirection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  startReviewsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  rating: {
    marginLeft: 'auto',
  },
  button: {
    backgroundColor: '#EBF6EF',
    padding: 5,
    borderRadius: 25,
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: '#FFFFFF',
    margin: 5,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 1,
      width: -2,
    },
    elevation: 2,
  },
  buttonText: {
    color: '#4a7c59',
    fontWeight: '700',
    fontSize: 22,
  },
  nudgie: {
    width: 50,
    height: 50,
    backgroundColor: 'transparent',
    margin: 5,
  },
  noTasksText: {
    fontWeight: '700',
    fontSize: 20,
  },
});
