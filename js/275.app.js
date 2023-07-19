"use strict";

(self["webpackChunkfls_start"] = self["webpackChunkfls_start"] || []).push([ [ 275 ], {
    275: (__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {
        __webpack_require__.r(__webpack_exports__);
        __webpack_require__.d(__webpack_exports__, {
            default: () => __WEBPACK_DEFAULT_EXPORT__
        });
        var Module = function() {
            var _scriptDir = typeof document !== "undefined" && document.currentScript ? document.currentScript.src : void 0;
            return function(Module) {
                Module = Module || {};
                Module = typeof Module !== "undefined" ? Module : {};
                var readyPromiseResolve, readyPromiseReject;
                Module["ready"] = new Promise((function(resolve, reject) {
                    readyPromiseResolve = resolve;
                    readyPromiseReject = reject;
                }));
                var moduleOverrides = {};
                var key;
                for (key in Module) if (Module.hasOwnProperty(key)) moduleOverrides[key] = Module[key];
                var arguments_ = [];
                var thisProgram = "./this.program";
                var ENVIRONMENT_IS_WEB = true;
                var ENVIRONMENT_IS_WORKER = false;
                var scriptDirectory = "";
                function locateFile(path) {
                    if (Module["locateFile"]) return Module["locateFile"](path, scriptDirectory);
                    return scriptDirectory + path;
                }
                var readBinary;
                if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
                    if (ENVIRONMENT_IS_WORKER) scriptDirectory = self.location.href; else if (typeof document !== "undefined" && document.currentScript) scriptDirectory = document.currentScript.src;
                    if (_scriptDir) scriptDirectory = _scriptDir;
                    if (scriptDirectory.indexOf("blob:") !== 0) scriptDirectory = scriptDirectory.substr(0, scriptDirectory.replace(/[?#].*/, "").lastIndexOf("/") + 1); else scriptDirectory = "";
                    (function(url) {
                        var xhr = new XMLHttpRequest;
                        xhr.open("GET", url, false);
                        xhr.send(null);
                        return xhr.responseText;
                    });
                    if (ENVIRONMENT_IS_WORKER) readBinary = function(url) {
                        var xhr = new XMLHttpRequest;
                        xhr.open("GET", url, false);
                        xhr.responseType = "arraybuffer";
                        xhr.send(null);
                        return new Uint8Array(xhr.response);
                    };
                    (function(url, onload, onerror) {
                        var xhr = new XMLHttpRequest;
                        xhr.open("GET", url, true);
                        xhr.responseType = "arraybuffer";
                        xhr.onload = function() {
                            if (xhr.status == 200 || xhr.status == 0 && xhr.response) {
                                onload(xhr.response);
                                return;
                            }
                            onerror();
                        };
                        xhr.onerror = onerror;
                        xhr.send(null);
                    });
                    (function(title) {
                        document.title = title;
                    });
                }
                var out = Module["print"] || console.log.bind(console);
                var err = Module["printErr"] || console.warn.bind(console);
                for (key in moduleOverrides) if (moduleOverrides.hasOwnProperty(key)) Module[key] = moduleOverrides[key];
                moduleOverrides = null;
                if (Module["arguments"]) arguments_ = Module["arguments"];
                if (Module["thisProgram"]) thisProgram = Module["thisProgram"];
                if (Module["quit"]) Module["quit"];
                function convertJsFunctionToWasm(func, sig) {
                    if (typeof WebAssembly.Function === "function") {
                        var typeNames = {
                            i: "i32",
                            j: "i64",
                            f: "f32",
                            d: "f64"
                        };
                        var type = {
                            parameters: [],
                            results: sig[0] == "v" ? [] : [ typeNames[sig[0]] ]
                        };
                        for (var i = 1; i < sig.length; ++i) type.parameters.push(typeNames[sig[i]]);
                        return new WebAssembly.Function(type, func);
                    }
                    var typeSection = [ 1, 0, 1, 96 ];
                    var sigRet = sig.slice(0, 1);
                    var sigParam = sig.slice(1);
                    var typeCodes = {
                        i: 127,
                        j: 126,
                        f: 125,
                        d: 124
                    };
                    typeSection.push(sigParam.length);
                    for (i = 0; i < sigParam.length; ++i) typeSection.push(typeCodes[sigParam[i]]);
                    if (sigRet == "v") typeSection.push(0); else typeSection = typeSection.concat([ 1, typeCodes[sigRet] ]);
                    typeSection[1] = typeSection.length - 2;
                    var bytes = new Uint8Array([ 0, 97, 115, 109, 1, 0, 0, 0 ].concat(typeSection, [ 2, 7, 1, 1, 101, 1, 102, 0, 0, 7, 5, 1, 1, 102, 0, 0 ]));
                    var module = new WebAssembly.Module(bytes);
                    var instance = new WebAssembly.Instance(module, {
                        e: {
                            f: func
                        }
                    });
                    var wrappedFunc = instance.exports["f"];
                    return wrappedFunc;
                }
                var freeTableIndexes = [];
                var functionsInTableMap;
                function getEmptyTableSlot() {
                    if (freeTableIndexes.length) return freeTableIndexes.pop();
                    try {
                        wasmTable.grow(1);
                    } catch (err) {
                        if (!(err instanceof RangeError)) throw err;
                        throw "Unable to grow wasm table. Set ALLOW_TABLE_GROWTH.";
                    }
                    return wasmTable.length - 1;
                }
                function updateTableMap(offset, count) {
                    for (var i = offset; i < offset + count; i++) {
                        var item = getWasmTableEntry(i);
                        if (item) functionsInTableMap.set(item, i);
                    }
                }
                function addFunction(func, sig) {
                    if (!functionsInTableMap) {
                        functionsInTableMap = new WeakMap;
                        updateTableMap(0, wasmTable.length);
                    }
                    if (functionsInTableMap.has(func)) return functionsInTableMap.get(func);
                    var ret = getEmptyTableSlot();
                    try {
                        setWasmTableEntry(ret, func);
                    } catch (err) {
                        if (!(err instanceof TypeError)) throw err;
                        var wrapped = convertJsFunctionToWasm(func, sig);
                        setWasmTableEntry(ret, wrapped);
                    }
                    functionsInTableMap.set(func, ret);
                    return ret;
                }
                var wasmBinary;
                if (Module["wasmBinary"]) wasmBinary = Module["wasmBinary"];
                Module["noExitRuntime"];
                if (typeof WebAssembly !== "object") abort("no native wasm support detected");
                var wasmMemory;
                var ABORT = false;
                function assert(condition, text) {
                    if (!condition) abort("Assertion failed: " + text);
                }
                var UTF8Decoder = typeof TextDecoder !== "undefined" ? new TextDecoder("utf8") : void 0;
                function UTF8ArrayToString(heap, idx, maxBytesToRead) {
                    var endIdx = idx + maxBytesToRead;
                    var endPtr = idx;
                    while (heap[endPtr] && !(endPtr >= endIdx)) ++endPtr;
                    if (endPtr - idx > 16 && heap.subarray && UTF8Decoder) return UTF8Decoder.decode(heap.subarray(idx, endPtr)); else {
                        var str = "";
                        while (idx < endPtr) {
                            var u0 = heap[idx++];
                            if (!(u0 & 128)) {
                                str += String.fromCharCode(u0);
                                continue;
                            }
                            var u1 = heap[idx++] & 63;
                            if ((u0 & 224) == 192) {
                                str += String.fromCharCode((u0 & 31) << 6 | u1);
                                continue;
                            }
                            var u2 = heap[idx++] & 63;
                            if ((u0 & 240) == 224) u0 = (u0 & 15) << 12 | u1 << 6 | u2; else u0 = (u0 & 7) << 18 | u1 << 12 | u2 << 6 | heap[idx++] & 63;
                            if (u0 < 65536) str += String.fromCharCode(u0); else {
                                var ch = u0 - 65536;
                                str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023);
                            }
                        }
                    }
                    return str;
                }
                function UTF8ToString(ptr, maxBytesToRead) {
                    return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : "";
                }
                function stringToUTF8Array(str, heap, outIdx, maxBytesToWrite) {
                    if (!(maxBytesToWrite > 0)) return 0;
                    var startIdx = outIdx;
                    var endIdx = outIdx + maxBytesToWrite - 1;
                    for (var i = 0; i < str.length; ++i) {
                        var u = str.charCodeAt(i);
                        if (u >= 55296 && u <= 57343) {
                            var u1 = str.charCodeAt(++i);
                            u = 65536 + ((u & 1023) << 10) | u1 & 1023;
                        }
                        if (u <= 127) {
                            if (outIdx >= endIdx) break;
                            heap[outIdx++] = u;
                        } else if (u <= 2047) {
                            if (outIdx + 1 >= endIdx) break;
                            heap[outIdx++] = 192 | u >> 6;
                            heap[outIdx++] = 128 | u & 63;
                        } else if (u <= 65535) {
                            if (outIdx + 2 >= endIdx) break;
                            heap[outIdx++] = 224 | u >> 12;
                            heap[outIdx++] = 128 | u >> 6 & 63;
                            heap[outIdx++] = 128 | u & 63;
                        } else {
                            if (outIdx + 3 >= endIdx) break;
                            heap[outIdx++] = 240 | u >> 18;
                            heap[outIdx++] = 128 | u >> 12 & 63;
                            heap[outIdx++] = 128 | u >> 6 & 63;
                            heap[outIdx++] = 128 | u & 63;
                        }
                    }
                    heap[outIdx] = 0;
                    return outIdx - startIdx;
                }
                function lengthBytesUTF8(str) {
                    var len = 0;
                    for (var i = 0; i < str.length; ++i) {
                        var u = str.charCodeAt(i);
                        if (u >= 55296 && u <= 57343) u = 65536 + ((u & 1023) << 10) | str.charCodeAt(++i) & 1023;
                        if (u <= 127) ++len; else if (u <= 2047) len += 2; else if (u <= 65535) len += 3; else len += 4;
                    }
                    return len;
                }
                function writeArrayToMemory(array, buffer) {
                    HEAP8.set(array, buffer);
                }
                function writeAsciiToMemory(str, buffer, dontAddNull) {
                    for (var i = 0; i < str.length; ++i) HEAP8[buffer++ >> 0] = str.charCodeAt(i);
                    if (!dontAddNull) HEAP8[buffer >> 0] = 0;
                }
                function alignUp(x, multiple) {
                    if (x % multiple > 0) x += multiple - x % multiple;
                    return x;
                }
                var buffer, HEAP8, HEAPU8, HEAP32, HEAPF32;
                function updateGlobalBufferAndViews(buf) {
                    buffer = buf;
                    Module["HEAP8"] = HEAP8 = new Int8Array(buf);
                    Module["HEAP16"] = new Int16Array(buf);
                    Module["HEAP32"] = HEAP32 = new Int32Array(buf);
                    Module["HEAPU8"] = HEAPU8 = new Uint8Array(buf);
                    Module["HEAPU16"] = new Uint16Array(buf);
                    Module["HEAPU32"] = new Uint32Array(buf);
                    Module["HEAPF32"] = HEAPF32 = new Float32Array(buf);
                    Module["HEAPF64"] = new Float64Array(buf);
                }
                Module["INITIAL_MEMORY"];
                var wasmTable;
                var __ATPRERUN__ = [];
                var __ATINIT__ = [];
                var __ATPOSTRUN__ = [];
                function preRun() {
                    if (Module["preRun"]) {
                        if (typeof Module["preRun"] == "function") Module["preRun"] = [ Module["preRun"] ];
                        while (Module["preRun"].length) addOnPreRun(Module["preRun"].shift());
                    }
                    callRuntimeCallbacks(__ATPRERUN__);
                }
                function initRuntime() {
                    true;
                    callRuntimeCallbacks(__ATINIT__);
                }
                function postRun() {
                    if (Module["postRun"]) {
                        if (typeof Module["postRun"] == "function") Module["postRun"] = [ Module["postRun"] ];
                        while (Module["postRun"].length) addOnPostRun(Module["postRun"].shift());
                    }
                    callRuntimeCallbacks(__ATPOSTRUN__);
                }
                function addOnPreRun(cb) {
                    __ATPRERUN__.unshift(cb);
                }
                function addOnInit(cb) {
                    __ATINIT__.unshift(cb);
                }
                function addOnPostRun(cb) {
                    __ATPOSTRUN__.unshift(cb);
                }
                var runDependencies = 0;
                var runDependencyWatcher = null;
                var dependenciesFulfilled = null;
                function addRunDependency(id) {
                    runDependencies++;
                    if (Module["monitorRunDependencies"]) Module["monitorRunDependencies"](runDependencies);
                }
                function removeRunDependency(id) {
                    runDependencies--;
                    if (Module["monitorRunDependencies"]) Module["monitorRunDependencies"](runDependencies);
                    if (runDependencies == 0) {
                        if (runDependencyWatcher !== null) {
                            clearInterval(runDependencyWatcher);
                            runDependencyWatcher = null;
                        }
                        if (dependenciesFulfilled) {
                            var callback = dependenciesFulfilled;
                            dependenciesFulfilled = null;
                            callback();
                        }
                    }
                }
                Module["preloadedImages"] = {};
                Module["preloadedAudios"] = {};
                function abort(what) {
                    if (Module["onAbort"]) Module["onAbort"](what);
                    what = "Aborted(" + what + ")";
                    err(what);
                    ABORT = true;
                    1;
                    what += ". Build with -s ASSERTIONS=1 for more info.";
                    var e = new WebAssembly.RuntimeError(what);
                    readyPromiseReject(e);
                    throw e;
                }
                var dataURIPrefix = "data:application/octet-stream;base64,";
                function isDataURI(filename) {
                    return filename.startsWith(dataURIPrefix);
                }
                var wasmBinaryFile;
                wasmBinaryFile = "navmesh.wasm";
                if (!isDataURI(wasmBinaryFile)) wasmBinaryFile = locateFile(wasmBinaryFile);
                function getBinary(file) {
                    try {
                        if (file == wasmBinaryFile && wasmBinary) return new Uint8Array(wasmBinary);
                        if (readBinary) return readBinary(file); else throw "both async and sync fetching of the wasm failed";
                    } catch (err) {
                        abort(err);
                    }
                }
                function getBinaryPromise() {
                    if (!wasmBinary && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER)) if (typeof fetch === "function") return fetch(wasmBinaryFile, {
                        credentials: "same-origin"
                    }).then((function(response) {
                        if (!response["ok"]) throw "failed to load wasm binary file at '" + wasmBinaryFile + "'";
                        return response["arrayBuffer"]();
                    })).catch((function() {
                        return getBinary(wasmBinaryFile);
                    }));
                    return Promise.resolve().then((function() {
                        return getBinary(wasmBinaryFile);
                    }));
                }
                function createWasm() {
                    var info = {
                        a: asmLibraryArg
                    };
                    function receiveInstance(instance, module) {
                        var exports = instance.exports;
                        Module["asm"] = exports;
                        wasmMemory = Module["asm"]["m"];
                        updateGlobalBufferAndViews(wasmMemory.buffer);
                        wasmTable = Module["asm"]["Jb"];
                        addOnInit(Module["asm"]["n"]);
                        removeRunDependency("wasm-instantiate");
                    }
                    addRunDependency("wasm-instantiate");
                    function receiveInstantiationResult(result) {
                        receiveInstance(result["instance"]);
                    }
                    function instantiateArrayBuffer(receiver) {
                        return getBinaryPromise().then((function(binary) {
                            return WebAssembly.instantiate(binary, info);
                        })).then((function(instance) {
                            return instance;
                        })).then(receiver, (function(reason) {
                            err("failed to asynchronously prepare wasm: " + reason);
                            abort(reason);
                        }));
                    }
                    function instantiateAsync() {
                        if (!wasmBinary && typeof WebAssembly.instantiateStreaming === "function" && !isDataURI(wasmBinaryFile) && typeof fetch === "function") return fetch(wasmBinaryFile, {
                            credentials: "same-origin"
                        }).then((function(response) {
                            var result = WebAssembly.instantiateStreaming(response, info);
                            return result.then(receiveInstantiationResult, (function(reason) {
                                err("wasm streaming compile failed: " + reason);
                                err("falling back to ArrayBuffer instantiation");
                                return instantiateArrayBuffer(receiveInstantiationResult);
                            }));
                        })); else return instantiateArrayBuffer(receiveInstantiationResult);
                    }
                    if (Module["instantiateWasm"]) try {
                        var exports = Module["instantiateWasm"](info, receiveInstance);
                        return exports;
                    } catch (e) {
                        err("Module.instantiateWasm callback failed with error: " + e);
                        return false;
                    }
                    instantiateAsync().catch(readyPromiseReject);
                    return {};
                }
                function callRuntimeCallbacks(callbacks) {
                    while (callbacks.length > 0) {
                        var callback = callbacks.shift();
                        if (typeof callback == "function") {
                            callback(Module);
                            continue;
                        }
                        var func = callback.func;
                        if (typeof func === "number") if (callback.arg === void 0) getWasmTableEntry(func)(); else getWasmTableEntry(func)(callback.arg); else func(callback.arg === void 0 ? null : callback.arg);
                    }
                }
                var wasmTableMirror = [];
                function getWasmTableEntry(funcPtr) {
                    var func = wasmTableMirror[funcPtr];
                    if (!func) {
                        if (funcPtr >= wasmTableMirror.length) wasmTableMirror.length = funcPtr + 1;
                        wasmTableMirror[funcPtr] = func = wasmTable.get(funcPtr);
                    }
                    return func;
                }
                function setWasmTableEntry(idx, func) {
                    wasmTable.set(idx, func);
                    wasmTableMirror[idx] = func;
                }
                function ___cxa_allocate_exception(size) {
                    return _malloc(size + 16) + 16;
                }
                function ExceptionInfo(excPtr) {
                    this.excPtr = excPtr;
                    this.ptr = excPtr - 16;
                    this.set_type = function(type) {
                        HEAP32[this.ptr + 4 >> 2] = type;
                    };
                    this.get_type = function() {
                        return HEAP32[this.ptr + 4 >> 2];
                    };
                    this.set_destructor = function(destructor) {
                        HEAP32[this.ptr + 8 >> 2] = destructor;
                    };
                    this.get_destructor = function() {
                        return HEAP32[this.ptr + 8 >> 2];
                    };
                    this.set_refcount = function(refcount) {
                        HEAP32[this.ptr >> 2] = refcount;
                    };
                    this.set_caught = function(caught) {
                        caught = caught ? 1 : 0;
                        HEAP8[this.ptr + 12 >> 0] = caught;
                    };
                    this.get_caught = function() {
                        return HEAP8[this.ptr + 12 >> 0] != 0;
                    };
                    this.set_rethrown = function(rethrown) {
                        rethrown = rethrown ? 1 : 0;
                        HEAP8[this.ptr + 13 >> 0] = rethrown;
                    };
                    this.get_rethrown = function() {
                        return HEAP8[this.ptr + 13 >> 0] != 0;
                    };
                    this.init = function(type, destructor) {
                        this.set_type(type);
                        this.set_destructor(destructor);
                        this.set_refcount(0);
                        this.set_caught(false);
                        this.set_rethrown(false);
                    };
                    this.add_ref = function() {
                        var value = HEAP32[this.ptr >> 2];
                        HEAP32[this.ptr >> 2] = value + 1;
                    };
                    this.release_ref = function() {
                        var prev = HEAP32[this.ptr >> 2];
                        HEAP32[this.ptr >> 2] = prev - 1;
                        return prev === 1;
                    };
                }
                var uncaughtExceptionCount = 0;
                function ___cxa_throw(ptr, type, destructor) {
                    var info = new ExceptionInfo(ptr);
                    info.init(type, destructor);
                    ptr;
                    uncaughtExceptionCount++;
                    throw ptr;
                }
                function _abort() {
                    abort("");
                }
                function _emscripten_memcpy_big(dest, src, num) {
                    HEAPU8.copyWithin(dest, src, src + num);
                }
                function emscripten_realloc_buffer(size) {
                    try {
                        wasmMemory.grow(size - buffer.byteLength + 65535 >>> 16);
                        updateGlobalBufferAndViews(wasmMemory.buffer);
                        return 1;
                    } catch (e) {}
                }
                function _emscripten_resize_heap(requestedSize) {
                    var oldSize = HEAPU8.length;
                    requestedSize >>>= 0;
                    var maxHeapSize = 2147483648;
                    if (requestedSize > maxHeapSize) return false;
                    for (var cutDown = 1; cutDown <= 4; cutDown *= 2) {
                        var overGrownHeapSize = oldSize * (1 + .2 / cutDown);
                        overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296);
                        var newSize = Math.min(maxHeapSize, alignUp(Math.max(requestedSize, overGrownHeapSize), 65536));
                        var replacement = emscripten_realloc_buffer(newSize);
                        if (replacement) return true;
                    }
                    return false;
                }
                var ENV = {};
                function getExecutableName() {
                    return thisProgram || "./this.program";
                }
                function getEnvStrings() {
                    if (!getEnvStrings.strings) {
                        var lang = (typeof navigator === "object" && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8";
                        var env = {
                            USER: "web_user",
                            LOGNAME: "web_user",
                            PATH: "/",
                            PWD: "/",
                            HOME: "/home/web_user",
                            LANG: lang,
                            _: getExecutableName()
                        };
                        for (var x in ENV) if (ENV[x] === void 0) delete env[x]; else env[x] = ENV[x];
                        var strings = [];
                        for (var x in env) strings.push(x + "=" + env[x]);
                        getEnvStrings.strings = strings;
                    }
                    return getEnvStrings.strings;
                }
                var SYSCALLS = {
                    mappings: {},
                    buffers: [ null, [], [] ],
                    printChar: function(stream, curr) {
                        var buffer = SYSCALLS.buffers[stream];
                        if (curr === 0 || curr === 10) {
                            (stream === 1 ? out : err)(UTF8ArrayToString(buffer, 0));
                            buffer.length = 0;
                        } else buffer.push(curr);
                    },
                    varargs: void 0,
                    get: function() {
                        SYSCALLS.varargs += 4;
                        var ret = HEAP32[SYSCALLS.varargs - 4 >> 2];
                        return ret;
                    },
                    getStr: function(ptr) {
                        var ret = UTF8ToString(ptr);
                        return ret;
                    },
                    get64: function(low, high) {
                        return low;
                    }
                };
                function _environ_get(__environ, environ_buf) {
                    var bufSize = 0;
                    getEnvStrings().forEach((function(string, i) {
                        var ptr = environ_buf + bufSize;
                        HEAP32[__environ + i * 4 >> 2] = ptr;
                        writeAsciiToMemory(string, ptr);
                        bufSize += string.length + 1;
                    }));
                    return 0;
                }
                function _environ_sizes_get(penviron_count, penviron_buf_size) {
                    var strings = getEnvStrings();
                    HEAP32[penviron_count >> 2] = strings.length;
                    var bufSize = 0;
                    strings.forEach((function(string) {
                        bufSize += string.length + 1;
                    }));
                    HEAP32[penviron_buf_size >> 2] = bufSize;
                    return 0;
                }
                function _fd_close(fd) {
                    return 0;
                }
                function _fd_read(fd, iov, iovcnt, pnum) {
                    var stream = SYSCALLS.getStreamFromFD(fd);
                    var num = SYSCALLS.doReadv(stream, iov, iovcnt);
                    HEAP32[pnum >> 2] = num;
                    return 0;
                }
                function _fd_seek(fd, offset_low, offset_high, whence, newOffset) {}
                function _fd_write(fd, iov, iovcnt, pnum) {
                    var num = 0;
                    for (var i = 0; i < iovcnt; i++) {
                        var ptr = HEAP32[iov >> 2];
                        var len = HEAP32[iov + 4 >> 2];
                        iov += 8;
                        for (var j = 0; j < len; j++) SYSCALLS.printChar(fd, HEAPU8[ptr + j]);
                        num += len;
                    }
                    HEAP32[pnum >> 2] = num;
                    return 0;
                }
                function __isLeapYear(year) {
                    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
                }
                function __arraySum(array, index) {
                    var sum = 0;
                    for (var i = 0; i <= index; sum += array[i++]) ;
                    return sum;
                }
                var __MONTH_DAYS_LEAP = [ 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
                var __MONTH_DAYS_REGULAR = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
                function __addDays(date, days) {
                    var newDate = new Date(date.getTime());
                    while (days > 0) {
                        var leap = __isLeapYear(newDate.getFullYear());
                        var currentMonth = newDate.getMonth();
                        var daysInCurrentMonth = (leap ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR)[currentMonth];
                        if (days > daysInCurrentMonth - newDate.getDate()) {
                            days -= daysInCurrentMonth - newDate.getDate() + 1;
                            newDate.setDate(1);
                            if (currentMonth < 11) newDate.setMonth(currentMonth + 1); else {
                                newDate.setMonth(0);
                                newDate.setFullYear(newDate.getFullYear() + 1);
                            }
                        } else {
                            newDate.setDate(newDate.getDate() + days);
                            return newDate;
                        }
                    }
                    return newDate;
                }
                function _strftime(s, maxsize, format, tm) {
                    var tm_zone = HEAP32[tm + 40 >> 2];
                    var date = {
                        tm_sec: HEAP32[tm >> 2],
                        tm_min: HEAP32[tm + 4 >> 2],
                        tm_hour: HEAP32[tm + 8 >> 2],
                        tm_mday: HEAP32[tm + 12 >> 2],
                        tm_mon: HEAP32[tm + 16 >> 2],
                        tm_year: HEAP32[tm + 20 >> 2],
                        tm_wday: HEAP32[tm + 24 >> 2],
                        tm_yday: HEAP32[tm + 28 >> 2],
                        tm_isdst: HEAP32[tm + 32 >> 2],
                        tm_gmtoff: HEAP32[tm + 36 >> 2],
                        tm_zone: tm_zone ? UTF8ToString(tm_zone) : ""
                    };
                    var pattern = UTF8ToString(format);
                    var EXPANSION_RULES_1 = {
                        "%c": "%a %b %d %H:%M:%S %Y",
                        "%D": "%m/%d/%y",
                        "%F": "%Y-%m-%d",
                        "%h": "%b",
                        "%r": "%I:%M:%S %p",
                        "%R": "%H:%M",
                        "%T": "%H:%M:%S",
                        "%x": "%m/%d/%y",
                        "%X": "%H:%M:%S",
                        "%Ec": "%c",
                        "%EC": "%C",
                        "%Ex": "%m/%d/%y",
                        "%EX": "%H:%M:%S",
                        "%Ey": "%y",
                        "%EY": "%Y",
                        "%Od": "%d",
                        "%Oe": "%e",
                        "%OH": "%H",
                        "%OI": "%I",
                        "%Om": "%m",
                        "%OM": "%M",
                        "%OS": "%S",
                        "%Ou": "%u",
                        "%OU": "%U",
                        "%OV": "%V",
                        "%Ow": "%w",
                        "%OW": "%W",
                        "%Oy": "%y"
                    };
                    for (var rule in EXPANSION_RULES_1) pattern = pattern.replace(new RegExp(rule, "g"), EXPANSION_RULES_1[rule]);
                    var WEEKDAYS = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
                    var MONTHS = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
                    function leadingSomething(value, digits, character) {
                        var str = typeof value === "number" ? value.toString() : value || "";
                        while (str.length < digits) str = character[0] + str;
                        return str;
                    }
                    function leadingNulls(value, digits) {
                        return leadingSomething(value, digits, "0");
                    }
                    function compareByDay(date1, date2) {
                        function sgn(value) {
                            return value < 0 ? -1 : value > 0 ? 1 : 0;
                        }
                        var compare;
                        if ((compare = sgn(date1.getFullYear() - date2.getFullYear())) === 0) if ((compare = sgn(date1.getMonth() - date2.getMonth())) === 0) compare = sgn(date1.getDate() - date2.getDate());
                        return compare;
                    }
                    function getFirstWeekStartDate(janFourth) {
                        switch (janFourth.getDay()) {
                          case 0:
                            return new Date(janFourth.getFullYear() - 1, 11, 29);

                          case 1:
                            return janFourth;

                          case 2:
                            return new Date(janFourth.getFullYear(), 0, 3);

                          case 3:
                            return new Date(janFourth.getFullYear(), 0, 2);

                          case 4:
                            return new Date(janFourth.getFullYear(), 0, 1);

                          case 5:
                            return new Date(janFourth.getFullYear() - 1, 11, 31);

                          case 6:
                            return new Date(janFourth.getFullYear() - 1, 11, 30);
                        }
                    }
                    function getWeekBasedYear(date) {
                        var thisDate = __addDays(new Date(date.tm_year + 1900, 0, 1), date.tm_yday);
                        var janFourthThisYear = new Date(thisDate.getFullYear(), 0, 4);
                        var janFourthNextYear = new Date(thisDate.getFullYear() + 1, 0, 4);
                        var firstWeekStartThisYear = getFirstWeekStartDate(janFourthThisYear);
                        var firstWeekStartNextYear = getFirstWeekStartDate(janFourthNextYear);
                        if (compareByDay(firstWeekStartThisYear, thisDate) <= 0) if (compareByDay(firstWeekStartNextYear, thisDate) <= 0) return thisDate.getFullYear() + 1; else return thisDate.getFullYear(); else return thisDate.getFullYear() - 1;
                    }
                    var EXPANSION_RULES_2 = {
                        "%a": function(date) {
                            return WEEKDAYS[date.tm_wday].substring(0, 3);
                        },
                        "%A": function(date) {
                            return WEEKDAYS[date.tm_wday];
                        },
                        "%b": function(date) {
                            return MONTHS[date.tm_mon].substring(0, 3);
                        },
                        "%B": function(date) {
                            return MONTHS[date.tm_mon];
                        },
                        "%C": function(date) {
                            var year = date.tm_year + 1900;
                            return leadingNulls(year / 100 | 0, 2);
                        },
                        "%d": function(date) {
                            return leadingNulls(date.tm_mday, 2);
                        },
                        "%e": function(date) {
                            return leadingSomething(date.tm_mday, 2, " ");
                        },
                        "%g": function(date) {
                            return getWeekBasedYear(date).toString().substring(2);
                        },
                        "%G": function(date) {
                            return getWeekBasedYear(date);
                        },
                        "%H": function(date) {
                            return leadingNulls(date.tm_hour, 2);
                        },
                        "%I": function(date) {
                            var twelveHour = date.tm_hour;
                            if (twelveHour == 0) twelveHour = 12; else if (twelveHour > 12) twelveHour -= 12;
                            return leadingNulls(twelveHour, 2);
                        },
                        "%j": function(date) {
                            return leadingNulls(date.tm_mday + __arraySum(__isLeapYear(date.tm_year + 1900) ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR, date.tm_mon - 1), 3);
                        },
                        "%m": function(date) {
                            return leadingNulls(date.tm_mon + 1, 2);
                        },
                        "%M": function(date) {
                            return leadingNulls(date.tm_min, 2);
                        },
                        "%n": function() {
                            return "\n";
                        },
                        "%p": function(date) {
                            if (date.tm_hour >= 0 && date.tm_hour < 12) return "AM"; else return "PM";
                        },
                        "%S": function(date) {
                            return leadingNulls(date.tm_sec, 2);
                        },
                        "%t": function() {
                            return "\t";
                        },
                        "%u": function(date) {
                            return date.tm_wday || 7;
                        },
                        "%U": function(date) {
                            var janFirst = new Date(date.tm_year + 1900, 0, 1);
                            var firstSunday = janFirst.getDay() === 0 ? janFirst : __addDays(janFirst, 7 - janFirst.getDay());
                            var endDate = new Date(date.tm_year + 1900, date.tm_mon, date.tm_mday);
                            if (compareByDay(firstSunday, endDate) < 0) {
                                var februaryFirstUntilEndMonth = __arraySum(__isLeapYear(endDate.getFullYear()) ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR, endDate.getMonth() - 1) - 31;
                                var firstSundayUntilEndJanuary = 31 - firstSunday.getDate();
                                var days = firstSundayUntilEndJanuary + februaryFirstUntilEndMonth + endDate.getDate();
                                return leadingNulls(Math.ceil(days / 7), 2);
                            }
                            return compareByDay(firstSunday, janFirst) === 0 ? "01" : "00";
                        },
                        "%V": function(date) {
                            var janFourthThisYear = new Date(date.tm_year + 1900, 0, 4);
                            var janFourthNextYear = new Date(date.tm_year + 1901, 0, 4);
                            var firstWeekStartThisYear = getFirstWeekStartDate(janFourthThisYear);
                            var firstWeekStartNextYear = getFirstWeekStartDate(janFourthNextYear);
                            var endDate = __addDays(new Date(date.tm_year + 1900, 0, 1), date.tm_yday);
                            if (compareByDay(endDate, firstWeekStartThisYear) < 0) return "53";
                            if (compareByDay(firstWeekStartNextYear, endDate) <= 0) return "01";
                            var daysDifference;
                            if (firstWeekStartThisYear.getFullYear() < date.tm_year + 1900) daysDifference = date.tm_yday + 32 - firstWeekStartThisYear.getDate(); else daysDifference = date.tm_yday + 1 - firstWeekStartThisYear.getDate();
                            return leadingNulls(Math.ceil(daysDifference / 7), 2);
                        },
                        "%w": function(date) {
                            return date.tm_wday;
                        },
                        "%W": function(date) {
                            var janFirst = new Date(date.tm_year, 0, 1);
                            var firstMonday = janFirst.getDay() === 1 ? janFirst : __addDays(janFirst, janFirst.getDay() === 0 ? 1 : 7 - janFirst.getDay() + 1);
                            var endDate = new Date(date.tm_year + 1900, date.tm_mon, date.tm_mday);
                            if (compareByDay(firstMonday, endDate) < 0) {
                                var februaryFirstUntilEndMonth = __arraySum(__isLeapYear(endDate.getFullYear()) ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR, endDate.getMonth() - 1) - 31;
                                var firstMondayUntilEndJanuary = 31 - firstMonday.getDate();
                                var days = firstMondayUntilEndJanuary + februaryFirstUntilEndMonth + endDate.getDate();
                                return leadingNulls(Math.ceil(days / 7), 2);
                            }
                            return compareByDay(firstMonday, janFirst) === 0 ? "01" : "00";
                        },
                        "%y": function(date) {
                            return (date.tm_year + 1900).toString().substring(2);
                        },
                        "%Y": function(date) {
                            return date.tm_year + 1900;
                        },
                        "%z": function(date) {
                            var off = date.tm_gmtoff;
                            var ahead = off >= 0;
                            off = Math.abs(off) / 60;
                            off = off / 60 * 100 + off % 60;
                            return (ahead ? "+" : "-") + String("0000" + off).slice(-4);
                        },
                        "%Z": function(date) {
                            return date.tm_zone;
                        },
                        "%%": function() {
                            return "%";
                        }
                    };
                    for (var rule in EXPANSION_RULES_2) if (pattern.includes(rule)) pattern = pattern.replace(new RegExp(rule, "g"), EXPANSION_RULES_2[rule](date));
                    var bytes = intArrayFromString(pattern, false);
                    if (bytes.length > maxsize) return 0;
                    writeArrayToMemory(bytes, s);
                    return bytes.length - 1;
                }
                function _strftime_l(s, maxsize, format, tm) {
                    return _strftime(s, maxsize, format, tm);
                }
                function intArrayFromString(stringy, dontAddNull, length) {
                    var len = length > 0 ? length : lengthBytesUTF8(stringy) + 1;
                    var u8array = new Array(len);
                    var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
                    if (dontAddNull) u8array.length = numBytesWritten;
                    return u8array;
                }
                var asmLibraryArg = {
                    l: ___cxa_allocate_exception,
                    k: ___cxa_throw,
                    b: _abort,
                    j: _emscripten_memcpy_big,
                    a: _emscripten_resize_heap,
                    g: _environ_get,
                    h: _environ_sizes_get,
                    c: _fd_close,
                    e: _fd_read,
                    i: _fd_seek,
                    d: _fd_write,
                    f: _strftime_l
                };
                createWasm();
                Module["___wasm_call_ctors"] = function() {
                    return (Module["___wasm_call_ctors"] = Module["asm"]["n"]).apply(null, arguments);
                };
                var _emscripten_bind_VoidPtr___destroy___0 = Module["_emscripten_bind_VoidPtr___destroy___0"] = function() {
                    return (_emscripten_bind_VoidPtr___destroy___0 = Module["_emscripten_bind_VoidPtr___destroy___0"] = Module["asm"]["o"]).apply(null, arguments);
                };
                var _emscripten_bind_rcConfig_rcConfig_0 = Module["_emscripten_bind_rcConfig_rcConfig_0"] = function() {
                    return (_emscripten_bind_rcConfig_rcConfig_0 = Module["_emscripten_bind_rcConfig_rcConfig_0"] = Module["asm"]["p"]).apply(null, arguments);
                };
                var _emscripten_bind_rcConfig_get_width_0 = Module["_emscripten_bind_rcConfig_get_width_0"] = function() {
                    return (_emscripten_bind_rcConfig_get_width_0 = Module["_emscripten_bind_rcConfig_get_width_0"] = Module["asm"]["q"]).apply(null, arguments);
                };
                var _emscripten_bind_rcConfig_set_width_1 = Module["_emscripten_bind_rcConfig_set_width_1"] = function() {
                    return (_emscripten_bind_rcConfig_set_width_1 = Module["_emscripten_bind_rcConfig_set_width_1"] = Module["asm"]["r"]).apply(null, arguments);
                };
                var _emscripten_bind_rcConfig_get_height_0 = Module["_emscripten_bind_rcConfig_get_height_0"] = function() {
                    return (_emscripten_bind_rcConfig_get_height_0 = Module["_emscripten_bind_rcConfig_get_height_0"] = Module["asm"]["s"]).apply(null, arguments);
                };
                var _emscripten_bind_rcConfig_set_height_1 = Module["_emscripten_bind_rcConfig_set_height_1"] = function() {
                    return (_emscripten_bind_rcConfig_set_height_1 = Module["_emscripten_bind_rcConfig_set_height_1"] = Module["asm"]["t"]).apply(null, arguments);
                };
                var _emscripten_bind_rcConfig_get_tileSize_0 = Module["_emscripten_bind_rcConfig_get_tileSize_0"] = function() {
                    return (_emscripten_bind_rcConfig_get_tileSize_0 = Module["_emscripten_bind_rcConfig_get_tileSize_0"] = Module["asm"]["u"]).apply(null, arguments);
                };
                var _emscripten_bind_rcConfig_set_tileSize_1 = Module["_emscripten_bind_rcConfig_set_tileSize_1"] = function() {
                    return (_emscripten_bind_rcConfig_set_tileSize_1 = Module["_emscripten_bind_rcConfig_set_tileSize_1"] = Module["asm"]["v"]).apply(null, arguments);
                };
                var _emscripten_bind_rcConfig_get_borderSize_0 = Module["_emscripten_bind_rcConfig_get_borderSize_0"] = function() {
                    return (_emscripten_bind_rcConfig_get_borderSize_0 = Module["_emscripten_bind_rcConfig_get_borderSize_0"] = Module["asm"]["w"]).apply(null, arguments);
                };
                var _emscripten_bind_rcConfig_set_borderSize_1 = Module["_emscripten_bind_rcConfig_set_borderSize_1"] = function() {
                    return (_emscripten_bind_rcConfig_set_borderSize_1 = Module["_emscripten_bind_rcConfig_set_borderSize_1"] = Module["asm"]["x"]).apply(null, arguments);
                };
                var _emscripten_bind_rcConfig_get_cs_0 = Module["_emscripten_bind_rcConfig_get_cs_0"] = function() {
                    return (_emscripten_bind_rcConfig_get_cs_0 = Module["_emscripten_bind_rcConfig_get_cs_0"] = Module["asm"]["y"]).apply(null, arguments);
                };
                var _emscripten_bind_rcConfig_set_cs_1 = Module["_emscripten_bind_rcConfig_set_cs_1"] = function() {
                    return (_emscripten_bind_rcConfig_set_cs_1 = Module["_emscripten_bind_rcConfig_set_cs_1"] = Module["asm"]["z"]).apply(null, arguments);
                };
                var _emscripten_bind_rcConfig_get_ch_0 = Module["_emscripten_bind_rcConfig_get_ch_0"] = function() {
                    return (_emscripten_bind_rcConfig_get_ch_0 = Module["_emscripten_bind_rcConfig_get_ch_0"] = Module["asm"]["A"]).apply(null, arguments);
                };
                var _emscripten_bind_rcConfig_set_ch_1 = Module["_emscripten_bind_rcConfig_set_ch_1"] = function() {
                    return (_emscripten_bind_rcConfig_set_ch_1 = Module["_emscripten_bind_rcConfig_set_ch_1"] = Module["asm"]["B"]).apply(null, arguments);
                };
                var _emscripten_bind_rcConfig_get_bmin_1 = Module["_emscripten_bind_rcConfig_get_bmin_1"] = function() {
                    return (_emscripten_bind_rcConfig_get_bmin_1 = Module["_emscripten_bind_rcConfig_get_bmin_1"] = Module["asm"]["C"]).apply(null, arguments);
                };
                var _emscripten_bind_rcConfig_set_bmin_2 = Module["_emscripten_bind_rcConfig_set_bmin_2"] = function() {
                    return (_emscripten_bind_rcConfig_set_bmin_2 = Module["_emscripten_bind_rcConfig_set_bmin_2"] = Module["asm"]["D"]).apply(null, arguments);
                };
                var _emscripten_bind_rcConfig_get_bmax_1 = Module["_emscripten_bind_rcConfig_get_bmax_1"] = function() {
                    return (_emscripten_bind_rcConfig_get_bmax_1 = Module["_emscripten_bind_rcConfig_get_bmax_1"] = Module["asm"]["E"]).apply(null, arguments);
                };
                var _emscripten_bind_rcConfig_set_bmax_2 = Module["_emscripten_bind_rcConfig_set_bmax_2"] = function() {
                    return (_emscripten_bind_rcConfig_set_bmax_2 = Module["_emscripten_bind_rcConfig_set_bmax_2"] = Module["asm"]["F"]).apply(null, arguments);
                };
                var _emscripten_bind_rcConfig_get_walkableSlopeAngle_0 = Module["_emscripten_bind_rcConfig_get_walkableSlopeAngle_0"] = function() {
                    return (_emscripten_bind_rcConfig_get_walkableSlopeAngle_0 = Module["_emscripten_bind_rcConfig_get_walkableSlopeAngle_0"] = Module["asm"]["G"]).apply(null, arguments);
                };
                var _emscripten_bind_rcConfig_set_walkableSlopeAngle_1 = Module["_emscripten_bind_rcConfig_set_walkableSlopeAngle_1"] = function() {
                    return (_emscripten_bind_rcConfig_set_walkableSlopeAngle_1 = Module["_emscripten_bind_rcConfig_set_walkableSlopeAngle_1"] = Module["asm"]["H"]).apply(null, arguments);
                };
                var _emscripten_bind_rcConfig_get_walkableHeight_0 = Module["_emscripten_bind_rcConfig_get_walkableHeight_0"] = function() {
                    return (_emscripten_bind_rcConfig_get_walkableHeight_0 = Module["_emscripten_bind_rcConfig_get_walkableHeight_0"] = Module["asm"]["I"]).apply(null, arguments);
                };
                var _emscripten_bind_rcConfig_set_walkableHeight_1 = Module["_emscripten_bind_rcConfig_set_walkableHeight_1"] = function() {
                    return (_emscripten_bind_rcConfig_set_walkableHeight_1 = Module["_emscripten_bind_rcConfig_set_walkableHeight_1"] = Module["asm"]["J"]).apply(null, arguments);
                };
                var _emscripten_bind_rcConfig_get_walkableClimb_0 = Module["_emscripten_bind_rcConfig_get_walkableClimb_0"] = function() {
                    return (_emscripten_bind_rcConfig_get_walkableClimb_0 = Module["_emscripten_bind_rcConfig_get_walkableClimb_0"] = Module["asm"]["K"]).apply(null, arguments);
                };
                var _emscripten_bind_rcConfig_set_walkableClimb_1 = Module["_emscripten_bind_rcConfig_set_walkableClimb_1"] = function() {
                    return (_emscripten_bind_rcConfig_set_walkableClimb_1 = Module["_emscripten_bind_rcConfig_set_walkableClimb_1"] = Module["asm"]["L"]).apply(null, arguments);
                };
                var _emscripten_bind_rcConfig_get_walkableRadius_0 = Module["_emscripten_bind_rcConfig_get_walkableRadius_0"] = function() {
                    return (_emscripten_bind_rcConfig_get_walkableRadius_0 = Module["_emscripten_bind_rcConfig_get_walkableRadius_0"] = Module["asm"]["M"]).apply(null, arguments);
                };
                var _emscripten_bind_rcConfig_set_walkableRadius_1 = Module["_emscripten_bind_rcConfig_set_walkableRadius_1"] = function() {
                    return (_emscripten_bind_rcConfig_set_walkableRadius_1 = Module["_emscripten_bind_rcConfig_set_walkableRadius_1"] = Module["asm"]["N"]).apply(null, arguments);
                };
                var _emscripten_bind_rcConfig_get_maxEdgeLen_0 = Module["_emscripten_bind_rcConfig_get_maxEdgeLen_0"] = function() {
                    return (_emscripten_bind_rcConfig_get_maxEdgeLen_0 = Module["_emscripten_bind_rcConfig_get_maxEdgeLen_0"] = Module["asm"]["O"]).apply(null, arguments);
                };
                var _emscripten_bind_rcConfig_set_maxEdgeLen_1 = Module["_emscripten_bind_rcConfig_set_maxEdgeLen_1"] = function() {
                    return (_emscripten_bind_rcConfig_set_maxEdgeLen_1 = Module["_emscripten_bind_rcConfig_set_maxEdgeLen_1"] = Module["asm"]["P"]).apply(null, arguments);
                };
                var _emscripten_bind_rcConfig_get_maxSimplificationError_0 = Module["_emscripten_bind_rcConfig_get_maxSimplificationError_0"] = function() {
                    return (_emscripten_bind_rcConfig_get_maxSimplificationError_0 = Module["_emscripten_bind_rcConfig_get_maxSimplificationError_0"] = Module["asm"]["Q"]).apply(null, arguments);
                };
                var _emscripten_bind_rcConfig_set_maxSimplificationError_1 = Module["_emscripten_bind_rcConfig_set_maxSimplificationError_1"] = function() {
                    return (_emscripten_bind_rcConfig_set_maxSimplificationError_1 = Module["_emscripten_bind_rcConfig_set_maxSimplificationError_1"] = Module["asm"]["R"]).apply(null, arguments);
                };
                var _emscripten_bind_rcConfig_get_minRegionArea_0 = Module["_emscripten_bind_rcConfig_get_minRegionArea_0"] = function() {
                    return (_emscripten_bind_rcConfig_get_minRegionArea_0 = Module["_emscripten_bind_rcConfig_get_minRegionArea_0"] = Module["asm"]["S"]).apply(null, arguments);
                };
                var _emscripten_bind_rcConfig_set_minRegionArea_1 = Module["_emscripten_bind_rcConfig_set_minRegionArea_1"] = function() {
                    return (_emscripten_bind_rcConfig_set_minRegionArea_1 = Module["_emscripten_bind_rcConfig_set_minRegionArea_1"] = Module["asm"]["T"]).apply(null, arguments);
                };
                var _emscripten_bind_rcConfig_get_mergeRegionArea_0 = Module["_emscripten_bind_rcConfig_get_mergeRegionArea_0"] = function() {
                    return (_emscripten_bind_rcConfig_get_mergeRegionArea_0 = Module["_emscripten_bind_rcConfig_get_mergeRegionArea_0"] = Module["asm"]["U"]).apply(null, arguments);
                };
                var _emscripten_bind_rcConfig_set_mergeRegionArea_1 = Module["_emscripten_bind_rcConfig_set_mergeRegionArea_1"] = function() {
                    return (_emscripten_bind_rcConfig_set_mergeRegionArea_1 = Module["_emscripten_bind_rcConfig_set_mergeRegionArea_1"] = Module["asm"]["V"]).apply(null, arguments);
                };
                var _emscripten_bind_rcConfig_get_maxVertsPerPoly_0 = Module["_emscripten_bind_rcConfig_get_maxVertsPerPoly_0"] = function() {
                    return (_emscripten_bind_rcConfig_get_maxVertsPerPoly_0 = Module["_emscripten_bind_rcConfig_get_maxVertsPerPoly_0"] = Module["asm"]["W"]).apply(null, arguments);
                };
                var _emscripten_bind_rcConfig_set_maxVertsPerPoly_1 = Module["_emscripten_bind_rcConfig_set_maxVertsPerPoly_1"] = function() {
                    return (_emscripten_bind_rcConfig_set_maxVertsPerPoly_1 = Module["_emscripten_bind_rcConfig_set_maxVertsPerPoly_1"] = Module["asm"]["X"]).apply(null, arguments);
                };
                var _emscripten_bind_rcConfig_get_detailSampleDist_0 = Module["_emscripten_bind_rcConfig_get_detailSampleDist_0"] = function() {
                    return (_emscripten_bind_rcConfig_get_detailSampleDist_0 = Module["_emscripten_bind_rcConfig_get_detailSampleDist_0"] = Module["asm"]["Y"]).apply(null, arguments);
                };
                var _emscripten_bind_rcConfig_set_detailSampleDist_1 = Module["_emscripten_bind_rcConfig_set_detailSampleDist_1"] = function() {
                    return (_emscripten_bind_rcConfig_set_detailSampleDist_1 = Module["_emscripten_bind_rcConfig_set_detailSampleDist_1"] = Module["asm"]["Z"]).apply(null, arguments);
                };
                var _emscripten_bind_rcConfig_get_detailSampleMaxError_0 = Module["_emscripten_bind_rcConfig_get_detailSampleMaxError_0"] = function() {
                    return (_emscripten_bind_rcConfig_get_detailSampleMaxError_0 = Module["_emscripten_bind_rcConfig_get_detailSampleMaxError_0"] = Module["asm"]["_"]).apply(null, arguments);
                };
                var _emscripten_bind_rcConfig_set_detailSampleMaxError_1 = Module["_emscripten_bind_rcConfig_set_detailSampleMaxError_1"] = function() {
                    return (_emscripten_bind_rcConfig_set_detailSampleMaxError_1 = Module["_emscripten_bind_rcConfig_set_detailSampleMaxError_1"] = Module["asm"]["$"]).apply(null, arguments);
                };
                var _emscripten_bind_rcConfig___destroy___0 = Module["_emscripten_bind_rcConfig___destroy___0"] = function() {
                    return (_emscripten_bind_rcConfig___destroy___0 = Module["_emscripten_bind_rcConfig___destroy___0"] = Module["asm"]["aa"]).apply(null, arguments);
                };
                var _emscripten_bind_Vec3_Vec3_0 = Module["_emscripten_bind_Vec3_Vec3_0"] = function() {
                    return (_emscripten_bind_Vec3_Vec3_0 = Module["_emscripten_bind_Vec3_Vec3_0"] = Module["asm"]["ba"]).apply(null, arguments);
                };
                var _emscripten_bind_Vec3_Vec3_3 = Module["_emscripten_bind_Vec3_Vec3_3"] = function() {
                    return (_emscripten_bind_Vec3_Vec3_3 = Module["_emscripten_bind_Vec3_Vec3_3"] = Module["asm"]["ca"]).apply(null, arguments);
                };
                var _emscripten_bind_Vec3_get_x_0 = Module["_emscripten_bind_Vec3_get_x_0"] = function() {
                    return (_emscripten_bind_Vec3_get_x_0 = Module["_emscripten_bind_Vec3_get_x_0"] = Module["asm"]["da"]).apply(null, arguments);
                };
                var _emscripten_bind_Vec3_set_x_1 = Module["_emscripten_bind_Vec3_set_x_1"] = function() {
                    return (_emscripten_bind_Vec3_set_x_1 = Module["_emscripten_bind_Vec3_set_x_1"] = Module["asm"]["ea"]).apply(null, arguments);
                };
                var _emscripten_bind_Vec3_get_y_0 = Module["_emscripten_bind_Vec3_get_y_0"] = function() {
                    return (_emscripten_bind_Vec3_get_y_0 = Module["_emscripten_bind_Vec3_get_y_0"] = Module["asm"]["fa"]).apply(null, arguments);
                };
                var _emscripten_bind_Vec3_set_y_1 = Module["_emscripten_bind_Vec3_set_y_1"] = function() {
                    return (_emscripten_bind_Vec3_set_y_1 = Module["_emscripten_bind_Vec3_set_y_1"] = Module["asm"]["ga"]).apply(null, arguments);
                };
                var _emscripten_bind_Vec3_get_z_0 = Module["_emscripten_bind_Vec3_get_z_0"] = function() {
                    return (_emscripten_bind_Vec3_get_z_0 = Module["_emscripten_bind_Vec3_get_z_0"] = Module["asm"]["ha"]).apply(null, arguments);
                };
                var _emscripten_bind_Vec3_set_z_1 = Module["_emscripten_bind_Vec3_set_z_1"] = function() {
                    return (_emscripten_bind_Vec3_set_z_1 = Module["_emscripten_bind_Vec3_set_z_1"] = Module["asm"]["ia"]).apply(null, arguments);
                };
                var _emscripten_bind_Vec3___destroy___0 = Module["_emscripten_bind_Vec3___destroy___0"] = function() {
                    return (_emscripten_bind_Vec3___destroy___0 = Module["_emscripten_bind_Vec3___destroy___0"] = Module["asm"]["ja"]).apply(null, arguments);
                };
                var _emscripten_bind_Triangle_Triangle_0 = Module["_emscripten_bind_Triangle_Triangle_0"] = function() {
                    return (_emscripten_bind_Triangle_Triangle_0 = Module["_emscripten_bind_Triangle_Triangle_0"] = Module["asm"]["ka"]).apply(null, arguments);
                };
                var _emscripten_bind_Triangle_getPoint_1 = Module["_emscripten_bind_Triangle_getPoint_1"] = function() {
                    return (_emscripten_bind_Triangle_getPoint_1 = Module["_emscripten_bind_Triangle_getPoint_1"] = Module["asm"]["la"]).apply(null, arguments);
                };
                var _emscripten_bind_Triangle___destroy___0 = Module["_emscripten_bind_Triangle___destroy___0"] = function() {
                    return (_emscripten_bind_Triangle___destroy___0 = Module["_emscripten_bind_Triangle___destroy___0"] = Module["asm"]["ma"]).apply(null, arguments);
                };
                var _emscripten_bind_DebugNavMesh_DebugNavMesh_0 = Module["_emscripten_bind_DebugNavMesh_DebugNavMesh_0"] = function() {
                    return (_emscripten_bind_DebugNavMesh_DebugNavMesh_0 = Module["_emscripten_bind_DebugNavMesh_DebugNavMesh_0"] = Module["asm"]["na"]).apply(null, arguments);
                };
                var _emscripten_bind_DebugNavMesh_getTriangleCount_0 = Module["_emscripten_bind_DebugNavMesh_getTriangleCount_0"] = function() {
                    return (_emscripten_bind_DebugNavMesh_getTriangleCount_0 = Module["_emscripten_bind_DebugNavMesh_getTriangleCount_0"] = Module["asm"]["oa"]).apply(null, arguments);
                };
                var _emscripten_bind_DebugNavMesh_getTriangle_1 = Module["_emscripten_bind_DebugNavMesh_getTriangle_1"] = function() {
                    return (_emscripten_bind_DebugNavMesh_getTriangle_1 = Module["_emscripten_bind_DebugNavMesh_getTriangle_1"] = Module["asm"]["pa"]).apply(null, arguments);
                };
                var _emscripten_bind_DebugNavMesh___destroy___0 = Module["_emscripten_bind_DebugNavMesh___destroy___0"] = function() {
                    return (_emscripten_bind_DebugNavMesh___destroy___0 = Module["_emscripten_bind_DebugNavMesh___destroy___0"] = Module["asm"]["qa"]).apply(null, arguments);
                };
                var _emscripten_bind_dtNavMesh___destroy___0 = Module["_emscripten_bind_dtNavMesh___destroy___0"] = function() {
                    return (_emscripten_bind_dtNavMesh___destroy___0 = Module["_emscripten_bind_dtNavMesh___destroy___0"] = Module["asm"]["ra"]).apply(null, arguments);
                };
                var _emscripten_bind_NavmeshData_NavmeshData_0 = Module["_emscripten_bind_NavmeshData_NavmeshData_0"] = function() {
                    return (_emscripten_bind_NavmeshData_NavmeshData_0 = Module["_emscripten_bind_NavmeshData_NavmeshData_0"] = Module["asm"]["sa"]).apply(null, arguments);
                };
                var _emscripten_bind_NavmeshData_get_dataPointer_0 = Module["_emscripten_bind_NavmeshData_get_dataPointer_0"] = function() {
                    return (_emscripten_bind_NavmeshData_get_dataPointer_0 = Module["_emscripten_bind_NavmeshData_get_dataPointer_0"] = Module["asm"]["ta"]).apply(null, arguments);
                };
                var _emscripten_bind_NavmeshData_set_dataPointer_1 = Module["_emscripten_bind_NavmeshData_set_dataPointer_1"] = function() {
                    return (_emscripten_bind_NavmeshData_set_dataPointer_1 = Module["_emscripten_bind_NavmeshData_set_dataPointer_1"] = Module["asm"]["ua"]).apply(null, arguments);
                };
                var _emscripten_bind_NavmeshData_get_size_0 = Module["_emscripten_bind_NavmeshData_get_size_0"] = function() {
                    return (_emscripten_bind_NavmeshData_get_size_0 = Module["_emscripten_bind_NavmeshData_get_size_0"] = Module["asm"]["va"]).apply(null, arguments);
                };
                var _emscripten_bind_NavmeshData_set_size_1 = Module["_emscripten_bind_NavmeshData_set_size_1"] = function() {
                    return (_emscripten_bind_NavmeshData_set_size_1 = Module["_emscripten_bind_NavmeshData_set_size_1"] = Module["asm"]["wa"]).apply(null, arguments);
                };
                var _emscripten_bind_NavmeshData___destroy___0 = Module["_emscripten_bind_NavmeshData___destroy___0"] = function() {
                    return (_emscripten_bind_NavmeshData___destroy___0 = Module["_emscripten_bind_NavmeshData___destroy___0"] = Module["asm"]["xa"]).apply(null, arguments);
                };
                var _emscripten_bind_NavPath_getPointCount_0 = Module["_emscripten_bind_NavPath_getPointCount_0"] = function() {
                    return (_emscripten_bind_NavPath_getPointCount_0 = Module["_emscripten_bind_NavPath_getPointCount_0"] = Module["asm"]["ya"]).apply(null, arguments);
                };
                var _emscripten_bind_NavPath_getPoint_1 = Module["_emscripten_bind_NavPath_getPoint_1"] = function() {
                    return (_emscripten_bind_NavPath_getPoint_1 = Module["_emscripten_bind_NavPath_getPoint_1"] = Module["asm"]["za"]).apply(null, arguments);
                };
                var _emscripten_bind_NavPath___destroy___0 = Module["_emscripten_bind_NavPath___destroy___0"] = function() {
                    return (_emscripten_bind_NavPath___destroy___0 = Module["_emscripten_bind_NavPath___destroy___0"] = Module["asm"]["Aa"]).apply(null, arguments);
                };
                var _emscripten_bind_dtObstacleRef___destroy___0 = Module["_emscripten_bind_dtObstacleRef___destroy___0"] = function() {
                    return (_emscripten_bind_dtObstacleRef___destroy___0 = Module["_emscripten_bind_dtObstacleRef___destroy___0"] = Module["asm"]["Ba"]).apply(null, arguments);
                };
                var _emscripten_bind_dtCrowdAgentParams_dtCrowdAgentParams_0 = Module["_emscripten_bind_dtCrowdAgentParams_dtCrowdAgentParams_0"] = function() {
                    return (_emscripten_bind_dtCrowdAgentParams_dtCrowdAgentParams_0 = Module["_emscripten_bind_dtCrowdAgentParams_dtCrowdAgentParams_0"] = Module["asm"]["Ca"]).apply(null, arguments);
                };
                var _emscripten_bind_dtCrowdAgentParams_get_radius_0 = Module["_emscripten_bind_dtCrowdAgentParams_get_radius_0"] = function() {
                    return (_emscripten_bind_dtCrowdAgentParams_get_radius_0 = Module["_emscripten_bind_dtCrowdAgentParams_get_radius_0"] = Module["asm"]["Da"]).apply(null, arguments);
                };
                var _emscripten_bind_dtCrowdAgentParams_set_radius_1 = Module["_emscripten_bind_dtCrowdAgentParams_set_radius_1"] = function() {
                    return (_emscripten_bind_dtCrowdAgentParams_set_radius_1 = Module["_emscripten_bind_dtCrowdAgentParams_set_radius_1"] = Module["asm"]["Ea"]).apply(null, arguments);
                };
                var _emscripten_bind_dtCrowdAgentParams_get_height_0 = Module["_emscripten_bind_dtCrowdAgentParams_get_height_0"] = function() {
                    return (_emscripten_bind_dtCrowdAgentParams_get_height_0 = Module["_emscripten_bind_dtCrowdAgentParams_get_height_0"] = Module["asm"]["Fa"]).apply(null, arguments);
                };
                var _emscripten_bind_dtCrowdAgentParams_set_height_1 = Module["_emscripten_bind_dtCrowdAgentParams_set_height_1"] = function() {
                    return (_emscripten_bind_dtCrowdAgentParams_set_height_1 = Module["_emscripten_bind_dtCrowdAgentParams_set_height_1"] = Module["asm"]["Ga"]).apply(null, arguments);
                };
                var _emscripten_bind_dtCrowdAgentParams_get_maxAcceleration_0 = Module["_emscripten_bind_dtCrowdAgentParams_get_maxAcceleration_0"] = function() {
                    return (_emscripten_bind_dtCrowdAgentParams_get_maxAcceleration_0 = Module["_emscripten_bind_dtCrowdAgentParams_get_maxAcceleration_0"] = Module["asm"]["Ha"]).apply(null, arguments);
                };
                var _emscripten_bind_dtCrowdAgentParams_set_maxAcceleration_1 = Module["_emscripten_bind_dtCrowdAgentParams_set_maxAcceleration_1"] = function() {
                    return (_emscripten_bind_dtCrowdAgentParams_set_maxAcceleration_1 = Module["_emscripten_bind_dtCrowdAgentParams_set_maxAcceleration_1"] = Module["asm"]["Ia"]).apply(null, arguments);
                };
                var _emscripten_bind_dtCrowdAgentParams_get_maxSpeed_0 = Module["_emscripten_bind_dtCrowdAgentParams_get_maxSpeed_0"] = function() {
                    return (_emscripten_bind_dtCrowdAgentParams_get_maxSpeed_0 = Module["_emscripten_bind_dtCrowdAgentParams_get_maxSpeed_0"] = Module["asm"]["Ja"]).apply(null, arguments);
                };
                var _emscripten_bind_dtCrowdAgentParams_set_maxSpeed_1 = Module["_emscripten_bind_dtCrowdAgentParams_set_maxSpeed_1"] = function() {
                    return (_emscripten_bind_dtCrowdAgentParams_set_maxSpeed_1 = Module["_emscripten_bind_dtCrowdAgentParams_set_maxSpeed_1"] = Module["asm"]["Ka"]).apply(null, arguments);
                };
                var _emscripten_bind_dtCrowdAgentParams_get_collisionQueryRange_0 = Module["_emscripten_bind_dtCrowdAgentParams_get_collisionQueryRange_0"] = function() {
                    return (_emscripten_bind_dtCrowdAgentParams_get_collisionQueryRange_0 = Module["_emscripten_bind_dtCrowdAgentParams_get_collisionQueryRange_0"] = Module["asm"]["La"]).apply(null, arguments);
                };
                var _emscripten_bind_dtCrowdAgentParams_set_collisionQueryRange_1 = Module["_emscripten_bind_dtCrowdAgentParams_set_collisionQueryRange_1"] = function() {
                    return (_emscripten_bind_dtCrowdAgentParams_set_collisionQueryRange_1 = Module["_emscripten_bind_dtCrowdAgentParams_set_collisionQueryRange_1"] = Module["asm"]["Ma"]).apply(null, arguments);
                };
                var _emscripten_bind_dtCrowdAgentParams_get_pathOptimizationRange_0 = Module["_emscripten_bind_dtCrowdAgentParams_get_pathOptimizationRange_0"] = function() {
                    return (_emscripten_bind_dtCrowdAgentParams_get_pathOptimizationRange_0 = Module["_emscripten_bind_dtCrowdAgentParams_get_pathOptimizationRange_0"] = Module["asm"]["Na"]).apply(null, arguments);
                };
                var _emscripten_bind_dtCrowdAgentParams_set_pathOptimizationRange_1 = Module["_emscripten_bind_dtCrowdAgentParams_set_pathOptimizationRange_1"] = function() {
                    return (_emscripten_bind_dtCrowdAgentParams_set_pathOptimizationRange_1 = Module["_emscripten_bind_dtCrowdAgentParams_set_pathOptimizationRange_1"] = Module["asm"]["Oa"]).apply(null, arguments);
                };
                var _emscripten_bind_dtCrowdAgentParams_get_separationWeight_0 = Module["_emscripten_bind_dtCrowdAgentParams_get_separationWeight_0"] = function() {
                    return (_emscripten_bind_dtCrowdAgentParams_get_separationWeight_0 = Module["_emscripten_bind_dtCrowdAgentParams_get_separationWeight_0"] = Module["asm"]["Pa"]).apply(null, arguments);
                };
                var _emscripten_bind_dtCrowdAgentParams_set_separationWeight_1 = Module["_emscripten_bind_dtCrowdAgentParams_set_separationWeight_1"] = function() {
                    return (_emscripten_bind_dtCrowdAgentParams_set_separationWeight_1 = Module["_emscripten_bind_dtCrowdAgentParams_set_separationWeight_1"] = Module["asm"]["Qa"]).apply(null, arguments);
                };
                var _emscripten_bind_dtCrowdAgentParams_get_updateFlags_0 = Module["_emscripten_bind_dtCrowdAgentParams_get_updateFlags_0"] = function() {
                    return (_emscripten_bind_dtCrowdAgentParams_get_updateFlags_0 = Module["_emscripten_bind_dtCrowdAgentParams_get_updateFlags_0"] = Module["asm"]["Ra"]).apply(null, arguments);
                };
                var _emscripten_bind_dtCrowdAgentParams_set_updateFlags_1 = Module["_emscripten_bind_dtCrowdAgentParams_set_updateFlags_1"] = function() {
                    return (_emscripten_bind_dtCrowdAgentParams_set_updateFlags_1 = Module["_emscripten_bind_dtCrowdAgentParams_set_updateFlags_1"] = Module["asm"]["Sa"]).apply(null, arguments);
                };
                var _emscripten_bind_dtCrowdAgentParams_get_obstacleAvoidanceType_0 = Module["_emscripten_bind_dtCrowdAgentParams_get_obstacleAvoidanceType_0"] = function() {
                    return (_emscripten_bind_dtCrowdAgentParams_get_obstacleAvoidanceType_0 = Module["_emscripten_bind_dtCrowdAgentParams_get_obstacleAvoidanceType_0"] = Module["asm"]["Ta"]).apply(null, arguments);
                };
                var _emscripten_bind_dtCrowdAgentParams_set_obstacleAvoidanceType_1 = Module["_emscripten_bind_dtCrowdAgentParams_set_obstacleAvoidanceType_1"] = function() {
                    return (_emscripten_bind_dtCrowdAgentParams_set_obstacleAvoidanceType_1 = Module["_emscripten_bind_dtCrowdAgentParams_set_obstacleAvoidanceType_1"] = Module["asm"]["Ua"]).apply(null, arguments);
                };
                var _emscripten_bind_dtCrowdAgentParams_get_queryFilterType_0 = Module["_emscripten_bind_dtCrowdAgentParams_get_queryFilterType_0"] = function() {
                    return (_emscripten_bind_dtCrowdAgentParams_get_queryFilterType_0 = Module["_emscripten_bind_dtCrowdAgentParams_get_queryFilterType_0"] = Module["asm"]["Va"]).apply(null, arguments);
                };
                var _emscripten_bind_dtCrowdAgentParams_set_queryFilterType_1 = Module["_emscripten_bind_dtCrowdAgentParams_set_queryFilterType_1"] = function() {
                    return (_emscripten_bind_dtCrowdAgentParams_set_queryFilterType_1 = Module["_emscripten_bind_dtCrowdAgentParams_set_queryFilterType_1"] = Module["asm"]["Wa"]).apply(null, arguments);
                };
                var _emscripten_bind_dtCrowdAgentParams_get_userData_0 = Module["_emscripten_bind_dtCrowdAgentParams_get_userData_0"] = function() {
                    return (_emscripten_bind_dtCrowdAgentParams_get_userData_0 = Module["_emscripten_bind_dtCrowdAgentParams_get_userData_0"] = Module["asm"]["Xa"]).apply(null, arguments);
                };
                var _emscripten_bind_dtCrowdAgentParams_set_userData_1 = Module["_emscripten_bind_dtCrowdAgentParams_set_userData_1"] = function() {
                    return (_emscripten_bind_dtCrowdAgentParams_set_userData_1 = Module["_emscripten_bind_dtCrowdAgentParams_set_userData_1"] = Module["asm"]["Ya"]).apply(null, arguments);
                };
                var _emscripten_bind_dtCrowdAgentParams___destroy___0 = Module["_emscripten_bind_dtCrowdAgentParams___destroy___0"] = function() {
                    return (_emscripten_bind_dtCrowdAgentParams___destroy___0 = Module["_emscripten_bind_dtCrowdAgentParams___destroy___0"] = Module["asm"]["Za"]).apply(null, arguments);
                };
                var _emscripten_bind_NavMesh_NavMesh_0 = Module["_emscripten_bind_NavMesh_NavMesh_0"] = function() {
                    return (_emscripten_bind_NavMesh_NavMesh_0 = Module["_emscripten_bind_NavMesh_NavMesh_0"] = Module["asm"]["_a"]).apply(null, arguments);
                };
                var _emscripten_bind_NavMesh_destroy_0 = Module["_emscripten_bind_NavMesh_destroy_0"] = function() {
                    return (_emscripten_bind_NavMesh_destroy_0 = Module["_emscripten_bind_NavMesh_destroy_0"] = Module["asm"]["$a"]).apply(null, arguments);
                };
                var _emscripten_bind_NavMesh_build_5 = Module["_emscripten_bind_NavMesh_build_5"] = function() {
                    return (_emscripten_bind_NavMesh_build_5 = Module["_emscripten_bind_NavMesh_build_5"] = Module["asm"]["ab"]).apply(null, arguments);
                };
                var _emscripten_bind_NavMesh_buildFromNavmeshData_1 = Module["_emscripten_bind_NavMesh_buildFromNavmeshData_1"] = function() {
                    return (_emscripten_bind_NavMesh_buildFromNavmeshData_1 = Module["_emscripten_bind_NavMesh_buildFromNavmeshData_1"] = Module["asm"]["bb"]).apply(null, arguments);
                };
                var _emscripten_bind_NavMesh_getNavmeshData_0 = Module["_emscripten_bind_NavMesh_getNavmeshData_0"] = function() {
                    return (_emscripten_bind_NavMesh_getNavmeshData_0 = Module["_emscripten_bind_NavMesh_getNavmeshData_0"] = Module["asm"]["cb"]).apply(null, arguments);
                };
                var _emscripten_bind_NavMesh_freeNavmeshData_1 = Module["_emscripten_bind_NavMesh_freeNavmeshData_1"] = function() {
                    return (_emscripten_bind_NavMesh_freeNavmeshData_1 = Module["_emscripten_bind_NavMesh_freeNavmeshData_1"] = Module["asm"]["db"]).apply(null, arguments);
                };
                var _emscripten_bind_NavMesh_getDebugNavMesh_0 = Module["_emscripten_bind_NavMesh_getDebugNavMesh_0"] = function() {
                    return (_emscripten_bind_NavMesh_getDebugNavMesh_0 = Module["_emscripten_bind_NavMesh_getDebugNavMesh_0"] = Module["asm"]["eb"]).apply(null, arguments);
                };
                var _emscripten_bind_NavMesh_getClosestPoint_1 = Module["_emscripten_bind_NavMesh_getClosestPoint_1"] = function() {
                    return (_emscripten_bind_NavMesh_getClosestPoint_1 = Module["_emscripten_bind_NavMesh_getClosestPoint_1"] = Module["asm"]["fb"]).apply(null, arguments);
                };
                var _emscripten_bind_NavMesh_getRandomPointAround_2 = Module["_emscripten_bind_NavMesh_getRandomPointAround_2"] = function() {
                    return (_emscripten_bind_NavMesh_getRandomPointAround_2 = Module["_emscripten_bind_NavMesh_getRandomPointAround_2"] = Module["asm"]["gb"]).apply(null, arguments);
                };
                var _emscripten_bind_NavMesh_moveAlong_2 = Module["_emscripten_bind_NavMesh_moveAlong_2"] = function() {
                    return (_emscripten_bind_NavMesh_moveAlong_2 = Module["_emscripten_bind_NavMesh_moveAlong_2"] = Module["asm"]["hb"]).apply(null, arguments);
                };
                var _emscripten_bind_NavMesh_getNavMesh_0 = Module["_emscripten_bind_NavMesh_getNavMesh_0"] = function() {
                    return (_emscripten_bind_NavMesh_getNavMesh_0 = Module["_emscripten_bind_NavMesh_getNavMesh_0"] = Module["asm"]["ib"]).apply(null, arguments);
                };
                var _emscripten_bind_NavMesh_computePath_2 = Module["_emscripten_bind_NavMesh_computePath_2"] = function() {
                    return (_emscripten_bind_NavMesh_computePath_2 = Module["_emscripten_bind_NavMesh_computePath_2"] = Module["asm"]["jb"]).apply(null, arguments);
                };
                var _emscripten_bind_NavMesh_setDefaultQueryExtent_1 = Module["_emscripten_bind_NavMesh_setDefaultQueryExtent_1"] = function() {
                    return (_emscripten_bind_NavMesh_setDefaultQueryExtent_1 = Module["_emscripten_bind_NavMesh_setDefaultQueryExtent_1"] = Module["asm"]["kb"]).apply(null, arguments);
                };
                var _emscripten_bind_NavMesh_getDefaultQueryExtent_0 = Module["_emscripten_bind_NavMesh_getDefaultQueryExtent_0"] = function() {
                    return (_emscripten_bind_NavMesh_getDefaultQueryExtent_0 = Module["_emscripten_bind_NavMesh_getDefaultQueryExtent_0"] = Module["asm"]["lb"]).apply(null, arguments);
                };
                var _emscripten_bind_NavMesh_addCylinderObstacle_3 = Module["_emscripten_bind_NavMesh_addCylinderObstacle_3"] = function() {
                    return (_emscripten_bind_NavMesh_addCylinderObstacle_3 = Module["_emscripten_bind_NavMesh_addCylinderObstacle_3"] = Module["asm"]["mb"]).apply(null, arguments);
                };
                var _emscripten_bind_NavMesh_addBoxObstacle_3 = Module["_emscripten_bind_NavMesh_addBoxObstacle_3"] = function() {
                    return (_emscripten_bind_NavMesh_addBoxObstacle_3 = Module["_emscripten_bind_NavMesh_addBoxObstacle_3"] = Module["asm"]["nb"]).apply(null, arguments);
                };
                var _emscripten_bind_NavMesh_removeObstacle_1 = Module["_emscripten_bind_NavMesh_removeObstacle_1"] = function() {
                    return (_emscripten_bind_NavMesh_removeObstacle_1 = Module["_emscripten_bind_NavMesh_removeObstacle_1"] = Module["asm"]["ob"]).apply(null, arguments);
                };
                var _emscripten_bind_NavMesh_update_0 = Module["_emscripten_bind_NavMesh_update_0"] = function() {
                    return (_emscripten_bind_NavMesh_update_0 = Module["_emscripten_bind_NavMesh_update_0"] = Module["asm"]["pb"]).apply(null, arguments);
                };
                var _emscripten_bind_NavMesh___destroy___0 = Module["_emscripten_bind_NavMesh___destroy___0"] = function() {
                    return (_emscripten_bind_NavMesh___destroy___0 = Module["_emscripten_bind_NavMesh___destroy___0"] = Module["asm"]["qb"]).apply(null, arguments);
                };
                var _emscripten_bind_Crowd_Crowd_3 = Module["_emscripten_bind_Crowd_Crowd_3"] = function() {
                    return (_emscripten_bind_Crowd_Crowd_3 = Module["_emscripten_bind_Crowd_Crowd_3"] = Module["asm"]["rb"]).apply(null, arguments);
                };
                var _emscripten_bind_Crowd_destroy_0 = Module["_emscripten_bind_Crowd_destroy_0"] = function() {
                    return (_emscripten_bind_Crowd_destroy_0 = Module["_emscripten_bind_Crowd_destroy_0"] = Module["asm"]["sb"]).apply(null, arguments);
                };
                var _emscripten_bind_Crowd_addAgent_2 = Module["_emscripten_bind_Crowd_addAgent_2"] = function() {
                    return (_emscripten_bind_Crowd_addAgent_2 = Module["_emscripten_bind_Crowd_addAgent_2"] = Module["asm"]["tb"]).apply(null, arguments);
                };
                var _emscripten_bind_Crowd_removeAgent_1 = Module["_emscripten_bind_Crowd_removeAgent_1"] = function() {
                    return (_emscripten_bind_Crowd_removeAgent_1 = Module["_emscripten_bind_Crowd_removeAgent_1"] = Module["asm"]["ub"]).apply(null, arguments);
                };
                var _emscripten_bind_Crowd_update_1 = Module["_emscripten_bind_Crowd_update_1"] = function() {
                    return (_emscripten_bind_Crowd_update_1 = Module["_emscripten_bind_Crowd_update_1"] = Module["asm"]["vb"]).apply(null, arguments);
                };
                var _emscripten_bind_Crowd_getAgentPosition_1 = Module["_emscripten_bind_Crowd_getAgentPosition_1"] = function() {
                    return (_emscripten_bind_Crowd_getAgentPosition_1 = Module["_emscripten_bind_Crowd_getAgentPosition_1"] = Module["asm"]["wb"]).apply(null, arguments);
                };
                var _emscripten_bind_Crowd_getAgentVelocity_1 = Module["_emscripten_bind_Crowd_getAgentVelocity_1"] = function() {
                    return (_emscripten_bind_Crowd_getAgentVelocity_1 = Module["_emscripten_bind_Crowd_getAgentVelocity_1"] = Module["asm"]["xb"]).apply(null, arguments);
                };
                var _emscripten_bind_Crowd_getAgentNextTargetPath_1 = Module["_emscripten_bind_Crowd_getAgentNextTargetPath_1"] = function() {
                    return (_emscripten_bind_Crowd_getAgentNextTargetPath_1 = Module["_emscripten_bind_Crowd_getAgentNextTargetPath_1"] = Module["asm"]["yb"]).apply(null, arguments);
                };
                var _emscripten_bind_Crowd_getAgentState_1 = Module["_emscripten_bind_Crowd_getAgentState_1"] = function() {
                    return (_emscripten_bind_Crowd_getAgentState_1 = Module["_emscripten_bind_Crowd_getAgentState_1"] = Module["asm"]["zb"]).apply(null, arguments);
                };
                var _emscripten_bind_Crowd_overOffmeshConnection_1 = Module["_emscripten_bind_Crowd_overOffmeshConnection_1"] = function() {
                    return (_emscripten_bind_Crowd_overOffmeshConnection_1 = Module["_emscripten_bind_Crowd_overOffmeshConnection_1"] = Module["asm"]["Ab"]).apply(null, arguments);
                };
                var _emscripten_bind_Crowd_agentGoto_2 = Module["_emscripten_bind_Crowd_agentGoto_2"] = function() {
                    return (_emscripten_bind_Crowd_agentGoto_2 = Module["_emscripten_bind_Crowd_agentGoto_2"] = Module["asm"]["Bb"]).apply(null, arguments);
                };
                var _emscripten_bind_Crowd_agentTeleport_2 = Module["_emscripten_bind_Crowd_agentTeleport_2"] = function() {
                    return (_emscripten_bind_Crowd_agentTeleport_2 = Module["_emscripten_bind_Crowd_agentTeleport_2"] = Module["asm"]["Cb"]).apply(null, arguments);
                };
                var _emscripten_bind_Crowd_getAgentParameters_1 = Module["_emscripten_bind_Crowd_getAgentParameters_1"] = function() {
                    return (_emscripten_bind_Crowd_getAgentParameters_1 = Module["_emscripten_bind_Crowd_getAgentParameters_1"] = Module["asm"]["Db"]).apply(null, arguments);
                };
                var _emscripten_bind_Crowd_setAgentParameters_2 = Module["_emscripten_bind_Crowd_setAgentParameters_2"] = function() {
                    return (_emscripten_bind_Crowd_setAgentParameters_2 = Module["_emscripten_bind_Crowd_setAgentParameters_2"] = Module["asm"]["Eb"]).apply(null, arguments);
                };
                var _emscripten_bind_Crowd_setDefaultQueryExtent_1 = Module["_emscripten_bind_Crowd_setDefaultQueryExtent_1"] = function() {
                    return (_emscripten_bind_Crowd_setDefaultQueryExtent_1 = Module["_emscripten_bind_Crowd_setDefaultQueryExtent_1"] = Module["asm"]["Fb"]).apply(null, arguments);
                };
                var _emscripten_bind_Crowd_getDefaultQueryExtent_0 = Module["_emscripten_bind_Crowd_getDefaultQueryExtent_0"] = function() {
                    return (_emscripten_bind_Crowd_getDefaultQueryExtent_0 = Module["_emscripten_bind_Crowd_getDefaultQueryExtent_0"] = Module["asm"]["Gb"]).apply(null, arguments);
                };
                var _emscripten_bind_Crowd_getCorners_1 = Module["_emscripten_bind_Crowd_getCorners_1"] = function() {
                    return (_emscripten_bind_Crowd_getCorners_1 = Module["_emscripten_bind_Crowd_getCorners_1"] = Module["asm"]["Hb"]).apply(null, arguments);
                };
                var _emscripten_bind_Crowd___destroy___0 = Module["_emscripten_bind_Crowd___destroy___0"] = function() {
                    return (_emscripten_bind_Crowd___destroy___0 = Module["_emscripten_bind_Crowd___destroy___0"] = Module["asm"]["Ib"]).apply(null, arguments);
                };
                var _malloc = Module["_malloc"] = function() {
                    return (_malloc = Module["_malloc"] = Module["asm"]["Kb"]).apply(null, arguments);
                };
                Module["_free"] = function() {
                    return (Module["_free"] = Module["asm"]["Lb"]).apply(null, arguments);
                };
                Module["UTF8ToString"] = UTF8ToString;
                Module["addFunction"] = addFunction;
                var calledRun;
                dependenciesFulfilled = function runCaller() {
                    if (!calledRun) run();
                    if (!calledRun) dependenciesFulfilled = runCaller;
                };
                function run(args) {
                    args = args || arguments_;
                    if (runDependencies > 0) return;
                    preRun();
                    if (runDependencies > 0) return;
                    function doRun() {
                        if (calledRun) return;
                        calledRun = true;
                        Module["calledRun"] = true;
                        if (ABORT) return;
                        initRuntime();
                        readyPromiseResolve(Module);
                        if (Module["onRuntimeInitialized"]) Module["onRuntimeInitialized"]();
                        postRun();
                    }
                    if (Module["setStatus"]) {
                        Module["setStatus"]("Running...");
                        setTimeout((function() {
                            setTimeout((function() {
                                Module["setStatus"]("");
                            }), 1);
                            doRun();
                        }), 1);
                    } else doRun();
                }
                Module["run"] = run;
                if (Module["preInit"]) {
                    if (typeof Module["preInit"] == "function") Module["preInit"] = [ Module["preInit"] ];
                    while (Module["preInit"].length > 0) Module["preInit"].pop()();
                }
                run();
                function WrapperObject() {}
                WrapperObject.prototype = Object.create(WrapperObject.prototype);
                WrapperObject.prototype.constructor = WrapperObject;
                WrapperObject.prototype.__class__ = WrapperObject;
                WrapperObject.__cache__ = {};
                Module["WrapperObject"] = WrapperObject;
                function getCache(__class__) {
                    return (__class__ || WrapperObject).__cache__;
                }
                Module["getCache"] = getCache;
                function wrapPointer(ptr, __class__) {
                    var cache = getCache(__class__);
                    var ret = cache[ptr];
                    if (ret) return ret;
                    ret = Object.create((__class__ || WrapperObject).prototype);
                    ret.ptr = ptr;
                    return cache[ptr] = ret;
                }
                Module["wrapPointer"] = wrapPointer;
                function castObject(obj, __class__) {
                    return wrapPointer(obj.ptr, __class__);
                }
                Module["castObject"] = castObject;
                Module["NULL"] = wrapPointer(0);
                function destroy(obj) {
                    if (!obj["__destroy__"]) throw "Error: Cannot destroy object. (Did you create it yourself?)";
                    obj["__destroy__"]();
                    delete getCache(obj.__class__)[obj.ptr];
                }
                Module["destroy"] = destroy;
                function compare(obj1, obj2) {
                    return obj1.ptr === obj2.ptr;
                }
                Module["compare"] = compare;
                function getPointer(obj) {
                    return obj.ptr;
                }
                Module["getPointer"] = getPointer;
                function getClass(obj) {
                    return obj.__class__;
                }
                Module["getClass"] = getClass;
                var ensureCache = {
                    buffer: 0,
                    size: 0,
                    pos: 0,
                    temps: [],
                    needed: 0,
                    prepare: function() {
                        if (ensureCache.needed) {
                            for (var i = 0; i < ensureCache.temps.length; i++) Module["_free"](ensureCache.temps[i]);
                            ensureCache.temps.length = 0;
                            Module["_free"](ensureCache.buffer);
                            ensureCache.buffer = 0;
                            ensureCache.size += ensureCache.needed;
                            ensureCache.needed = 0;
                        }
                        if (!ensureCache.buffer) {
                            ensureCache.size += 128;
                            ensureCache.buffer = Module["_malloc"](ensureCache.size);
                            assert(ensureCache.buffer);
                        }
                        ensureCache.pos = 0;
                    },
                    alloc: function(array, view) {
                        assert(ensureCache.buffer);
                        var bytes = view.BYTES_PER_ELEMENT;
                        var len = array.length * bytes;
                        len = len + 7 & -8;
                        var ret;
                        if (ensureCache.pos + len >= ensureCache.size) {
                            assert(len > 0);
                            ensureCache.needed += len;
                            ret = Module["_malloc"](len);
                            ensureCache.temps.push(ret);
                        } else {
                            ret = ensureCache.buffer + ensureCache.pos;
                            ensureCache.pos += len;
                        }
                        return ret;
                    },
                    copy: function(array, view, offset) {
                        offset >>>= 0;
                        var bytes = view.BYTES_PER_ELEMENT;
                        switch (bytes) {
                          case 2:
                            offset >>>= 1;
                            break;

                          case 4:
                            offset >>>= 2;
                            break;

                          case 8:
                            offset >>>= 3;
                            break;
                        }
                        for (var i = 0; i < array.length; i++) view[offset + i] = array[i];
                    }
                };
                function ensureInt32(value) {
                    if (typeof value === "object") {
                        var offset = ensureCache.alloc(value, HEAP32);
                        ensureCache.copy(value, HEAP32, offset);
                        return offset;
                    }
                    return value;
                }
                function ensureFloat32(value) {
                    if (typeof value === "object") {
                        var offset = ensureCache.alloc(value, HEAPF32);
                        ensureCache.copy(value, HEAPF32, offset);
                        return offset;
                    }
                    return value;
                }
                function VoidPtr() {
                    throw "cannot construct a VoidPtr, no constructor in IDL";
                }
                VoidPtr.prototype = Object.create(WrapperObject.prototype);
                VoidPtr.prototype.constructor = VoidPtr;
                VoidPtr.prototype.__class__ = VoidPtr;
                VoidPtr.__cache__ = {};
                Module["VoidPtr"] = VoidPtr;
                VoidPtr.prototype["__destroy__"] = VoidPtr.prototype.__destroy__ = function() {
                    var self = this.ptr;
                    _emscripten_bind_VoidPtr___destroy___0(self);
                };
                function rcConfig() {
                    this.ptr = _emscripten_bind_rcConfig_rcConfig_0();
                    getCache(rcConfig)[this.ptr] = this;
                }
                rcConfig.prototype = Object.create(WrapperObject.prototype);
                rcConfig.prototype.constructor = rcConfig;
                rcConfig.prototype.__class__ = rcConfig;
                rcConfig.__cache__ = {};
                Module["rcConfig"] = rcConfig;
                rcConfig.prototype["get_width"] = rcConfig.prototype.get_width = function() {
                    var self = this.ptr;
                    return _emscripten_bind_rcConfig_get_width_0(self);
                };
                rcConfig.prototype["set_width"] = rcConfig.prototype.set_width = function(arg0) {
                    var self = this.ptr;
                    if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
                    _emscripten_bind_rcConfig_set_width_1(self, arg0);
                };
                Object.defineProperty(rcConfig.prototype, "width", {
                    get: rcConfig.prototype.get_width,
                    set: rcConfig.prototype.set_width
                });
                rcConfig.prototype["get_height"] = rcConfig.prototype.get_height = function() {
                    var self = this.ptr;
                    return _emscripten_bind_rcConfig_get_height_0(self);
                };
                rcConfig.prototype["set_height"] = rcConfig.prototype.set_height = function(arg0) {
                    var self = this.ptr;
                    if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
                    _emscripten_bind_rcConfig_set_height_1(self, arg0);
                };
                Object.defineProperty(rcConfig.prototype, "height", {
                    get: rcConfig.prototype.get_height,
                    set: rcConfig.prototype.set_height
                });
                rcConfig.prototype["get_tileSize"] = rcConfig.prototype.get_tileSize = function() {
                    var self = this.ptr;
                    return _emscripten_bind_rcConfig_get_tileSize_0(self);
                };
                rcConfig.prototype["set_tileSize"] = rcConfig.prototype.set_tileSize = function(arg0) {
                    var self = this.ptr;
                    if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
                    _emscripten_bind_rcConfig_set_tileSize_1(self, arg0);
                };
                Object.defineProperty(rcConfig.prototype, "tileSize", {
                    get: rcConfig.prototype.get_tileSize,
                    set: rcConfig.prototype.set_tileSize
                });
                rcConfig.prototype["get_borderSize"] = rcConfig.prototype.get_borderSize = function() {
                    var self = this.ptr;
                    return _emscripten_bind_rcConfig_get_borderSize_0(self);
                };
                rcConfig.prototype["set_borderSize"] = rcConfig.prototype.set_borderSize = function(arg0) {
                    var self = this.ptr;
                    if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
                    _emscripten_bind_rcConfig_set_borderSize_1(self, arg0);
                };
                Object.defineProperty(rcConfig.prototype, "borderSize", {
                    get: rcConfig.prototype.get_borderSize,
                    set: rcConfig.prototype.set_borderSize
                });
                rcConfig.prototype["get_cs"] = rcConfig.prototype.get_cs = function() {
                    var self = this.ptr;
                    return _emscripten_bind_rcConfig_get_cs_0(self);
                };
                rcConfig.prototype["set_cs"] = rcConfig.prototype.set_cs = function(arg0) {
                    var self = this.ptr;
                    if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
                    _emscripten_bind_rcConfig_set_cs_1(self, arg0);
                };
                Object.defineProperty(rcConfig.prototype, "cs", {
                    get: rcConfig.prototype.get_cs,
                    set: rcConfig.prototype.set_cs
                });
                rcConfig.prototype["get_ch"] = rcConfig.prototype.get_ch = function() {
                    var self = this.ptr;
                    return _emscripten_bind_rcConfig_get_ch_0(self);
                };
                rcConfig.prototype["set_ch"] = rcConfig.prototype.set_ch = function(arg0) {
                    var self = this.ptr;
                    if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
                    _emscripten_bind_rcConfig_set_ch_1(self, arg0);
                };
                Object.defineProperty(rcConfig.prototype, "ch", {
                    get: rcConfig.prototype.get_ch,
                    set: rcConfig.prototype.set_ch
                });
                rcConfig.prototype["get_bmin"] = rcConfig.prototype.get_bmin = function(arg0) {
                    var self = this.ptr;
                    if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
                    return _emscripten_bind_rcConfig_get_bmin_1(self, arg0);
                };
                rcConfig.prototype["set_bmin"] = rcConfig.prototype.set_bmin = function(arg0, arg1) {
                    var self = this.ptr;
                    ensureCache.prepare();
                    if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
                    if (arg1 && typeof arg1 === "object") arg1 = arg1.ptr;
                    _emscripten_bind_rcConfig_set_bmin_2(self, arg0, arg1);
                };
                Object.defineProperty(rcConfig.prototype, "bmin", {
                    get: rcConfig.prototype.get_bmin,
                    set: rcConfig.prototype.set_bmin
                });
                rcConfig.prototype["get_bmax"] = rcConfig.prototype.get_bmax = function(arg0) {
                    var self = this.ptr;
                    if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
                    return _emscripten_bind_rcConfig_get_bmax_1(self, arg0);
                };
                rcConfig.prototype["set_bmax"] = rcConfig.prototype.set_bmax = function(arg0, arg1) {
                    var self = this.ptr;
                    ensureCache.prepare();
                    if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
                    if (arg1 && typeof arg1 === "object") arg1 = arg1.ptr;
                    _emscripten_bind_rcConfig_set_bmax_2(self, arg0, arg1);
                };
                Object.defineProperty(rcConfig.prototype, "bmax", {
                    get: rcConfig.prototype.get_bmax,
                    set: rcConfig.prototype.set_bmax
                });
                rcConfig.prototype["get_walkableSlopeAngle"] = rcConfig.prototype.get_walkableSlopeAngle = function() {
                    var self = this.ptr;
                    return _emscripten_bind_rcConfig_get_walkableSlopeAngle_0(self);
                };
                rcConfig.prototype["set_walkableSlopeAngle"] = rcConfig.prototype.set_walkableSlopeAngle = function(arg0) {
                    var self = this.ptr;
                    if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
                    _emscripten_bind_rcConfig_set_walkableSlopeAngle_1(self, arg0);
                };
                Object.defineProperty(rcConfig.prototype, "walkableSlopeAngle", {
                    get: rcConfig.prototype.get_walkableSlopeAngle,
                    set: rcConfig.prototype.set_walkableSlopeAngle
                });
                rcConfig.prototype["get_walkableHeight"] = rcConfig.prototype.get_walkableHeight = function() {
                    var self = this.ptr;
                    return _emscripten_bind_rcConfig_get_walkableHeight_0(self);
                };
                rcConfig.prototype["set_walkableHeight"] = rcConfig.prototype.set_walkableHeight = function(arg0) {
                    var self = this.ptr;
                    if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
                    _emscripten_bind_rcConfig_set_walkableHeight_1(self, arg0);
                };
                Object.defineProperty(rcConfig.prototype, "walkableHeight", {
                    get: rcConfig.prototype.get_walkableHeight,
                    set: rcConfig.prototype.set_walkableHeight
                });
                rcConfig.prototype["get_walkableClimb"] = rcConfig.prototype.get_walkableClimb = function() {
                    var self = this.ptr;
                    return _emscripten_bind_rcConfig_get_walkableClimb_0(self);
                };
                rcConfig.prototype["set_walkableClimb"] = rcConfig.prototype.set_walkableClimb = function(arg0) {
                    var self = this.ptr;
                    if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
                    _emscripten_bind_rcConfig_set_walkableClimb_1(self, arg0);
                };
                Object.defineProperty(rcConfig.prototype, "walkableClimb", {
                    get: rcConfig.prototype.get_walkableClimb,
                    set: rcConfig.prototype.set_walkableClimb
                });
                rcConfig.prototype["get_walkableRadius"] = rcConfig.prototype.get_walkableRadius = function() {
                    var self = this.ptr;
                    return _emscripten_bind_rcConfig_get_walkableRadius_0(self);
                };
                rcConfig.prototype["set_walkableRadius"] = rcConfig.prototype.set_walkableRadius = function(arg0) {
                    var self = this.ptr;
                    if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
                    _emscripten_bind_rcConfig_set_walkableRadius_1(self, arg0);
                };
                Object.defineProperty(rcConfig.prototype, "walkableRadius", {
                    get: rcConfig.prototype.get_walkableRadius,
                    set: rcConfig.prototype.set_walkableRadius
                });
                rcConfig.prototype["get_maxEdgeLen"] = rcConfig.prototype.get_maxEdgeLen = function() {
                    var self = this.ptr;
                    return _emscripten_bind_rcConfig_get_maxEdgeLen_0(self);
                };
                rcConfig.prototype["set_maxEdgeLen"] = rcConfig.prototype.set_maxEdgeLen = function(arg0) {
                    var self = this.ptr;
                    if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
                    _emscripten_bind_rcConfig_set_maxEdgeLen_1(self, arg0);
                };
                Object.defineProperty(rcConfig.prototype, "maxEdgeLen", {
                    get: rcConfig.prototype.get_maxEdgeLen,
                    set: rcConfig.prototype.set_maxEdgeLen
                });
                rcConfig.prototype["get_maxSimplificationError"] = rcConfig.prototype.get_maxSimplificationError = function() {
                    var self = this.ptr;
                    return _emscripten_bind_rcConfig_get_maxSimplificationError_0(self);
                };
                rcConfig.prototype["set_maxSimplificationError"] = rcConfig.prototype.set_maxSimplificationError = function(arg0) {
                    var self = this.ptr;
                    if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
                    _emscripten_bind_rcConfig_set_maxSimplificationError_1(self, arg0);
                };
                Object.defineProperty(rcConfig.prototype, "maxSimplificationError", {
                    get: rcConfig.prototype.get_maxSimplificationError,
                    set: rcConfig.prototype.set_maxSimplificationError
                });
                rcConfig.prototype["get_minRegionArea"] = rcConfig.prototype.get_minRegionArea = function() {
                    var self = this.ptr;
                    return _emscripten_bind_rcConfig_get_minRegionArea_0(self);
                };
                rcConfig.prototype["set_minRegionArea"] = rcConfig.prototype.set_minRegionArea = function(arg0) {
                    var self = this.ptr;
                    if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
                    _emscripten_bind_rcConfig_set_minRegionArea_1(self, arg0);
                };
                Object.defineProperty(rcConfig.prototype, "minRegionArea", {
                    get: rcConfig.prototype.get_minRegionArea,
                    set: rcConfig.prototype.set_minRegionArea
                });
                rcConfig.prototype["get_mergeRegionArea"] = rcConfig.prototype.get_mergeRegionArea = function() {
                    var self = this.ptr;
                    return _emscripten_bind_rcConfig_get_mergeRegionArea_0(self);
                };
                rcConfig.prototype["set_mergeRegionArea"] = rcConfig.prototype.set_mergeRegionArea = function(arg0) {
                    var self = this.ptr;
                    if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
                    _emscripten_bind_rcConfig_set_mergeRegionArea_1(self, arg0);
                };
                Object.defineProperty(rcConfig.prototype, "mergeRegionArea", {
                    get: rcConfig.prototype.get_mergeRegionArea,
                    set: rcConfig.prototype.set_mergeRegionArea
                });
                rcConfig.prototype["get_maxVertsPerPoly"] = rcConfig.prototype.get_maxVertsPerPoly = function() {
                    var self = this.ptr;
                    return _emscripten_bind_rcConfig_get_maxVertsPerPoly_0(self);
                };
                rcConfig.prototype["set_maxVertsPerPoly"] = rcConfig.prototype.set_maxVertsPerPoly = function(arg0) {
                    var self = this.ptr;
                    if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
                    _emscripten_bind_rcConfig_set_maxVertsPerPoly_1(self, arg0);
                };
                Object.defineProperty(rcConfig.prototype, "maxVertsPerPoly", {
                    get: rcConfig.prototype.get_maxVertsPerPoly,
                    set: rcConfig.prototype.set_maxVertsPerPoly
                });
                rcConfig.prototype["get_detailSampleDist"] = rcConfig.prototype.get_detailSampleDist = function() {
                    var self = this.ptr;
                    return _emscripten_bind_rcConfig_get_detailSampleDist_0(self);
                };
                rcConfig.prototype["set_detailSampleDist"] = rcConfig.prototype.set_detailSampleDist = function(arg0) {
                    var self = this.ptr;
                    if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
                    _emscripten_bind_rcConfig_set_detailSampleDist_1(self, arg0);
                };
                Object.defineProperty(rcConfig.prototype, "detailSampleDist", {
                    get: rcConfig.prototype.get_detailSampleDist,
                    set: rcConfig.prototype.set_detailSampleDist
                });
                rcConfig.prototype["get_detailSampleMaxError"] = rcConfig.prototype.get_detailSampleMaxError = function() {
                    var self = this.ptr;
                    return _emscripten_bind_rcConfig_get_detailSampleMaxError_0(self);
                };
                rcConfig.prototype["set_detailSampleMaxError"] = rcConfig.prototype.set_detailSampleMaxError = function(arg0) {
                    var self = this.ptr;
                    if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
                    _emscripten_bind_rcConfig_set_detailSampleMaxError_1(self, arg0);
                };
                Object.defineProperty(rcConfig.prototype, "detailSampleMaxError", {
                    get: rcConfig.prototype.get_detailSampleMaxError,
                    set: rcConfig.prototype.set_detailSampleMaxError
                });
                rcConfig.prototype["__destroy__"] = rcConfig.prototype.__destroy__ = function() {
                    var self = this.ptr;
                    _emscripten_bind_rcConfig___destroy___0(self);
                };
                function Vec3(x, y, z) {
                    if (x && typeof x === "object") x = x.ptr;
                    if (y && typeof y === "object") y = y.ptr;
                    if (z && typeof z === "object") z = z.ptr;
                    if (x === void 0) {
                        this.ptr = _emscripten_bind_Vec3_Vec3_0();
                        getCache(Vec3)[this.ptr] = this;
                        return;
                    }
                    if (y === void 0) {
                        this.ptr = _emscripten_bind_Vec3_Vec3_1(x);
                        getCache(Vec3)[this.ptr] = this;
                        return;
                    }
                    if (z === void 0) {
                        this.ptr = _emscripten_bind_Vec3_Vec3_2(x, y);
                        getCache(Vec3)[this.ptr] = this;
                        return;
                    }
                    this.ptr = _emscripten_bind_Vec3_Vec3_3(x, y, z);
                    getCache(Vec3)[this.ptr] = this;
                }
                Vec3.prototype = Object.create(WrapperObject.prototype);
                Vec3.prototype.constructor = Vec3;
                Vec3.prototype.__class__ = Vec3;
                Vec3.__cache__ = {};
                Module["Vec3"] = Vec3;
                Vec3.prototype["get_x"] = Vec3.prototype.get_x = function() {
                    var self = this.ptr;
                    return _emscripten_bind_Vec3_get_x_0(self);
                };
                Vec3.prototype["set_x"] = Vec3.prototype.set_x = function(arg0) {
                    var self = this.ptr;
                    if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
                    _emscripten_bind_Vec3_set_x_1(self, arg0);
                };
                Object.defineProperty(Vec3.prototype, "x", {
                    get: Vec3.prototype.get_x,
                    set: Vec3.prototype.set_x
                });
                Vec3.prototype["get_y"] = Vec3.prototype.get_y = function() {
                    var self = this.ptr;
                    return _emscripten_bind_Vec3_get_y_0(self);
                };
                Vec3.prototype["set_y"] = Vec3.prototype.set_y = function(arg0) {
                    var self = this.ptr;
                    if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
                    _emscripten_bind_Vec3_set_y_1(self, arg0);
                };
                Object.defineProperty(Vec3.prototype, "y", {
                    get: Vec3.prototype.get_y,
                    set: Vec3.prototype.set_y
                });
                Vec3.prototype["get_z"] = Vec3.prototype.get_z = function() {
                    var self = this.ptr;
                    return _emscripten_bind_Vec3_get_z_0(self);
                };
                Vec3.prototype["set_z"] = Vec3.prototype.set_z = function(arg0) {
                    var self = this.ptr;
                    if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
                    _emscripten_bind_Vec3_set_z_1(self, arg0);
                };
                Object.defineProperty(Vec3.prototype, "z", {
                    get: Vec3.prototype.get_z,
                    set: Vec3.prototype.set_z
                });
                Vec3.prototype["__destroy__"] = Vec3.prototype.__destroy__ = function() {
                    var self = this.ptr;
                    _emscripten_bind_Vec3___destroy___0(self);
                };
                function Triangle() {
                    this.ptr = _emscripten_bind_Triangle_Triangle_0();
                    getCache(Triangle)[this.ptr] = this;
                }
                Triangle.prototype = Object.create(WrapperObject.prototype);
                Triangle.prototype.constructor = Triangle;
                Triangle.prototype.__class__ = Triangle;
                Triangle.__cache__ = {};
                Module["Triangle"] = Triangle;
                Triangle.prototype["getPoint"] = Triangle.prototype.getPoint = function(n) {
                    var self = this.ptr;
                    if (n && typeof n === "object") n = n.ptr;
                    return wrapPointer(_emscripten_bind_Triangle_getPoint_1(self, n), Vec3);
                };
                Triangle.prototype["__destroy__"] = Triangle.prototype.__destroy__ = function() {
                    var self = this.ptr;
                    _emscripten_bind_Triangle___destroy___0(self);
                };
                function DebugNavMesh() {
                    this.ptr = _emscripten_bind_DebugNavMesh_DebugNavMesh_0();
                    getCache(DebugNavMesh)[this.ptr] = this;
                }
                DebugNavMesh.prototype = Object.create(WrapperObject.prototype);
                DebugNavMesh.prototype.constructor = DebugNavMesh;
                DebugNavMesh.prototype.__class__ = DebugNavMesh;
                DebugNavMesh.__cache__ = {};
                Module["DebugNavMesh"] = DebugNavMesh;
                DebugNavMesh.prototype["getTriangleCount"] = DebugNavMesh.prototype.getTriangleCount = function() {
                    var self = this.ptr;
                    return _emscripten_bind_DebugNavMesh_getTriangleCount_0(self);
                };
                DebugNavMesh.prototype["getTriangle"] = DebugNavMesh.prototype.getTriangle = function(n) {
                    var self = this.ptr;
                    if (n && typeof n === "object") n = n.ptr;
                    return wrapPointer(_emscripten_bind_DebugNavMesh_getTriangle_1(self, n), Triangle);
                };
                DebugNavMesh.prototype["__destroy__"] = DebugNavMesh.prototype.__destroy__ = function() {
                    var self = this.ptr;
                    _emscripten_bind_DebugNavMesh___destroy___0(self);
                };
                function dtNavMesh() {
                    throw "cannot construct a dtNavMesh, no constructor in IDL";
                }
                dtNavMesh.prototype = Object.create(WrapperObject.prototype);
                dtNavMesh.prototype.constructor = dtNavMesh;
                dtNavMesh.prototype.__class__ = dtNavMesh;
                dtNavMesh.__cache__ = {};
                Module["dtNavMesh"] = dtNavMesh;
                dtNavMesh.prototype["__destroy__"] = dtNavMesh.prototype.__destroy__ = function() {
                    var self = this.ptr;
                    _emscripten_bind_dtNavMesh___destroy___0(self);
                };
                function NavmeshData() {
                    this.ptr = _emscripten_bind_NavmeshData_NavmeshData_0();
                    getCache(NavmeshData)[this.ptr] = this;
                }
                NavmeshData.prototype = Object.create(WrapperObject.prototype);
                NavmeshData.prototype.constructor = NavmeshData;
                NavmeshData.prototype.__class__ = NavmeshData;
                NavmeshData.__cache__ = {};
                Module["NavmeshData"] = NavmeshData;
                NavmeshData.prototype["get_dataPointer"] = NavmeshData.prototype.get_dataPointer = function() {
                    var self = this.ptr;
                    return _emscripten_bind_NavmeshData_get_dataPointer_0(self);
                };
                NavmeshData.prototype["set_dataPointer"] = NavmeshData.prototype.set_dataPointer = function(arg0) {
                    var self = this.ptr;
                    if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
                    _emscripten_bind_NavmeshData_set_dataPointer_1(self, arg0);
                };
                Object.defineProperty(NavmeshData.prototype, "dataPointer", {
                    get: NavmeshData.prototype.get_dataPointer,
                    set: NavmeshData.prototype.set_dataPointer
                });
                NavmeshData.prototype["get_size"] = NavmeshData.prototype.get_size = function() {
                    var self = this.ptr;
                    return _emscripten_bind_NavmeshData_get_size_0(self);
                };
                NavmeshData.prototype["set_size"] = NavmeshData.prototype.set_size = function(arg0) {
                    var self = this.ptr;
                    if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
                    _emscripten_bind_NavmeshData_set_size_1(self, arg0);
                };
                Object.defineProperty(NavmeshData.prototype, "size", {
                    get: NavmeshData.prototype.get_size,
                    set: NavmeshData.prototype.set_size
                });
                NavmeshData.prototype["__destroy__"] = NavmeshData.prototype.__destroy__ = function() {
                    var self = this.ptr;
                    _emscripten_bind_NavmeshData___destroy___0(self);
                };
                function NavPath() {
                    throw "cannot construct a NavPath, no constructor in IDL";
                }
                NavPath.prototype = Object.create(WrapperObject.prototype);
                NavPath.prototype.constructor = NavPath;
                NavPath.prototype.__class__ = NavPath;
                NavPath.__cache__ = {};
                Module["NavPath"] = NavPath;
                NavPath.prototype["getPointCount"] = NavPath.prototype.getPointCount = function() {
                    var self = this.ptr;
                    return _emscripten_bind_NavPath_getPointCount_0(self);
                };
                NavPath.prototype["getPoint"] = NavPath.prototype.getPoint = function(n) {
                    var self = this.ptr;
                    if (n && typeof n === "object") n = n.ptr;
                    return wrapPointer(_emscripten_bind_NavPath_getPoint_1(self, n), Vec3);
                };
                NavPath.prototype["__destroy__"] = NavPath.prototype.__destroy__ = function() {
                    var self = this.ptr;
                    _emscripten_bind_NavPath___destroy___0(self);
                };
                function dtObstacleRef() {
                    throw "cannot construct a dtObstacleRef, no constructor in IDL";
                }
                dtObstacleRef.prototype = Object.create(WrapperObject.prototype);
                dtObstacleRef.prototype.constructor = dtObstacleRef;
                dtObstacleRef.prototype.__class__ = dtObstacleRef;
                dtObstacleRef.__cache__ = {};
                Module["dtObstacleRef"] = dtObstacleRef;
                dtObstacleRef.prototype["__destroy__"] = dtObstacleRef.prototype.__destroy__ = function() {
                    var self = this.ptr;
                    _emscripten_bind_dtObstacleRef___destroy___0(self);
                };
                function dtCrowdAgentParams() {
                    this.ptr = _emscripten_bind_dtCrowdAgentParams_dtCrowdAgentParams_0();
                    getCache(dtCrowdAgentParams)[this.ptr] = this;
                }
                dtCrowdAgentParams.prototype = Object.create(WrapperObject.prototype);
                dtCrowdAgentParams.prototype.constructor = dtCrowdAgentParams;
                dtCrowdAgentParams.prototype.__class__ = dtCrowdAgentParams;
                dtCrowdAgentParams.__cache__ = {};
                Module["dtCrowdAgentParams"] = dtCrowdAgentParams;
                dtCrowdAgentParams.prototype["get_radius"] = dtCrowdAgentParams.prototype.get_radius = function() {
                    var self = this.ptr;
                    return _emscripten_bind_dtCrowdAgentParams_get_radius_0(self);
                };
                dtCrowdAgentParams.prototype["set_radius"] = dtCrowdAgentParams.prototype.set_radius = function(arg0) {
                    var self = this.ptr;
                    if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
                    _emscripten_bind_dtCrowdAgentParams_set_radius_1(self, arg0);
                };
                Object.defineProperty(dtCrowdAgentParams.prototype, "radius", {
                    get: dtCrowdAgentParams.prototype.get_radius,
                    set: dtCrowdAgentParams.prototype.set_radius
                });
                dtCrowdAgentParams.prototype["get_height"] = dtCrowdAgentParams.prototype.get_height = function() {
                    var self = this.ptr;
                    return _emscripten_bind_dtCrowdAgentParams_get_height_0(self);
                };
                dtCrowdAgentParams.prototype["set_height"] = dtCrowdAgentParams.prototype.set_height = function(arg0) {
                    var self = this.ptr;
                    if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
                    _emscripten_bind_dtCrowdAgentParams_set_height_1(self, arg0);
                };
                Object.defineProperty(dtCrowdAgentParams.prototype, "height", {
                    get: dtCrowdAgentParams.prototype.get_height,
                    set: dtCrowdAgentParams.prototype.set_height
                });
                dtCrowdAgentParams.prototype["get_maxAcceleration"] = dtCrowdAgentParams.prototype.get_maxAcceleration = function() {
                    var self = this.ptr;
                    return _emscripten_bind_dtCrowdAgentParams_get_maxAcceleration_0(self);
                };
                dtCrowdAgentParams.prototype["set_maxAcceleration"] = dtCrowdAgentParams.prototype.set_maxAcceleration = function(arg0) {
                    var self = this.ptr;
                    if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
                    _emscripten_bind_dtCrowdAgentParams_set_maxAcceleration_1(self, arg0);
                };
                Object.defineProperty(dtCrowdAgentParams.prototype, "maxAcceleration", {
                    get: dtCrowdAgentParams.prototype.get_maxAcceleration,
                    set: dtCrowdAgentParams.prototype.set_maxAcceleration
                });
                dtCrowdAgentParams.prototype["get_maxSpeed"] = dtCrowdAgentParams.prototype.get_maxSpeed = function() {
                    var self = this.ptr;
                    return _emscripten_bind_dtCrowdAgentParams_get_maxSpeed_0(self);
                };
                dtCrowdAgentParams.prototype["set_maxSpeed"] = dtCrowdAgentParams.prototype.set_maxSpeed = function(arg0) {
                    var self = this.ptr;
                    if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
                    _emscripten_bind_dtCrowdAgentParams_set_maxSpeed_1(self, arg0);
                };
                Object.defineProperty(dtCrowdAgentParams.prototype, "maxSpeed", {
                    get: dtCrowdAgentParams.prototype.get_maxSpeed,
                    set: dtCrowdAgentParams.prototype.set_maxSpeed
                });
                dtCrowdAgentParams.prototype["get_collisionQueryRange"] = dtCrowdAgentParams.prototype.get_collisionQueryRange = function() {
                    var self = this.ptr;
                    return _emscripten_bind_dtCrowdAgentParams_get_collisionQueryRange_0(self);
                };
                dtCrowdAgentParams.prototype["set_collisionQueryRange"] = dtCrowdAgentParams.prototype.set_collisionQueryRange = function(arg0) {
                    var self = this.ptr;
                    if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
                    _emscripten_bind_dtCrowdAgentParams_set_collisionQueryRange_1(self, arg0);
                };
                Object.defineProperty(dtCrowdAgentParams.prototype, "collisionQueryRange", {
                    get: dtCrowdAgentParams.prototype.get_collisionQueryRange,
                    set: dtCrowdAgentParams.prototype.set_collisionQueryRange
                });
                dtCrowdAgentParams.prototype["get_pathOptimizationRange"] = dtCrowdAgentParams.prototype.get_pathOptimizationRange = function() {
                    var self = this.ptr;
                    return _emscripten_bind_dtCrowdAgentParams_get_pathOptimizationRange_0(self);
                };
                dtCrowdAgentParams.prototype["set_pathOptimizationRange"] = dtCrowdAgentParams.prototype.set_pathOptimizationRange = function(arg0) {
                    var self = this.ptr;
                    if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
                    _emscripten_bind_dtCrowdAgentParams_set_pathOptimizationRange_1(self, arg0);
                };
                Object.defineProperty(dtCrowdAgentParams.prototype, "pathOptimizationRange", {
                    get: dtCrowdAgentParams.prototype.get_pathOptimizationRange,
                    set: dtCrowdAgentParams.prototype.set_pathOptimizationRange
                });
                dtCrowdAgentParams.prototype["get_separationWeight"] = dtCrowdAgentParams.prototype.get_separationWeight = function() {
                    var self = this.ptr;
                    return _emscripten_bind_dtCrowdAgentParams_get_separationWeight_0(self);
                };
                dtCrowdAgentParams.prototype["set_separationWeight"] = dtCrowdAgentParams.prototype.set_separationWeight = function(arg0) {
                    var self = this.ptr;
                    if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
                    _emscripten_bind_dtCrowdAgentParams_set_separationWeight_1(self, arg0);
                };
                Object.defineProperty(dtCrowdAgentParams.prototype, "separationWeight", {
                    get: dtCrowdAgentParams.prototype.get_separationWeight,
                    set: dtCrowdAgentParams.prototype.set_separationWeight
                });
                dtCrowdAgentParams.prototype["get_updateFlags"] = dtCrowdAgentParams.prototype.get_updateFlags = function() {
                    var self = this.ptr;
                    return _emscripten_bind_dtCrowdAgentParams_get_updateFlags_0(self);
                };
                dtCrowdAgentParams.prototype["set_updateFlags"] = dtCrowdAgentParams.prototype.set_updateFlags = function(arg0) {
                    var self = this.ptr;
                    if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
                    _emscripten_bind_dtCrowdAgentParams_set_updateFlags_1(self, arg0);
                };
                Object.defineProperty(dtCrowdAgentParams.prototype, "updateFlags", {
                    get: dtCrowdAgentParams.prototype.get_updateFlags,
                    set: dtCrowdAgentParams.prototype.set_updateFlags
                });
                dtCrowdAgentParams.prototype["get_obstacleAvoidanceType"] = dtCrowdAgentParams.prototype.get_obstacleAvoidanceType = function() {
                    var self = this.ptr;
                    return _emscripten_bind_dtCrowdAgentParams_get_obstacleAvoidanceType_0(self);
                };
                dtCrowdAgentParams.prototype["set_obstacleAvoidanceType"] = dtCrowdAgentParams.prototype.set_obstacleAvoidanceType = function(arg0) {
                    var self = this.ptr;
                    if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
                    _emscripten_bind_dtCrowdAgentParams_set_obstacleAvoidanceType_1(self, arg0);
                };
                Object.defineProperty(dtCrowdAgentParams.prototype, "obstacleAvoidanceType", {
                    get: dtCrowdAgentParams.prototype.get_obstacleAvoidanceType,
                    set: dtCrowdAgentParams.prototype.set_obstacleAvoidanceType
                });
                dtCrowdAgentParams.prototype["get_queryFilterType"] = dtCrowdAgentParams.prototype.get_queryFilterType = function() {
                    var self = this.ptr;
                    return _emscripten_bind_dtCrowdAgentParams_get_queryFilterType_0(self);
                };
                dtCrowdAgentParams.prototype["set_queryFilterType"] = dtCrowdAgentParams.prototype.set_queryFilterType = function(arg0) {
                    var self = this.ptr;
                    if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
                    _emscripten_bind_dtCrowdAgentParams_set_queryFilterType_1(self, arg0);
                };
                Object.defineProperty(dtCrowdAgentParams.prototype, "queryFilterType", {
                    get: dtCrowdAgentParams.prototype.get_queryFilterType,
                    set: dtCrowdAgentParams.prototype.set_queryFilterType
                });
                dtCrowdAgentParams.prototype["get_userData"] = dtCrowdAgentParams.prototype.get_userData = function() {
                    var self = this.ptr;
                    return wrapPointer(_emscripten_bind_dtCrowdAgentParams_get_userData_0(self), VoidPtr);
                };
                dtCrowdAgentParams.prototype["set_userData"] = dtCrowdAgentParams.prototype.set_userData = function(arg0) {
                    var self = this.ptr;
                    if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
                    _emscripten_bind_dtCrowdAgentParams_set_userData_1(self, arg0);
                };
                Object.defineProperty(dtCrowdAgentParams.prototype, "userData", {
                    get: dtCrowdAgentParams.prototype.get_userData,
                    set: dtCrowdAgentParams.prototype.set_userData
                });
                dtCrowdAgentParams.prototype["__destroy__"] = dtCrowdAgentParams.prototype.__destroy__ = function() {
                    var self = this.ptr;
                    _emscripten_bind_dtCrowdAgentParams___destroy___0(self);
                };
                function NavMesh() {
                    this.ptr = _emscripten_bind_NavMesh_NavMesh_0();
                    getCache(NavMesh)[this.ptr] = this;
                }
                NavMesh.prototype = Object.create(WrapperObject.prototype);
                NavMesh.prototype.constructor = NavMesh;
                NavMesh.prototype.__class__ = NavMesh;
                NavMesh.__cache__ = {};
                Module["NavMesh"] = NavMesh;
                NavMesh.prototype["destroy"] = NavMesh.prototype.destroy = function() {
                    var self = this.ptr;
                    _emscripten_bind_NavMesh_destroy_0(self);
                };
                NavMesh.prototype["build"] = NavMesh.prototype.build = function(positions, positionCount, indices, indexCount, config) {
                    var self = this.ptr;
                    ensureCache.prepare();
                    if (typeof positions == "object") positions = ensureFloat32(positions);
                    if (positionCount && typeof positionCount === "object") positionCount = positionCount.ptr;
                    if (typeof indices == "object") indices = ensureInt32(indices);
                    if (indexCount && typeof indexCount === "object") indexCount = indexCount.ptr;
                    if (config && typeof config === "object") config = config.ptr;
                    _emscripten_bind_NavMesh_build_5(self, positions, positionCount, indices, indexCount, config);
                };
                NavMesh.prototype["buildFromNavmeshData"] = NavMesh.prototype.buildFromNavmeshData = function(data) {
                    var self = this.ptr;
                    if (data && typeof data === "object") data = data.ptr;
                    _emscripten_bind_NavMesh_buildFromNavmeshData_1(self, data);
                };
                NavMesh.prototype["getNavmeshData"] = NavMesh.prototype.getNavmeshData = function() {
                    var self = this.ptr;
                    return wrapPointer(_emscripten_bind_NavMesh_getNavmeshData_0(self), NavmeshData);
                };
                NavMesh.prototype["freeNavmeshData"] = NavMesh.prototype.freeNavmeshData = function(data) {
                    var self = this.ptr;
                    if (data && typeof data === "object") data = data.ptr;
                    _emscripten_bind_NavMesh_freeNavmeshData_1(self, data);
                };
                NavMesh.prototype["getDebugNavMesh"] = NavMesh.prototype.getDebugNavMesh = function() {
                    var self = this.ptr;
                    return wrapPointer(_emscripten_bind_NavMesh_getDebugNavMesh_0(self), DebugNavMesh);
                };
                NavMesh.prototype["getClosestPoint"] = NavMesh.prototype.getClosestPoint = function(position) {
                    var self = this.ptr;
                    if (position && typeof position === "object") position = position.ptr;
                    return wrapPointer(_emscripten_bind_NavMesh_getClosestPoint_1(self, position), Vec3);
                };
                NavMesh.prototype["getRandomPointAround"] = NavMesh.prototype.getRandomPointAround = function(position, maxRadius) {
                    var self = this.ptr;
                    if (position && typeof position === "object") position = position.ptr;
                    if (maxRadius && typeof maxRadius === "object") maxRadius = maxRadius.ptr;
                    return wrapPointer(_emscripten_bind_NavMesh_getRandomPointAround_2(self, position, maxRadius), Vec3);
                };
                NavMesh.prototype["moveAlong"] = NavMesh.prototype.moveAlong = function(position, destination) {
                    var self = this.ptr;
                    if (position && typeof position === "object") position = position.ptr;
                    if (destination && typeof destination === "object") destination = destination.ptr;
                    return wrapPointer(_emscripten_bind_NavMesh_moveAlong_2(self, position, destination), Vec3);
                };
                NavMesh.prototype["getNavMesh"] = NavMesh.prototype.getNavMesh = function() {
                    var self = this.ptr;
                    return wrapPointer(_emscripten_bind_NavMesh_getNavMesh_0(self), dtNavMesh);
                };
                NavMesh.prototype["computePath"] = NavMesh.prototype.computePath = function(start, end) {
                    var self = this.ptr;
                    if (start && typeof start === "object") start = start.ptr;
                    if (end && typeof end === "object") end = end.ptr;
                    return wrapPointer(_emscripten_bind_NavMesh_computePath_2(self, start, end), NavPath);
                };
                NavMesh.prototype["setDefaultQueryExtent"] = NavMesh.prototype.setDefaultQueryExtent = function(extent) {
                    var self = this.ptr;
                    if (extent && typeof extent === "object") extent = extent.ptr;
                    _emscripten_bind_NavMesh_setDefaultQueryExtent_1(self, extent);
                };
                NavMesh.prototype["getDefaultQueryExtent"] = NavMesh.prototype.getDefaultQueryExtent = function() {
                    var self = this.ptr;
                    return wrapPointer(_emscripten_bind_NavMesh_getDefaultQueryExtent_0(self), Vec3);
                };
                NavMesh.prototype["addCylinderObstacle"] = NavMesh.prototype.addCylinderObstacle = function(position, radius, height) {
                    var self = this.ptr;
                    if (position && typeof position === "object") position = position.ptr;
                    if (radius && typeof radius === "object") radius = radius.ptr;
                    if (height && typeof height === "object") height = height.ptr;
                    return wrapPointer(_emscripten_bind_NavMesh_addCylinderObstacle_3(self, position, radius, height), dtObstacleRef);
                };
                NavMesh.prototype["addBoxObstacle"] = NavMesh.prototype.addBoxObstacle = function(position, extent, angle) {
                    var self = this.ptr;
                    if (position && typeof position === "object") position = position.ptr;
                    if (extent && typeof extent === "object") extent = extent.ptr;
                    if (angle && typeof angle === "object") angle = angle.ptr;
                    return wrapPointer(_emscripten_bind_NavMesh_addBoxObstacle_3(self, position, extent, angle), dtObstacleRef);
                };
                NavMesh.prototype["removeObstacle"] = NavMesh.prototype.removeObstacle = function(obstacle) {
                    var self = this.ptr;
                    if (obstacle && typeof obstacle === "object") obstacle = obstacle.ptr;
                    _emscripten_bind_NavMesh_removeObstacle_1(self, obstacle);
                };
                NavMesh.prototype["update"] = NavMesh.prototype.update = function() {
                    var self = this.ptr;
                    _emscripten_bind_NavMesh_update_0(self);
                };
                NavMesh.prototype["__destroy__"] = NavMesh.prototype.__destroy__ = function() {
                    var self = this.ptr;
                    _emscripten_bind_NavMesh___destroy___0(self);
                };
                function Crowd(maxAgents, maxAgentRadius, nav) {
                    if (maxAgents && typeof maxAgents === "object") maxAgents = maxAgents.ptr;
                    if (maxAgentRadius && typeof maxAgentRadius === "object") maxAgentRadius = maxAgentRadius.ptr;
                    if (nav && typeof nav === "object") nav = nav.ptr;
                    this.ptr = _emscripten_bind_Crowd_Crowd_3(maxAgents, maxAgentRadius, nav);
                    getCache(Crowd)[this.ptr] = this;
                }
                Crowd.prototype = Object.create(WrapperObject.prototype);
                Crowd.prototype.constructor = Crowd;
                Crowd.prototype.__class__ = Crowd;
                Crowd.__cache__ = {};
                Module["Crowd"] = Crowd;
                Crowd.prototype["destroy"] = Crowd.prototype.destroy = function() {
                    var self = this.ptr;
                    _emscripten_bind_Crowd_destroy_0(self);
                };
                Crowd.prototype["addAgent"] = Crowd.prototype.addAgent = function(position, params) {
                    var self = this.ptr;
                    if (position && typeof position === "object") position = position.ptr;
                    if (params && typeof params === "object") params = params.ptr;
                    return _emscripten_bind_Crowd_addAgent_2(self, position, params);
                };
                Crowd.prototype["removeAgent"] = Crowd.prototype.removeAgent = function(idx) {
                    var self = this.ptr;
                    if (idx && typeof idx === "object") idx = idx.ptr;
                    _emscripten_bind_Crowd_removeAgent_1(self, idx);
                };
                Crowd.prototype["update"] = Crowd.prototype.update = function(dt) {
                    var self = this.ptr;
                    if (dt && typeof dt === "object") dt = dt.ptr;
                    _emscripten_bind_Crowd_update_1(self, dt);
                };
                Crowd.prototype["getAgentPosition"] = Crowd.prototype.getAgentPosition = function(idx) {
                    var self = this.ptr;
                    if (idx && typeof idx === "object") idx = idx.ptr;
                    return wrapPointer(_emscripten_bind_Crowd_getAgentPosition_1(self, idx), Vec3);
                };
                Crowd.prototype["getAgentVelocity"] = Crowd.prototype.getAgentVelocity = function(idx) {
                    var self = this.ptr;
                    if (idx && typeof idx === "object") idx = idx.ptr;
                    return wrapPointer(_emscripten_bind_Crowd_getAgentVelocity_1(self, idx), Vec3);
                };
                Crowd.prototype["getAgentNextTargetPath"] = Crowd.prototype.getAgentNextTargetPath = function(idx) {
                    var self = this.ptr;
                    if (idx && typeof idx === "object") idx = idx.ptr;
                    return wrapPointer(_emscripten_bind_Crowd_getAgentNextTargetPath_1(self, idx), Vec3);
                };
                Crowd.prototype["getAgentState"] = Crowd.prototype.getAgentState = function(idx) {
                    var self = this.ptr;
                    if (idx && typeof idx === "object") idx = idx.ptr;
                    return _emscripten_bind_Crowd_getAgentState_1(self, idx);
                };
                Crowd.prototype["overOffmeshConnection"] = Crowd.prototype.overOffmeshConnection = function(idx) {
                    var self = this.ptr;
                    if (idx && typeof idx === "object") idx = idx.ptr;
                    return !!_emscripten_bind_Crowd_overOffmeshConnection_1(self, idx);
                };
                Crowd.prototype["agentGoto"] = Crowd.prototype.agentGoto = function(idx, destination) {
                    var self = this.ptr;
                    if (idx && typeof idx === "object") idx = idx.ptr;
                    if (destination && typeof destination === "object") destination = destination.ptr;
                    _emscripten_bind_Crowd_agentGoto_2(self, idx, destination);
                };
                Crowd.prototype["agentTeleport"] = Crowd.prototype.agentTeleport = function(idx, destination) {
                    var self = this.ptr;
                    if (idx && typeof idx === "object") idx = idx.ptr;
                    if (destination && typeof destination === "object") destination = destination.ptr;
                    _emscripten_bind_Crowd_agentTeleport_2(self, idx, destination);
                };
                Crowd.prototype["getAgentParameters"] = Crowd.prototype.getAgentParameters = function(idx) {
                    var self = this.ptr;
                    if (idx && typeof idx === "object") idx = idx.ptr;
                    return wrapPointer(_emscripten_bind_Crowd_getAgentParameters_1(self, idx), dtCrowdAgentParams);
                };
                Crowd.prototype["setAgentParameters"] = Crowd.prototype.setAgentParameters = function(idx, params) {
                    var self = this.ptr;
                    if (idx && typeof idx === "object") idx = idx.ptr;
                    if (params && typeof params === "object") params = params.ptr;
                    _emscripten_bind_Crowd_setAgentParameters_2(self, idx, params);
                };
                Crowd.prototype["setDefaultQueryExtent"] = Crowd.prototype.setDefaultQueryExtent = function(extent) {
                    var self = this.ptr;
                    if (extent && typeof extent === "object") extent = extent.ptr;
                    _emscripten_bind_Crowd_setDefaultQueryExtent_1(self, extent);
                };
                Crowd.prototype["getDefaultQueryExtent"] = Crowd.prototype.getDefaultQueryExtent = function() {
                    var self = this.ptr;
                    return wrapPointer(_emscripten_bind_Crowd_getDefaultQueryExtent_0(self), Vec3);
                };
                Crowd.prototype["getCorners"] = Crowd.prototype.getCorners = function(idx) {
                    var self = this.ptr;
                    if (idx && typeof idx === "object") idx = idx.ptr;
                    return wrapPointer(_emscripten_bind_Crowd_getCorners_1(self, idx), NavPath);
                };
                Crowd.prototype["__destroy__"] = Crowd.prototype.__destroy__ = function() {
                    var self = this.ptr;
                    _emscripten_bind_Crowd___destroy___0(self);
                };
                return Module.ready;
            };
        }();
        const __WEBPACK_DEFAULT_EXPORT__ = Module;
    }
} ]);