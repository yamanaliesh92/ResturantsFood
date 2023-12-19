import axios from "axios";
import { getEnv } from "../../utils/env";

export interface IError {
  statusCode: number;
  message: string;
  error: number;
}

export const http = axios.create({
  baseURL: getEnv({ IKey: "REACT_APP_SERVER" }),
});
