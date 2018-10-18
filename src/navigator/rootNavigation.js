import {
  createStackNavigator,
  createDrawerNavigator,
} from 'react-navigation';
import HomePage from 'containers/Home';
import TrackList from 'containers/TrackList';

// import tabNavigatior from './tabNavigator';

const stackNavigation = createStackNavigator({
  home: { screen: HomePage },
  trackList: { screen: TrackList },
  // Tab: { screen: tabNavigatior },
}, {
  headerMode: 'float',
  // navigationOptions: {
  //   header: props => <Header {...props} isIconMenu={true} />,
  // },
  // transitionConfig: () => ({
  //   transitionSpec: {
  //     duration: 500,
  //     easing: Easing.out(Easing.poly(4)),
  //     timing: Animated.timing,
  //     useNativeDriver: true,
  //   },
  //   screenInterpolator: (sceneProps) => {
  //     const { layout, position, scene } = sceneProps;
  //     const { index } = scene;

  //     const width = layout.initWidth;
  //     const translateX = position.interpolate({
  //       inputRange: [index - 1, index, index + 1],
  //       outputRange: [width, 0, 0],
  //     });

  //     const opacity = position.interpolate({
  //       inputRange: [index - 1, index],
  //       outputRange: [0, 1],
  //     });

  //     return { opacity, transform: [{ translateX }] };
  //   },
  // }),
});

const RootNavigator = createDrawerNavigator(
  { Home: stackNavigation },
  // { contentComponent: DrawerNavigation },
);

export default RootNavigator;
