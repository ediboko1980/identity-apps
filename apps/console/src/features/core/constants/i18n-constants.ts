/**
 * Copyright (c) 2020, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { I18nModuleConstants, I18nModuleInitOptions, generateBackendPaths } from "@wso2is/i18n";
import { store } from "../store";

/**
 * Class containing portal specific i18n constants.
 */
export class I18nConstants {

    /**
     * Private constructor to avoid object instantiation from outside
     * the class.
     *
     * @hideconstructor
     */
    /* eslint-disable @typescript-eslint/no-empty-function */
    private constructor() { }

    /**
     * Namespace for the admin portal.
     * @constant
     * @type {string}
     * @default
     */
    public static readonly ADMIN_PORTAL_NAMESPACE: string = I18nModuleConstants.ADMIN_PORTAL_NAMESPACE;

    /**
     * Namespace for the developer portal.
     * @constant
     * @type {string}
     * @default
     */
    public static readonly DEV_PORTAL_NAMESPACE: string = I18nModuleConstants.DEV_PORTAL_NAMESPACE;

    /**
     * Common namespace.
     * @constant
     * @type {string}
     * @default
     */
    public static readonly COMMON_NAMESPACE: string = I18nModuleConstants.COMMON_NAMESPACE;

    /**
     * Locations of the I18n namespaces.
     * @constant
     * @type {Map<string, string>}
     * @default
     */
    public static readonly BUNDLE_NAMESPACE_DIRECTORIES: Map<string, string> = new Map<string, string>([
        [ I18nConstants.COMMON_NAMESPACE, "portals" ],
        [ I18nConstants.ADMIN_PORTAL_NAMESPACE, "portals" ],
        [ I18nConstants.DEV_PORTAL_NAMESPACE, "portals" ]
    ]);

    /**
     * I18n init options.
     *
     * @remarks
     * Since the portals are not deployed per tenant, looking for static resources in tenant qualified URLs will fail.
     * Using `appBaseNameWithoutTenant` will create a path without the tenant. Therefore, `loadPath()` function will
     * look for resource files in `https://localhost:9443/<PORTAL>/resources/i18n` rather than looking for the
     * files in `https://localhost:9443/t/wso2.com/<PORTAL>/resources/i18n`.
     *
     * @constant
     * @type {I18nModuleInitOptions}
     * @default
     */
    public static readonly MODULE_INIT_OPTIONS: I18nModuleInitOptions = {
        backend: {
            loadPath: (language, namespace) => generateBackendPaths(
                language,
                namespace,
                window["AppUtils"].getConfig().appBase,
                store.getState().config.i18n
            )
        },
        load: "currentOnly", // lookup only current lang key(en-US). Prevents 404 from `en`.
        ns: [ I18nConstants.COMMON_NAMESPACE, I18nConstants.ADMIN_PORTAL_NAMESPACE, I18nConstants.DEV_PORTAL_NAMESPACE ]
    };

    /**
     * I18n init options override flag. The default options in the module will be overridden if set to true.
     * @constant
     * @type {boolean}
     * @default
     */
    public static readonly INIT_OPTIONS_OVERRIDE: boolean = false;

    /**
     * If the language detector plugin should be enabled or not.
     * @constant
     * @type {boolean}
     * @default
     */
    public static readonly LANG_AUTO_DETECT_ENABLED: boolean = true;

    /**
     * If the xhr backend plugin should be enabled or not.
     * @constant
     * @type {boolean}
     * @default
     */
    public static readonly XHR_BACKEND_PLUGIN_ENABLED: boolean = true;
}
