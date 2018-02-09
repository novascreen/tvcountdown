import * as React from 'react';
import { Fragment } from 'react';
import * as moment from 'moment';

import ScheduleDate from 'components/ScheduleDate';
import ScheduleList from 'components/ScheduleList';

const DATE_FORMAT = 'YYYY-MM-DD';

export class Schedule extends React.Component {
  state = {
    dateValue: 'today',
  };

  getDate() {
    const { dateValue } = this.state;
    switch (dateValue) {
      case 'last-7':
      case 'next-7': {
        const mod = dateValue === 'last-7' ? -8 : 0;
        let dates = (new Array<string>(7)).fill('');
        dates = dates.map((date, index) => (
          moment().add(index + 1 + mod, 'days').format(DATE_FORMAT)
        ));
        return dates.join(',');
      }
      case 'yesterday': {
        return moment().subtract(1, 'day').format(DATE_FORMAT);
      }
      case 'tomorrow': {
        return moment().add(1, 'day').format(DATE_FORMAT);
      }
      default:
        return moment().format(DATE_FORMAT);
    }
  }

  handleDateChange = (e: any, value: string) => {
    this.setState({ dateValue: value });
  }

  handlePageChange = (e: any, value: string) => {
    this.setState({ page: value });
  }

  render() {
    const { dateValue } = this.state;
    const date = this.getDate();
    return (
      <Fragment>
        <ScheduleDate value={dateValue} onChange={this.handleDateChange} />
        <ScheduleList date={date} />
      </Fragment>
    );
  }
}

export default Schedule;
