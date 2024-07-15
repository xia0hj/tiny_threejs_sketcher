//@ts-check

import { createStore } from "zustand/vanilla";
import { subscribeWithSelector } from "zustand/middleware";

const store = createStore(
  subscribeWithSelector((set) => ({
    val: 0,
    add: () => set((state) => ({ val: state.val + 1 })),

    str: "a",
    setStr: (newStr) => set({ str: newStr }),
  })),
);

store.subscribe(state => state.val, (cur, prev)=>{
  console.log('监听val: ', cur, prev )
});
store.subscribe(state => state.str, (cur, prev)=>{
  console.log('监听str: ', cur, prev )
});
store.subscribe(state => state.str, (cur, prev)=>{
  console.log('重复监听str: ', cur, prev )
});
store


store.setState({
  val: 1
})
store.setState({
  str: 'b'
})
