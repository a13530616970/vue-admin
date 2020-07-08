<template>
    <div>
        <el-container>
            <el-aside width="200px">
                <Nav />
            </el-aside>
            <el-container>
                <el-header>
                    <Header />
                </el-header>
                <el-main>
                    <Main />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import Header from '@/views/Layout/components/Header'
import Main from '@/views/Layout/components/Main'
import Nav from '@/views/Layout/components/Nav'
export default {
    name: 'layout',
    components: { Header, Main, Nav }
}
</script>

<style lang="scss" scoped>
.el-header,
.el-footer {
    background-color: #b3c0d1;
    color: #333;
    text-align: center;
    line-height: 60px;
}
.el-aside {
    background-color: #344a5f;
    color: #333;
    height: 100vh;
    overflow: hidden;
}
.el-main {
    background-color: #e9eef3;
    color: #333;
    text-align: center;
    line-height: 160px;
}
body > .el-container {
    margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
    line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
    line-height: 320px;
}
</style>