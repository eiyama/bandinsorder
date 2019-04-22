<template>
    <div class="errPage">
        <div class="mint-content">
            <div class="err-img"></div>
            <h3 class="err-title">Oh no！页面君被抓走啦～</h3>
            <p class="err-txt">提示：<br>appId不存在</p>
        </div>
    </div>
</template>

<script>

export default {
    name: 'errPage',
    data () {
        return {}
    },
    methods:{
    },
    mounted:function(){}
}
</script>

<style scoped>
.errPage { width: 220px; margin: 0 auto; }
.errPage .err-img { display: block; width: 100%; height: 226px; margin: 0 auto 30px; background: url(../../assets/images/err.png) no-repeat; }
.errPage .err-title { margin-bottom: 20px; font-size: 16px; font-weight: 400; color: #323C4D; }
</style>