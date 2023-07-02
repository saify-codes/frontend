import context from '@/context/context';
import React, { useContext, useState } from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

const LocationSearchInput = () => {
  const a=useContext(context)
  const [address, setAddress] = useState('');

  const handleChange = (newAddress) => {
    setAddress(newAddress);
  };
const setselectedlocation=a.setselectedlocation
  const handleSelect = (selectedAddress) => {
    geocodeByAddress(selectedAddress)
      .then((results) => {
       
       setAddress(results[0].formatted_address)
       getLatLng(results[0]).then((latLng) => {
        setselectedlocation({lat:latLng.lat,lng:latLng.lng})
        console.log('Success', latLng)
      })
       .catch((error) => console.error('Error', error));

      })
    
  };

  return (
    <PlacesAutocomplete
      value={address}
      onChange={handleChange}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <input
          
            {
              ...getInputProps({
              placeholder: 'Search Places ...',
              className: 'location-search-input',
             
            })
          } 
          value={address}
          autoComplete='true'
          />
          <div className="autocomplete-dropdown-container">
            {loading && <div>Loading...</div>}
            {suggestions.map((suggestion,index) => {
              const className = suggestion.active
                ? 'suggestion-item--active'
                : 'suggestion-item';
              // inline style for demonstration purpose
              const style = suggestion.active
                ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                : { backgroundColor: '#ffffff', cursor: 'pointer' };
              return (
                <div key={index}
                  {...getSuggestionItemProps(suggestion, {
                    className,
                   
                    style,
                  })}
                >
                  <span >{suggestion.description}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
};

export default LocationSearchInput;
