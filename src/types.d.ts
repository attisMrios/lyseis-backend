export type Ly6Modules = 'products' | 'products';
export type Ly6ConnectedClient = {process: Ly6Modules, response: {send: any, write: any}, client_id: number};
export type Ly6GenericRequestBody = {process: string, data: any, id: number};
export type Ly6Response<T> = {message: string, data?: T};
export type Ly6SystemPaths = 'third-party' | 'products'