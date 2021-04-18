import TextField from '@material-ui/core/TextField';

const autocompleteTextFieldProps = () => {
    return (
        ({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
                <TextField
                    label="Location"
                    variant="outlined"
                    fullWidth size="medium"
                    autoFocus
                    {...getInputProps({
                        placeholder: 'Search Places ...',
                        className: 'location-search-input',
                    })}
                />
                <div className="autocomplete-dropdown-container">
                    {loading && <div>Loading...</div>}
                    {suggestions.map(suggestion => {
                        const className = suggestion.active
                            ? 'suggestion-item--active'
                            : 'suggestion-item';
                        const style = suggestion.active
                            ? { backgroundColor: '#dcdee0', cursor: 'pointer', padding: '12px', borderBottom: '1px solid #bbb'}
                            : { backgroundColor: '#edeff2', cursor: 'pointer', padding: '12px', borderBottom: '1px solid #bbb'};
                        return (
                            <div key={suggestion.index}
                                {...getSuggestionItemProps(suggestion, {
                                    className,
                                    style,
                                })}
                            >
                                <span style={{ display: 'inline-block', wordWrap: 'break-word', wordBreak: 'break-word', fontFamily:'sans-serif' }}>
                                    {suggestion.description}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        )
    );
}

export default autocompleteTextFieldProps;