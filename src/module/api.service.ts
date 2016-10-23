import {Injectable, Inject, OpaqueToken} from "@angular/core";
import {API_CONFIG} from './ng2-rest-api.module'
import {Endpoint, ApiConfig} from "./interfaces";
import {Helper} from "./helper";
import {Http} from '@angular/http';
import {ApiEndpoint} from "./apiEndpoint";

@Injectable()
export class ApiProvider {
  private endpoints: Endpoint[];

  constructor(@Inject(API_CONFIG) configs: ApiConfig[], private http: Http) {
    configs.forEach(c =>
      this.endpoints = [...this.configureEndpoints(c)]
    );
  }

  endpoint(name: OpaqueToken): ApiEndpoint {
    let endpoint: Endpoint;

    this.endpoints.some(e => {
      if (e.name === name) {
        endpoint = e;

        return true;
      }
      return false;
    });

    return new ApiEndpoint(this.http, endpoint);
  }

  private configureEndpoints(config: ApiConfig): Endpoint[] {
    const defaultActions = [
      {
        name: 'get',
        method: 'GET'
      },
      {
        name: 'query',
        method: 'GET',
        isArray: true
      },
      {
        name: 'save',
        method: 'POST'
      },
      {
        name: 'update',
        method: 'PUT'
      },
      {
        name: 'patch',
        method: 'PATCH'
      },
      {
        name: 'remove',
        method: 'DELETE'
      }
    ];

    return config.endpoints.map(e => {
      e.route = Helper.normalizeUrl([config.baseUrl, e.route].join('/'));

      // add defaults actions
      e.actions = e.actions || [];

      e.actions.forEach(a => {
        if(a.name.toLowerCase() === 'get'){
          defaultActions.find(a => a.name === 'get')['skip'] = true;
        }
        if(a.name.toLowerCase() === 'query'){
          defaultActions.find(a => a.name === 'query')['skip'] = true;
        }
        if(a.name.toLowerCase() === 'save'){
          defaultActions.find(a => a.name === 'save')['skip'] = true;
        }
        if(a.name.toLowerCase() === 'update'){
          defaultActions.find(a => a.name === 'update')['skip'] = true;
        }
        if(a.name.toLowerCase() === 'patch'){
          defaultActions.find(a => a.name === 'patch')['skip'] = true;
        }
        if(a.name.toLowerCase() === 'remove'){
          defaultActions.find(a => a.name === 'remove')['skip'] = true;
        }
      });

      e.actions = [...e.actions, ...defaultActions.filter(a => !a['skip'])];

      return e;
    })
  }
}
