<template>
  <div class="rangeBox">
    <group title="自定义价格">
      <div class="rangeleft">
        <cell title="" :inline-desc="'value: '+data" primary="content">
          <range v-model="data" :min="0" :max="50" :step="leftStep" :range-bar-height="3" @touchmove.native="leftstep()">
          </range>
        </cell>
      </div>
      <div class="rangeright">
        <cell title="" :inline-desc="'value: '+data1" primary="content">
          <range v-model="data1" :min="0" :max="50" :step="rightStep" :range-bar-height="3" @touchmove.native="rightstep()">
          </range>
        </cell>
      </div>
    </group>
  </div>
</template>

<script>
import { XButton, Range, Group, GroupTitle, Cell } from 'vux'

export default {
  components: {
    Range,
    Group,
    GroupTitle,
    Cell,
    XButton
  },
  mounted () {
    setTimeout(() => {
      this.showData13 = true
    }, 2000)
  },
  data () {
    return {
      data: 0,
      data1: 50,
      min: 0,
      max: 100,
      dynamiValue: 0,
      leftStep: 1,
      rightStep:1
    }
  },
  methods: {
    leftstep () {

    },
    rightstep () {
      
    }
  }
}
</script>