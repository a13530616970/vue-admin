<template>
    <div id="nav">
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo" background-color="#344a5f" text-color="#fff" active-text-color="#fff">
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span slot="title">导航一</span>
                </template>
                <el-menu-item index="1-1">选项1</el-menu-item>

            </el-submenu>

        </el-menu>
    </div>
</template>

<script>
export default {
    name: 'navMenu',
    data() {
        return {
        };
    },
    methods: {

    }
}
</script>

<style lang='scss' scoped>
</style>