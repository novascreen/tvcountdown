import * as React from 'react';
import { Fragment } from 'react';
import { RouteComponentProps } from 'react-router';
import * as qs from 'query-string';
import Grid from 'material-ui/Grid';
import Box from 'components/UI/Box';
import Search from 'components/Shows/Search';
import SearchResults from 'components/Shows/SearchResults';
import Favorites from 'components/Shows/Favorites';

type Props = {} & RouteComponentProps<{}>;

type State = {
  query: string;
};

const getQuery = (props: Props) => qs.parse(props.location.search).search;

export class Shows extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);

    console.log(props);

    this.state = {
      query: getQuery(props),
    };
  }

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.history.push(`/shows?search=${this.state.query}`);
  };

  render() {
    const query = getQuery(this.props);
    return (
      <Fragment>
        <Box mV={3}>
          <Grid container justify="center">
            <Search query={query} onSubmit={this.handleSubmit} />
          </Grid>
        </Box>
        <Box mV={3}>
          {query && <SearchResults />}
          {!query && <Favorites />}
        </Box>
      </Fragment>
    );
  }
}

export default Shows;
