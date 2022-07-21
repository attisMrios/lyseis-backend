export type Ly6Modules = 'Generic';
export type Ly6ConnectedClient = {process: Ly6Modules, response: {send: any, write: any}, client_id: number};
export type Ly6GenericRequestBody = {table_name: string, data: any, id: number};