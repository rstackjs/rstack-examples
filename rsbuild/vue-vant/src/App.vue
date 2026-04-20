<template>
  <div class="goods">
    <van-swipe class="goods-swipe" :autoplay="3000">
      <van-swipe-item v-for="thumb in goods.thumb" :key="thumb">
        <img :src="thumb" />
      </van-swipe-item>
    </van-swipe>

    <van-cell-group>
      <van-cell>
        <template #title>
          <div class="goods-title">{{ goods.title }}</div>
          <div class="goods-price">{{ formatPrice(goods.price) }}</div>
        </template>
      </van-cell>
      <van-cell class="goods-express">
        <template #title>
          <van-col span="10">Express: {{ goods.express }}</van-col>
          <van-col span="14">Remain: {{ goods.remain }}</van-col>
        </template>
      </van-cell>
    </van-cell-group>

    <van-cell-group class="goods-cell-group">
      <van-cell value="Title" icon="shop-o" is-link @click="sorry">
        <template #title>
          <span class="van-cell-text">Text</span>
          <van-tag class="goods-tag" type="danger">Text</van-tag>
        </template>
      </van-cell>
      <van-cell title="Title" icon="location-o" is-link @click="sorry" />
    </van-cell-group>

    <van-cell-group class="goods-cell-group">
      <van-cell title="Title" is-link @click="sorry" />
    </van-cell-group>

    <van-action-bar>
      <van-action-bar-icon icon="chat-o" @click="sorry">
        Text
      </van-action-bar-icon>
      <van-action-bar-icon icon="cart-o" @click="onClickCart">
        Text
      </van-action-bar-icon>
      <van-action-bar-button type="warning" @click="sorry">
        Text
      </van-action-bar-button>
      <van-action-bar-button type="danger" @click="sorry">
        Text
      </van-action-bar-button>
    </van-action-bar>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import appleURL from "./static/apple.jpeg";

const goods = ref({
  title: "Goods Title",
  price: 2680,
  express: "Express",
  remain: 19,
  thumb: [appleURL],
});

const formatPrice = (price: number) => {
  return "¥" + (price / 100).toFixed(2);
};

const onClickCart = () => {
  // replace this with your actual router logic
};

const sorry = () => {
  showToast("TODO");
};
</script>

<style lang="less">
body {
  font-size: 16px;
  background-color: #f8f8f8;
  -webkit-font-smoothing: antialiased;
}

.goods {
  padding-bottom: 50px;

  &-swipe {
    img {
      width: 100%;
      display: block;
    }
  }

  &-title {
    font-size: 16px;
  }

  &-price {
    color: #f44;
  }

  &-express {
    color: #999;
    font-size: 12px;
    padding: 5px 15px;
  }

  &-cell-group {
    margin: 15px 0;
  }

  &-tag {
    margin-left: 5px;
  }
}
</style>
