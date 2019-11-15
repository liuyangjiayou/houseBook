<template>
    <div class="nav-box">
        <p class="dib2">{{title}}：</p>
        <ul class="dib2">
            <li v-for="(v,i) in listData" :key="i" :class="['dib2',{' dis' : i == 0}]" @click="change($event,v)">{{v.title}}</li>
        </ul>
    </div>
</template>

<script>

export default {
    components: {},
    props : {
        title : '',
        listData : {
            type : Array,
            default : [],
        },
        activeList : {
            type : Array,
            default : [],
        },
    },
    data() {
        return {
            
        };
    },
    computed: {},
    watch: {},
    methods: {
        change(e,$item){
            let $that = this
            $that.$siblings(e.currentTarget).forEach(item => {
                item.className = 'dib2';
                for(var i = 0; i < $that.activeList.length; i++){
                    var cur = $that.activeList[i];
                    console.log(cur);
                } 
            });
            if($that.$hasClass(e.currentTarget,'active')){
                e.currentTarget.className = 'dib2';
                for(var i = 0; i < $that.activeList.length; i++){
                    var cur = $that.activeList[i];
                    if(cur.id == item.id){
                        $that.activeList.splice(i,1);
                    }
                }
                $that.$emit('updata:activeList',$that.activeList);
                return false;
            }else{
                for(var i = 0; i < $that.activeList.length; i++){
                    var cur = $that.activeList[i];
                    $that.$siblings(e.currentTarget).forEach(v => {
                        if(cur.id == v.id){
                            console.log(cur.id);
                            $that.activeList.splice(i,1);
                        }
                    });
                };
                $that.activeList.push($item);
                $that.$emit('updata:activeList',$that.activeList);
                e.currentTarget.className = 'dib2 active';
            }
            // this.$siblings(e.currentTarget).forEach(item => {
            //     item.className = 'dib2';
            // }); 
            // if(this.$hasClass(e.currentTarget,'active')){
            //     e.currentTarget.className ='dib2';
            //     this.activeList = this.activeList.filter(v=>v.id != item.id)
            // }else{
            //     if(this.$hasClass(e.currentTarget,'dis')){
            //         this.$emit('update:activeList',this.active);
            //         return false
            //     } 
            //     e.currentTarget.className = 'dib2 active';
            //     this.activeList.push(item);
            //     this.$emit('updata:activeList',this.activeList);
            // }
            
        },
    },
    created() {},
    mounted() {},
    beforeCreate() {},
    beforeMount() {},
    beforeUpdate() {},
    updated() {},
    beforeDestroy() {},
    destroyed() {},
    activated() {},
    }
</script>
<style lang='less' scoped>
@import url('../assets/css/common.less');
.nav-box{
    position: relative;
    .pdl(76px);
    p{
        position: absolute;
        top: 0;
        left: 0;
        .height(48px);
    }
    ul{
        
        .pd(14px 0 12px 0);
        .h(22px);
        li{
            .pd(0 12px);
            cursor: pointer;
        }
        li:hover{
            .c(@green);
        }
        li.active{
            .c(@green);
        };
    }
}
</style>