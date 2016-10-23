import {OpaqueToken} from "@angular/core";

export interface Action {
  name: string,
  method: string,
  instantiateModel?: boolean,
  isArray?: boolean,
  headersForReading?: Array<string>,
  params?: any,
  cache?: any
}

export interface Endpoint {
  name: OpaqueToken;
  route: string;
  model?: any;
  actions?: Action[];
}

export interface ApiConfig {
  baseUrl: string,
  endpoints: Endpoint[]
}
