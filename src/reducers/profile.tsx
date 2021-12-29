const initialState = {
  
}
type InitialStateType = typeof initialState

export const profileReducer = (state:InitialStateType = initialState, action: ActionsType):InitialStateType => {
  switch (action.type) {
    default:
      return state
  }
};


type ActionsType = any