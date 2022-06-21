import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as couterActions from "../store/actions/counter.actions";

<<<<<<< HEAD:part4/fed-e-task-04-02/notes/materials/4-2-1-redux/code/react-redux-guide/src/components/Counter.js
function Counter({ count, increment, decrement, increment_async }) {
  return (
    <div>
      <button onClick={() => increment(20)}>+</button>
      <span>{count}</span>
      <button onClick={() => decrement(5)}>-</button>
    </div>
  );
=======
function Counter ({count, increment, decrement, increment_async}) {
  return <div>
    <button onClick={() => increment(20)}>+</button>
    <span>{count}</span>
    <button onClick={() => decrement(5)}>-</button>
  </div>
>>>>>>> 231beb3 (Mobx6):part4/fed-e-task-04-02/notes/materials/Redux/code/react-redux-guide/src/components/Counter.js
}

// 1. connect 方法会帮助我们订阅store 当store中的状态发生更改的时候 会帮助我们重新渲染组件
// 2. connect 方法可以让我们获取store中的状态 将状态通过组件的props属性映射给组件
// 3. connect 方法可以让我们获取 dispatch 方法

const mapStateToProps = (state) => ({
  count: state.counter.count,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(couterActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
