import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type TInitialState = {
  numOfCakes: number;
}

const initialState: TInitialState = {
  numOfCakes: 10
}

const cakeSlice = createSlice({
  name: 'cake',
  initialState,
  reducers: {
    ordered: state => {
      state.numOfCakes--
    },
    restocked: (state, action: PayloadAction<number>) => {
      state.numOfCakes += action.payload
    }
  },
})

export default cakeSlice.reducer
export const { ordered, restocked } = cakeSlice.actions
