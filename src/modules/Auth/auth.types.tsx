export type userAuthType = {
  message: string;
  auth_token: string;
  role: string;
  organizations: OrganizationType[];
};

export type OrganizationType = {
  id: number;
  name: 'string';
};

export type userProfileType = {
  email: string;
  name: string;
  picture: string;
};

export type IUserContextType = {
  userAuth: userAuthType;
  userProfile: userProfileType;
  setUserAuth: (auth) => void;
};
