import {NgModule, ModuleWithProviders, OpaqueToken} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ApiConfig} from "./interfaces";

@NgModule({
  imports: [
    CommonModule
  ]
})
export class Ng2RestApiModule {

  /**
   * Creates a module with a provider registering endpoints.
   */
  static configure(config: ApiConfig): ModuleWithProviders {
    return {
      ngModule: Ng2RestApiModule,
      providers: [
        provideApiConfig(config)
      ]
    };
  }
}

export const API_CONFIG = new OpaqueToken('API_CONFIG');

export function provideApiConfig(config: ApiConfig): any {
  return [
    {provide: API_CONFIG, multi: true, useValue: config}
  ];
}
