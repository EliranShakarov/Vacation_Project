import { decodeToken } from "react-jwt";

//create our user types
export enum userRole {
  "User",
  "Admin",
  "Guest",
}

//create our state (literal object in memory)
export class userState {
  firstName: string = "";
  userName: string = "";
  userRole: userRole = userRole.Guest;
  userToken: string|null = "";
  sumLikes: number = 0;
}

//which command the developer can use in this state
export enum authActionType {
  UserLogin = "UserLogin",
  UserLogout = "UserLogout",
  UpdateToken = "UpdateToken",
  IncreaseSumLikes = "IncreaseSumLikes",
  DecreaseSumLikes = "DecreaseSumLikes"
}

//create our auth action
export interface authAction {
  type: authActionType;
  payload?: any;
}

//function to handle the state changes (dispatch)
export function userLogin(token: string):authAction {
  return { type: authActionType.UserLogin, payload: token };
}

//user logout
export function userLogout(): authAction {
  return { type: authActionType.UserLogout, payload: null };
}

export function updateToken(token: string): authAction {
  return { type: authActionType.UpdateToken, payload: token };
}

export function increaseSumLikes(): authAction {
  return { type: authActionType.IncreaseSumLikes, payload: null };
}

export function decreaseSumLikes(): authAction {
  return { type: authActionType.DecreaseSumLikes, payload: null };
}


//reducer :)
export function userReducer(currentState: userState = new userState(),action: authAction): userState {
  const newState = { ...currentState };

  switch (action.type) {
    case authActionType.UserLogin:
        let decodePayload:any = decodeToken(action.payload);
        newState.firstName = decodePayload.user.first_name.charAt(0).toUpperCase()+decodePayload.user.first_name.slice(1);
        newState.userName = decodePayload.user.user_name;
        newState.userRole = decodePayload.user.role;
        newState.sumLikes = decodePayload.user.sumLikes;
        newState.userToken = action.payload;
        localStorage.setItem("userToken",action.payload);
      break;
    case authActionType.UserLogout:
        newState.firstName = "";
        newState.userName = "Guest";
        newState.userRole = userRole.Guest;
        newState.userToken = null;
        newState.sumLikes = 0;
        localStorage.removeItem("userToken");
      break;
    case authActionType.UpdateToken:
        newState.userToken = action.payload.userToken;
      break;
    case authActionType.IncreaseSumLikes:
      newState.sumLikes += 1;
    break;
    case authActionType.DecreaseSumLikes:
      newState.sumLikes -= 1;
    break;
  }

  return newState;
}