//noinspection TypeScriptCheckImport
import {makeDecorator} from 'angular2/src/core/util/decorators';
import ApiConfig from './api_config';

export default (() => makeDecorator(ApiConfig))();