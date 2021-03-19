webpackHotUpdate("bundle",{

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

/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vY29tcG9uZW50cy9BcHAudnVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBa0JBO0FBQ0E7QUFFQTtBQUNBO0FBQUE7QUFBQTtBQUFBLEdBREE7O0FBRUE7QUFDQTtBQUNBO0FBREE7QUFHQSxHQU5BOztBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUFBO0FBQUE7QUFFQTtBQUNBLHVCQURBO0FBRUE7QUFDQTtBQURBLFdBRkE7QUFLQTtBQUxBLFdBT0EsSUFQQSxDQU9BLDJCQVBBLEVBUUEsSUFSQSxDQVFBO0FBQ0E7QUFDQTtBQUNBLFNBWEE7QUFZQSxPQWxCQSxNQW1CQTtBQUNBO0FBQ0E7QUFDQSxLQXhCQTs7QUF5QkE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUFBO0FBQUE7QUFFQTtBQUNBLHVCQURBO0FBRUE7QUFDQTtBQURBLFdBRkE7QUFLQTtBQUxBLFdBT0EsSUFQQSxDQU9BLDJCQVBBLEVBUUEsSUFSQSxDQVFBO0FBQ0E7QUFDQSxTQVZBO0FBV0E7QUFDQSxLQTVDQTs7QUE2Q0E7QUFDQTtBQUNBOztBQS9DQTtBQVBBLEciLCJmaWxlIjoiYnVuZGxlLjZiNDRjZWYzYWVhZDU3NDFhMjgyLmhvdC11cGRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gICAgPFBhZ2U+XG4gICAgICAgIDxBY3Rpb25CYXIgdGl0bGU9XCJlU2Nob29sIC0gQ291cnNlcyBTaG9wXCIvPlxuICAgICAgICA8TGFiZWwgdGV4dD1cIldlbGNvbWUgdG8gdGhlIGVTY2hvb2wgQ291cnNlcyBTaG9wXCIgY2xhc3M9XCJoMiB0ZXh0LWNlbnRlclwiIC8+XG4gICAgICAgIDxUYWJWaWV3IGFuZHJvaWRUYWJzUG9zaXRpb249J2JvdHRvbSc+XG4gICAgICAgICAgICA8VGFiVmlld0l0ZW0gdGl0bGU9XCJMZXNzb25zXCIgY2xhc3M9J2gyJz5cbiAgICAgICAgICAgICAgICA8TGVzc29uIEBhZGRMZXNzb249XCJhZGRUb0NhcnRcIi8+XG4gICAgICAgICAgICA8L1RhYlZpZXdJdGVtPlxuICAgICAgICAgICAgPFRhYlZpZXdJdGVtIHRpdGxlPVwiQ2hlY2tvdXRcIiBjbGFzcz0naDInPlxuICAgICAgICAgICAgICAgIDxTdGFja0xheW91dD5cbiAgICAgICAgICAgICAgICAgICAgPENoZWNrb3V0IDpjYXJ0PSdjYXJ0JyBAcmVtb3ZlSXRlbT1cInJlbW92ZUxlc3NvblwiIEBjbGVhckNhcnQ9XCJyZWZyZXNoQ2FydFwiLz5cbiAgICAgICAgICAgICAgICA8L1N0YWNrTGF5b3V0PlxuICAgICAgICAgICAgPC9UYWJWaWV3SXRlbT5cbiAgICAgICAgPC9UYWJWaWV3PlxuICAgIDwvUGFnZT5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG4gICAgaW1wb3J0IExlc3NvbiBmcm9tICcuL0xlc3NvbnNMaXN0JztcbiAgICBpbXBvcnQgQ2hlY2tvdXQgZnJvbSAnLi9DaGVja291dCc7XG5cbiAgICBleHBvcnQgZGVmYXVsdCB7XG4gICAgICAgIGNvbXBvbmVudHM6ICAgIHsgTGVzc29uLCBDaGVja291dCB9LFxuICAgICAgICBkYXRhICgpIHtcbiAgICAgICAgICAgIHJldHVybiAge1xuICAgICAgICAgICAgICAgIGNhcnQ6IFtdLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSxcbiAgICAgICAgbWV0aG9kczogICAge1xuICAgICAgICAgICAgYWRkVG9DYXJ0KGxlc3NvbikgIHtcbiAgICAgICAgICAgICAgICBpZiAobGVzc29uLnNwYWNlcyA+IDApICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbGVzc29uLnNwYWNlcyAtPSAxO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhcnQucHVzaChsZXNzb24pO1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCB1cGRhdGVQcm9kdWN0ID0ge3NwYWNlczogbGVzc29uLnNwYWNlc307XG5cbiAgICAgICAgICAgICAgICAgICAgZmV0Y2goJ2h0dHBzOi8vY3cyLXNlcnZlci5oZXJva3VhcHAuY29tL2NvbGxlY3Rpb24vcHJvZHVjdHMvJyArIGxlc3Nvbi5faWQsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BVVCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZScgOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh1cGRhdGVQcm9kdWN0KVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQobGVzc29uLm5hbWUgKyAnIGFkZGVkIHRvIGNhcnQnKVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1N1Y2Nlc3NmdWxseSB1cGRhdGVkIHNwYWNlczonLCBkYXRhKVxuICAgICAgICAgICAgICAgICAgICB9KSAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBhbGVydChcIk5vIG1vcmUgY291cnNlcyBhdmFpbGFibGUhXCIpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlbW92ZUxlc3NvbihsZXNzb24pICB7XG4gICAgICAgICAgICAgICAgaWYgKGxlc3Nvbi5zcGFjZXMgPCAxMCkgIHtcbiAgICAgICAgICAgICAgICAgICAgbGVzc29uLnNwYWNlcyArPSAxO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhcnQuc3BsaWNlKHRoaXMuY2FydC5pbmRleE9mKGxlc3NvbiksIDEpO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgbGV0IHVwZGF0ZVByb2R1Y3QgPSB7c3BhY2VzOiBsZXNzb24uc3BhY2VzfTtcblxuICAgICAgICAgICAgICAgICAgICBmZXRjaCgnaHR0cHM6Ly9jdzItc2VydmVyLmhlcm9rdWFwcC5jb20vY29sbGVjdGlvbi9wcm9kdWN0cy8nICsgbGVzc29uLl9pZCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJyA6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHVwZGF0ZVByb2R1Y3QpXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnU3VjY2Vzc2Z1bGx5IHVwZGF0ZWQgc3BhY2VzOicsIGRhdGEpXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlZnJlc2hDYXJ0IChjbGVhckNhcnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRkYXRhLmNhcnQgPSBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG48L3NjcmlwdD5cblxuPCEtLTxzdHlsZSBzY29wZWQ+XG4uaG9tZS1wYW5lbCB7XG4gICAgdmVydGljYWwtYWxpZ246IGNlbnRlcjtcbiAgICBmb250LXNpemU6IDIwO1xuICAgIG1hcmdpbjogMTU7XG59XG5cbi5kZXNjcmlwdGlvbi1sYWJlbCB7XG4gICAgbWFyZ2luLWJvdHRvbTogMTU7XG59XG48L3N0eWxlPi0tPlxuIl0sInNvdXJjZVJvb3QiOiIifQ==