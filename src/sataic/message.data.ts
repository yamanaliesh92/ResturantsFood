import testImg from "../img/photo.jpeg";
import testWomanImg from "../img/woman.jpeg";
interface IUser {
  id: number;
  username: string;
  img: any;
}
export interface IDataMessage {
  id: number;

  text: string;
  user: IUser;
}

export const dataMessage: IDataMessage[] = [
  {
    id: 1,
    text: "hello how ara you",
    user: {
      id: 1,
      username: "ali",
      img: testImg,
    },
  },

  {
    id: 2,
    text: "are you avalible",
    user: {
      id: 1,
      username: "ali",
      img: testImg,
    },
  },

  {
    id: 3,
    text: "i am coming to uou",
    user: {
      id: 1,
      username: "ali",
      img: testImg,
    },
  },

  {
    id: 3,
    text: "i am coming to uou",
    user: {
      id: 1,
      username: "ali",
      img: testImg,
    },
  },

  {
    id: 4,
    text: "hey owner",
    user: {
      id: 2,
      username: "ahmed",
      img: testWomanImg,
    },
  },

  {
    id: 5,
    text: "it is good to hear that",
    user: {
      id: 2,
      username: "ahmed",
      img: testWomanImg,
    },
  },

  {
    id: 6,
    text: "i want this",
    user: {
      id: 2,
      username: "ahmed",
      img: testWomanImg,
    },
  },
];
