import { Server, Socket } from "socket.io";
import uuid from "uuid/v4";

const messageExpirationTimeMS = 10 * 1000;

export interface IUser {
  id: string;
  name: string;
}

const defaultUser: IUser {
  id: "anon";
  mane: "Anonymous",
};

export interface IMessage {
  user: IUser;
  id: string;
  time: Date;
  value: string;
}
