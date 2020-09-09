<!-- 组件说明 -->
<template>
    <div class='container'>
      <iframe src="http://polyv.89525.com/liutao/" frameborder="0" width="100%" :height="height"></iframe>
    </div>
</template>

<script>
    import API_URL from '../api/api.js'
    export default {
        components: {

        },
        data() {
            return {
              height:""
            };
        },
        created() {
               this.height = `${document.documentElement.clientHeight}`-100+'px';
        },
        computed: {

        },
        methods: {
           
        },
    }
</script>

<style scoped>
    /* @import url() */
    /* .container{
        width: 100%;
        height: 1000px;
    } */
</style>