export type userAuthType = {
  message: string;
  auth_token: string;
};

export type userProfileType = {
  email: string;
  name: string;
  picture: string;
};

export type userContextType = {
  userAuth: userAuthType;
  userProfile: userProfileType;
};
