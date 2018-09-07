import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  ScrollView,
  Text,
  View,
} from 'react-native';
import moment from 'moment';
import { findIndex } from 'lodash';
import Dates from './Dates';
import styles from './styles';

const { width: screenWidth } = Dimensions.get('window');
const formatMonth = date => date.format('MMMM');
const formatYear = date => date.format('YYYY');

export default class Calendar extends PureComponent {
  // Initialize the state with default values
  constructor(props) {
    super(props);
    this.state = {
      allDatesHaveRendered: false,
      currentDateIndex: props.showDaysBeforeCurrent,
      dates: this.getDates(),
      dayWidths: undefined,
      scrollPositionX: 0,
      visibleMonths: undefined,
      visibleYears: undefined,
    };
  }

  // Get an array of dates for showing in a horizontal scroll view
  getDates = () => {
    const {
      currentDate,
      showDaysBeforeCurrent,
      showDaysAfterCurrent,
    } = this.props;

    // Go `showDaysBeforeCurrent` ago before today or custom `currentDate`
    const startDay = moment(currentDate || undefined)
      .subtract(showDaysBeforeCurrent + 1, 'days');
    // Number of days in total
    const totalDaysCount = showDaysBeforeCurrent + showDaysAfterCurrent + 1;

    // And return an array of `totalDaysCount` dates
    return [...Array(totalDaysCount)].map(() => startDay.add(1, 'day').clone());
  };

  // Returns a subset of dates currently visible on the screen
  getVisibleDates = () => {
    const {
      dates,
      dayWidths,
      scrollPositionX,
    } = this.state;

    if (!dayWidths) {
      return;
    }

    let datePositionX = 0;
    let firstVisibleDateIndex;
    let lastVisibleDateIndex;

    // Iterate through `dayWidths` to  $FlowFixMe
    Object.values(dayWidths).some((width, index) => {
      if (firstVisibleDateIndex === undefined // not set yet
        && datePositionX >= scrollPositionX // first date visible
      ) {
        firstVisibleDateIndex = index > 0 ? index - 1 : index;
      }

      if (lastVisibleDateIndex === undefined // not set yet
        && datePositionX >= scrollPositionX + screenWidth // first date not visible behind the right edge
      ) {
        lastVisibleDateIndex = index;
      }

      // Increment date position by its width for the next iteration
      datePositionX += width;

      // return true when both first and last visible days found to break out of loop
      return !!(firstVisibleDateIndex && lastVisibleDateIndex);
    });

    // Return a subset of visible dates only
    return dates.slice(firstVisibleDateIndex, lastVisibleDateIndex);
  };

  // Format as a string the month(s) and the year(s) of the dates currently visible
  getVisibleMonthAndYear = () => {
    const {
      dates,
      visibleMonths,
      visibleYears,
    } = this.state;

    if (!visibleMonths || !visibleYears) {
      // Return the month and the year of the very first date
      if (dates) {
        const firstDate = dates[0];
        return `${formatMonth(firstDate)}, ${formatYear(firstDate)}`;
      }
      return undefined;
    }

    // One or two months withing the same year
    if (visibleYears.length === 1) {
      return `${visibleMonths.join(' – ')},  ${visibleYears[0]}`;
    }

    // Two months within different years
    return visibleMonths
      .map((month, index) => `${month}, ${visibleYears[index]}`)
      .join(' – ');
  };

  // Update visible month(s) and year(s) of the dates currently visible on the screen
  updateVisibleMonthAndYear = () => {
    const { allDatesHaveRendered, currentDateIndex, dates } = this.state;

    if (!allDatesHaveRendered) {
      return;
    }

    const visibleDates = this.getVisibleDates();

    if (!visibleDates) {
      return;
    }

    const visibleMonths = [];
    const visibleYears = [];

    // visibleDates.forEach((date) => {
    //   const month = formatMonth(date);
    //   const year = formatYear(date);
    //   if (!visibleMonths.includes(month)) {
    //     visibleMonths.push(month);
    //   }
    //   if (!visibleYears.includes(year)) {
    //     visibleYears.push(year);
    //   }
    // });

    visibleMonths.push(formatMonth(dates[currentDateIndex]));
    visibleYears.push(formatYear(dates[currentDateIndex]));

    this.setState({
      visibleMonths,
      visibleYears,
    });
  };

  scrollToCurrentDay = () => {
    const {
      allDatesHaveRendered,
      currentDateIndex,
      dayWidths,
    } = this.state;

    // Make sure we have all required values
    if (!allDatesHaveRendered || currentDateIndex === undefined || currentDateIndex === null) {
      return;
    }

    // Put all day width values into a simple array $FlowFixMe
    const dayWidthsArray = Object.values(dayWidths);
    // Total width all days take
    const allDaysWidth = dayWidthsArray.reduce((total, width) => width + total, 0);
    // Current day button width
    const currentDayWidth = dayWidthsArray[currentDateIndex];
    // Minimal possible X position value to prevent scrolling before the first day
    const minX = 0;
    // Maximum possible X position value to prevent scrolling after the last day
    const maxX = allDaysWidth > screenWidth ? allDaysWidth - screenWidth : 0; // no scrolling if there's nowhere to scroll

    let scrollToX;

    scrollToX = dayWidthsArray
      // get all days before the target one
      .slice(0, currentDateIndex + 1)
      // and calculate the total width
      .reduce((total, width) => width + total, 0) - (screenWidth / 2) - (currentDayWidth / 2);

    // Do not scroll over the left edge
    if (scrollToX < minX) {
      scrollToX = 0;
    } else if (scrollToX > maxX) { // Do not scroll over the right edge
      scrollToX = maxX;
    }

    this.scrollView.scrollTo({ x: scrollToX });
  };

  onSelectDay = (index) => {
    const { dates } = this.state;
    const { onSelectDate } = this.props;
    this.setState({ currentDateIndex: index }, () => {
      if (index > 4) {
        this.scrollToCurrentDay();
      }
    });
    onSelectDate(dates[index]);
  };

  onRenderDay = (index, width) => {
    const { dayWidths } = this.state;
    const {
      showDaysBeforeCurrent,
      showDaysAfterCurrent,
    } = this.props;

    // Check whether all date have been rendered already
    const allDatesHaveRendered = dayWidths
      && Object.keys(dayWidths).length >= showDaysBeforeCurrent + showDaysAfterCurrent;

    this.setState(prevState => ({
      allDatesHaveRendered,
      dayWidths: {
        // keep all existing widths added previously
        ...prevState.dayWidths,
        // keep the index for calculating scrolling position for each day
        [index]: width,
      },
    }), () => {
      if (allDatesHaveRendered) {
        this.scrollToCurrentDay();
        this.updateVisibleMonthAndYear();
      }
    });
  };

  onLoadmoreDay = (index) => {
    const { dates } = this.state;
    let clDate = [...dates];

    if (index >= dates.length - 5) {
      const anchorDay = moment(dates[dates.length - 1]);
      clDate = clDate.concat([...Array(5)].map(() => anchorDay.add(1, 'day').clone()));
    }

    return clDate;
  }

  onScroll = (event) => {
    const { dates } = this.state;
    const { nativeEvent: { contentOffset: { x } } } = event;
    const index = Math.round(((x + (50)) / 50)) - 1;

    const currenDateIndex = findIndex(dates, (date) => {
      const currentDateTimestamp = moment().format('x');
      return moment(+currentDateTimestamp).isSame(+date.format('x'), 'day');
    });

    if (index < currenDateIndex) {
      return;
    }

    this.setState({
      scrollPositionX: x,
      currentDateIndex: index,
      dates: this.onLoadmoreDay(index),
    }, this.updateVisibleMonthAndYear);
  };

  render() {
    const {
      dates,
      currentDateIndex,
    } = this.state;
    const visibleMonthAndYear = this.getVisibleMonthAndYear();

    return (
      <View>
        <Text style={styles.visibleMonthAndYear}>
          {visibleMonthAndYear}
        </Text>
        <ScrollView
          ref={(scrollView) => { this.scrollView = scrollView; }}
          horizontal={true} // Enable horizontal scrolling
          showsHorizontalScrollIndicator={false} // Hide horizontal scroll indicators
          automaticallyAdjustContentInsets={false} // Do not adjust content automatically
          onScroll={this.onScroll}
        >
          <Dates
            dates={dates}
            currentDateIndex={currentDateIndex}
            onSelectDay={this.onSelectDay}
            onRenderDay={this.onRenderDay}
          />
        </ScrollView>
      </View>
    );
  }
}

Calendar.propTypes = {
  currentDate: PropTypes.any,
  showDaysBeforeCurrent: PropTypes.number,
  showDaysAfterCurrent: PropTypes.number,
  onSelectDate: PropTypes.func,
};

Calendar.defaultProps = {
  currentDate: moment(),
  showDaysBeforeCurrent: 0,
  showDaysAfterCurrent: 14,
  onSelectDate: () => {},
};
