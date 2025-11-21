/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/auth/login/route";
exports.ids = ["app/api/auth/login/route"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("@prisma/client");

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("bcrypt");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Flogin%2Froute&page=%2Fapi%2Fauth%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Flogin%2Froute.ts&appDir=%2FUsers%2Fmoaye_kelly%2FWebstormProjects%2FAnimania%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fmoaye_kelly%2FWebstormProjects%2FAnimania&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Flogin%2Froute&page=%2Fapi%2Fauth%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Flogin%2Froute.ts&appDir=%2FUsers%2Fmoaye_kelly%2FWebstormProjects%2FAnimania%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fmoaye_kelly%2FWebstormProjects%2FAnimania&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_moaye_kelly_WebstormProjects_Animania_app_api_auth_login_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/auth/login/route.ts */ \"(rsc)/./app/api/auth/login/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/login/route\",\n        pathname: \"/api/auth/login\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/login/route\"\n    },\n    resolvedPagePath: \"/Users/moaye_kelly/WebstormProjects/Animania/app/api/auth/login/route.ts\",\n    nextConfigOutput,\n    userland: _Users_moaye_kelly_WebstormProjects_Animania_app_api_auth_login_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGbG9naW4lMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmF1dGglMkZsb2dpbiUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmF1dGglMkZsb2dpbiUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRm1vYXllX2tlbGx5JTJGV2Vic3Rvcm1Qcm9qZWN0cyUyRkFuaW1hbmlhJTJGYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj0lMkZVc2VycyUyRm1vYXllX2tlbGx5JTJGV2Vic3Rvcm1Qcm9qZWN0cyUyRkFuaW1hbmlhJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUN3QjtBQUNyRztBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiL1VzZXJzL21vYXllX2tlbGx5L1dlYnN0b3JtUHJvamVjdHMvQW5pbWFuaWEvYXBwL2FwaS9hdXRoL2xvZ2luL3JvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9hdXRoL2xvZ2luL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvYXV0aC9sb2dpblwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvYXV0aC9sb2dpbi9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIi9Vc2Vycy9tb2F5ZV9rZWxseS9XZWJzdG9ybVByb2plY3RzL0FuaW1hbmlhL2FwcC9hcGkvYXV0aC9sb2dpbi9yb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Flogin%2Froute&page=%2Fapi%2Fauth%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Flogin%2Froute.ts&appDir=%2FUsers%2Fmoaye_kelly%2FWebstormProjects%2FAnimania%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fmoaye_kelly%2FWebstormProjects%2FAnimania&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(rsc)/./app/api/auth/login/route.ts":
/*!*************************************!*\
  !*** ./app/api/auth/login/route.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var _app_api_utils_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/app/api/utils/auth */ \"(rsc)/./app/api/utils/auth.ts\");\n/* harmony import */ var _app_db_prisma__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/app/db/prisma */ \"(rsc)/./app/db/prisma.ts\");\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bcrypt */ \"bcrypt\");\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(bcrypt__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n\n\n\n\nasync function POST(request) {\n    try {\n        const { email, password, rememberMe } = await request.json();\n        console.log(\"🔐 Tentative de connexion:\", {\n            email,\n            rememberMe\n        });\n        if (!email || !password) {\n            return next_server__WEBPACK_IMPORTED_MODULE_3__.NextResponse.json({\n                success: false,\n                message: \"Email et mot de passe requis\"\n            }, {\n                status: 400\n            });\n        }\n        // Rechercher l'utilisateur\n        const user = await _app_db_prisma__WEBPACK_IMPORTED_MODULE_1__.prisma.user.findUnique({\n            where: {\n                email: email.toLowerCase().trim()\n            }\n        });\n        if (!user) {\n            console.log(\"❌ Utilisateur non trouvé:\", email);\n            return next_server__WEBPACK_IMPORTED_MODULE_3__.NextResponse.json({\n                success: false,\n                message: \"Email ou mot de passe incorrect\"\n            }, {\n                status: 401\n            });\n        }\n        // Vérifier le mot de passe\n        const isValidPassword = await bcrypt__WEBPACK_IMPORTED_MODULE_2___default().compare(password, user.password);\n        if (!isValidPassword) {\n            console.log(\"❌ Mot de passe incorrect pour:\", email);\n            return next_server__WEBPACK_IMPORTED_MODULE_3__.NextResponse.json({\n                success: false,\n                message: \"Email ou mot de passe incorrect\"\n            }, {\n                status: 401\n            });\n        }\n        // Générer le token\n        const token = (0,_app_api_utils_auth__WEBPACK_IMPORTED_MODULE_0__.generateToken)({\n            userId: user.id,\n            email: user.email\n        });\n        console.log(\"✅ Connexion réussie:\", user.email);\n        // Créer la réponse avec le token\n        const response = next_server__WEBPACK_IMPORTED_MODULE_3__.NextResponse.json({\n            success: true,\n            message: \"Connexion réussie\",\n            token,\n            user: {\n                id: user.id,\n                name: user.name,\n                email: user.email,\n                role: user.role\n            }\n        });\n        // Définir le cookie (optionnel, pour compatibilité)\n        response.cookies.set(\"auth-token\", token, {\n            httpOnly: true,\n            secure: \"development\" === \"production\",\n            sameSite: \"lax\",\n            maxAge: rememberMe ? 7 * 24 * 60 * 60 : 24 * 60 * 60\n        });\n        return response;\n    } catch (error) {\n        console.error(\"❌ Erreur login:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_3__.NextResponse.json({\n            success: false,\n            message: \"Erreur serveur lors de la connexion\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2F1dGgvbG9naW4vcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQXFEO0FBQ1o7QUFDYjtBQUM0QjtBQUVqRCxlQUFlSSxLQUFLQyxPQUFvQjtJQUM3QyxJQUFJO1FBQ0YsTUFBTSxFQUFFQyxLQUFLLEVBQUVDLFFBQVEsRUFBRUMsVUFBVSxFQUFFLEdBQUcsTUFBTUgsUUFBUUksSUFBSTtRQUUxREMsUUFBUUMsR0FBRyxDQUFDLDhCQUE4QjtZQUFFTDtZQUFPRTtRQUFXO1FBRTlELElBQUksQ0FBQ0YsU0FBUyxDQUFDQyxVQUFVO1lBQ3ZCLE9BQU9KLHFEQUFZQSxDQUFDTSxJQUFJLENBQ3RCO2dCQUNFRyxTQUFTO2dCQUNUQyxTQUFTO1lBQ1gsR0FDQTtnQkFBRUMsUUFBUTtZQUFJO1FBRWxCO1FBRUEsMkJBQTJCO1FBQzNCLE1BQU1DLE9BQU8sTUFBTWQsa0RBQU1BLENBQUNjLElBQUksQ0FBQ0MsVUFBVSxDQUFDO1lBQ3hDQyxPQUFPO2dCQUFFWCxPQUFPQSxNQUFNWSxXQUFXLEdBQUdDLElBQUk7WUFBRztRQUM3QztRQUVBLElBQUksQ0FBQ0osTUFBTTtZQUNUTCxRQUFRQyxHQUFHLENBQUMsNkJBQTZCTDtZQUN6QyxPQUFPSCxxREFBWUEsQ0FBQ00sSUFBSSxDQUN0QjtnQkFDRUcsU0FBUztnQkFDVEMsU0FBUztZQUNYLEdBQ0E7Z0JBQUVDLFFBQVE7WUFBSTtRQUVsQjtRQUVBLDJCQUEyQjtRQUMzQixNQUFNTSxrQkFBa0IsTUFBTWxCLHFEQUFjLENBQUNLLFVBQVVRLEtBQUtSLFFBQVE7UUFFcEUsSUFBSSxDQUFDYSxpQkFBaUI7WUFDcEJWLFFBQVFDLEdBQUcsQ0FBQyxrQ0FBa0NMO1lBQzlDLE9BQU9ILHFEQUFZQSxDQUFDTSxJQUFJLENBQ3RCO2dCQUNFRyxTQUFTO2dCQUNUQyxTQUFTO1lBQ1gsR0FDQTtnQkFBRUMsUUFBUTtZQUFJO1FBRWxCO1FBRUEsbUJBQW1CO1FBQ25CLE1BQU1RLFFBQVF0QixrRUFBYUEsQ0FBQztZQUMxQnVCLFFBQVFSLEtBQUtTLEVBQUU7WUFDZmxCLE9BQU9TLEtBQUtULEtBQUs7UUFDbkI7UUFFQUksUUFBUUMsR0FBRyxDQUFDLHdCQUF3QkksS0FBS1QsS0FBSztRQUU5QyxpQ0FBaUM7UUFDakMsTUFBTW1CLFdBQVd0QixxREFBWUEsQ0FBQ00sSUFBSSxDQUFDO1lBQ2pDRyxTQUFTO1lBQ1RDLFNBQVM7WUFDVFM7WUFDQVAsTUFBTTtnQkFDSlMsSUFBSVQsS0FBS1MsRUFBRTtnQkFDWEUsTUFBTVgsS0FBS1csSUFBSTtnQkFDZnBCLE9BQU9TLEtBQUtULEtBQUs7Z0JBQ2pCcUIsTUFBTVosS0FBS1ksSUFBSTtZQUNqQjtRQUNGO1FBRUEsb0RBQW9EO1FBQ3BERixTQUFTRyxPQUFPLENBQUNDLEdBQUcsQ0FBQyxjQUFjUCxPQUFPO1lBQ3hDUSxVQUFVO1lBQ1ZDLFFBQVFDLGtCQUF5QjtZQUNqQ0MsVUFBVTtZQUNWQyxRQUFRMUIsYUFBYSxJQUFJLEtBQUssS0FBSyxLQUFLLEtBQUssS0FBSztRQUNwRDtRQUVBLE9BQU9pQjtJQUNULEVBQUUsT0FBT1UsT0FBWTtRQUNuQnpCLFFBQVF5QixLQUFLLENBQUMsbUJBQW1CQTtRQUVqQyxPQUFPaEMscURBQVlBLENBQUNNLElBQUksQ0FDdEI7WUFDRUcsU0FBUztZQUNUQyxTQUFTO1FBQ1gsR0FDQTtZQUFFQyxRQUFRO1FBQUk7SUFFbEI7QUFDRiIsInNvdXJjZXMiOlsiL1VzZXJzL21vYXllX2tlbGx5L1dlYnN0b3JtUHJvamVjdHMvQW5pbWFuaWEvYXBwL2FwaS9hdXRoL2xvZ2luL3JvdXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdlbmVyYXRlVG9rZW4gfSBmcm9tIFwiQC9hcHAvYXBpL3V0aWxzL2F1dGhcIjtcbmltcG9ydCB7IHByaXNtYSB9IGZyb20gXCJAL2FwcC9kYi9wcmlzbWFcIjtcbmltcG9ydCBiY3J5cHQgZnJvbSBcImJjcnlwdFwiO1xuaW1wb3J0IHsgTmV4dFJlcXVlc3QsIE5leHRSZXNwb25zZSB9IGZyb20gXCJuZXh0L3NlcnZlclwiO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUE9TVChyZXF1ZXN0OiBOZXh0UmVxdWVzdCkge1xuICB0cnkge1xuICAgIGNvbnN0IHsgZW1haWwsIHBhc3N3b3JkLCByZW1lbWJlck1lIH0gPSBhd2FpdCByZXF1ZXN0Lmpzb24oKTtcblxuICAgIGNvbnNvbGUubG9nKFwi8J+UkCBUZW50YXRpdmUgZGUgY29ubmV4aW9uOlwiLCB7IGVtYWlsLCByZW1lbWJlck1lIH0pO1xuXG4gICAgaWYgKCFlbWFpbCB8fCAhcGFzc3dvcmQpIHtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcbiAgICAgICAge1xuICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICAgIG1lc3NhZ2U6IFwiRW1haWwgZXQgbW90IGRlIHBhc3NlIHJlcXVpc1wiLFxuICAgICAgICB9LFxuICAgICAgICB7IHN0YXR1czogNDAwIH1cbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gUmVjaGVyY2hlciBsJ3V0aWxpc2F0ZXVyXG4gICAgY29uc3QgdXNlciA9IGF3YWl0IHByaXNtYS51c2VyLmZpbmRVbmlxdWUoe1xuICAgICAgd2hlcmU6IHsgZW1haWw6IGVtYWlsLnRvTG93ZXJDYXNlKCkudHJpbSgpIH0sXG4gICAgfSk7XG5cbiAgICBpZiAoIXVzZXIpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwi4p2MIFV0aWxpc2F0ZXVyIG5vbiB0cm91dsOpOlwiLCBlbWFpbCk7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXG4gICAgICAgIHtcbiAgICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgICBtZXNzYWdlOiBcIkVtYWlsIG91IG1vdCBkZSBwYXNzZSBpbmNvcnJlY3RcIixcbiAgICAgICAgfSxcbiAgICAgICAgeyBzdGF0dXM6IDQwMSB9XG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIFbDqXJpZmllciBsZSBtb3QgZGUgcGFzc2VcbiAgICBjb25zdCBpc1ZhbGlkUGFzc3dvcmQgPSBhd2FpdCBiY3J5cHQuY29tcGFyZShwYXNzd29yZCwgdXNlci5wYXNzd29yZCk7XG5cbiAgICBpZiAoIWlzVmFsaWRQYXNzd29yZCkge1xuICAgICAgY29uc29sZS5sb2coXCLinYwgTW90IGRlIHBhc3NlIGluY29ycmVjdCBwb3VyOlwiLCBlbWFpbCk7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXG4gICAgICAgIHtcbiAgICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgICBtZXNzYWdlOiBcIkVtYWlsIG91IG1vdCBkZSBwYXNzZSBpbmNvcnJlY3RcIixcbiAgICAgICAgfSxcbiAgICAgICAgeyBzdGF0dXM6IDQwMSB9XG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIEfDqW7DqXJlciBsZSB0b2tlblxuICAgIGNvbnN0IHRva2VuID0gZ2VuZXJhdGVUb2tlbih7XG4gICAgICB1c2VySWQ6IHVzZXIuaWQsXG4gICAgICBlbWFpbDogdXNlci5lbWFpbCxcbiAgICB9KTtcblxuICAgIGNvbnNvbGUubG9nKFwi4pyFIENvbm5leGlvbiByw6l1c3NpZTpcIiwgdXNlci5lbWFpbCk7XG5cbiAgICAvLyBDcsOpZXIgbGEgcsOpcG9uc2UgYXZlYyBsZSB0b2tlblxuICAgIGNvbnN0IHJlc3BvbnNlID0gTmV4dFJlc3BvbnNlLmpzb24oe1xuICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgIG1lc3NhZ2U6IFwiQ29ubmV4aW9uIHLDqXVzc2llXCIsXG4gICAgICB0b2tlbixcbiAgICAgIHVzZXI6IHtcbiAgICAgICAgaWQ6IHVzZXIuaWQsXG4gICAgICAgIG5hbWU6IHVzZXIubmFtZSxcbiAgICAgICAgZW1haWw6IHVzZXIuZW1haWwsXG4gICAgICAgIHJvbGU6IHVzZXIucm9sZSxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICAvLyBEw6lmaW5pciBsZSBjb29raWUgKG9wdGlvbm5lbCwgcG91ciBjb21wYXRpYmlsaXTDqSlcbiAgICByZXNwb25zZS5jb29raWVzLnNldChcImF1dGgtdG9rZW5cIiwgdG9rZW4sIHtcbiAgICAgIGh0dHBPbmx5OiB0cnVlLFxuICAgICAgc2VjdXJlOiBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJwcm9kdWN0aW9uXCIsXG4gICAgICBzYW1lU2l0ZTogXCJsYXhcIixcbiAgICAgIG1heEFnZTogcmVtZW1iZXJNZSA/IDcgKiAyNCAqIDYwICogNjAgOiAyNCAqIDYwICogNjAsIC8vIDcgam91cnMgb3UgMSBqb3VyXG4gICAgfSk7XG5cbiAgICByZXR1cm4gcmVzcG9uc2U7XG4gIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICBjb25zb2xlLmVycm9yKFwi4p2MIEVycmV1ciBsb2dpbjpcIiwgZXJyb3IpO1xuXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAge1xuICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgbWVzc2FnZTogXCJFcnJldXIgc2VydmV1ciBsb3JzIGRlIGxhIGNvbm5leGlvblwiLFxuICAgICAgfSxcbiAgICAgIHsgc3RhdHVzOiA1MDAgfVxuICAgICk7XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJnZW5lcmF0ZVRva2VuIiwicHJpc21hIiwiYmNyeXB0IiwiTmV4dFJlc3BvbnNlIiwiUE9TVCIsInJlcXVlc3QiLCJlbWFpbCIsInBhc3N3b3JkIiwicmVtZW1iZXJNZSIsImpzb24iLCJjb25zb2xlIiwibG9nIiwic3VjY2VzcyIsIm1lc3NhZ2UiLCJzdGF0dXMiLCJ1c2VyIiwiZmluZFVuaXF1ZSIsIndoZXJlIiwidG9Mb3dlckNhc2UiLCJ0cmltIiwiaXNWYWxpZFBhc3N3b3JkIiwiY29tcGFyZSIsInRva2VuIiwidXNlcklkIiwiaWQiLCJyZXNwb25zZSIsIm5hbWUiLCJyb2xlIiwiY29va2llcyIsInNldCIsImh0dHBPbmx5Iiwic2VjdXJlIiwicHJvY2VzcyIsInNhbWVTaXRlIiwibWF4QWdlIiwiZXJyb3IiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/login/route.ts\n");

/***/ }),

/***/ "(rsc)/./app/api/utils/auth.ts":
/*!*******************************!*\
  !*** ./app/api/utils/auth.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   generateToken: () => (/* binding */ generateToken),\n/* harmony export */   getCurrentUser: () => (/* binding */ getCurrentUser),\n/* harmony export */   verifyToken: () => (/* binding */ verifyToken)\n/* harmony export */ });\n/* harmony import */ var _app_db_prisma__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/app/db/prisma */ \"(rsc)/./app/db/prisma.ts\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jsonwebtoken */ \"(rsc)/./node_modules/jsonwebtoken/index.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst JWT_SECRET = process.env.JWT_SECRET || \"your-secret-key-change-this-in-production\";\nfunction generateToken(payload) {\n    return jsonwebtoken__WEBPACK_IMPORTED_MODULE_1___default().sign(payload, JWT_SECRET, {\n        expiresIn: \"7d\"\n    });\n}\nfunction verifyToken(token) {\n    try {\n        return jsonwebtoken__WEBPACK_IMPORTED_MODULE_1___default().verify(token, JWT_SECRET);\n    } catch (error) {\n        throw new Error(\"Token invalide\");\n    }\n}\nasync function getCurrentUser(request) {\n    try {\n        // Essayer d'abord les cookies\n        let token = request.cookies.get(\"auth-token\")?.value;\n        // Si pas de cookie, essayer l'header Authorization\n        if (!token) {\n            const authHeader = request.headers.get(\"authorization\");\n            if (authHeader && authHeader.startsWith(\"Bearer \")) {\n                token = authHeader.substring(7);\n            }\n        }\n        if (!token) {\n            console.log(\"🔍 Aucun token trouvé\");\n            return null;\n        }\n        const payload = verifyToken(token);\n        const user = await _app_db_prisma__WEBPACK_IMPORTED_MODULE_0__.prisma.user.findUnique({\n            where: {\n                id: payload.userId\n            },\n            select: {\n                id: true,\n                name: true,\n                email: true,\n                role: true,\n                createdAt: true\n            }\n        });\n        if (!user) {\n            console.log(\"❌ Utilisateur non trouvé pour le token\");\n            return null;\n        }\n        return user;\n    } catch (error) {\n        console.error(\"❌ Erreur vérification token:\", error);\n        return null;\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3V0aWxzL2F1dGgudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQXlDO0FBQ1Y7QUFHL0IsTUFBTUUsYUFDSkMsUUFBUUMsR0FBRyxDQUFDRixVQUFVLElBQUk7QUFTckIsU0FBU0csY0FDZEMsT0FBd0M7SUFFeEMsT0FBT0wsd0RBQVEsQ0FBQ0ssU0FBU0osWUFBWTtRQUFFTSxXQUFXO0lBQUs7QUFDekQ7QUFFTyxTQUFTQyxZQUFZQyxLQUFhO0lBQ3ZDLElBQUk7UUFDRixPQUFPVCwwREFBVSxDQUFDUyxPQUFPUjtJQUMzQixFQUFFLE9BQU9VLE9BQU87UUFDZCxNQUFNLElBQUlDLE1BQU07SUFDbEI7QUFDRjtBQUVPLGVBQWVDLGVBQWVDLE9BQW9CO0lBQ3ZELElBQUk7UUFDRiw4QkFBOEI7UUFDOUIsSUFBSUwsUUFBUUssUUFBUUMsT0FBTyxDQUFDQyxHQUFHLENBQUMsZUFBZUM7UUFFL0MsbURBQW1EO1FBQ25ELElBQUksQ0FBQ1IsT0FBTztZQUNWLE1BQU1TLGFBQWFKLFFBQVFLLE9BQU8sQ0FBQ0gsR0FBRyxDQUFDO1lBQ3ZDLElBQUlFLGNBQWNBLFdBQVdFLFVBQVUsQ0FBQyxZQUFZO2dCQUNsRFgsUUFBUVMsV0FBV0csU0FBUyxDQUFDO1lBQy9CO1FBQ0Y7UUFFQSxJQUFJLENBQUNaLE9BQU87WUFDVmEsUUFBUUMsR0FBRyxDQUFDO1lBQ1osT0FBTztRQUNUO1FBRUEsTUFBTWxCLFVBQVVHLFlBQVlDO1FBRTVCLE1BQU1lLE9BQU8sTUFBTXpCLGtEQUFNQSxDQUFDeUIsSUFBSSxDQUFDQyxVQUFVLENBQUM7WUFDeENDLE9BQU87Z0JBQUVDLElBQUl0QixRQUFRdUIsTUFBTTtZQUFDO1lBQzVCQyxRQUFRO2dCQUNORixJQUFJO2dCQUNKRyxNQUFNO2dCQUNOQyxPQUFPO2dCQUNQQyxNQUFNO2dCQUNOQyxXQUFXO1lBQ2I7UUFDRjtRQUVBLElBQUksQ0FBQ1QsTUFBTTtZQUNURixRQUFRQyxHQUFHLENBQUM7WUFDWixPQUFPO1FBQ1Q7UUFFQSxPQUFPQztJQUNULEVBQUUsT0FBT2IsT0FBTztRQUNkVyxRQUFRWCxLQUFLLENBQUMsZ0NBQWdDQTtRQUM5QyxPQUFPO0lBQ1Q7QUFDRiIsInNvdXJjZXMiOlsiL1VzZXJzL21vYXllX2tlbGx5L1dlYnN0b3JtUHJvamVjdHMvQW5pbWFuaWEvYXBwL2FwaS91dGlscy9hdXRoLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHByaXNtYSB9IGZyb20gXCJAL2FwcC9kYi9wcmlzbWFcIjtcbmltcG9ydCBqd3QgZnJvbSBcImpzb253ZWJ0b2tlblwiO1xuaW1wb3J0IHsgTmV4dFJlcXVlc3QgfSBmcm9tIFwibmV4dC9zZXJ2ZXJcIjtcblxuY29uc3QgSldUX1NFQ1JFVCA9XG4gIHByb2Nlc3MuZW52LkpXVF9TRUNSRVQgfHwgXCJ5b3VyLXNlY3JldC1rZXktY2hhbmdlLXRoaXMtaW4tcHJvZHVjdGlvblwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIEpXVFBheWxvYWQge1xuICB1c2VySWQ6IHN0cmluZztcbiAgZW1haWw6IHN0cmluZztcbiAgaWF0PzogbnVtYmVyO1xuICBleHA/OiBudW1iZXI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZVRva2VuKFxuICBwYXlsb2FkOiBPbWl0PEpXVFBheWxvYWQsIFwiaWF0XCIgfCBcImV4cFwiPlxuKTogc3RyaW5nIHtcbiAgcmV0dXJuIGp3dC5zaWduKHBheWxvYWQsIEpXVF9TRUNSRVQsIHsgZXhwaXJlc0luOiBcIjdkXCIgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB2ZXJpZnlUb2tlbih0b2tlbjogc3RyaW5nKTogSldUUGF5bG9hZCB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGp3dC52ZXJpZnkodG9rZW4sIEpXVF9TRUNSRVQpIGFzIEpXVFBheWxvYWQ7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVG9rZW4gaW52YWxpZGVcIik7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEN1cnJlbnRVc2VyKHJlcXVlc3Q6IE5leHRSZXF1ZXN0KSB7XG4gIHRyeSB7XG4gICAgLy8gRXNzYXllciBkJ2Fib3JkIGxlcyBjb29raWVzXG4gICAgbGV0IHRva2VuID0gcmVxdWVzdC5jb29raWVzLmdldChcImF1dGgtdG9rZW5cIik/LnZhbHVlO1xuXG4gICAgLy8gU2kgcGFzIGRlIGNvb2tpZSwgZXNzYXllciBsJ2hlYWRlciBBdXRob3JpemF0aW9uXG4gICAgaWYgKCF0b2tlbikge1xuICAgICAgY29uc3QgYXV0aEhlYWRlciA9IHJlcXVlc3QuaGVhZGVycy5nZXQoXCJhdXRob3JpemF0aW9uXCIpO1xuICAgICAgaWYgKGF1dGhIZWFkZXIgJiYgYXV0aEhlYWRlci5zdGFydHNXaXRoKFwiQmVhcmVyIFwiKSkge1xuICAgICAgICB0b2tlbiA9IGF1dGhIZWFkZXIuc3Vic3RyaW5nKDcpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghdG9rZW4pIHtcbiAgICAgIGNvbnNvbGUubG9nKFwi8J+UjSBBdWN1biB0b2tlbiB0cm91dsOpXCIpO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgcGF5bG9hZCA9IHZlcmlmeVRva2VuKHRva2VuKTtcblxuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBwcmlzbWEudXNlci5maW5kVW5pcXVlKHtcbiAgICAgIHdoZXJlOiB7IGlkOiBwYXlsb2FkLnVzZXJJZCB9LFxuICAgICAgc2VsZWN0OiB7XG4gICAgICAgIGlkOiB0cnVlLFxuICAgICAgICBuYW1lOiB0cnVlLFxuICAgICAgICBlbWFpbDogdHJ1ZSxcbiAgICAgICAgcm9sZTogdHJ1ZSxcbiAgICAgICAgY3JlYXRlZEF0OiB0cnVlLFxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIGlmICghdXNlcikge1xuICAgICAgY29uc29sZS5sb2coXCLinYwgVXRpbGlzYXRldXIgbm9uIHRyb3V2w6kgcG91ciBsZSB0b2tlblwiKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiB1c2VyO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCLinYwgRXJyZXVyIHbDqXJpZmljYXRpb24gdG9rZW46XCIsIGVycm9yKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuIl0sIm5hbWVzIjpbInByaXNtYSIsImp3dCIsIkpXVF9TRUNSRVQiLCJwcm9jZXNzIiwiZW52IiwiZ2VuZXJhdGVUb2tlbiIsInBheWxvYWQiLCJzaWduIiwiZXhwaXJlc0luIiwidmVyaWZ5VG9rZW4iLCJ0b2tlbiIsInZlcmlmeSIsImVycm9yIiwiRXJyb3IiLCJnZXRDdXJyZW50VXNlciIsInJlcXVlc3QiLCJjb29raWVzIiwiZ2V0IiwidmFsdWUiLCJhdXRoSGVhZGVyIiwiaGVhZGVycyIsInN0YXJ0c1dpdGgiLCJzdWJzdHJpbmciLCJjb25zb2xlIiwibG9nIiwidXNlciIsImZpbmRVbmlxdWUiLCJ3aGVyZSIsImlkIiwidXNlcklkIiwic2VsZWN0IiwibmFtZSIsImVtYWlsIiwicm9sZSIsImNyZWF0ZWRBdCJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/utils/auth.ts\n");

/***/ }),

/***/ "(rsc)/./app/db/prisma.ts":
/*!**************************!*\
  !*** ./app/db/prisma.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   prisma: () => (/* binding */ prisma)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\n// Configuration pour MongoDB avec logs détaillés\nconst prisma = globalThis.__prisma ?? new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient({\n    log: [\n        \"query\",\n        \"info\",\n        \"warn\",\n        \"error\"\n    ],\n    datasources: {\n        db: {\n            url: process.env.DATABASE_URL\n        }\n    }\n});\nif (true) {\n    globalThis.__prisma = prisma;\n}\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvZGIvcHJpc21hLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUE4QztBQU05QyxpREFBaUQ7QUFDakQsTUFBTUMsU0FDSkMsV0FBV0MsUUFBUSxJQUNuQixJQUFJSCx3REFBWUEsQ0FBQztJQUNmSSxLQUFLO1FBQUM7UUFBUztRQUFRO1FBQVE7S0FBUTtJQUN2Q0MsYUFBYTtRQUNYQyxJQUFJO1lBQ0ZDLEtBQUtDLFFBQVFDLEdBQUcsQ0FBQ0MsWUFBWTtRQUMvQjtJQUNGO0FBQ0Y7QUFFRixJQUFJRixJQUFxQyxFQUFFO0lBQ3pDTixXQUFXQyxRQUFRLEdBQUdGO0FBQ3hCO0FBRWtCIiwic291cmNlcyI6WyIvVXNlcnMvbW9heWVfa2VsbHkvV2Vic3Rvcm1Qcm9qZWN0cy9BbmltYW5pYS9hcHAvZGIvcHJpc21hLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByaXNtYUNsaWVudCB9IGZyb20gXCJAcHJpc21hL2NsaWVudFwiO1xuXG5kZWNsYXJlIGdsb2JhbCB7XG4gIHZhciBfX3ByaXNtYTogUHJpc21hQ2xpZW50IHwgdW5kZWZpbmVkO1xufVxuXG4vLyBDb25maWd1cmF0aW9uIHBvdXIgTW9uZ29EQiBhdmVjIGxvZ3MgZMOpdGFpbGzDqXNcbmNvbnN0IHByaXNtYSA9XG4gIGdsb2JhbFRoaXMuX19wcmlzbWEgPz9cbiAgbmV3IFByaXNtYUNsaWVudCh7XG4gICAgbG9nOiBbXCJxdWVyeVwiLCBcImluZm9cIiwgXCJ3YXJuXCIsIFwiZXJyb3JcIl0sXG4gICAgZGF0YXNvdXJjZXM6IHtcbiAgICAgIGRiOiB7XG4gICAgICAgIHVybDogcHJvY2Vzcy5lbnYuREFUQUJBU0VfVVJMLFxuICAgICAgfSxcbiAgICB9LFxuICB9KTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICBnbG9iYWxUaGlzLl9fcHJpc21hID0gcHJpc21hO1xufVxuXG5leHBvcnQgeyBwcmlzbWEgfTtcbiJdLCJuYW1lcyI6WyJQcmlzbWFDbGllbnQiLCJwcmlzbWEiLCJnbG9iYWxUaGlzIiwiX19wcmlzbWEiLCJsb2ciLCJkYXRhc291cmNlcyIsImRiIiwidXJsIiwicHJvY2VzcyIsImVudiIsIkRBVEFCQVNFX1VSTCJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/db/prisma.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/semver","vendor-chunks/jsonwebtoken","vendor-chunks/lodash.includes","vendor-chunks/jws","vendor-chunks/lodash.once","vendor-chunks/jwa","vendor-chunks/lodash.isinteger","vendor-chunks/ecdsa-sig-formatter","vendor-chunks/lodash.isplainobject","vendor-chunks/ms","vendor-chunks/lodash.isstring","vendor-chunks/lodash.isnumber","vendor-chunks/lodash.isboolean","vendor-chunks/safe-buffer","vendor-chunks/buffer-equal-constant-time"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Flogin%2Froute&page=%2Fapi%2Fauth%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Flogin%2Froute.ts&appDir=%2FUsers%2Fmoaye_kelly%2FWebstormProjects%2FAnimania%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fmoaye_kelly%2FWebstormProjects%2FAnimania&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();