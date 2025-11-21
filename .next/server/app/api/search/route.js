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
exports.id = "app/api/search/route";
exports.ids = ["app/api/search/route"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("@prisma/client");

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

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fsearch%2Froute&page=%2Fapi%2Fsearch%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fsearch%2Froute.ts&appDir=%2FUsers%2Fmoaye_kelly%2FWebstormProjects%2FAnimania%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fmoaye_kelly%2FWebstormProjects%2FAnimania&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fsearch%2Froute&page=%2Fapi%2Fsearch%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fsearch%2Froute.ts&appDir=%2FUsers%2Fmoaye_kelly%2FWebstormProjects%2FAnimania%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fmoaye_kelly%2FWebstormProjects%2FAnimania&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_moaye_kelly_WebstormProjects_Animania_app_api_search_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/search/route.ts */ \"(rsc)/./app/api/search/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/search/route\",\n        pathname: \"/api/search\",\n        filename: \"route\",\n        bundlePath: \"app/api/search/route\"\n    },\n    resolvedPagePath: \"/Users/moaye_kelly/WebstormProjects/Animania/app/api/search/route.ts\",\n    nextConfigOutput,\n    userland: _Users_moaye_kelly_WebstormProjects_Animania_app_api_search_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZzZWFyY2glMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRnNlYXJjaCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRnNlYXJjaCUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRm1vYXllX2tlbGx5JTJGV2Vic3Rvcm1Qcm9qZWN0cyUyRkFuaW1hbmlhJTJGYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj0lMkZVc2VycyUyRm1vYXllX2tlbGx5JTJGV2Vic3Rvcm1Qcm9qZWN0cyUyRkFuaW1hbmlhJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUNvQjtBQUNqRztBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiL1VzZXJzL21vYXllX2tlbGx5L1dlYnN0b3JtUHJvamVjdHMvQW5pbWFuaWEvYXBwL2FwaS9zZWFyY2gvcm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL3NlYXJjaC9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL3NlYXJjaFwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvc2VhcmNoL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiL1VzZXJzL21vYXllX2tlbGx5L1dlYnN0b3JtUHJvamVjdHMvQW5pbWFuaWEvYXBwL2FwaS9zZWFyY2gvcm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fsearch%2Froute&page=%2Fapi%2Fsearch%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fsearch%2Froute.ts&appDir=%2FUsers%2Fmoaye_kelly%2FWebstormProjects%2FAnimania%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fmoaye_kelly%2FWebstormProjects%2FAnimania&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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

/***/ "(rsc)/./app/api/search/route.ts":
/*!*********************************!*\
  !*** ./app/api/search/route.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n\n\nconst prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\nasync function GET(request) {\n    try {\n        const searchParams = request.nextUrl.searchParams;\n        const query = searchParams.get(\"q\");\n        const category = searchParams.get(\"category\");\n        // Construire les conditions de recherche\n        const where = {\n            published: true\n        };\n        const conditions = [];\n        // Ajouter la recherche par texte si présent\n        if (query && query.trim()) {\n            conditions.push({\n                OR: [\n                    {\n                        title: {\n                            contains: query.trim(),\n                            mode: \"insensitive\"\n                        }\n                    },\n                    {\n                        content: {\n                            contains: query.trim(),\n                            mode: \"insensitive\"\n                        }\n                    }\n                ]\n            });\n        }\n        // Ajouter le filtre par catégorie si présent\n        if (category && category.trim()) {\n            conditions.push({\n                category: category.trim()\n            });\n        }\n        // Appliquer les conditions\n        if (conditions.length > 0) {\n            where.AND = conditions;\n        }\n        // Effectuer la recherche\n        const posts = await prisma.post.findMany({\n            where,\n            include: {\n                author: {\n                    select: {\n                        id: true,\n                        name: true\n                    }\n                },\n                _count: {\n                    select: {\n                        comments: true\n                    }\n                }\n            },\n            orderBy: {\n                createdAt: \"desc\"\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n            success: true,\n            posts: posts.map((post)=>({\n                    ...post,\n                    createdAt: post.createdAt.toISOString(),\n                    updatedAt: post.updatedAt.toISOString()\n                })),\n            count: posts.length\n        }, {\n            status: 200\n        });\n    } catch (error) {\n        console.error(\"❌ Erreur lors de la recherche:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n            success: false,\n            message: \"Erreur lors de la recherche\",\n            error: error instanceof Error ? error.message : \"Erreur inconnue\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3NlYXJjaC9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQThDO0FBQ1U7QUFFeEQsTUFBTUUsU0FBUyxJQUFJRix3REFBWUE7QUFFeEIsZUFBZUcsSUFBSUMsT0FBb0I7SUFDNUMsSUFBSTtRQUNGLE1BQU1DLGVBQWVELFFBQVFFLE9BQU8sQ0FBQ0QsWUFBWTtRQUNqRCxNQUFNRSxRQUFRRixhQUFhRyxHQUFHLENBQUM7UUFDL0IsTUFBTUMsV0FBV0osYUFBYUcsR0FBRyxDQUFDO1FBRWxDLHlDQUF5QztRQUN6QyxNQUFNRSxRQVNGO1lBQ0ZDLFdBQVc7UUFDYjtRQUVBLE1BQU1DLGFBTUQsRUFBRTtRQUVQLDRDQUE0QztRQUM1QyxJQUFJTCxTQUFTQSxNQUFNTSxJQUFJLElBQUk7WUFDekJELFdBQVdFLElBQUksQ0FBQztnQkFDZEMsSUFBSTtvQkFDRjt3QkFDRUMsT0FBTzs0QkFDTEMsVUFBVVYsTUFBTU0sSUFBSTs0QkFDcEJLLE1BQU07d0JBQ1I7b0JBQ0Y7b0JBQ0E7d0JBQ0VDLFNBQVM7NEJBQ1BGLFVBQVVWLE1BQU1NLElBQUk7NEJBQ3BCSyxNQUFNO3dCQUNSO29CQUNGO2lCQUNEO1lBQ0g7UUFDRjtRQUVBLDZDQUE2QztRQUM3QyxJQUFJVCxZQUFZQSxTQUFTSSxJQUFJLElBQUk7WUFDL0JELFdBQVdFLElBQUksQ0FBQztnQkFDZEwsVUFBVUEsU0FBU0ksSUFBSTtZQUN6QjtRQUNGO1FBRUEsMkJBQTJCO1FBQzNCLElBQUlELFdBQVdRLE1BQU0sR0FBRyxHQUFHO1lBQ3pCVixNQUFNVyxHQUFHLEdBQUdUO1FBQ2Q7UUFFQSx5QkFBeUI7UUFDekIsTUFBTVUsUUFBUSxNQUFNcEIsT0FBT3FCLElBQUksQ0FBQ0MsUUFBUSxDQUFDO1lBQ3ZDZDtZQUNBZSxTQUFTO2dCQUNQQyxRQUFRO29CQUNOQyxRQUFRO3dCQUNOQyxJQUFJO3dCQUNKQyxNQUFNO29CQUNSO2dCQUNGO2dCQUNBQyxRQUFRO29CQUNOSCxRQUFRO3dCQUNOSSxVQUFVO29CQUNaO2dCQUNGO1lBQ0Y7WUFDQUMsU0FBUztnQkFDUEMsV0FBVztZQUNiO1FBQ0Y7UUFFQSxPQUFPaEMscURBQVlBLENBQUNpQyxJQUFJLENBQ3RCO1lBQ0VDLFNBQVM7WUFDVGIsT0FBT0EsTUFBTWMsR0FBRyxDQUFDLENBQUNiLE9BQVU7b0JBQzFCLEdBQUdBLElBQUk7b0JBQ1BVLFdBQVdWLEtBQUtVLFNBQVMsQ0FBQ0ksV0FBVztvQkFDckNDLFdBQVdmLEtBQUtlLFNBQVMsQ0FBQ0QsV0FBVztnQkFDdkM7WUFDQUUsT0FBT2pCLE1BQU1GLE1BQU07UUFDckIsR0FDQTtZQUFFb0IsUUFBUTtRQUFJO0lBRWxCLEVBQUUsT0FBT0MsT0FBTztRQUNkQyxRQUFRRCxLQUFLLENBQUMsa0NBQWtDQTtRQUNoRCxPQUFPeEMscURBQVlBLENBQUNpQyxJQUFJLENBQ3RCO1lBQ0VDLFNBQVM7WUFDVFEsU0FBUztZQUNURixPQUFPQSxpQkFBaUJHLFFBQVFILE1BQU1FLE9BQU8sR0FBRztRQUNsRCxHQUNBO1lBQUVILFFBQVE7UUFBSTtJQUVsQjtBQUNGIiwic291cmNlcyI6WyIvVXNlcnMvbW9heWVfa2VsbHkvV2Vic3Rvcm1Qcm9qZWN0cy9BbmltYW5pYS9hcHAvYXBpL3NlYXJjaC9yb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcmlzbWFDbGllbnQgfSBmcm9tIFwiQHByaXNtYS9jbGllbnRcIjtcbmltcG9ydCB7IE5leHRSZXF1ZXN0LCBOZXh0UmVzcG9uc2UgfSBmcm9tIFwibmV4dC9zZXJ2ZXJcIjtcblxuY29uc3QgcHJpc21hID0gbmV3IFByaXNtYUNsaWVudCgpO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKHJlcXVlc3Q6IE5leHRSZXF1ZXN0KSB7XG4gIHRyeSB7XG4gICAgY29uc3Qgc2VhcmNoUGFyYW1zID0gcmVxdWVzdC5uZXh0VXJsLnNlYXJjaFBhcmFtcztcbiAgICBjb25zdCBxdWVyeSA9IHNlYXJjaFBhcmFtcy5nZXQoXCJxXCIpO1xuICAgIGNvbnN0IGNhdGVnb3J5ID0gc2VhcmNoUGFyYW1zLmdldChcImNhdGVnb3J5XCIpO1xuXG4gICAgLy8gQ29uc3RydWlyZSBsZXMgY29uZGl0aW9ucyBkZSByZWNoZXJjaGVcbiAgICBjb25zdCB3aGVyZToge1xuICAgICAgcHVibGlzaGVkOiBib29sZWFuO1xuICAgICAgQU5EPzogQXJyYXk8e1xuICAgICAgICBPUj86IEFycmF5PHtcbiAgICAgICAgICB0aXRsZT86IHsgY29udGFpbnM6IHN0cmluZzsgbW9kZTogXCJpbnNlbnNpdGl2ZVwiIH07XG4gICAgICAgICAgY29udGVudD86IHsgY29udGFpbnM6IHN0cmluZzsgbW9kZTogXCJpbnNlbnNpdGl2ZVwiIH07XG4gICAgICAgIH0+O1xuICAgICAgICBjYXRlZ29yeT86IHN0cmluZztcbiAgICAgIH0+O1xuICAgIH0gPSB7XG4gICAgICBwdWJsaXNoZWQ6IHRydWUsXG4gICAgfTtcblxuICAgIGNvbnN0IGNvbmRpdGlvbnM6IEFycmF5PHtcbiAgICAgIE9SPzogQXJyYXk8e1xuICAgICAgICB0aXRsZT86IHsgY29udGFpbnM6IHN0cmluZzsgbW9kZTogXCJpbnNlbnNpdGl2ZVwiIH07XG4gICAgICAgIGNvbnRlbnQ/OiB7IGNvbnRhaW5zOiBzdHJpbmc7IG1vZGU6IFwiaW5zZW5zaXRpdmVcIiB9O1xuICAgICAgfT47XG4gICAgICBjYXRlZ29yeT86IHN0cmluZztcbiAgICB9PiA9IFtdO1xuXG4gICAgLy8gQWpvdXRlciBsYSByZWNoZXJjaGUgcGFyIHRleHRlIHNpIHByw6lzZW50XG4gICAgaWYgKHF1ZXJ5ICYmIHF1ZXJ5LnRyaW0oKSkge1xuICAgICAgY29uZGl0aW9ucy5wdXNoKHtcbiAgICAgICAgT1I6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0aXRsZToge1xuICAgICAgICAgICAgICBjb250YWluczogcXVlcnkudHJpbSgpLFxuICAgICAgICAgICAgICBtb2RlOiBcImluc2Vuc2l0aXZlXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgY29udGVudDoge1xuICAgICAgICAgICAgICBjb250YWluczogcXVlcnkudHJpbSgpLFxuICAgICAgICAgICAgICBtb2RlOiBcImluc2Vuc2l0aXZlXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBBam91dGVyIGxlIGZpbHRyZSBwYXIgY2F0w6lnb3JpZSBzaSBwcsOpc2VudFxuICAgIGlmIChjYXRlZ29yeSAmJiBjYXRlZ29yeS50cmltKCkpIHtcbiAgICAgIGNvbmRpdGlvbnMucHVzaCh7XG4gICAgICAgIGNhdGVnb3J5OiBjYXRlZ29yeS50cmltKCksXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBBcHBsaXF1ZXIgbGVzIGNvbmRpdGlvbnNcbiAgICBpZiAoY29uZGl0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICB3aGVyZS5BTkQgPSBjb25kaXRpb25zO1xuICAgIH1cblxuICAgIC8vIEVmZmVjdHVlciBsYSByZWNoZXJjaGVcbiAgICBjb25zdCBwb3N0cyA9IGF3YWl0IHByaXNtYS5wb3N0LmZpbmRNYW55KHtcbiAgICAgIHdoZXJlLFxuICAgICAgaW5jbHVkZToge1xuICAgICAgICBhdXRob3I6IHtcbiAgICAgICAgICBzZWxlY3Q6IHtcbiAgICAgICAgICAgIGlkOiB0cnVlLFxuICAgICAgICAgICAgbmFtZTogdHJ1ZSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBfY291bnQ6IHtcbiAgICAgICAgICBzZWxlY3Q6IHtcbiAgICAgICAgICAgIGNvbW1lbnRzOiB0cnVlLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgb3JkZXJCeToge1xuICAgICAgICBjcmVhdGVkQXQ6IFwiZGVzY1wiLFxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcbiAgICAgIHtcbiAgICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgICAgcG9zdHM6IHBvc3RzLm1hcCgocG9zdCkgPT4gKHtcbiAgICAgICAgICAuLi5wb3N0LFxuICAgICAgICAgIGNyZWF0ZWRBdDogcG9zdC5jcmVhdGVkQXQudG9JU09TdHJpbmcoKSxcbiAgICAgICAgICB1cGRhdGVkQXQ6IHBvc3QudXBkYXRlZEF0LnRvSVNPU3RyaW5nKCksXG4gICAgICAgIH0pKSxcbiAgICAgICAgY291bnQ6IHBvc3RzLmxlbmd0aCxcbiAgICAgIH0sXG4gICAgICB7IHN0YXR1czogMjAwIH1cbiAgICApO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCLinYwgRXJyZXVyIGxvcnMgZGUgbGEgcmVjaGVyY2hlOlwiLCBlcnJvcik7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAge1xuICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgbWVzc2FnZTogXCJFcnJldXIgbG9ycyBkZSBsYSByZWNoZXJjaGVcIixcbiAgICAgICAgZXJyb3I6IGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogXCJFcnJldXIgaW5jb25udWVcIixcbiAgICAgIH0sXG4gICAgICB7IHN0YXR1czogNTAwIH1cbiAgICApO1xuICB9XG59XG4iXSwibmFtZXMiOlsiUHJpc21hQ2xpZW50IiwiTmV4dFJlc3BvbnNlIiwicHJpc21hIiwiR0VUIiwicmVxdWVzdCIsInNlYXJjaFBhcmFtcyIsIm5leHRVcmwiLCJxdWVyeSIsImdldCIsImNhdGVnb3J5Iiwid2hlcmUiLCJwdWJsaXNoZWQiLCJjb25kaXRpb25zIiwidHJpbSIsInB1c2giLCJPUiIsInRpdGxlIiwiY29udGFpbnMiLCJtb2RlIiwiY29udGVudCIsImxlbmd0aCIsIkFORCIsInBvc3RzIiwicG9zdCIsImZpbmRNYW55IiwiaW5jbHVkZSIsImF1dGhvciIsInNlbGVjdCIsImlkIiwibmFtZSIsIl9jb3VudCIsImNvbW1lbnRzIiwib3JkZXJCeSIsImNyZWF0ZWRBdCIsImpzb24iLCJzdWNjZXNzIiwibWFwIiwidG9JU09TdHJpbmciLCJ1cGRhdGVkQXQiLCJjb3VudCIsInN0YXR1cyIsImVycm9yIiwiY29uc29sZSIsIm1lc3NhZ2UiLCJFcnJvciJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/search/route.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fsearch%2Froute&page=%2Fapi%2Fsearch%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fsearch%2Froute.ts&appDir=%2FUsers%2Fmoaye_kelly%2FWebstormProjects%2FAnimania%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fmoaye_kelly%2FWebstormProjects%2FAnimania&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();