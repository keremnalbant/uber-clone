import { Reducer, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"
import { GooglePlaceData, GooglePlaceDetail } from "react-native-google-places-autocomplete"

export type NavType = {
    origin: { data: GooglePlaceData, details: GooglePlaceDetail | null } | null
    destination: { data: GooglePlaceData, details: GooglePlaceDetail | null } | null
    travelTimeInformation: any | null
}

const initialState: NavType = {
    origin: null,
    destination: null,
    travelTimeInformation: null,
}

export const navSlice = createSlice({
    name: 'nav',
    initialState,
    reducers: {
        setOrigin: (state, action) => {
            state.origin = action.payload
        },
        setDestination: (state, action) => {
            state.destination = action.payload
        },
        setTravelTimeInformation: (state, action) => {
            state.travelTimeInformation = action.payload
        },
    },
})

export const { setOrigin, setDestination, setTravelTimeInformation } = navSlice.actions

// Selectors - This is how we pull information from the Global store slice
export const selectOrigin = (state: RootState) => state.nav.origin
export const selectDestination = (state: RootState) => state.nav.destination
export const selectTravelTimeInformation = (state: RootState) => state.nav.travelTimeInformation

export default navSlice.reducer