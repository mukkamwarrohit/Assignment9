"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var api_1 = require("./api");
document.addEventListener('DOMContentLoaded', function () { return __awaiter(void 0, void 0, void 0, function () {
    var urlParams, productId, productDetails, product;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                urlParams = new URLSearchParams(window.location.search);
                productId = urlParams.get('id');
                productDetails = document.getElementById('product-details');
                if (!productId) return [3 /*break*/, 2];
                return [4 /*yield*/, (0, api_1.getProduct)(Number(productId))];
            case 1:
                product = _b.sent();
                productDetails.innerHTML = "\n            <div class=\"product-detail\">\n                <img src=\"".concat(product.image, "\" alt=\"").concat(product.title, "\" class=\"product-image-large\">\n                <h2>").concat(product.title, "</h2>\n                <p>").concat(product.description, "</p>\n                <h3>Price: $").concat(product.price, "</h3>\n                <button class=\"add-to-cart-button\" data-id=\"").concat(product.id, "\" data-title=\"").concat(product.title, "\" data-price=\"").concat(product.price, "\" data-image=\"").concat(product.image, "\">Add to Cart</button>\n            </div>\n        ");
                (_a = document.querySelector('.add-to-cart-button')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function (event) {
                    var target = event.target;
                    addToCart(Number(target.dataset.id), target.dataset.title || '', Number(target.dataset.price), target.dataset.image || '');
                });
                return [3 /*break*/, 3];
            case 2:
                productDetails.innerHTML = '<p>Product not found</p>';
                _b.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); });
var addToCart = function (id, title, price, image) {
    var cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push({ id: id, title: title, price: price, image: image });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart!');
};
window.addToCart = addToCart;
