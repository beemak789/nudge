import React from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';

export const ReviewStars = (props) => {
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
  return <View style={{ flexDirection: 'row' }}>{starReviews}</View>;
};
