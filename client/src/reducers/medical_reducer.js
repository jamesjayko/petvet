import { PET_MEDICAL } from '../actions/index';

export default function(state=[], action){

  switch(action.type){
    case PET_MEDICAL:
    console.log('med reducer:', action.payload);
      return action.payload.data.data;
  }
  return state;
}