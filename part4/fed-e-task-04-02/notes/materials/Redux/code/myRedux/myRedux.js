function createStore(reducer, preloadedState, enhancer) {
  // reducer 类型判断
  if (typeof reducer !== "function") throw new Error("redcuer必须是函数");

  if (typeof enhancer !== "undefined") {
    if (typeof enhancer !== "function") {
      throw new Error("enhancer必须是函数");
    }
    return enhancer(createStore)(reducer, preloadedState);
  }

  // 状态
  var currentState = preloadedState;
  // 订阅者
  var currentListeners = [];

  // 获取状态
  function getState() {
    return currentState;
  }

  // 用于触发action的方法
  function dispatch(action) {
    // 判断action是否是一个对象
    if (!isPlainObject(action)) throw new Error("action必须是一个对象");
    // 判断action中的type属性是否存在
    if (typeof action.type === "undefined")
      throw new Error("action对象中必须有type属性");
    // 调用reducer函数 处理状态
    currentState = reducer(currentState, action);
    // 调用订阅者 通知订阅者状态发生了改变
    for (var i = 0; i < currentListeners.length; i++) {
      var listener = currentListeners[i];
      listener();
    }
  }

  // 订阅状态的改变
  function subscribe(listener) {
    currentListeners.push(listener);
  }

  // 默认调用一次dispatch方法 存储初始状态(通过reducer函数传递的默认状态)
  dispatch({ type: "initAction" });

  return {
    getState,
    dispatch,
    subscribe,
  };
}

// 判断参数是否是对象类型
// 判断对象的当前原型对象是否和顶层原型对象相同
<<<<<<< HEAD:part4/fed-e-task-04-02/notes/materials/4-2-1-redux/code/myRedux/myRedux.js
function isPlainObject(obj) {
  if (typeof obj !== "object" || obj === null) return false;
=======
function isPlainObject (obj) {
  // 排除基本类型和null
  if (typeof obj !== 'object' || obj === null) return false;
  // 区分数组和对象（采用原型对象对比的方式）
>>>>>>> 231beb3 (Mobx6):part4/fed-e-task-04-02/notes/materials/Redux/code/myRedux/myRedux.js
  var proto = obj;
  while (Object.getPrototypeOf(proto) != null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(obj) === proto;
}

// 注册中间件
function applyMiddleware(...middlewares) {
  return function (createStore) {
    return function (reducer, preloadedState) {
      // 创建 store
      var store = createStore(reducer, preloadedState);
      // 阉割版的 store
      var middlewareAPI = {
        getState: store.getState,
        dispatch: store.dispatch,
      };
      // 调用中间件的第一层函数 传递阉割版的store对象
      var chain = middlewares.map((middleware) => middleware(middlewareAPI));
      var dispatch = compose(...chain)(store.dispatch);
      console.log('dispatch: ', dispatch);
      return {
        ...store,
        dispatch,
      };
    };
  };
}

// 结合dispatch
function compose() {
  var funcs = [...arguments];
  return function (dispatch) {
    for (var i = funcs.length - 1; i >= 0; i--) {
      dispatch = funcs[i](dispatch);
    }
    return dispatch;
  };
}

// 绑定actond的创建
function bindActionCreators(actionCreators, dispatch) {
  var boundActionCreators = {};
  for (var key in actionCreators) {
    (function (key) {
      boundActionCreators[key] = function () {
        dispatch(actionCreators[key]());
      };
    })(key);
  }
  return boundActionCreators;
}

// 合并reducers
function combineReducers(reducers) {
  // 1. 检查reducer类型 它必须是函数
  var reducerKeys = Object.keys(reducers);
  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];
    if (typeof reducers[key] !== "function")
      throw new Error("reducer必须是函数");
  }
  // 2. 调用一个一个的小的reducer 将每一个小的reducer中返回的状态存储在一个新的大的对象中
  return function (state, action) {
    var nextState = {};
    for (var i = 0; i < reducerKeys.length; i++) {
      var key = reducerKeys[i];
      var reducer = reducers[key];
      var previousStateForKey = state[key];
      nextState[key] = reducer(previousStateForKey, action);
    }
    return nextState;
  };
}
