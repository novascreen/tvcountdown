
import * as React from 'react';
import UIAutoSuggest from 'components/UI/AutoSuggest';

const getSuggestionValue = () => 'Hello';
const renderSuggestion = () => <div>hi</div>;

type State = {
  suggestions: string[],
  value: string,
};

class AutoSuggest extends React.Component<any, State> {
  state = {
    suggestions: ['Hello'],
    value: '',
  };
  handleSuggestionsFetchRequested = () => null;
  handleSuggestionsClearRequested = () => null;
  handleChange = (e: any) => this.setState({ value: e.target.value });
  render() {
    const { suggestions, value } = this.state;
    return (
      <UIAutoSuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={{
          value,
          onChange: this.handleChange,
        }}
      />
    );
  }
}

export default AutoSuggest;
