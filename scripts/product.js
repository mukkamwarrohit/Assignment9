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
    var productList, categoryDropdown, sortDropdown, loadProducts, categories;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                productList = document.getElementById('product-list');
                categoryDropdown = document.getElementById('category-filter');
                sortDropdown = document.getElementById('sort-products');
                loadProducts = function () { return __awaiter(void 0, void 0, void 0, function () {
                    var products, selectedCategory, selectedSort;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                products = [];
                                selectedCategory = categoryDropdown.value;
                                selectedSort = sortDropdown.value;
                                if (!selectedCategory) return [3 /*break*/, 2];
                                return [4 /*yield*/, (0, api_1.getProductsByCategory)(selectedCategory)];
                            case 1:
                                products = _a.sent();
                                return [3 /*break*/, 4];
                            case 2: return [4 /*yield*/, (0, api_1.getProducts)()];
                            case 3:
                                products = _a.sent();
                                _a.label = 4;
                            case 4:
                                if (selectedSort === 'price-asc') {
                                    products.sort(function (a, b) { return a.price - b.price; });
                                }
                                else if (selectedSort === 'price-desc') {
                                    products.sort(function (a, b) { return b.price - a.price; });
                                }
                                productList.innerHTML = '';
                                products.forEach(function (product) {
                                    var productElement = document.createElement('div');
                                    productElement.className = 'product';
                                    productElement.innerHTML = "\n                <img src=\"".concat(product.image, "\" alt=\"").concat(product.title, "\" class=\"product-image\">\n                <h3>").concat(product.title, "</h3>\n                <p>$").concat(product.price, "</p>\n                <button class=\"view-button\" data-id=\"").concat(product.id, "\">View</button>\n            ");
                                    productList.appendChild(productElement);
                                });
                                document.querySelectorAll('.view-button').forEach(function (button) {
                                    button.addEventListener('click', function (event) {
                                        var target = event.target;
                                        var id = Number(target.dataset.id);
                                        viewProduct(id);
                                    });
                                });
                                return [2 /*return*/];
                        }
                    });
                }); };
                categoryDropdown.addEventListener('change', loadProducts);
                sortDropdown.addEventListener('change', loadProducts);
                return [4 /*yield*/, (0, api_1.getCategories)()];
            case 1:
                categories = _a.sent();
                categoryDropdown.innerHTML = '<option value="">All Categories</option>';
                categories.forEach(function (category) {
                    var option = document.createElement('option');
                    option.value = category;
                    option.textContent = category;
                    categoryDropdown.appendChild(option);
                });
                loadProducts();
                return [2 /*return*/];
        }
    });
}); });
var viewProduct = function (id) {
    window.location.href = "product.html?id=".concat(id);
};
var placeOrder = function () {
    var cart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    localStorage.removeItem('cart');
    alert('Order placed successfully!');
    window.location.reload();
};
window.viewProduct = viewProduct;
window.placeOrder = placeOrder;
