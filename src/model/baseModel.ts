export interface ControllerResponse<T = any> {
    message: string;
    payload?: T;
}