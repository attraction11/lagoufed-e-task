## 请完成下面几道简答题。

#### 1.通过该项目，请简要说明 typescript 比 javascript 的优势在哪？

Typescript 是 JavaScript 的超集，可以被编译成 JavaScript 代码。用 JavaScript 编写的合法代码，在 TypeScript 中依然有效。Typescript 是纯面向对象的编程语言，包含类和接口的概念。相较而说 Typescript 更容易理解 更加规范 更偏向 面向对象 等

主要不同点如下：

1.TS 是一种面向对象编程语言，而 JS 是一种脚本语言（尽管 JS 是基于对象的）。
2.TS 支持可选参数， JS 则不支持该特性。
3.TS 支持静态类型，JS 不支持。通过类型声明，在书写代码的时候，通过.运算符就可以有准确的智能提示，提高效率。 严格的类型声明，可以在开发阶段就对代码的正确性做了一道保障。
4.TS 支持接口，JS 不支持接口。

a. 静态输入 静态类型化是一种功能，可以在开发人员编写脚本时检测错误。查找并修复错误是当今开发团队的迫切需求。有了这项功能，就会允许开发人员编写更健壮的代码并对其进行维护，以便使得代码质量更好、更清晰。

b. 大型的开发项目 有时为了改进开发项目，需要对代码库进行小的增量更改。这些小小的变化可能会产生严重的、意想不到的后果，因此有必要撤销这些变化。使用 TypeScript 工具来进行重构更变的容易、快捷。

c. 更好的协作 当发开大型项目时，会有许多开发人员，此时乱码和错误的机也会增加。类型安全是一种在编码期间检测错误的功能，而不是在编译项目时检测错误。这为开发团队创建了一个更高效的编码和调试过程。

d. 更强的生产力 干净的 ECMAScript 6 代码，自动完成和动态输入等因素有助于提高开发人员的工作效率。这些功能也有助于编译器创建优化的代码。

#### 2.请简述一下支付流程

支付简单来说就是服务端集成相应的 SDK,微信支付宝都有对应不同服务端语言的 SDK 代码，修改的只有少部分参数，然后定义需要的参数接口暴露给前端。用户点击下单以后，后端接收前端的参数，如用户 id(一般支付从 token 获取)，商品 id 的集合等创建订单。价格一般是后端自己计算，并且需要使用 bigdecima 类型避免金额精度损失。然后服务端开启定时任务，一般 30 分钟，若用户未支付，定时任务会关闭该订单。
接着是支付，用户下单以后点击支付，后端会根据对应的订单 id 调用 SDK 接口，获取对应的 url 返回给前端，前端打开对应的 url 网页，微信支付宝会和后端建立 socket，实时返回用户的支付情况，支付成功后会调用配置好的回调 url，此时支付完成，前端第三方的支付网页自动重定向到之前配置的回调 url，后端会在支付成功的钩子函数拿到提示，修改订单的支付状态，此时支付完成。
现在很多网站都是二维码付款，二维码网页一般自己提供，此时需要前后端建立 websocket（ajax 轮巡一般不采用），在用户支付完成后关闭该网页。

商品浏览 > 添加购物车 > 结算 > 计算商品总价 > 生成订单 > 选择支付方式 > 支付成功回调

用户在客户端提交订单 向服务器端发送请求
服务器返回支付地址，引导客户端跳转到支付地址
用户支付
支付成功，支付宝重定向到服务端预设的客户端地址，通知用户支付结果。 同时支付宝向服务端发送 post 请求（请求地址是提前设置好的）告诉服务器当前支付结果 ，服务端创建订单，根据支付结果修改订单状态（未支付、已支付）

### 3.react-redux 的主要作用是什么，常用的 api 有哪些，什么作用？

#### 1.主要作用

react-redux 配合 redux 使用，将 redux 定义的 store 数据注入到组件中，可以使组件轻松的拿到全局状态，方便组件间的通信。使 react 组价与 redux 数据中心（store）联系起来，调用 dispatch 函数修改数据状态后，触发通过 subscribe 注册更新视图的处理逻辑，包括需要渲染的数据和更新数据的函数。

它主要用于在入口处包裹需要用到 Redux 的组件。本质上是将 store 放入 context 里。

conncet 方法用于将组件绑定 Redux。本质上是 HOC，封装掉了每个组件都要写的板式代码。

createStore 函数
用来生成 store, 使用方法: const store = createStore(reducer, initialState, enhancer)。

bindActionCreators 将 action 包装成直接可被调用的函数，用户感知不到 dispatch 的存在
combineReducers
一个复杂的应用往往 state 比较庞大，导致 Reducer 函数也比较庞大，因此如果能把 reducer 拆分成一个个独立的子 Reducer, 最后再把他们合成一个大的 reducer，处理起来就比较方便。而 combineReducers 就是做这件事的，该函数根据 state 的 key 去执行响应的子 Reducer，并将结果合并到最终的 state 对象里。

react-redux 用来将 redux 创建的 store 映射到组件内部，简化 redux 操作，react-redux 提供了两个重要的函数，Provider 和 connect。

Provider 组件 Provider 其实是一个 React 组件，其原理是通过 React 组件的 context 属性实现 store 的传递， 进而拿到整个应用的 state。 connect 函数 connect 函数是把 redux 的 dispatch 和 state 映射为 react 组件的 props 中，将页面里的组件与应用的状态 state 真正连接起来。 mapStateToProps()、mapDispatchToProps()可以建立一个从（外部的）state，store.dispatch 对象到（UI 组件的）props 对象的映射关系

#### 2.常用 API

Provider 组件：提供共享的 store，HOC（高阶组件），Provider 返回一个 HOC（高阶组件）的函数：conncet。
connect 方法：从 store 中获取数据和方法，注入组件，返回包含数据和方法的高阶组件。接受两个参数：mapStateToProps 和 mapDispatchToProps。它们定义了 UI 组件的业务逻辑。前者负责输入逻辑，即将 state 映射到 UI 组件的参数（props），后者负责输出逻辑，即将用户对 UI 组件的操作映射成 Action。 mapDispatchToProps() connect 函数的第二个参数，用来建立 UI 组件的参数到 store.dispatch 方法的映射。它定义了哪些用户的操作应该当作 Action，传给 Store。它可以是一个函数，也可以是一个对象。
useSelector 方法：与 connect 获取数据的作用一样，即获取组件所需的 store 中的数据
useDispatch 方法：与 connect 获取数据更新方法的作用一样，即获取 dispatch 方法，用于发送 action 来更新 store 中的数据。
applyMiddleware applyMiddleware(…middlewares) 引入中间件，比如我们经常使用的用于处理异步 action 的 redux-thunk 中间件。实际上，中间件是一个函数，对 store.dispatch 函数进行了改造，在发出 action 和执行 reducer 之间，增加了一些其他的功能。
compose compose 是一个返回依次执行参数里面的方法的函数， 其内部是通过 Array.prototype.reduceRight 函数实现的，一般 redux 项目使用多个中间件时会用到。
mapStateToProps() mapStateToProps 是一个函数，它接受 state 作为参数，返回一个对象。这个对象有一个 todos 属性，代表 UI 组件的同名参数，后面的 getVisibleTodos 也是一个函数，可以从 state 算出 todos 的值。

#### 3.主要作用

Provider ，让通过 props 传递进来的 store 对象挂载到 context 环境上，并且渲染 props.children；
以便在 connect(mapStateToProps, mapDispatchToProps ) 返回的 HOC 中，通过 context 可以获取到 store 对象
再通过 store.subscribe 函数，注册组件更新的逻辑
conncet，输入两个函数作为参数：mapStateToProps、mapDispatchToProps，返回一个 HOC；
在 HOC 中通过 this.context 获取到 Provider 中往下传递的 store 对象；
在 store.subscribe 中注册视图更新逻辑；
通过 store.getState()作为 mapStateToProps 函数的参数，store.dispatch 作为 mapDispatchToProps 的参数，生成两个对象；
将产生的两个对象，通过 props 传递给真正的视图组件使用；

#### 4.redux 中的异步如何处理？

主要通过 applyMiddleware 函数，借助 redux 中间件来处理，即通过中间件模式将原始 dispatch 函数进行封装处理，形成洋葱模型，将原始 dispatch 函数作为参数传递，在处理异步事件时，再调用原始 dispatch 函数修改数据状态。
在 Redux 的世界中，Redux action 返回一个 JS 对象，被 Reducer 接收处理后返回新的 State，这一切看似十分美好。整个过程可以看作是：
view -> actionCreator -> action -> reducer -> newState ->(map) container component .

此前介绍的都是同步的 action 请求,接下来介绍一下异步的 action，我们希望在异步请求的时候，action 能够这样处理：
view -> asyncAction -> wait -> action -> reducer -> newState -> container component
这里 action 不再是同步的，而是具有异步功能，当然因为依赖于异步 IO，也会产生副作用。这里就会存在一个问题，我们需要发起两次 action 请求，这好像我们又得将 dispatch 对象传入函数中，显得不够优雅。同步和异步的调用方式截然不同：
同步情况：store.dispatch(actionCreator())
异步情况: asyncAction(store.dispatch)

好在我们有 Redux 中间件机制能够帮助我们处理异步 action，让 action 不再仅仅处理同步的请求。

redux 中的异步处理流程通常如下：
在异步操作开始前，发送 action，用来表示要发起异步操作，用户界面应该有所提示
在异步操作结束后，发送 action，用来表示异步操作结束，根据异步操作的结果，对 store 中的数据和用户界面进行更新
redux 中通常使用中间件来进行异步处理，常用的中间件包括 redux-thunk 或 redux-saga。

redux-thunk 使用高阶函数实现， 判别 action 的类型，如果 action 是函数，就调用这个函数，书写较为简单 。

![alt text](./ReduxAsyncDataFlowDiagram.gif)
