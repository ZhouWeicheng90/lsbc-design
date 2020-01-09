<template>
  <Layout>
    <Header style="background:#fff;height:100vh;display:flex;"></Header>
    <Layout>
      <Sider>
        <Menu :active-name="$route.name">
          <MenuItem name="ImgSelect" to="/ImgSelect">ImgSelect</MenuItem>
          <MenuItem name="MobilePreview" to="/MobilePreview">MobilePreview</MenuItem>
          <MenuItem name="UploadService" to="/UploadService">UploadService</MenuItem>
        </Menu>
      </Sider>
      <Content>
        <router-view></router-view>
      </Content>
    </Layout>
  </Layout>
</template>

<script>
// 关于服务的测试，目前请使用打包后的，具体原因就是打包兼容的问题：

export default {
  name: "App"
};
</script>

<style>
</style>
