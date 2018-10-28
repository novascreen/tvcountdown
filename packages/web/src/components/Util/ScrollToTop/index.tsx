import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

type Props = RouteComponentProps<{}>;

export class ScrollToTop extends React.Component<Props> {
  componentDidUpdate(prevProps: Props) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter<Props>(ScrollToTop);
