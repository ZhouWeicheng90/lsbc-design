<template>
  <Layout style="height:100vh;display:flex;">
    <Header style="background:#fff;border-bottom:1px solid #ddd"></Header>
    <Layout style="flex:1;background:#eee">
      <Sider>
        <Menu
          :active-name="$route.name"
          width="auto"
          style="height:calc(100vh - 64px);overflow-y: scroll;"
        >
          <MenuItem
            v-for="route in routes"
            :key="route.name"
            :name="route.name"
            :to="route.path"
          >{{route.label}}</MenuItem>
        </Menu>
      </Sider>
      <Content style="height:calc(100vh - 64px);padding: 16px 0 3px 16px;overflow-y: scroll;">
        <div style="background:#fff;padding: 16px;border-radius: 4px;min-height: 100%;">
          <router-view></router-view>
        </div>
      </Content>
    </Layout>
  </Layout>
</template>

<script>
// 关于服务的测试，目前请使用打包后的，具体原因就是打包兼容的问题：

import routes from "./routes";
export default {
  name: "App",
  data() {
    return {
      routes: routes
    };
  }
};
</script>

<style scoped>
*::-webkit-scrollbar {
  width: 0;
}
</style>
