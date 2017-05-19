/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
    youtubeAPIKey:'AIzaSyADJge23HD92a0iBt4AeU8QH9puXLjG5Bk',
    maxResults:15,
    widthItem:345
});


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class GAPIclient {
    constructor(APIKey, maxResults) {
        this.address = 'https://www.googleapis.com/youtube/v3/search?key=' + APIKey + '&type=video&part=snippet&maxResults=' + maxResults + '&q=';
    }
   
    search(query, nextPageToken) {
        let address = this.address;
        let token = "";
        if (nextPageToken)
            token = "&pageToken="+ nextPageToken;
        return new Promise(function (resolve, reject) {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", address + query + token, true);
            xhr.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    resolve(this.response);
                }
                else {
                    reject(this.status);
                }
            };
            xhr.onerror = function () {
                reject(this.status);
            };
            xhr.send();
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = GAPIclient;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Item{
    constructor(youtubeItem){
        this.title = youtubeItem.snippet.title;
        this.preview = youtubeItem.snippet.thumbnails.high.url;
        this.description = youtubeItem.snippet.description;
        this.author = youtubeItem.snippet.channelTitle;
        this.publishDate = new Date(youtubeItem.snippet.publishedAt).toDateString();
        this.link = 'https://www.youtube.com/watch?v='+ youtubeItem.id.videoId;
        this.videoId = youtubeItem.id.videoId;
        this.next = youtubeItem.nextPageToken;
    }
    toNode(){
        let item = document.createElement("div");
            item.className = 'item';

            let itemLink =  document.createElement("a");
            itemLink.href = this.link;
            itemLink.className = 'item__link';

            let itemTitle = document.createElement("span");
            itemTitle.className = 'item__title';
            itemTitle.innerHTML = this.title;

            let itemPreview = document.createElement("img");
            itemPreview.src = this.preview;
            itemPreview.className = 'item__preview';
            itemLink.appendChild(itemPreview);
            itemLink.appendChild(itemTitle);
            item.appendChild(itemLink);

            let itemAuthor = document.createElement("span");
            itemAuthor.className = 'item__author';
            itemAuthor.innerHTML = this.author;
            item.appendChild(itemAuthor);

            let itemDescription = document.createElement("p");
            itemDescription.className = 'item__description';
            itemDescription.innerHTML = this.description;
            item.appendChild(itemDescription);
            
            let itemDate = document.createElement("span");
            itemDate.className = 'item__date';
          
            itemDate.innerHTML = '<i class="fa fa-calendar"></i> '+ this.publishDate;
            item.appendChild(itemDate);
            return item;
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Item;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__item__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__gAPIclient__ = __webpack_require__(1);




class App{
     constructor(){
        this._gAPIclient = new __WEBPACK_IMPORTED_MODULE_2__gAPIclient__["a" /* default */](__WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].youtubeAPIKey, __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].maxResults);
        this._itemCollection = [];
        this._searchViewport = document.getElementById('searchViewport');
        this._searchFrame = document.getElementById('searchFrame');
        this._resultNode = document.getElementById('searchResult');
        this._queryNode = document.getElementById('searchQuery');
        this._paginationNode = document.getElementById('searchPagination')
        this._shift = 0;
        this._pageCur = document.getElementById('pageCur');
        this._nextPage = document.getElementById('nextPage');
        this._prevPage = document.getElementById('prevPage');
        this._toStart = document.getElementById('toStart');
        this._cur = 1;
        this._widthVisible = __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].widthItem * __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].maxResults;
    }
    clear(){
        this._itemCollection = [];
        this._resultNode.innerHTML = '';
        this._searchFrame.style = 'transform: translate3d( 0px, 0px, 0px); transition-duration: 0ms;'
        this._cur = 1;
        this._pageCur.innerHTML = this._cur;
        this.setTitles();
        this._prevPage.style= 'visibility:hidden';
        this._toStart.style= 'visibility:hidden';
    }
    setWidth(){
        this._resultNode.style = "width:" + this._widthVisible +"px";
    }
    setViewport(){
         if (window.matchMedia("(max-width: 768px)").matches) {
            this._searchViewport.style = 'width:317px';
        } else if (window.matchMedia("(max-width: 1135px)").matches) {
            this._searchViewport.style = 'width:662px';
         } else if (window.matchMedia("(max-width: 1500px)").matches) {
            this._searchViewport.style = 'width:1008px';
         } else if (window.matchMedia("(max-width: 1710px)").matches) {
            this._searchViewport.style = 'width:1352px';
         } else if (window.matchMedia("(min-width: 1711px)").matches) {
            this._searchViewport.style = 'width:1697px';
         }
    }
     start(){
        this.setViewport();
        let bindedSearch = this.search.bind(this);
        document.getElementById('searchSubmit').onclick = bindedSearch;
        this._nextPage.onclick = this.nextPage.bind(this);
        this._prevPage.onclick = this.prevPage.bind(this);
        this._toStart.onclick = this.toStart.bind(this);
        window.onresize = this.setViewport.bind(this);
     }
     
     search(){
         this.clear();
         let query = this._queryNode.value;
         this._gAPIclient.search(query).then((data) => { 
             this._nextPageToken = data.nextPageToken;
             let parsed = JSON.parse(data);
             for (let i in parsed.items){
                 let newItem = new __WEBPACK_IMPORTED_MODULE_1__item__["a" /* default */](parsed.items[i]);
                 this._itemCollection.push(newItem);
                 this._resultNode.appendChild(newItem.toNode());
                 this._widthVisible = this._widthVisible * 2;
                 this.setWidth();
             }
             this._paginationNode.style = 'display:flex';
         }, console.error);
        
     }
     setTitles(){
        this._prevPage.title = this._cur - 1;
        this._nextPage.title = this._cur + 1;
     }
     nextPage(){
        let numPerPage = this._widthVisible / __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].widthItem;
        let shift = this._shift - this._searchViewport.clientWidth - 28;
        this._shift = shift;
        let numViewedPages = this._shift / numPerPage;
        this._searchFrame.style = 'transform: translate3d( ' + shift + 'px, 0px, 0px); transition-duration: 0ms;'
        this._cur = this._cur + 1;
        this._pageCur.innerHTML = this._cur;
        if (this._cur == 2){
            this._prevPage.style = 'visibility:visible';
        } else if (this._cur == 3){
            this._toStart.style = 'visibility:visible';
        }
        if (numViewedPages < 2){
            this._gAPIclient.search(this._queryNode.value, this._nextPageToken).then((data) => { 
             this._nextPageToken = data.nextPageToken;
             let parsed = JSON.parse(data);
             for (let i in parsed.items)
             {
                 let newItem = new __WEBPACK_IMPORTED_MODULE_1__item__["a" /* default */](parsed.items[i]);
                 this._itemCollection.push(newItem);
                 this._resultNode.appendChild(newItem.toNode());
             }
             this._paginationNode.style = 'display:flex';
        }, console.log);
        this.setTitles();
        }
        
     }

      prevPage(){
         let unshift = this._shift + this._searchViewport.clientWidth + 28;
         this._shift = unshift;
         this._searchFrame.style = 'transform: translate3d( ' + unshift + 'px, 0px, 0px); transition-duration: 0ms;'
         this._cur = this._cur - 1;
         this._pageCur.innerHTML = this._cur;
         if (this._cur == 1){
            this._prevPage.style = 'visibility:hidden';
        } else if (this._cur == 2){
            this._toStart.style = 'visibility:hidden';
        }
        this. setTitles();
      }
      toStart(){
          this._searchFrame.style = 'transform: translate3d( 0px, 0px, 0px); transition-duration: 0ms;'
          this._cur = 1;
          this._pageCur.innerHTML = this._cur;
          this._prevPage.style = 'visibility:hidden';
          this._toStart.style = 'visibility:hidden';
    }
}

window.app = new App();


/***/ })
/******/ ]);