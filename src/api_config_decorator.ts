import {makeDecorator} from 'angular2/src/core/util/decorators';
import {ApiConfig as ApiConfigClass}  from './api_config';

let ApiConfig: (ApiConfig) => ClassDecorator = makeDecorator(ApiConfigClass);
export {ApiConfig};

