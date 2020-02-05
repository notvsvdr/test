const reducer = (state = {}, action) => {
    switch (action.type) {
        case 'GET_WEATHER':
            return { ...state, loading: true };
        case 'WEATHER_RECEIVED':
            return { ...state, weather: action.json, loading: false }
        default:
            return state;
    }
};

export default reducer;
