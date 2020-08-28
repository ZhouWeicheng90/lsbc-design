<template>
  <div id="app">
    <input type="text" v-model="token" />
    <input type="file" name id @change="uploadFile" multiple />
  </div>
</template>

<script>
import { UploadService } from "./lib/qiniuUploadService";
import axios from "axios";
export default {
  name: "App",
  components: {},
  data() {
    return {
      token:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTg1NjQxNjIsInVzZXJuYW1lIjoiZW5Vc2VyMDYifQ.4hJfFBn3Qk5IfrsdfMENpYM7QGwXDA54wSmazPAnOQM",
      /** @type {UploadService} */
      up: null,
    };
  },
  methods: {
    uploadFile(e) {
      const files = Array.prototype.slice.call(e.target.files);
      this.up.uploadMutiple(
        files,
        true,
        (res) => {
          console.log(res.url);
        },
        (res) => {
          console.log(res);
        }
      );
    },
  },
  created() {
    let _axios = axios.create({
      baseURL: "/material",
      timeout: 30000,
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    });
    _axios.interceptors.request.use((req) => {
      req.headers["X-Access-Token"] = this.token;
      return req;
    });
    _axios.interceptors.response.use(
      (response) => {
        if (response.status === 200) {
          const res = response.data; // 真正的请求结果 res。正常请求会是一个json，文件下载会是一个blob！！！！
          if (res.code === 0 || res.code === 200) {
            return res.data || res.result;
          } else if (res.code === undefined) {
            return res;
          } else {
            // 存在code，且不为0才报错
            return Promise.reject(res.msg || res.message || "请求错误！");
          }
        } else {
          return Promise.reject(response.message || response);
        }
      },
      (err) => {
        if (err.response) {
          err = err.response;
          if (err.data) {
            err = err.data;
          }
        }
        return Promise.reject(err.message || err.msg || err);
      }
    );
    this.up = new UploadService(_axios);
   


    var p = new Proxy(function (...gs) {
      console.log(gs)
      return 'helloWorld'
    }, {
      apply: function (target, thisArg, argumentsList) {
        console.log("called: " + argumentsList.join(", "));
        return target.call(thisArg,...argumentsList);
      },
    });

    console.log(p(1, 2, 3)); // "called: 1, 2, 3"
    // 6
  },
};
</script>

<style>
</style>
