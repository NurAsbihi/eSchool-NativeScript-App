require("./runtime.js");require("./vendor.js");module.exports =
(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["bundle"],{

/***/ "../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!./components/App.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _LessonsList__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./components/LessonsList.vue");
/* harmony import */ var _Checkout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./components/Checkout.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    Lesson: _LessonsList__WEBPACK_IMPORTED_MODULE_0__["default"],
    Checkout: _Checkout__WEBPACK_IMPORTED_MODULE_1__["default"]
  },

  data() {
    return {
      cart: []
    };
  },

  methods: {
    addToCart(lesson) {
      if (lesson.spaces > 0) {
        lesson.spaces -= 1;
        this.cart.push(lesson);
        var updateProduct = {
          spaces: lesson.spaces
        };
        fetch('https://cw2-server.herokuapp.com/collection/products/' + lesson._id, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updateProduct)
        }).then(response => response.json()).then(data => {
          alert(lesson.name + ' added to cart');
          console.log('Successfully updated spaces:', data);
        });
      } else {
        alert("No more courses available!");
      }
    },

    removeLesson(lesson) {
      if (lesson.spaces < 10) {
        lesson.spaces += 1;
        this.cart.splice(this.cart.indexOf(lesson), 1);
        var updateProduct = {
          spaces: lesson.spaces
        };
        fetch('https://cw2-server.herokuapp.com/collection/products/' + lesson._id, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updateProduct)
        }).then(response => response.json()).then(data => {
          console.log('Successfully updated spaces:', data);
        });
      }
    },

    refreshCart(clearCart) {
      this.$data.cart = [];
    }

  }
});

/***/ }),

/***/ "../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!./components/Checkout.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['cart'],

  data() {
    return {};
  },

  methods: {
    onItemTap(event) {
      this.$emit('removeItem', event.item);
      alert("Removed " + event.item.name + " from cart");
    },

    // checkout(event)   {
    //     this.$emit('checkoutSubmit', event.item);
    // },
    checkoutSubmit() {
      // Counts how many times duplicate ID's come up so I can filter them
      // when putting the objects into MongoDB
      var mp = new Map(this.cart.map(o => [o._id, _objectSpread(_objectSpread({}, o), {}, {
        count: 0
      })]));

      for (var {
        _id
      } of this.cart) {
        mp.get(_id).count++;
      }

      var result = Array.from(mp.values());
      console.log(result); // Targetting specific fields in array for order collection

      var cartID = result.map(a => ({
        id: a._id
      }));
      var cartName = result.map(b => ({
        name: b.name
      }));
      var cartSpaces = result.map(c => ({
        spaces: c.count
      }));
      var currentDate = new Date().toJSON(); // Creating an object to send to the database

      var newOrder = {
        customer_name: this.name,
        customer_number: this.phone,
        product_purchased: {
          lesson_id: cartID,
          lesson_name: cartName,
          spaces_bought: cartSpaces
        },
        date: currentDate
      };
      console.log(newOrder);
      fetch('https://cw2-server.herokuapp.com/collection/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newOrder)
      }).then(response => response.json()).then(responseJSON => {
        console.log('Success:', responseJSON);
        this.$emit('clearCart');
      });
      alert("Successfully Checked Out!");
    }

  }
});

/***/ }),

/***/ "../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!./components/LessonsList.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  data() {
    return {
      lessons: {}
    };
  },

  methods: {
    onItemTap(event) {
      this.$emit('addLesson', event.item); // alert(event.item.name)
    }

  },
  created: function created() {
    fetch('https://cw2-server.herokuapp.com/collection/products', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify()
    }).then(response => response.json()).then(data => {
      this.lessons = data;
    });
  }
});

/***/ }),

/***/ "../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!./components/App.vue?vue&type=template&id=45ba5ed4&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "Page",
    [
      _c("ActionBar", { attrs: { title: "eSchool - Courses Shop" } }),
      _c("Label", {
        staticClass: "h2 text-center",
        attrs: { text: "Welcome to the eSchool Courses Shop" }
      }),
      _c(
        "TabView",
        { attrs: { androidTabsPosition: "bottom" } },
        [
          _c(
            "TabViewItem",
            { staticClass: "h2", attrs: { title: "Lessons" } },
            [_c("Lesson", { on: { addLesson: _vm.addToCart } })],
            1
          ),
          _c(
            "TabViewItem",
            { staticClass: "h2", attrs: { title: "Checkout" } },
            [
              _c(
                "StackLayout",
                [
                  _c("Checkout", {
                    attrs: { cart: _vm.cart },
                    on: {
                      removeItem: _vm.removeLesson,
                      clearCart: _vm.refreshCart
                    }
                  })
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!./components/Checkout.vue?vue&type=template&id=010b82a1&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "StackLayout",
    [
      _c("Label", {
        staticClass: "h2 text-center",
        attrs: { text: "Shopping Cart" }
      }),
      _c("Label", {
        staticClass: "h2 text-center",
        attrs: { text: "Tap a product to remove it from the cart" }
      }),
      _c(
        "ListView",
        {
          attrs: { items: _vm.cart, "+alias": "lesson" },
          on: { itemTap: _vm.onItemTap }
        },
        [
          _c("v-template", {
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(ref) {
                  var lesson = ref.lesson
                  var $index = ref.$index
                  var $even = ref.$even
                  var $odd = ref.$odd
                  return _c(
                    "StackLayout",
                    [
                      _c("Label", { attrs: { text: lesson.name } }),
                      _c("Label", { attrs: { text: "£" + lesson.price } })
                    ],
                    1
                  )
                }
              }
            ])
          })
        ],
        1
      ),
      _c("TextField", {
        attrs: { hint: "Name" },
        model: {
          value: _vm.name,
          callback: function($event) {
            _vm.name = $event.object["text"]
          },
          expression: "name"
        }
      }),
      _c("TextField", {
        attrs: { hint: "Phone" },
        model: {
          value: _vm.phone,
          callback: function($event) {
            _vm.phone = _vm._n($event.object["text"])
          },
          expression: "phone"
        }
      }),
      _c("Button", {
        attrs: { text: "Checkout" },
        on: { tap: _vm.checkoutSubmit }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!./components/LessonsList.vue?vue&type=template&id=69947224&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "StackLayout",
    [
      _c("Label", {
        staticClass: "h2 text-center",
        attrs: { text: "Lessons" }
      }),
      _c("Label", {
        staticClass: "h2 text-center",
        attrs: { text: "Tap a product to add it to the cart" }
      }),
      _c(
        "ListView",
        {
          attrs: { items: _vm.lessons, "+alias": "lesson" },
          on: { itemTap: _vm.onItemTap }
        },
        [
          _c("v-template", {
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(ref) {
                  var lesson = ref.lesson
                  var $index = ref.$index
                  var $even = ref.$even
                  var $odd = ref.$odd
                  return _c(
                    "StackLayout",
                    [
                      _c("Image", { attrs: { src: lesson.image } }),
                      _c("Label", { attrs: { text: lesson.name } }),
                      _c("Label", { attrs: { text: lesson.location } }),
                      _c("Label", { attrs: { text: "£" + lesson.price } }),
                      _c("Label", {
                        attrs: { text: "Available: " + lesson.spaces }
                      })
                    ],
                    1
                  )
                }
              }
            ])
          })
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./ sync ^\\.\\/app\\.(css|scss|less|sass)$":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./app.css": "./app.css"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./ sync ^\\.\\/app\\.(css|scss|less|sass)$";

/***/ }),

/***/ "./ sync recursive (?<!\\bApp_Resources\\b.*)(?<!\\.\\/\\btests\\b\\/.*?)\\.(xml|css|js|(?<!\\.d\\.)ts|(?<!\\b_[\\w-]*\\.)scss)$":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./app.css": "./app.css",
	"./app.js": "./app.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./ sync recursive (?<!\\bApp_Resources\\b.*)(?<!\\.\\/\\btests\\b\\/.*?)\\.(xml|css|js|(?<!\\.d\\.)ts|(?<!\\b_[\\w-]*\\.)scss)$";

/***/ }),

/***/ "./app.css":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {global.registerModule("~@nativescript/theme/css/core.css", () => __webpack_require__("../node_modules/@nativescript/webpack/helpers/css2json-loader.js?useForImports!../node_modules/@nativescript/theme/css/core.css"));
global.registerModule("@nativescript/theme/css/core.css", () => __webpack_require__("../node_modules/@nativescript/webpack/helpers/css2json-loader.js?useForImports!../node_modules/@nativescript/theme/css/core.css"));
global.registerModule("~@nativescript/theme/css/lime.css", () => __webpack_require__("../node_modules/@nativescript/webpack/helpers/css2json-loader.js?useForImports!../node_modules/@nativescript/theme/css/lime.css"));
global.registerModule("@nativescript/theme/css/lime.css", () => __webpack_require__("../node_modules/@nativescript/webpack/helpers/css2json-loader.js?useForImports!../node_modules/@nativescript/theme/css/lime.css"));module.exports = {"type":"stylesheet","stylesheet":{"rules":[{"type":"import","import":"'~@nativescript/theme/css/core.css'"},{"type":"import","import":"'~@nativescript/theme/css/lime.css'"},{"type":"rule","selectors":[".btn"],"declarations":[{"type":"declaration","property":"font-size","value":"18"}]}],"parsingErrors":[]}};;
    if (true) {
        module.hot.accept();
        module.hot.dispose(() => {
            global.hmrRefresh({ type: 'style', path: './app.css' });
        })
    }

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./app.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var nativescript_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("nativescript-vue");
/* harmony import */ var nativescript_vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nativescript_vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_App__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./components/App.vue");

        const isAndroid = __webpack_require__("@nativescript/core").isAndroid;
        if (isAndroid && !global["__snapshot"]) {
            __webpack_require__("@nativescript/core/ui/frame");
__webpack_require__("@nativescript/core/ui/frame/activity");
        }

        
            __webpack_require__("../node_modules/@nativescript/webpack/helpers/load-application-css-regular.js")();
            
            
        if (true) {
            const hmrUpdate = __webpack_require__("../node_modules/@nativescript/webpack/hmr/index.js").hmrUpdate;
            global.__coreModulesLiveSync = global.__onLiveSync;

            global.__onLiveSync = function () {
                // handle hot updated on LiveSync
                hmrUpdate();
            };

            global.hmrRefresh = function({ type, path } = {}) {
                // the hot updates are applied, ask the modules to apply the changes
                setTimeout(() => {
                    global.__coreModulesLiveSync({ type, path });
                });
            };

            // handle hot updated on initial app start
            hmrUpdate();
        }
        
            const context = __webpack_require__("./ sync recursive (?<!\\bApp_Resources\\b.*)(?<!\\.\\/\\btests\\b\\/.*?)\\.(xml|css|js|(?<!\\.d\\.)ts|(?<!\\b_[\\w-]*\\.)scss)$");
            global.registerWebpackModules(context);
            if (true) {
                module.hot.accept(context.id, () => { 
                    console.log("HMR: Accept module '" + context.id + "' from '" + module.i + "'"); 
                });
            }
            
        __webpack_require__("@nativescript/core/bundle-entry-points");
        
 // Uncommment the following to see NativeScript-Vue output logs
// Vue.config.silent = false;

new nativescript_vue__WEBPACK_IMPORTED_MODULE_0___default.a({
  template: "\n        <Frame>\n            <eSchool />\n        </Frame>",
  components: {
    eSchool: _components_App__WEBPACK_IMPORTED_MODULE_1__["default"]
  }
}).$start();
    
        
        
    
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./components/App.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _App_vue_vue_type_template_id_45ba5ed4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./components/App.vue?vue&type=template&id=45ba5ed4&");
/* harmony import */ var _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./components/App.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _App_vue_vue_type_template_id_45ba5ed4___WEBPACK_IMPORTED_MODULE_0__["render"],
  _App_vue_vue_type_template_id_45ba5ed4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (true) {
  var api = __webpack_require__("../node_modules/vue-hot-reload-api/dist/index.js")
  api.install(__webpack_require__("../node_modules/nativescript-vue/dist/index.js"))
  if (api.compatible) {
    module.hot.accept()
    if (!api.isRecorded('45ba5ed4')) {
      api.createRecord('45ba5ed4', component.options)
    } else {
      api.reload('45ba5ed4', component.options)
    }
    module.hot.accept("./components/App.vue?vue&type=template&id=45ba5ed4&", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _App_vue_vue_type_template_id_45ba5ed4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./components/App.vue?vue&type=template&id=45ba5ed4&");
(function () {
      api.rerender('45ba5ed4', {
        render: _App_vue_vue_type_template_id_45ba5ed4___WEBPACK_IMPORTED_MODULE_0__["render"],
        staticRenderFns: _App_vue_vue_type_template_id_45ba5ed4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]
      })
    })(__WEBPACK_OUTDATED_DEPENDENCIES__); }.bind(this))
  }
}
component.options.__file = "components/App.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./components/App.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!./components/App.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./components/App.vue?vue&type=template&id=45ba5ed4&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_45ba5ed4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!./components/App.vue?vue&type=template&id=45ba5ed4&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_45ba5ed4___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_45ba5ed4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./components/Checkout.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Checkout_vue_vue_type_template_id_010b82a1___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./components/Checkout.vue?vue&type=template&id=010b82a1&");
/* harmony import */ var _Checkout_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./components/Checkout.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Checkout_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Checkout_vue_vue_type_template_id_010b82a1___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Checkout_vue_vue_type_template_id_010b82a1___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (true) {
  var api = __webpack_require__("../node_modules/vue-hot-reload-api/dist/index.js")
  api.install(__webpack_require__("../node_modules/nativescript-vue/dist/index.js"))
  if (api.compatible) {
    module.hot.accept()
    if (!api.isRecorded('010b82a1')) {
      api.createRecord('010b82a1', component.options)
    } else {
      api.reload('010b82a1', component.options)
    }
    module.hot.accept("./components/Checkout.vue?vue&type=template&id=010b82a1&", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _Checkout_vue_vue_type_template_id_010b82a1___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./components/Checkout.vue?vue&type=template&id=010b82a1&");
(function () {
      api.rerender('010b82a1', {
        render: _Checkout_vue_vue_type_template_id_010b82a1___WEBPACK_IMPORTED_MODULE_0__["render"],
        staticRenderFns: _Checkout_vue_vue_type_template_id_010b82a1___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]
      })
    })(__WEBPACK_OUTDATED_DEPENDENCIES__); }.bind(this))
  }
}
component.options.__file = "components/Checkout.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./components/Checkout.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Checkout_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!./components/Checkout.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Checkout_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./components/Checkout.vue?vue&type=template&id=010b82a1&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Checkout_vue_vue_type_template_id_010b82a1___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!./components/Checkout.vue?vue&type=template&id=010b82a1&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Checkout_vue_vue_type_template_id_010b82a1___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Checkout_vue_vue_type_template_id_010b82a1___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./components/LessonsList.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _LessonsList_vue_vue_type_template_id_69947224___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./components/LessonsList.vue?vue&type=template&id=69947224&");
/* harmony import */ var _LessonsList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./components/LessonsList.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _LessonsList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _LessonsList_vue_vue_type_template_id_69947224___WEBPACK_IMPORTED_MODULE_0__["render"],
  _LessonsList_vue_vue_type_template_id_69947224___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (true) {
  var api = __webpack_require__("../node_modules/vue-hot-reload-api/dist/index.js")
  api.install(__webpack_require__("../node_modules/nativescript-vue/dist/index.js"))
  if (api.compatible) {
    module.hot.accept()
    if (!api.isRecorded('69947224')) {
      api.createRecord('69947224', component.options)
    } else {
      api.reload('69947224', component.options)
    }
    module.hot.accept("./components/LessonsList.vue?vue&type=template&id=69947224&", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _LessonsList_vue_vue_type_template_id_69947224___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./components/LessonsList.vue?vue&type=template&id=69947224&");
(function () {
      api.rerender('69947224', {
        render: _LessonsList_vue_vue_type_template_id_69947224___WEBPACK_IMPORTED_MODULE_0__["render"],
        staticRenderFns: _LessonsList_vue_vue_type_template_id_69947224___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]
      })
    })(__WEBPACK_OUTDATED_DEPENDENCIES__); }.bind(this))
  }
}
component.options.__file = "components/LessonsList.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./components/LessonsList.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_LessonsList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!./components/LessonsList.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_LessonsList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./components/LessonsList.vue?vue&type=template&id=69947224&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_LessonsList_vue_vue_type_template_id_69947224___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!./components/LessonsList.vue?vue&type=template&id=69947224&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_LessonsList_vue_vue_type_template_id_69947224___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_LessonsList_vue_vue_type_template_id_69947224___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "@nativescript/core":
/***/ (function(module, exports) {

module.exports = require("@nativescript/core");

/***/ }),

/***/ "@nativescript/core/application":
/***/ (function(module, exports) {

module.exports = require("@nativescript/core/application");

/***/ }),

/***/ "@nativescript/core/bundle-entry-points":
/***/ (function(module, exports) {

module.exports = require("@nativescript/core/bundle-entry-points");

/***/ }),

/***/ "@nativescript/core/data/observable-array":
/***/ (function(module, exports) {

module.exports = require("@nativescript/core/data/observable-array");

/***/ }),

/***/ "@nativescript/core/platform":
/***/ (function(module, exports) {

module.exports = require("@nativescript/core/platform");

/***/ }),

/***/ "@nativescript/core/ui/content-view":
/***/ (function(module, exports) {

module.exports = require("@nativescript/core/ui/content-view");

/***/ }),

/***/ "@nativescript/core/ui/core/view":
/***/ (function(module, exports) {

module.exports = require("@nativescript/core/ui/core/view");

/***/ }),

/***/ "@nativescript/core/ui/frame":
/***/ (function(module, exports) {

module.exports = require("@nativescript/core/ui/frame");

/***/ }),

/***/ "@nativescript/core/ui/frame/activity":
/***/ (function(module, exports) {

module.exports = require("@nativescript/core/ui/frame/activity");

/***/ }),

/***/ "@nativescript/core/ui/layouts/layout-base":
/***/ (function(module, exports) {

module.exports = require("@nativescript/core/ui/layouts/layout-base");

/***/ }),

/***/ "@nativescript/core/ui/styling/style-scope":
/***/ (function(module, exports) {

module.exports = require("@nativescript/core/ui/styling/style-scope");

/***/ }),

/***/ "@nativescript/core/utils/types":
/***/ (function(module, exports) {

module.exports = require("@nativescript/core/utils/types");

/***/ }),

/***/ "@nativescript/core/xml":
/***/ (function(module, exports) {

module.exports = require("@nativescript/core/xml");

/***/ }),

/***/ "nativescript-vue":
/***/ (function(module, exports) {

module.exports = require("nativescript-vue");

/***/ })

},[["./app.js","runtime","vendor"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vY29tcG9uZW50cy9BcHAudnVlIiwid2VicGFjazovLy9jb21wb25lbnRzL0NoZWNrb3V0LnZ1ZSIsIndlYnBhY2s6Ly8vY29tcG9uZW50cy9MZXNzb25zTGlzdC52dWUiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9BcHAudnVlPzdiMGUiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9DaGVja291dC52dWU/ZGI2YiIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL0xlc3NvbnNMaXN0LnZ1ZT8wYmUyIiwid2VicGFjazovLy8uIHN5bmMgbm9ucmVjdXJzaXZlIF5cXC5cXC9hcHBcXC4oY3NzfHNjc3N8bGVzc3xzYXNzKSQiLCJ3ZWJwYWNrOi8vL1xcYl9bXFx3LV0qXFwuKXNjc3MpJCIsIndlYnBhY2s6Ly8vLi9hcHAuY3NzIiwid2VicGFjazovLy8uL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL0FwcC52dWUiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9BcHAudnVlPzllMjMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9BcHAudnVlP2IzNzciLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9DaGVja291dC52dWUiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9DaGVja291dC52dWU/YzRjOCIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL0NoZWNrb3V0LnZ1ZT9mY2ExIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvTGVzc29uc0xpc3QudnVlIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvTGVzc29uc0xpc3QudnVlPzRmZjkiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9MZXNzb25zTGlzdC52dWU/MzU4ZiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAbmF0aXZlc2NyaXB0L2NvcmVcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAbmF0aXZlc2NyaXB0L2NvcmUvYXBwbGljYXRpb25cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAbmF0aXZlc2NyaXB0L2NvcmUvYnVuZGxlLWVudHJ5LXBvaW50c1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBuYXRpdmVzY3JpcHQvY29yZS9kYXRhL29ic2VydmFibGUtYXJyYXlcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAbmF0aXZlc2NyaXB0L2NvcmUvcGxhdGZvcm1cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAbmF0aXZlc2NyaXB0L2NvcmUvdWkvY29udGVudC12aWV3XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiQG5hdGl2ZXNjcmlwdC9jb3JlL3VpL2NvcmUvdmlld1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBuYXRpdmVzY3JpcHQvY29yZS91aS9mcmFtZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBuYXRpdmVzY3JpcHQvY29yZS91aS9mcmFtZS9hY3Rpdml0eVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBuYXRpdmVzY3JpcHQvY29yZS91aS9sYXlvdXRzL2xheW91dC1iYXNlXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiQG5hdGl2ZXNjcmlwdC9jb3JlL3VpL3N0eWxpbmcvc3R5bGUtc2NvcGVcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAbmF0aXZlc2NyaXB0L2NvcmUvdXRpbHMvdHlwZXNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAbmF0aXZlc2NyaXB0L2NvcmUveG1sXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibmF0aXZlc2NyaXB0LXZ1ZVwiIl0sIm5hbWVzIjpbImVTY2hvb2wiLCJ0ZW1wbGF0ZSIsIiRzdGFydCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBa0JBO0FBQ0E7QUFFQTtBQUNBO0FBQUE7QUFBQTtBQUFBLEdBREE7O0FBRUE7QUFDQTtBQUNBO0FBREE7QUFHQSxHQU5BOztBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUFBO0FBQUE7QUFFQTtBQUNBLHVC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QTtBQUNlLGdGOzs7Ozs7OztBQ3RDZjtBQUFBO0FBQUEsd0NBQTJLLENBQWdCLCtPQUFHLEVBQUMsQzs7Ozs7Ozs7QUNBL0w7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7Ozs7OztBQ0FBLCtDOzs7Ozs7O0FDQUEsMkQ7Ozs7Ozs7QUNBQSxtRTs7Ozs7OztBQ0FBLHFFOzs7Ozs7O0FDQUEsd0Q7Ozs7Ozs7QUNBQSwrRDs7Ozs7OztBQ0FBLDREOzs7Ozs7O0FDQUEsd0Q7Ozs7Ozs7QUNBQSxpRTs7Ozs7OztBQ0FBLHNFOzs7Ozs7O0FDQUEsc0U7Ozs7Ozs7QUNBQSwyRDs7Ozs7OztBQ0FBLG1EOzs7Ozs7O0FDQUEsNkMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiPHRlbXBsYXRlPlxuICAgIDxQYWdlPlxuICAgICAgICA8QWN0aW9uQmFyIHRpdGxlPVwiZVNjaG9vbCAtIENvdXJzZXMgU2hvcFwiLz5cbiAgICAgICAgPExhYmVsIHRleHQ9XCJXZWxjb21lIHRvIHRoZSBlU2Nob29sIENvdXJzZXMgU2hvcFwiIGNsYXNzPVwiaDIgdGV4dC1jZW50ZXJcIiAvPlxuICAgICAgICA8VGFiVmlldyBhbmRyb2lkVGFic1Bvc2l0aW9uPSdib3R0b20nPlxuICAgICAgICAgICAgPFRhYlZpZXdJdGVtIHRpdGxlPVwiTGVzc29uc1wiIGNsYXNzPSdoMic+XG4gICAgICAgICAgICAgICAgPExlc3NvbiBAYWRkTGVzc29uPVwiYWRkVG9DYXJ0XCIvPlxuICAgICAgICAgICAgPC9UYWJWaWV3SXRlbT5cbiAgICAgICAgICAgIDxUYWJWaWV3SXRlbSB0aXRsZT1cIkNoZWNrb3V0XCIgY2xhc3M9J2gyJz5cbiAgICAgICAgICAgICAgICA8U3RhY2tMYXlvdXQ+XG4gICAgICAgICAgICAgICAgICAgIDxDaGVja291dCA6Y2FydD0nY2FydCcgQHJlbW92ZUl0ZW09XCJyZW1vdmVMZXNzb25cIiBAY2xlYXJDYXJ0PVwicmVmcmVzaENhcnRcIi8+XG4gICAgICAgICAgICAgICAgPC9TdGFja0xheW91dD5cbiAgICAgICAgICAgIDwvVGFiVmlld0l0ZW0+XG4gICAgICAgIDwvVGFiVmlldz5cbiAgICA8L1BhZ2U+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuICAgIGltcG9ydCBMZXNzb24gZnJvbSAnLi9MZXNzb25zTGlzdCc7XG4gICAgaW1wb3J0IENoZWNrb3V0IGZyb20gJy4vQ2hlY2tvdXQnO1xuXG4gICAgZXhwb3J0IGRlZmF1bHQge1xuICAgICAgICBjb21wb25lbnRzOiAgICB7IExlc3NvbiwgQ2hlY2tvdXQgfSxcbiAgICAgICAgZGF0YSAoKSB7XG4gICAgICAgICAgICByZXR1cm4gIHtcbiAgICAgICAgICAgICAgICBjYXJ0OiBbXSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sXG4gICAgICAgIG1ldGhvZHM6ICAgIHtcbiAgICAgICAgICAgIGFkZFRvQ2FydChsZXNzb24pICB7XG4gICAgICAgICAgICAgICAgaWYgKGxlc3Nvbi5zcGFjZXMgPiAwKSAgICB7XG4gICAgICAgICAgICAgICAgICAgIGxlc3Nvbi5zcGFjZXMgLT0gMTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYXJ0LnB1c2gobGVzc29uKTtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgdXBkYXRlUHJvZHVjdCA9IHtzcGFjZXM6IGxlc3Nvbi5zcGFjZXN9O1xuXG4gICAgICAgICAgICAgICAgICAgIGZldGNoKCdodHRwczovL2N3Mi1zZXJ2ZXIuaGVyb2t1YXBwLmNvbS9jb2xsZWN0aW9uL3Byb2R1Y3RzLycgKyBsZXNzb24uX2lkLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdQVVQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnIDogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkodXBkYXRlUHJvZHVjdClcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgICAgICAgICAgICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KGxlc3Nvbi5uYW1lICsgJyBhZGRlZCB0byBjYXJ0JylcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTdWNjZXNzZnVsbHkgdXBkYXRlZCBzcGFjZXM6JywgZGF0YSlcbiAgICAgICAgICAgICAgICAgICAgfSkgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCJObyBtb3JlIGNvdXJzZXMgYXZhaWxhYmxlIVwiKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZW1vdmVMZXNzb24obGVzc29uKSAge1xuICAgICAgICAgICAgICAgIGlmIChsZXNzb24uc3BhY2VzIDwgMTApICB7XG4gICAgICAgICAgICAgICAgICAgIGxlc3Nvbi5zcGFjZXMgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYXJ0LnNwbGljZSh0aGlzLmNhcnQuaW5kZXhPZihsZXNzb24pLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGxldCB1cGRhdGVQcm9kdWN0ID0ge3NwYWNlczogbGVzc29uLnNwYWNlc307XG5cbiAgICAgICAgICAgICAgICAgICAgZmV0Y2goJ2h0dHBzOi8vY3cyLXNlcnZlci5oZXJva3VhcHAuY29tL2NvbGxlY3Rpb24vcHJvZHVjdHMvJyArIGxlc3Nvbi5faWQsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BVVCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZScgOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh1cGRhdGVQcm9kdWN0KVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1N1Y2Nlc3NmdWxseSB1cGRhdGVkIHNwYWNlczonLCBkYXRhKVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZWZyZXNoQ2FydCAoY2xlYXJDYXJ0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kZGF0YS5jYXJ0ID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuPC9zY3JpcHQ+XG5cbjwhLS08c3R5bGUgc2NvcGVkPlxuLmhvbWUtcGFuZWwge1xuICAgIHZlcnRpY2FsLWFsaWduOiBjZW50ZXI7XG4gICAgZm9udC1zaXplOiAyMDtcbiAgICBtYXJnaW46IDE1O1xufVxuXG4uZGVzY3JpcHRpb24tbGFiZWwge1xuICAgIG1hcmdpbi1ib3R0b206IDE1O1xufVxuPC9zdHlsZT4tLT5cbiIsIjx0ZW1wbGF0ZT5cbiAgICA8U3RhY2tMYXlvdXQ+XG4gICAgICAgIDxMYWJlbCBjbGFzcz1cImgyIHRleHQtY2VudGVyXCIgdGV4dD1cIlNob3BwaW5nIENhcnRcIiAvPlxuICAgICAgICA8TGFiZWwgY2xhc3M9XCJoMiB0ZXh0LWNlbnRlclwiIHRleHQ9XCJUYXAgYSBwcm9kdWN0IHRvIHJlbW92ZSBpdCBmcm9tIHRoZSBjYXJ0XCIgLz5cbiAgICAgICAgPExpc3RWaWV3IGZvcj1cImxlc3NvbiBpbiBjYXJ0XCIgQGl0ZW1UYXA9J29uSXRlbVRhcCc+XG4gICAgICAgICAgICA8di10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICA8U3RhY2tMYXlvdXQ+XG4gICAgICAgICAgICAgICAgICAgIDxMYWJlbCA6dGV4dD1cImxlc3Nvbi5uYW1lXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPExhYmVsIDp0ZXh0PVwiYMKjJHtsZXNzb24ucHJpY2V9YFwiIC8+XG4gICAgICAgICAgICAgICAgPC9TdGFja0xheW91dD5cbiAgICAgICAgICAgIDwvdi10ZW1wbGF0ZT5cbiAgICAgICAgPC9MaXN0Vmlldz5cbiAgICAgICAgPFRleHRGaWVsZCBoaW50PVwiTmFtZVwiIHYtbW9kZWw9XCJuYW1lXCIgLz5cbiAgICAgICAgPFRleHRGaWVsZCBoaW50PVwiUGhvbmVcIiB2LW1vZGVsLm51bWJlcj1cInBob25lXCIgLz5cbiAgICAgICAgPEJ1dHRvbiBAdGFwPVwiY2hlY2tvdXRTdWJtaXRcIiB0ZXh0PVwiQ2hlY2tvdXRcIiAvPlxuICAgIDwvU3RhY2tMYXlvdXQ+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuICAgIGV4cG9ydCBkZWZhdWx0IHtcbiAgICAgICAgcHJvcHM6IFsnY2FydCddLFxuICAgICAgICBkYXRhKCkge1xuICAgICAgICAgICAgcmV0dXJuICB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG1ldGhvZHM6ICAgIHtcbiAgICAgICAgICAgIG9uSXRlbVRhcChldmVudCkgICAge1xuICAgICAgICAgICAgICAgIHRoaXMuJGVtaXQoJ3JlbW92ZUl0ZW0nLCBldmVudC5pdGVtKTtcbiAgICAgICAgICAgICAgICBhbGVydChcIlJlbW92ZWQgXCIgKyBldmVudC5pdGVtLm5hbWUgKyBcIiBmcm9tIGNhcnRcIilcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBjaGVja291dChldmVudCkgICB7XG4gICAgICAgICAgICAvLyAgICAgdGhpcy4kZW1pdCgnY2hlY2tvdXRTdWJtaXQnLCBldmVudC5pdGVtKTtcbiAgICAgICAgICAgIC8vIH0sXG4gICAgICAgICAgICBjaGVja291dFN1Ym1pdCgpICAgIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQ291bnRzIGhvdyBtYW55IHRpbWVzIGR1cGxpY2F0ZSBJRCdzIGNvbWUgdXAgc28gSSBjYW4gZmlsdGVyIHRoZW1cbiAgICAgICAgICAgICAgICAgICAgLy8gd2hlbiBwdXR0aW5nIHRoZSBvYmplY3RzIGludG8gTW9uZ29EQlxuICAgICAgICAgICAgICAgICAgICBjb25zdCBtcCA9IG5ldyBNYXAodGhpcy5jYXJ0Lm1hcChvID0+IFtvLl9pZCwgey4uLm8sIGNvdW50OiAwfV0pKTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCB7X2lkfSBvZiB0aGlzLmNhcnQpIG1wLmdldChfaWQpLmNvdW50Kys7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IEFycmF5LmZyb20obXAudmFsdWVzKCkpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdClcblxuICAgICAgICAgICAgICAgICAgICAvLyBUYXJnZXR0aW5nIHNwZWNpZmljIGZpZWxkcyBpbiBhcnJheSBmb3Igb3JkZXIgY29sbGVjdGlvblxuICAgICAgICAgICAgICAgICAgICBsZXQgY2FydElEID0gcmVzdWx0Lm1hcChhPT4oe2lkOiBhLl9pZH0pKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNhcnROYW1lID0gcmVzdWx0Lm1hcChiPT4oe25hbWU6IGIubmFtZX0pKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNhcnRTcGFjZXMgPSByZXN1bHQubWFwKGM9Pih7c3BhY2VzOiBjLmNvdW50fSkpO1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCBjdXJyZW50RGF0ZSA9IG5ldyBEYXRlKCkudG9KU09OKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gQ3JlYXRpbmcgYW4gb2JqZWN0IHRvIHNlbmQgdG8gdGhlIGRhdGFiYXNlXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld09yZGVyID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tZXJfbmFtZTogdGhpcy5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tZXJfbnVtYmVyOiB0aGlzLnBob25lLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvZHVjdF9wdXJjaGFzZWQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXNzb25faWQ6IGNhcnRJRCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXNzb25fbmFtZTogY2FydE5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BhY2VzX2JvdWdodDogY2FydFNwYWNlcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRlOiBjdXJyZW50RGF0ZVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cobmV3T3JkZXIpO1xuXG4gICAgICAgICAgICAgICAgICAgIGZldGNoKCdodHRwczovL2N3Mi1zZXJ2ZXIuaGVyb2t1YXBwLmNvbS9jb2xsZWN0aW9uL29yZGVycycsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnIDogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkobmV3T3JkZXIpXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2VKU09OID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTdWNjZXNzOicsIHJlc3BvbnNlSlNPTilcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2NsZWFyQ2FydCcpXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBhbGVydChcIlN1Y2Nlc3NmdWxseSBDaGVja2VkIE91dCFcIik7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9ICAgICAgIFxuICAgIH1cbjwvc2NyaXB0PlxuIiwiPHRlbXBsYXRlPlxuICAgIDxTdGFja0xheW91dD5cbiAgICAgICAgPExhYmVsIGNsYXNzPVwiaDIgdGV4dC1jZW50ZXJcIiB0ZXh0PVwiTGVzc29uc1wiIC8+XG4gICAgICAgIDxMYWJlbCBjbGFzcz1cImgyIHRleHQtY2VudGVyXCIgdGV4dD1cIlRhcCBhIHByb2R1Y3QgdG8gYWRkIGl0IHRvIHRoZSBjYXJ0XCIgLz5cbiAgICAgICAgPExpc3RWaWV3IGZvcj0nbGVzc29uIGluIGxlc3NvbnMnIEBpdGVtVGFwPSdvbkl0ZW1UYXAnPlxuICAgICAgICAgICAgPHYtdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgPFN0YWNrTGF5b3V0PlxuICAgICAgICAgICAgICAgICAgICA8SW1hZ2UgOnNyYz0nbGVzc29uLmltYWdlJyAvPlxuICAgICAgICAgICAgICAgICAgICA8TGFiZWwgOnRleHQ9J2xlc3Nvbi5uYW1lJyAvPlxuICAgICAgICAgICAgICAgICAgICA8TGFiZWwgOnRleHQ9J2xlc3Nvbi5sb2NhdGlvbicgLz5cbiAgICAgICAgICAgICAgICAgICAgPExhYmVsIDp0ZXh0PVwiYMKjJHtsZXNzb24ucHJpY2V9YFwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxMYWJlbCA6dGV4dD1cImBBdmFpbGFibGU6ICR7bGVzc29uLnNwYWNlc31gXCIgLz5cbiAgICAgICAgICAgICAgICA8L1N0YWNrTGF5b3V0PlxuICAgICAgICAgICAgPC92LXRlbXBsYXRlPlxuICAgICAgICA8L0xpc3RWaWV3PlxuICAgIDwvU3RhY2tMYXlvdXQ+XG48L3RlbXBsYXRlPlxuXG5cbjxzY3JpcHQ+XG4gICAgZXhwb3J0IGRlZmF1bHQgIHtcbiAgICAgICAgZGF0YSgpIHtcbiAgICAgICAgICAgIHJldHVybiAge1xuICAgICAgICAgICAgICAgIGxlc3NvbnM6IHt9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9LFxuICAgICAgICBtZXRob2RzOiAgICB7XG4gICAgICAgICAgICBvbkl0ZW1UYXAoZXZlbnQpICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRlbWl0KCdhZGRMZXNzb24nLCBldmVudC5pdGVtKTtcbiAgICAgICAgICAgICAgICAvLyBhbGVydChldmVudC5pdGVtLm5hbWUpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXG4gICAgICAgIH0sXG4gICAgICAgIGNyZWF0ZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZmV0Y2goJ2h0dHBzOi8vY3cyLXNlcnZlci5oZXJva3VhcHAuY29tL2NvbGxlY3Rpb24vcHJvZHVjdHMnLCB7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnIDogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSgpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+ICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxlc3NvbnMgPSBkYXRhO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICB9XG48L3NjcmlwdD5cbiIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJQYWdlXCIsXG4gICAgW1xuICAgICAgX2MoXCJBY3Rpb25CYXJcIiwgeyBhdHRyczogeyB0aXRsZTogXCJlU2Nob29sIC0gQ291cnNlcyBTaG9wXCIgfSB9KSxcbiAgICAgIF9jKFwiTGFiZWxcIiwge1xuICAgICAgICBzdGF0aWNDbGFzczogXCJoMiB0ZXh0LWNlbnRlclwiLFxuICAgICAgICBhdHRyczogeyB0ZXh0OiBcIldlbGNvbWUgdG8gdGhlIGVTY2hvb2wgQ291cnNlcyBTaG9wXCIgfVxuICAgICAgfSksXG4gICAgICBfYyhcbiAgICAgICAgXCJUYWJWaWV3XCIsXG4gICAgICAgIHsgYXR0cnM6IHsgYW5kcm9pZFRhYnNQb3NpdGlvbjogXCJib3R0b21cIiB9IH0sXG4gICAgICAgIFtcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwiVGFiVmlld0l0ZW1cIixcbiAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiaDJcIiwgYXR0cnM6IHsgdGl0bGU6IFwiTGVzc29uc1wiIH0gfSxcbiAgICAgICAgICAgIFtfYyhcIkxlc3NvblwiLCB7IG9uOiB7IGFkZExlc3NvbjogX3ZtLmFkZFRvQ2FydCB9IH0pXSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApLFxuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJUYWJWaWV3SXRlbVwiLFxuICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJoMlwiLCBhdHRyczogeyB0aXRsZTogXCJDaGVja291dFwiIH0gfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJTdGFja0xheW91dFwiLFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF9jKFwiQ2hlY2tvdXRcIiwge1xuICAgICAgICAgICAgICAgICAgICBhdHRyczogeyBjYXJ0OiBfdm0uY2FydCB9LFxuICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZUl0ZW06IF92bS5yZW1vdmVMZXNzb24sXG4gICAgICAgICAgICAgICAgICAgICAgY2xlYXJDYXJ0OiBfdm0ucmVmcmVzaENhcnRcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApXG4gICAgICAgIF0sXG4gICAgICAgIDFcbiAgICAgIClcbiAgICBdLFxuICAgIDFcbiAgKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJTdGFja0xheW91dFwiLFxuICAgIFtcbiAgICAgIF9jKFwiTGFiZWxcIiwge1xuICAgICAgICBzdGF0aWNDbGFzczogXCJoMiB0ZXh0LWNlbnRlclwiLFxuICAgICAgICBhdHRyczogeyB0ZXh0OiBcIlNob3BwaW5nIENhcnRcIiB9XG4gICAgICB9KSxcbiAgICAgIF9jKFwiTGFiZWxcIiwge1xuICAgICAgICBzdGF0aWNDbGFzczogXCJoMiB0ZXh0LWNlbnRlclwiLFxuICAgICAgICBhdHRyczogeyB0ZXh0OiBcIlRhcCBhIHByb2R1Y3QgdG8gcmVtb3ZlIGl0IGZyb20gdGhlIGNhcnRcIiB9XG4gICAgICB9KSxcbiAgICAgIF9jKFxuICAgICAgICBcIkxpc3RWaWV3XCIsXG4gICAgICAgIHtcbiAgICAgICAgICBhdHRyczogeyBpdGVtczogX3ZtLmNhcnQsIFwiK2FsaWFzXCI6IFwibGVzc29uXCIgfSxcbiAgICAgICAgICBvbjogeyBpdGVtVGFwOiBfdm0ub25JdGVtVGFwIH1cbiAgICAgICAgfSxcbiAgICAgICAgW1xuICAgICAgICAgIF9jKFwidi10ZW1wbGF0ZVwiLCB7XG4gICAgICAgICAgICBzY29wZWRTbG90czogX3ZtLl91KFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGtleTogXCJkZWZhdWx0XCIsXG4gICAgICAgICAgICAgICAgZm46IGZ1bmN0aW9uKHJlZikge1xuICAgICAgICAgICAgICAgICAgdmFyIGxlc3NvbiA9IHJlZi5sZXNzb25cbiAgICAgICAgICAgICAgICAgIHZhciAkaW5kZXggPSByZWYuJGluZGV4XG4gICAgICAgICAgICAgICAgICB2YXIgJGV2ZW4gPSByZWYuJGV2ZW5cbiAgICAgICAgICAgICAgICAgIHZhciAkb2RkID0gcmVmLiRvZGRcbiAgICAgICAgICAgICAgICAgIHJldHVybiBfYyhcbiAgICAgICAgICAgICAgICAgICAgXCJTdGFja0xheW91dFwiLFxuICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgX2MoXCJMYWJlbFwiLCB7IGF0dHJzOiB7IHRleHQ6IGxlc3Nvbi5uYW1lIH0gfSksXG4gICAgICAgICAgICAgICAgICAgICAgX2MoXCJMYWJlbFwiLCB7IGF0dHJzOiB7IHRleHQ6IFwiwqNcIiArIGxlc3Nvbi5wcmljZSB9IH0pXG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF0pXG4gICAgICAgICAgfSlcbiAgICAgICAgXSxcbiAgICAgICAgMVxuICAgICAgKSxcbiAgICAgIF9jKFwiVGV4dEZpZWxkXCIsIHtcbiAgICAgICAgYXR0cnM6IHsgaGludDogXCJOYW1lXCIgfSxcbiAgICAgICAgbW9kZWw6IHtcbiAgICAgICAgICB2YWx1ZTogX3ZtLm5hbWUsXG4gICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgX3ZtLm5hbWUgPSAkZXZlbnQub2JqZWN0W1widGV4dFwiXVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZXhwcmVzc2lvbjogXCJuYW1lXCJcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgICBfYyhcIlRleHRGaWVsZFwiLCB7XG4gICAgICAgIGF0dHJzOiB7IGhpbnQ6IFwiUGhvbmVcIiB9LFxuICAgICAgICBtb2RlbDoge1xuICAgICAgICAgIHZhbHVlOiBfdm0ucGhvbmUsXG4gICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgX3ZtLnBob25lID0gX3ZtLl9uKCRldmVudC5vYmplY3RbXCJ0ZXh0XCJdKVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZXhwcmVzc2lvbjogXCJwaG9uZVwiXG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICAgX2MoXCJCdXR0b25cIiwge1xuICAgICAgICBhdHRyczogeyB0ZXh0OiBcIkNoZWNrb3V0XCIgfSxcbiAgICAgICAgb246IHsgdGFwOiBfdm0uY2hlY2tvdXRTdWJtaXQgfVxuICAgICAgfSlcbiAgICBdLFxuICAgIDFcbiAgKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJTdGFja0xheW91dFwiLFxuICAgIFtcbiAgICAgIF9jKFwiTGFiZWxcIiwge1xuICAgICAgICBzdGF0aWNDbGFzczogXCJoMiB0ZXh0LWNlbnRlclwiLFxuICAgICAgICBhdHRyczogeyB0ZXh0OiBcIkxlc3NvbnNcIiB9XG4gICAgICB9KSxcbiAgICAgIF9jKFwiTGFiZWxcIiwge1xuICAgICAgICBzdGF0aWNDbGFzczogXCJoMiB0ZXh0LWNlbnRlclwiLFxuICAgICAgICBhdHRyczogeyB0ZXh0OiBcIlRhcCBhIHByb2R1Y3QgdG8gYWRkIGl0IHRvIHRoZSBjYXJ0XCIgfVxuICAgICAgfSksXG4gICAgICBfYyhcbiAgICAgICAgXCJMaXN0Vmlld1wiLFxuICAgICAgICB7XG4gICAgICAgICAgYXR0cnM6IHsgaXRlbXM6IF92bS5sZXNzb25zLCBcIithbGlhc1wiOiBcImxlc3NvblwiIH0sXG4gICAgICAgICAgb246IHsgaXRlbVRhcDogX3ZtLm9uSXRlbVRhcCB9XG4gICAgICAgIH0sXG4gICAgICAgIFtcbiAgICAgICAgICBfYyhcInYtdGVtcGxhdGVcIiwge1xuICAgICAgICAgICAgc2NvcGVkU2xvdHM6IF92bS5fdShbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBrZXk6IFwiZGVmYXVsdFwiLFxuICAgICAgICAgICAgICAgIGZuOiBmdW5jdGlvbihyZWYpIHtcbiAgICAgICAgICAgICAgICAgIHZhciBsZXNzb24gPSByZWYubGVzc29uXG4gICAgICAgICAgICAgICAgICB2YXIgJGluZGV4ID0gcmVmLiRpbmRleFxuICAgICAgICAgICAgICAgICAgdmFyICRldmVuID0gcmVmLiRldmVuXG4gICAgICAgICAgICAgICAgICB2YXIgJG9kZCA9IHJlZi4kb2RkXG4gICAgICAgICAgICAgICAgICByZXR1cm4gX2MoXG4gICAgICAgICAgICAgICAgICAgIFwiU3RhY2tMYXlvdXRcIixcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgIF9jKFwiSW1hZ2VcIiwgeyBhdHRyczogeyBzcmM6IGxlc3Nvbi5pbWFnZSB9IH0pLFxuICAgICAgICAgICAgICAgICAgICAgIF9jKFwiTGFiZWxcIiwgeyBhdHRyczogeyB0ZXh0OiBsZXNzb24ubmFtZSB9IH0pLFxuICAgICAgICAgICAgICAgICAgICAgIF9jKFwiTGFiZWxcIiwgeyBhdHRyczogeyB0ZXh0OiBsZXNzb24ubG9jYXRpb24gfSB9KSxcbiAgICAgICAgICAgICAgICAgICAgICBfYyhcIkxhYmVsXCIsIHsgYXR0cnM6IHsgdGV4dDogXCLCo1wiICsgbGVzc29uLnByaWNlIH0gfSksXG4gICAgICAgICAgICAgICAgICAgICAgX2MoXCJMYWJlbFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyB0ZXh0OiBcIkF2YWlsYWJsZTogXCIgKyBsZXNzb24uc3BhY2VzIH1cbiAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdKVxuICAgICAgICAgIH0pXG4gICAgICAgIF0sXG4gICAgICAgIDFcbiAgICAgIClcbiAgICBdLFxuICAgIDFcbiAgKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsInZhciBtYXAgPSB7XG5cdFwiLi9hcHAuY3NzXCI6IFwiLi9hcHAuY3NzXCJcbn07XG5cblxuZnVuY3Rpb24gd2VicGFja0NvbnRleHQocmVxKSB7XG5cdHZhciBpZCA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpO1xuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhpZCk7XG59XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSB7XG5cdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8obWFwLCByZXEpKSB7XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdHJldHVybiBtYXBbcmVxXTtcbn1cbndlYnBhY2tDb250ZXh0LmtleXMgPSBmdW5jdGlvbiB3ZWJwYWNrQ29udGV4dEtleXMoKSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyhtYXApO1xufTtcbndlYnBhY2tDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmU7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tDb250ZXh0O1xud2VicGFja0NvbnRleHQuaWQgPSBcIi4vIHN5bmMgXlxcXFwuXFxcXC9hcHBcXFxcLihjc3N8c2Nzc3xsZXNzfHNhc3MpJFwiOyIsInZhciBtYXAgPSB7XG5cdFwiLi9hcHAuY3NzXCI6IFwiLi9hcHAuY3NzXCIsXG5cdFwiLi9hcHAuanNcIjogXCIuL2FwcC5qc1wiXG59O1xuXG5cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0KHJlcSkge1xuXHR2YXIgaWQgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKTtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oaWQpO1xufVxuZnVuY3Rpb24gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkge1xuXHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1hcCwgcmVxKSkge1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRyZXR1cm4gbWFwW3JlcV07XG59XG53ZWJwYWNrQ29udGV4dC5rZXlzID0gZnVuY3Rpb24gd2VicGFja0NvbnRleHRLZXlzKCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMobWFwKTtcbn07XG53ZWJwYWNrQ29udGV4dC5yZXNvbHZlID0gd2VicGFja0NvbnRleHRSZXNvbHZlO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrQ29udGV4dDtcbndlYnBhY2tDb250ZXh0LmlkID0gXCIuLyBzeW5jIHJlY3Vyc2l2ZSAoPzwhXFxcXGJBcHBfUmVzb3VyY2VzXFxcXGIuKikoPzwhXFxcXC5cXFxcL1xcXFxidGVzdHNcXFxcYlxcXFwvLio/KVxcXFwuKHhtbHxjc3N8anN8KD88IVxcXFwuZFxcXFwuKXRzfCg/PCFcXFxcYl9bXFxcXHctXSpcXFxcLilzY3NzKSRcIjsiLCJnbG9iYWwucmVnaXN0ZXJNb2R1bGUoXCJ+QG5hdGl2ZXNjcmlwdC90aGVtZS9jc3MvY29yZS5jc3NcIiwgKCkgPT4gcmVxdWlyZShcIiFAbmF0aXZlc2NyaXB0L3dlYnBhY2svaGVscGVycy9jc3MyanNvbi1sb2FkZXI/dXNlRm9ySW1wb3J0cyFAbmF0aXZlc2NyaXB0L3RoZW1lL2Nzcy9jb3JlLmNzc1wiKSk7XG5nbG9iYWwucmVnaXN0ZXJNb2R1bGUoXCJAbmF0aXZlc2NyaXB0L3RoZW1lL2Nzcy9jb3JlLmNzc1wiLCAoKSA9PiByZXF1aXJlKFwiIUBuYXRpdmVzY3JpcHQvd2VicGFjay9oZWxwZXJzL2NzczJqc29uLWxvYWRlcj91c2VGb3JJbXBvcnRzIUBuYXRpdmVzY3JpcHQvdGhlbWUvY3NzL2NvcmUuY3NzXCIpKTtcbmdsb2JhbC5yZWdpc3Rlck1vZHVsZShcIn5AbmF0aXZlc2NyaXB0L3RoZW1lL2Nzcy9saW1lLmNzc1wiLCAoKSA9PiByZXF1aXJlKFwiIUBuYXRpdmVzY3JpcHQvd2VicGFjay9oZWxwZXJzL2NzczJqc29uLWxvYWRlcj91c2VGb3JJbXBvcnRzIUBuYXRpdmVzY3JpcHQvdGhlbWUvY3NzL2xpbWUuY3NzXCIpKTtcbmdsb2JhbC5yZWdpc3Rlck1vZHVsZShcIkBuYXRpdmVzY3JpcHQvdGhlbWUvY3NzL2xpbWUuY3NzXCIsICgpID0+IHJlcXVpcmUoXCIhQG5hdGl2ZXNjcmlwdC93ZWJwYWNrL2hlbHBlcnMvY3NzMmpzb24tbG9hZGVyP3VzZUZvckltcG9ydHMhQG5hdGl2ZXNjcmlwdC90aGVtZS9jc3MvbGltZS5jc3NcIikpO21vZHVsZS5leHBvcnRzID0ge1widHlwZVwiOlwic3R5bGVzaGVldFwiLFwic3R5bGVzaGVldFwiOntcInJ1bGVzXCI6W3tcInR5cGVcIjpcImltcG9ydFwiLFwiaW1wb3J0XCI6XCInfkBuYXRpdmVzY3JpcHQvdGhlbWUvY3NzL2NvcmUuY3NzJ1wifSx7XCJ0eXBlXCI6XCJpbXBvcnRcIixcImltcG9ydFwiOlwiJ35AbmF0aXZlc2NyaXB0L3RoZW1lL2Nzcy9saW1lLmNzcydcIn0se1widHlwZVwiOlwicnVsZVwiLFwic2VsZWN0b3JzXCI6W1wiLmJ0blwiXSxcImRlY2xhcmF0aW9uc1wiOlt7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcImZvbnQtc2l6ZVwiLFwidmFsdWVcIjpcIjE4XCJ9XX1dLFwicGFyc2luZ0Vycm9yc1wiOltdfX07O1xuICAgIGlmIChtb2R1bGUuaG90KSB7XG4gICAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KCk7XG4gICAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZSgoKSA9PiB7XG4gICAgICAgICAgICBnbG9iYWwuaG1yUmVmcmVzaCh7IHR5cGU6ICdzdHlsZScsIHBhdGg6ICcuL2FwcC5jc3MnIH0pO1xuICAgICAgICB9KVxuICAgIH1cbiIsImltcG9ydCBWdWUgZnJvbSAnbmF0aXZlc2NyaXB0LXZ1ZSc7XG5cbmltcG9ydCBlU2Nob29sIGZyb20gJy4vY29tcG9uZW50cy9BcHAnO1xuXG4vLyBVbmNvbW1tZW50IHRoZSBmb2xsb3dpbmcgdG8gc2VlIE5hdGl2ZVNjcmlwdC1WdWUgb3V0cHV0IGxvZ3Ncbi8vIFZ1ZS5jb25maWcuc2lsZW50ID0gZmFsc2U7XG5cbm5ldyBWdWUoe1xuXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPEZyYW1lPlxuICAgICAgICAgICAgPGVTY2hvb2wgLz5cbiAgICAgICAgPC9GcmFtZT5gLFxuXG4gICAgY29tcG9uZW50czoge1xuICAgICAgICBlU2Nob29sXG4gICAgfVxufSkuJHN0YXJ0KCk7IiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9BcHAudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTQ1YmE1ZWQ0JlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL0FwcC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL0FwcC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBudWxsLFxuICBudWxsXG4gIFxuKVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkge1xuICB2YXIgYXBpID0gcmVxdWlyZShcIi9Vc2Vycy9OdXIvTUVHQXN5bmMvVW5pIFdvcmsvVGhpcmQgWWVhci9XZWItQmFzZWQgTW9iaWxlIEFwcCBEZXZlbG9wbWVudC9DVzMvUFdBL25vZGVfbW9kdWxlcy92dWUtaG90LXJlbG9hZC1hcGkvZGlzdC9pbmRleC5qc1wiKVxuICBhcGkuaW5zdGFsbChyZXF1aXJlKCd2dWUnKSlcbiAgaWYgKGFwaS5jb21wYXRpYmxlKSB7XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICAgIGlmICghYXBpLmlzUmVjb3JkZWQoJzQ1YmE1ZWQ0JykpIHtcbiAgICAgIGFwaS5jcmVhdGVSZWNvcmQoJzQ1YmE1ZWQ0JywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZWxvYWQoJzQ1YmE1ZWQ0JywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfVxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiLi9BcHAudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTQ1YmE1ZWQ0JlwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBhcGkucmVyZW5kZXIoJzQ1YmE1ZWQ0Jywge1xuICAgICAgICByZW5kZXI6IHJlbmRlcixcbiAgICAgICAgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnNcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJjb21wb25lbnRzL0FwcC52dWVcIlxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vQXBwLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0FwcC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy90ZW1wbGF0ZUxvYWRlci5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vQXBwLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD00NWJhNWVkNCZcIiIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0gZnJvbSBcIi4vQ2hlY2tvdXQudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTAxMGI4MmExJlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL0NoZWNrb3V0LnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vQ2hlY2tvdXQudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgbnVsbCxcbiAgbnVsbFxuICBcbilcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHtcbiAgdmFyIGFwaSA9IHJlcXVpcmUoXCIvVXNlcnMvTnVyL01FR0FzeW5jL1VuaSBXb3JrL1RoaXJkIFllYXIvV2ViLUJhc2VkIE1vYmlsZSBBcHAgRGV2ZWxvcG1lbnQvQ1czL1BXQS9ub2RlX21vZHVsZXMvdnVlLWhvdC1yZWxvYWQtYXBpL2Rpc3QvaW5kZXguanNcIilcbiAgYXBpLmluc3RhbGwocmVxdWlyZSgndnVlJykpXG4gIGlmIChhcGkuY29tcGF0aWJsZSkge1xuICAgIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgICBpZiAoIWFwaS5pc1JlY29yZGVkKCcwMTBiODJhMScpKSB7XG4gICAgICBhcGkuY3JlYXRlUmVjb3JkKCcwMTBiODJhMScsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVsb2FkKCcwMTBiODJhMScsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH1cbiAgICBtb2R1bGUuaG90LmFjY2VwdChcIi4vQ2hlY2tvdXQudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTAxMGI4MmExJlwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBhcGkucmVyZW5kZXIoJzAxMGI4MmExJywge1xuICAgICAgICByZW5kZXI6IHJlbmRlcixcbiAgICAgICAgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnNcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJjb21wb25lbnRzL0NoZWNrb3V0LnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9DaGVja291dC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9DaGVja291dC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy90ZW1wbGF0ZUxvYWRlci5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vQ2hlY2tvdXQudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTAxMGI4MmExJlwiIiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9MZXNzb25zTGlzdC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9Njk5NDcyMjQmXCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vTGVzc29uc0xpc3QudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9MZXNzb25zTGlzdC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBudWxsLFxuICBudWxsXG4gIFxuKVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkge1xuICB2YXIgYXBpID0gcmVxdWlyZShcIi9Vc2Vycy9OdXIvTUVHQXN5bmMvVW5pIFdvcmsvVGhpcmQgWWVhci9XZWItQmFzZWQgTW9iaWxlIEFwcCBEZXZlbG9wbWVudC9DVzMvUFdBL25vZGVfbW9kdWxlcy92dWUtaG90LXJlbG9hZC1hcGkvZGlzdC9pbmRleC5qc1wiKVxuICBhcGkuaW5zdGFsbChyZXF1aXJlKCd2dWUnKSlcbiAgaWYgKGFwaS5jb21wYXRpYmxlKSB7XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICAgIGlmICghYXBpLmlzUmVjb3JkZWQoJzY5OTQ3MjI0JykpIHtcbiAgICAgIGFwaS5jcmVhdGVSZWNvcmQoJzY5OTQ3MjI0JywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZWxvYWQoJzY5OTQ3MjI0JywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfVxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiLi9MZXNzb25zTGlzdC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9Njk5NDcyMjQmXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGFwaS5yZXJlbmRlcignNjk5NDcyMjQnLCB7XG4gICAgICAgIHJlbmRlcjogcmVuZGVyLFxuICAgICAgICBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZuc1xuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcImNvbXBvbmVudHMvTGVzc29uc0xpc3QudnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0xlc3NvbnNMaXN0LnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0xlc3NvbnNMaXN0LnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsImV4cG9ydCAqIGZyb20gXCItIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3RlbXBsYXRlTG9hZGVyLmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9MZXNzb25zTGlzdC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9Njk5NDcyMjQmXCIiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAbmF0aXZlc2NyaXB0L2NvcmVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQG5hdGl2ZXNjcmlwdC9jb3JlL2FwcGxpY2F0aW9uXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBuYXRpdmVzY3JpcHQvY29yZS9idW5kbGUtZW50cnktcG9pbnRzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBuYXRpdmVzY3JpcHQvY29yZS9kYXRhL29ic2VydmFibGUtYXJyYXlcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQG5hdGl2ZXNjcmlwdC9jb3JlL3BsYXRmb3JtXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBuYXRpdmVzY3JpcHQvY29yZS91aS9jb250ZW50LXZpZXdcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQG5hdGl2ZXNjcmlwdC9jb3JlL3VpL2NvcmUvdmlld1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAbmF0aXZlc2NyaXB0L2NvcmUvdWkvZnJhbWVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQG5hdGl2ZXNjcmlwdC9jb3JlL3VpL2ZyYW1lL2FjdGl2aXR5XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBuYXRpdmVzY3JpcHQvY29yZS91aS9sYXlvdXRzL2xheW91dC1iYXNlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBuYXRpdmVzY3JpcHQvY29yZS91aS9zdHlsaW5nL3N0eWxlLXNjb3BlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBuYXRpdmVzY3JpcHQvY29yZS91dGlscy90eXBlc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAbmF0aXZlc2NyaXB0L2NvcmUveG1sXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC12dWVcIik7Il0sInNvdXJjZVJvb3QiOiIifQ==