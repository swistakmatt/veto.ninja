export interface Friend {
  _id: string;
  username: string;
}

export type FrontendUser = {
  _id: string;
  nickname: string;
  friends: Friend[];
};
