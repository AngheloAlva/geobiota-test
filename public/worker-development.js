/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./service-worker/index.js":
/*!*********************************!*\
  !*** ./service-worker/index.js ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval(__webpack_require__.ts("const STORAGE_KEY = \"treeSurveys\";\nconst POWER_AUTOMATE_URL = \"https://prod-31.brazilsouth.logic.azure.com:443/workflows/4351ccfcbdff44f39f2aa09c3b2aa54c/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=hL45qx1L3SLKKXkvEjtaRq7y-IZwzIfyddSMbr_JyzQ\";\nself.addEventListener(\"sync\", (event)=>{\n    if (event.tag === \"sync-surveys\") {\n        event.waitUntil(syncSurveys());\n    }\n});\nasync function syncSurveys() {\n    const surveys = await getSurveysFromDB();\n    if (surveys.length === 0) return;\n    try {\n        const response = await fetch(POWER_AUTOMATE_URL, {\n            method: \"POST\",\n            headers: {\n                \"Content-Type\": \"application/json\"\n            },\n            body: JSON.stringify(surveys)\n        });\n        if (response.ok) {\n            await clearSurveysFromDB();\n            console.log(\"Surveys synced successfully\");\n        } else {\n            throw new Error(\"Failed to sync surveys\");\n        }\n    } catch (error) {\n        console.error(\"Error syncing surveys:\", error);\n    }\n}\n// Funciones para trabajar con IndexedDB\nfunction openDB() {\n    return new Promise((resolve, reject)=>{\n        const request = indexedDB.open(\"SurveyDB\", 1);\n        request.onupgradeneeded = (event)=>{\n            const db = event.target.result;\n            db.createObjectStore(STORAGE_KEY, {\n                keyPath: \"id\"\n            });\n        };\n        request.onsuccess = (event)=>{\n            resolve(event.target.result);\n        };\n        request.onerror = (event)=>{\n            reject(event.target.error);\n        };\n    });\n}\nfunction getSurveysFromDB() {\n    return new Promise(async (resolve, reject)=>{\n        const db = await openDB();\n        const transaction = db.transaction(STORAGE_KEY, \"readonly\");\n        const store = transaction.objectStore(STORAGE_KEY);\n        const request = store.getAll();\n        request.onsuccess = (event)=>{\n            resolve(event.target.result);\n        };\n        request.onerror = (event)=>{\n            reject(event.target.error);\n        };\n    });\n}\nfunction clearSurveysFromDB() {\n    return new Promise(async (resolve, reject)=>{\n        const db = await openDB();\n        const transaction = db.transaction(STORAGE_KEY, \"readwrite\");\n        const store = transaction.objectStore(STORAGE_KEY);\n        const request = store.clear();\n        request.onsuccess = ()=>{\n            resolve();\n        };\n        request.onerror = (event)=>{\n            reject(event.target.error);\n        };\n    });\n}\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                /* unsupported import.meta.webpackHot */ undefined.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zZXJ2aWNlLXdvcmtlci9pbmRleC5qcyIsIm1hcHBpbmdzIjoiQUFBQSxNQUFNQSxjQUFjO0FBQ3BCLE1BQU1DLHFCQUNMO0FBRURDLEtBQUtDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQ0M7SUFDOUIsSUFBSUEsTUFBTUMsR0FBRyxLQUFLLGdCQUFnQjtRQUNqQ0QsTUFBTUUsU0FBUyxDQUFDQztJQUNqQjtBQUNEO0FBRUEsZUFBZUE7SUFDZCxNQUFNQyxVQUFVLE1BQU1DO0lBRXRCLElBQUlELFFBQVFFLE1BQU0sS0FBSyxHQUFHO0lBRTFCLElBQUk7UUFDSCxNQUFNQyxXQUFXLE1BQU1DLE1BQU1YLG9CQUFvQjtZQUNoRFksUUFBUTtZQUNSQyxTQUFTO2dCQUNSLGdCQUFnQjtZQUNqQjtZQUNBQyxNQUFNQyxLQUFLQyxTQUFTLENBQUNUO1FBQ3RCO1FBRUEsSUFBSUcsU0FBU08sRUFBRSxFQUFFO1lBQ2hCLE1BQU1DO1lBQ05DLFFBQVFDLEdBQUcsQ0FBQztRQUNiLE9BQU87WUFDTixNQUFNLElBQUlDLE1BQU07UUFDakI7SUFDRCxFQUFFLE9BQU9DLE9BQU87UUFDZkgsUUFBUUcsS0FBSyxDQUFDLDBCQUEwQkE7SUFDekM7QUFDRDtBQUVBLHdDQUF3QztBQUN4QyxTQUFTQztJQUNSLE9BQU8sSUFBSUMsUUFBUSxDQUFDQyxTQUFTQztRQUM1QixNQUFNQyxVQUFVQyxVQUFVQyxJQUFJLENBQUMsWUFBWTtRQUUzQ0YsUUFBUUcsZUFBZSxHQUFHLENBQUMzQjtZQUMxQixNQUFNNEIsS0FBSzVCLE1BQU02QixNQUFNLENBQUNDLE1BQU07WUFDOUJGLEdBQUdHLGlCQUFpQixDQUFDbkMsYUFBYTtnQkFBRW9DLFNBQVM7WUFBSztRQUNuRDtRQUVBUixRQUFRUyxTQUFTLEdBQUcsQ0FBQ2pDO1lBQ3BCc0IsUUFBUXRCLE1BQU02QixNQUFNLENBQUNDLE1BQU07UUFDNUI7UUFFQU4sUUFBUVUsT0FBTyxHQUFHLENBQUNsQztZQUNsQnVCLE9BQU92QixNQUFNNkIsTUFBTSxDQUFDVixLQUFLO1FBQzFCO0lBQ0Q7QUFDRDtBQUVBLFNBQVNkO0lBQ1IsT0FBTyxJQUFJZ0IsUUFBUSxPQUFPQyxTQUFTQztRQUNsQyxNQUFNSyxLQUFLLE1BQU1SO1FBQ2pCLE1BQU1lLGNBQWNQLEdBQUdPLFdBQVcsQ0FBQ3ZDLGFBQWE7UUFDaEQsTUFBTXdDLFFBQVFELFlBQVlFLFdBQVcsQ0FBQ3pDO1FBQ3RDLE1BQU00QixVQUFVWSxNQUFNRSxNQUFNO1FBRTVCZCxRQUFRUyxTQUFTLEdBQUcsQ0FBQ2pDO1lBQ3BCc0IsUUFBUXRCLE1BQU02QixNQUFNLENBQUNDLE1BQU07UUFDNUI7UUFFQU4sUUFBUVUsT0FBTyxHQUFHLENBQUNsQztZQUNsQnVCLE9BQU92QixNQUFNNkIsTUFBTSxDQUFDVixLQUFLO1FBQzFCO0lBQ0Q7QUFDRDtBQUVBLFNBQVNKO0lBQ1IsT0FBTyxJQUFJTSxRQUFRLE9BQU9DLFNBQVNDO1FBQ2xDLE1BQU1LLEtBQUssTUFBTVI7UUFDakIsTUFBTWUsY0FBY1AsR0FBR08sV0FBVyxDQUFDdkMsYUFBYTtRQUNoRCxNQUFNd0MsUUFBUUQsWUFBWUUsV0FBVyxDQUFDekM7UUFDdEMsTUFBTTRCLFVBQVVZLE1BQU1HLEtBQUs7UUFFM0JmLFFBQVFTLFNBQVMsR0FBRztZQUNuQlg7UUFDRDtRQUVBRSxRQUFRVSxPQUFPLEdBQUcsQ0FBQ2xDO1lBQ2xCdUIsT0FBT3ZCLE1BQU02QixNQUFNLENBQUNWLEtBQUs7UUFDMUI7SUFDRDtBQUNEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc2VydmljZS13b3JrZXIvaW5kZXguanM/MTMwMyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBTVE9SQUdFX0tFWSA9IFwidHJlZVN1cnZleXNcIlxyXG5jb25zdCBQT1dFUl9BVVRPTUFURV9VUkwgPVxyXG5cdFwiaHR0cHM6Ly9wcm9kLTMxLmJyYXppbHNvdXRoLmxvZ2ljLmF6dXJlLmNvbTo0NDMvd29ya2Zsb3dzLzQzNTFjY2ZjYmRmZjQ0ZjM5ZjJhYTA5YzNiMmFhNTRjL3RyaWdnZXJzL21hbnVhbC9wYXRocy9pbnZva2U/YXBpLXZlcnNpb249MjAxNi0wNi0wMSZzcD0lMkZ0cmlnZ2VycyUyRm1hbnVhbCUyRnJ1biZzdj0xLjAmc2lnPWhMNDVxeDFMM1NMS0tYa3ZFanRhUnE3eS1JWnd6SWZ5ZGRTTWJyX0p5elFcIlxyXG5cclxuc2VsZi5hZGRFdmVudExpc3RlbmVyKFwic3luY1wiLCAoZXZlbnQpID0+IHtcclxuXHRpZiAoZXZlbnQudGFnID09PSBcInN5bmMtc3VydmV5c1wiKSB7XHJcblx0XHRldmVudC53YWl0VW50aWwoc3luY1N1cnZleXMoKSlcclxuXHR9XHJcbn0pXHJcblxyXG5hc3luYyBmdW5jdGlvbiBzeW5jU3VydmV5cygpIHtcclxuXHRjb25zdCBzdXJ2ZXlzID0gYXdhaXQgZ2V0U3VydmV5c0Zyb21EQigpXHJcblxyXG5cdGlmIChzdXJ2ZXlzLmxlbmd0aCA9PT0gMCkgcmV0dXJuXHJcblxyXG5cdHRyeSB7XHJcblx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFBPV0VSX0FVVE9NQVRFX1VSTCwge1xyXG5cdFx0XHRtZXRob2Q6IFwiUE9TVFwiLFxyXG5cdFx0XHRoZWFkZXJzOiB7XHJcblx0XHRcdFx0XCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcblx0XHRcdH0sXHJcblx0XHRcdGJvZHk6IEpTT04uc3RyaW5naWZ5KHN1cnZleXMpLFxyXG5cdFx0fSlcclxuXHJcblx0XHRpZiAocmVzcG9uc2Uub2spIHtcclxuXHRcdFx0YXdhaXQgY2xlYXJTdXJ2ZXlzRnJvbURCKClcclxuXHRcdFx0Y29uc29sZS5sb2coXCJTdXJ2ZXlzIHN5bmNlZCBzdWNjZXNzZnVsbHlcIilcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIkZhaWxlZCB0byBzeW5jIHN1cnZleXNcIilcclxuXHRcdH1cclxuXHR9IGNhdGNoIChlcnJvcikge1xyXG5cdFx0Y29uc29sZS5lcnJvcihcIkVycm9yIHN5bmNpbmcgc3VydmV5czpcIiwgZXJyb3IpXHJcblx0fVxyXG59XHJcblxyXG4vLyBGdW5jaW9uZXMgcGFyYSB0cmFiYWphciBjb24gSW5kZXhlZERCXHJcbmZ1bmN0aW9uIG9wZW5EQigpIHtcclxuXHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0Y29uc3QgcmVxdWVzdCA9IGluZGV4ZWREQi5vcGVuKFwiU3VydmV5REJcIiwgMSlcclxuXHJcblx0XHRyZXF1ZXN0Lm9udXBncmFkZW5lZWRlZCA9IChldmVudCkgPT4ge1xyXG5cdFx0XHRjb25zdCBkYiA9IGV2ZW50LnRhcmdldC5yZXN1bHRcclxuXHRcdFx0ZGIuY3JlYXRlT2JqZWN0U3RvcmUoU1RPUkFHRV9LRVksIHsga2V5UGF0aDogXCJpZFwiIH0pXHJcblx0XHR9XHJcblxyXG5cdFx0cmVxdWVzdC5vbnN1Y2Nlc3MgPSAoZXZlbnQpID0+IHtcclxuXHRcdFx0cmVzb2x2ZShldmVudC50YXJnZXQucmVzdWx0KVxyXG5cdFx0fVxyXG5cclxuXHRcdHJlcXVlc3Qub25lcnJvciA9IChldmVudCkgPT4ge1xyXG5cdFx0XHRyZWplY3QoZXZlbnQudGFyZ2V0LmVycm9yKVxyXG5cdFx0fVxyXG5cdH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFN1cnZleXNGcm9tREIoKSB7XHJcblx0cmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdGNvbnN0IGRiID0gYXdhaXQgb3BlbkRCKClcclxuXHRcdGNvbnN0IHRyYW5zYWN0aW9uID0gZGIudHJhbnNhY3Rpb24oU1RPUkFHRV9LRVksIFwicmVhZG9ubHlcIilcclxuXHRcdGNvbnN0IHN0b3JlID0gdHJhbnNhY3Rpb24ub2JqZWN0U3RvcmUoU1RPUkFHRV9LRVkpXHJcblx0XHRjb25zdCByZXF1ZXN0ID0gc3RvcmUuZ2V0QWxsKClcclxuXHJcblx0XHRyZXF1ZXN0Lm9uc3VjY2VzcyA9IChldmVudCkgPT4ge1xyXG5cdFx0XHRyZXNvbHZlKGV2ZW50LnRhcmdldC5yZXN1bHQpXHJcblx0XHR9XHJcblxyXG5cdFx0cmVxdWVzdC5vbmVycm9yID0gKGV2ZW50KSA9PiB7XHJcblx0XHRcdHJlamVjdChldmVudC50YXJnZXQuZXJyb3IpXHJcblx0XHR9XHJcblx0fSlcclxufVxyXG5cclxuZnVuY3Rpb24gY2xlYXJTdXJ2ZXlzRnJvbURCKCkge1xyXG5cdHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRjb25zdCBkYiA9IGF3YWl0IG9wZW5EQigpXHJcblx0XHRjb25zdCB0cmFuc2FjdGlvbiA9IGRiLnRyYW5zYWN0aW9uKFNUT1JBR0VfS0VZLCBcInJlYWR3cml0ZVwiKVxyXG5cdFx0Y29uc3Qgc3RvcmUgPSB0cmFuc2FjdGlvbi5vYmplY3RTdG9yZShTVE9SQUdFX0tFWSlcclxuXHRcdGNvbnN0IHJlcXVlc3QgPSBzdG9yZS5jbGVhcigpXHJcblxyXG5cdFx0cmVxdWVzdC5vbnN1Y2Nlc3MgPSAoKSA9PiB7XHJcblx0XHRcdHJlc29sdmUoKVxyXG5cdFx0fVxyXG5cclxuXHRcdHJlcXVlc3Qub25lcnJvciA9IChldmVudCkgPT4ge1xyXG5cdFx0XHRyZWplY3QoZXZlbnQudGFyZ2V0LmVycm9yKVxyXG5cdFx0fVxyXG5cdH0pXHJcbn1cclxuIl0sIm5hbWVzIjpbIlNUT1JBR0VfS0VZIiwiUE9XRVJfQVVUT01BVEVfVVJMIiwic2VsZiIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsInRhZyIsIndhaXRVbnRpbCIsInN5bmNTdXJ2ZXlzIiwic3VydmV5cyIsImdldFN1cnZleXNGcm9tREIiLCJsZW5ndGgiLCJyZXNwb25zZSIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5Iiwib2siLCJjbGVhclN1cnZleXNGcm9tREIiLCJjb25zb2xlIiwibG9nIiwiRXJyb3IiLCJlcnJvciIsIm9wZW5EQiIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwicmVxdWVzdCIsImluZGV4ZWREQiIsIm9wZW4iLCJvbnVwZ3JhZGVuZWVkZWQiLCJkYiIsInRhcmdldCIsInJlc3VsdCIsImNyZWF0ZU9iamVjdFN0b3JlIiwia2V5UGF0aCIsIm9uc3VjY2VzcyIsIm9uZXJyb3IiLCJ0cmFuc2FjdGlvbiIsInN0b3JlIiwib2JqZWN0U3RvcmUiLCJnZXRBbGwiLCJjbGVhciJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./service-worker/index.js\n"));

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			if (cachedModule.error !== undefined) throw cachedModule.error;
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/trusted types policy */
/******/ 	(() => {
/******/ 		var policy;
/******/ 		__webpack_require__.tt = () => {
/******/ 			// Create Trusted Type policy if Trusted Types are available and the policy doesn't exist yet.
/******/ 			if (policy === undefined) {
/******/ 				policy = {
/******/ 					createScript: (script) => (script)
/******/ 				};
/******/ 				if (typeof trustedTypes !== "undefined" && trustedTypes.createPolicy) {
/******/ 					policy = trustedTypes.createPolicy("nextjs#bundler", policy);
/******/ 				}
/******/ 			}
/******/ 			return policy;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/trusted types script */
/******/ 	(() => {
/******/ 		__webpack_require__.ts = (script) => (__webpack_require__.tt().createScript(script));
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/react refresh */
/******/ 	(() => {
/******/ 		if (__webpack_require__.i) {
/******/ 		__webpack_require__.i.push((options) => {
/******/ 			const originalFactory = options.factory;
/******/ 			options.factory = (moduleObject, moduleExports, webpackRequire) => {
/******/ 				const hasRefresh = typeof self !== "undefined" && !!self.$RefreshInterceptModuleExecution$;
/******/ 				const cleanup = hasRefresh ? self.$RefreshInterceptModuleExecution$(moduleObject.id) : () => {};
/******/ 				try {
/******/ 					originalFactory.call(this, moduleObject, moduleExports, webpackRequire);
/******/ 				} finally {
/******/ 					cleanup();
/******/ 				}
/******/ 			}
/******/ 		})
/******/ 		}
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	
/******/ 	// noop fns to prevent runtime errors during initialization
/******/ 	if (typeof self !== "undefined") {
/******/ 		self.$RefreshReg$ = function () {};
/******/ 		self.$RefreshSig$ = function () {
/******/ 			return function (type) {
/******/ 				return type;
/******/ 			};
/******/ 		};
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./service-worker/index.js");
/******/ 	
/******/ })()
;