webpackHotUpdate("bundle",{

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
    return {
      name: "",
      phone: ""
    };
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
      if (this.name == "" || this.phone == "") {
        alert("Please fill in both fields");
        return;
      } else {
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

  }
});

/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vY29tcG9uZW50cy9DaGVja291dC52dWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW1CQTtBQUNBLGlCQURBOztBQUVBO0FBQ0E7QUFDQSxjQURBO0FBRUE7QUFGQTtBQUlBLEdBUEE7O0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUpBOztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FIQSxNQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTs7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUNBO0FBRUEsNEJBUEEsQ0FTQTs7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFFQSw4Q0FkQSxDQWdCQTs7QUFDQTtBQUNBLGtDQURBO0FBRUEscUNBRkE7QUFHQTtBQUNBLDZCQURBO0FBRUEsaUNBRkE7QUFHQTtBQUhBLFdBSEE7QUFRQTtBQVJBO0FBV0E7QUFFQTtBQUNBLHdCQURBO0FBRUE7QUFDQTtBQURBLFdBRkE7QUFLQTtBQUxBLFdBT0EsSUFQQSxDQU9BLDJCQVBBLEVBUUEsSUFSQSxDQVFBO0FBQ0E7QUFDQTtBQUNBLFNBWEE7QUFZQTtBQUNBO0FBQ0E7O0FBekRBO0FBUkEsRyIsImZpbGUiOiJidW5kbGUuYTc5MTc1MTA3Nzk1NmM1MWMzNjEuaG90LXVwZGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIjx0ZW1wbGF0ZT5cbiAgICA8U3RhY2tMYXlvdXQ+XG4gICAgICAgIDxMYWJlbCBjbGFzcz1cImgyIHRleHQtY2VudGVyXCIgdGV4dD1cIlNob3BwaW5nIENhcnRcIiAvPlxuICAgICAgICA8TGFiZWwgY2xhc3M9XCJoMiB0ZXh0LWNlbnRlclwiIHRleHQ9XCJUYXAgYSBwcm9kdWN0IHRvIHJlbW92ZSBpdCBmcm9tIHRoZSBjYXJ0XCIgLz5cbiAgICAgICAgPExpc3RWaWV3IGZvcj1cImxlc3NvbiBpbiBjYXJ0XCIgQGl0ZW1UYXA9J29uSXRlbVRhcCc+XG4gICAgICAgICAgICA8di10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICA8U3RhY2tMYXlvdXQ+XG4gICAgICAgICAgICAgICAgICAgIDxMYWJlbCA6dGV4dD1cImxlc3Nvbi5uYW1lXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPExhYmVsIDp0ZXh0PVwiYMKjJHtsZXNzb24ucHJpY2V9YFwiIC8+XG4gICAgICAgICAgICAgICAgPC9TdGFja0xheW91dD5cbiAgICAgICAgICAgIDwvdi10ZW1wbGF0ZT5cbiAgICAgICAgPC9MaXN0Vmlldz5cbiAgICAgICAgPFRleHRGaWVsZCBoaW50PVwiTmFtZVwiIHYtbW9kZWw9XCJuYW1lXCIgLz5cbiAgICAgICAgPFRleHRGaWVsZCBoaW50PVwiUGhvbmVcIiB2LW1vZGVsPVwicGhvbmVcIiAvPlxuICAgICAgICA8QnV0dG9uIEB0YXA9XCJjaGVja291dFN1Ym1pdFwiIHRleHQ9XCJDaGVja291dFwiIC8+XG4gICAgPC9TdGFja0xheW91dD5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG4gICAgZXhwb3J0IGRlZmF1bHQge1xuICAgICAgICBwcm9wczogWydjYXJ0J10sXG4gICAgICAgIGRhdGEoKSB7XG4gICAgICAgICAgICByZXR1cm4gIHtcbiAgICAgICAgICAgICAgICBuYW1lOiBcIlwiLFxuICAgICAgICAgICAgICAgIHBob25lOiBcIlwiXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG1ldGhvZHM6ICAgIHtcbiAgICAgICAgICAgIG9uSXRlbVRhcChldmVudCkgICAge1xuICAgICAgICAgICAgICAgIHRoaXMuJGVtaXQoJ3JlbW92ZUl0ZW0nLCBldmVudC5pdGVtKTtcbiAgICAgICAgICAgICAgICBhbGVydChcIlJlbW92ZWQgXCIgKyBldmVudC5pdGVtLm5hbWUgKyBcIiBmcm9tIGNhcnRcIilcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBjaGVja291dChldmVudCkgICB7XG4gICAgICAgICAgICAvLyAgICAgdGhpcy4kZW1pdCgnY2hlY2tvdXRTdWJtaXQnLCBldmVudC5pdGVtKTtcbiAgICAgICAgICAgIC8vIH0sXG4gICAgICAgICAgICBjaGVja291dFN1Ym1pdCgpICAgIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5uYW1lID09IFwiXCIgfHwgdGhpcy5waG9uZSA9PSBcIlwiKSAgICB7XG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwiUGxlYXNlIGZpbGwgaW4gYm90aCBmaWVsZHNcIik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSAgICB7XG4gICAgICAgICAgICAgICAgICAgIC8vIENvdW50cyBob3cgbWFueSB0aW1lcyBkdXBsaWNhdGUgSUQncyBjb21lIHVwIHNvIEkgY2FuIGZpbHRlciB0aGVtXG4gICAgICAgICAgICAgICAgICAgIC8vIHdoZW4gcHV0dGluZyB0aGUgb2JqZWN0cyBpbnRvIE1vbmdvREJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbXAgPSBuZXcgTWFwKHRoaXMuY2FydC5tYXAobyA9PiBbby5faWQsIHsuLi5vLCBjb3VudDogMH1dKSk7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3Qge19pZH0gb2YgdGhpcy5jYXJ0KSBtcC5nZXQoX2lkKS5jb3VudCsrO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBBcnJheS5mcm9tKG1wLnZhbHVlcygpKTtcblxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gVGFyZ2V0dGluZyBzcGVjaWZpYyBmaWVsZHMgaW4gYXJyYXkgZm9yIG9yZGVyIGNvbGxlY3Rpb25cbiAgICAgICAgICAgICAgICAgICAgbGV0IGNhcnRJRCA9IHJlc3VsdC5tYXAoYT0+KHtpZDogYS5faWR9KSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjYXJ0TmFtZSA9IHJlc3VsdC5tYXAoYj0+KHtuYW1lOiBiLm5hbWV9KSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjYXJ0U3BhY2VzID0gcmVzdWx0Lm1hcChjPT4oe3NwYWNlczogYy5jb3VudH0pKTtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgY3VycmVudERhdGUgPSBuZXcgRGF0ZSgpLnRvSlNPTigpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIENyZWF0aW5nIGFuIG9iamVjdCB0byBzZW5kIHRvIHRoZSBkYXRhYmFzZVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdPcmRlciA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbWVyX25hbWU6IHRoaXMubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbWVyX251bWJlcjogdGhpcy5waG9uZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2R1Y3RfcHVyY2hhc2VkOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVzc29uX2lkOiBjYXJ0SUQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVzc29uX25hbWU6IGNhcnROYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwYWNlc19ib3VnaHQ6IGNhcnRTcGFjZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZTogY3VycmVudERhdGVcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKG5ld09yZGVyKTtcblxuICAgICAgICAgICAgICAgICAgICBmZXRjaCgnaHR0cHM6Ly9jdzItc2VydmVyLmhlcm9rdWFwcC5jb20vY29sbGVjdGlvbi9vcmRlcnMnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJyA6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG5ld09yZGVyKVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlSlNPTiA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnU3VjY2VzczonLCByZXNwb25zZUpTT04pXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRlbWl0KCdjbGVhckNhcnQnKVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCJTdWNjZXNzZnVsbHkgQ2hlY2tlZCBPdXQhXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0gICAgICAgXG4gICAgfVxuPC9zY3JpcHQ+XG4iXSwic291cmNlUm9vdCI6IiJ9