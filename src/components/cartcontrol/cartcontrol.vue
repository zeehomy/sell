<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease"
        v-show="food.count>0"
        @click.stop="decreaseCart">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="cart-count"
      v-show="food.count>0"
    >{{food.count}}</div>
    <div class="cart-add icon-add_circle"
      @click.stop="addCart"
    ></div>
  </div>
</template>

<script type="text/ecmascript-6">
import Vue from 'vue';

export default {
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    addCart(event) {
      if (!event._constructed) {
        return;
      }
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1);
      } else {
        this.food.count++;
      }
      this.$emit('cart-add', event.target);      // “添加数量组件”触发自定义事件，传入元素（位置）;cart-add事件为：直接父组件(goods,或food(二级父组件)，..)的cart-add事件
    },
    decreaseCart() {
      if (!event._constructed) {
        return;
      }
      /* if (this.food.count === 0) {
        return;
      } else {
        this.food.count--;
      } */
      if (this.food.count) {
        this.food.count--;
      }
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.cartcontrol
  font-size 0
  .cart-decrease
    display inline-block
    padding 6px                            // 已省略部分显示终态样式
    &.move-enter-active,&.move-leave-active  // 只在过渡区间添加，transition可添加在静态状态中
      transition all 0.4s linear
    &.move-enter,&.move-leave-active  // 显示初态&隐藏终态样式,表示从哪种状态开始显示
      opacity 0
      transform translate3d(24px,0,0)
      .inner                           // 附属inner样式
        transform rotate(180deg)
    .inner
      display inline-block
      line-height 24px
      font-size 24px
      color rgb(0,160,220)
      transition all 0.4s linear
      transform rotate(0)
  .cart-count
    display inline-block
    vertical-align top
    width 12px
    padding-top 6px
    line-height 24px
    text-align center
    font-size 10px
    color rgb(147,153,159)
  .cart-add
    display inline-block
    padding 6px
    line-height 24px
    font-size 24px
    color rgb(0,160,220)
</style>
