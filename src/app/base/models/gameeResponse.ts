import { ErrorField } from "./errorField";

export interface GameeResponse<TData> {
  success: boolean;
  message: string;
  errors: ErrorField[];
  data: TData;
}