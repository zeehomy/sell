<template>
  <transition name="move">
    <div v-show="showFlag" class="food" ref="food">
      <div class="food-content">
				<div class="image-header">
					<img :src="food.image" />
					<div class="back" @click="hide">
						<i class="icon-arrow_lift"></i>
					</div>
				</div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span>
            <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <div class="cartcontrol-wrapper">
            <cartcontrol :food="food" @cart-add="addFood"></cartcontrol>
          </div>
          <div class="buy"
            v-show="!food.count || food.count === 0"
            @click.stop.prevent="addFirst"
          >加入购物车</div>
        </div>
        <split v-show="food.info"></split>
				<div class="info" v-show="food.info">
					<h1 class="title">商品信息</h1>
					<p class="text">{{food.info}}</p>
				</div>
			</div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll';
import Vue from 'vue';
import cartcontrol from '@/components/cartcontrol/cartcontrol';
import split from '@/components/split/split';

export default {
  props: {
    food: {
      type: Object
    }
  },
  data() {
    return {
      showFlag: false
    };
  },
  methods: {
    show() {
      this.showFlag = true;
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.food, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      });
    },
    hide() {
      this.showFlag = false;
    },
    addFirst(event) {
      if (!event._constructed) {
        return;
      }
      this.$emit('cart-add', event.target);       // cart-add事件为：直接父组件goods的cart-add事件
      Vue.set(this.food, 'count', 1);
    },
    addFood(target) {
      // 体验优化，异步执行下落动画
      this.$nextTick(() => {
        this.$emit('cart-add', target);           // cart-add事件为：直接父组件goods的cart-add事件
      });
    }
  },
  components: {
    cartcontrol,
    split
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.food
	position: fixed;
	left: 0;
	top: 0;
	bottom: 48px;
	z-index: 30;
	width: 100%;
	background: #fff;
	&.move-enter-active, &.move-leave-active
		transition: all 0.2s linear;
	&.move-enter, &.move-leave-active
		transform: translate3d(100%, 0, 0);
	.image-header
		position: relative;
		width: 100%;
		height: 0;
		padding-top: 100%;
		img
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
		.back
			position: absolute;
			top: 10px;
			left: 0;
			.icon-arrow_lift
				display: block;
				padding: 10px;
				font-size: 20px;
				color: #fff;
	.content
		position relative
		padding: 18px;
		.title
			line-height: 14px;
			margin-bottom: 8px;
			font-size: 14px;
			font-weight: 700;
			color: rgb(7, 17, 27);
		.detail
			margin-bottom: 18px;
			line-height: 10px;
			height: 10px;
			font-size: 0;
			.sell-count, .rating
				font-size: 10px;
				color: rgb(147, 153, 159);
			.sell-count
				margin-right: 12px;
		.price
			font-weight: 700;
			line-height: 24px;
			.now
				margin-right: 8px;
				font-size: 14px;
				color: rgb(240, 20, 20);
			.old
				text-decoration: line-through;
				font-size: 10px;
				color: rgb(147, 153, 159);
		.cartcontrol-wrapper
			position absolute
			right 12px
			bottom 12px
		.buy
			position absolute
			right 18px
			bottom 18px
			z-index 10
			height 24px
			line-height 24px
			padding 0 12px
			box-sizing border-box
			border-radius 12px
			font-size 10px
			color #fff
			background rgb(0, 160, 220)
	.info
		padding 18px
		.title
			line-height 14px
			margin-bottom 6px
			font-size 14px
			color rgb(7, 17, 27)
		.text
			line-height 24px
			padding 0 8px
			font-size 12px
			color rgb(77, 85, 93)
</style>
