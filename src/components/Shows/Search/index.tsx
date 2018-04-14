import * as React from 'react';
import Input from 'material-ui/Input';

type Props = {
  query: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export class Search extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.state = {
      query: props.query,
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.query !== nextProps.query) {
      this.setState({ query: nextProps.query });
    }
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: e.currentTarget.value });
  };

  render() {
    return (
      <form onSubmit={this.props.onSubmit}>
        <Input
          placeholder="Search"
          inputProps={{
            'aria-label': 'Description',
          }}
          onChange={this.handleChange}
        />
      </form>
    );
  }
}

export default Search;
