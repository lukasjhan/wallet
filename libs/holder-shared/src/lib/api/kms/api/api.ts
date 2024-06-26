export * from './credentials.service';
import { CredentialsApiService } from './credentials.service';
export * from './default.service';
import { DefaultApiService } from './default.service';
export * from './history.service';
import { HistoryApiService } from './history.service';
export * from './keys.service';
import { KeysApiService } from './keys.service';
export * from './oid4vci.service';
import { Oid4vciApiService } from './oid4vci.service';
export * from './oid4vcp.service';
import { Oid4vcpApiService } from './oid4vcp.service';
export * from './settings.service';
import { SettingsApiService } from './settings.service';
export const APIS = [CredentialsApiService, DefaultApiService, HistoryApiService, KeysApiService, Oid4vciApiService, Oid4vcpApiService, SettingsApiService];
