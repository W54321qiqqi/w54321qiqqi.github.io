// vite.config.ts
import { resolve } from "path";
import { loadEnv } from "file:///F:/simple_admin_template/node_modules/.pnpm/vite@4.3.9_@types+node@20.2.5_sass@1.62.1/node_modules/vite/dist/node/index.js";

// vite/plugins/index.ts
import vue from "file:///F:/simple_admin_template/node_modules/.pnpm/@vitejs+plugin-vue@4.1.0_vite@4.3.9_vue@3.3.4/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///F:/simple_admin_template/node_modules/.pnpm/@vitejs+plugin-vue-jsx@3.0.1_vite@4.3.9_vue@3.3.4/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";

// vite/plugins/autoImportPlugin.ts
import AutoImport from "file:///F:/simple_admin_template/node_modules/.pnpm/unplugin-auto-import@0.16.4_@vueuse+core@10.1.2_rollup@2.79.1/node_modules/unplugin-auto-import/dist/vite.js";
import { ElementPlusResolver } from "file:///F:/simple_admin_template/node_modules/.pnpm/unplugin-vue-components@0.25.1_rollup@2.79.1_vue@3.3.4/node_modules/unplugin-vue-components/dist/resolvers.mjs";
var autoImportPlugin_default = AutoImport({
  // targets to transform
  include: [
    /\.[tj]sx?$/,
    // .ts, .tsx, .js, .jsx
    /\.vue$/,
    /\.vue\?vue/
    // .vue
  ],
  // global imports to register
  imports: ["vue", "vue-router", "pinia"],
  dts: "./types/auto-imports.d.ts",
  vueTemplate: false,
  resolvers: [ElementPlusResolver()],
  eslintrc: {
    enabled: false,
    // Default `false`
    filepath: "./.eslintrc-auto-import.json",
    // Default `./.eslintrc-auto-import.json`
    globalsPropValue: true
    // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
  }
});

// vite/plugins/componentsPlugin.ts
import Components from "file:///F:/simple_admin_template/node_modules/.pnpm/unplugin-vue-components@0.25.1_rollup@2.79.1_vue@3.3.4/node_modules/unplugin-vue-components/dist/vite.mjs";
import { ElementPlusResolver as ElementPlusResolver2 } from "file:///F:/simple_admin_template/node_modules/.pnpm/unplugin-vue-components@0.25.1_rollup@2.79.1_vue@3.3.4/node_modules/unplugin-vue-components/dist/resolvers.mjs";
var componentsPlugin_default = Components({
  resolvers: [ElementPlusResolver2()],
  dts: "./types/components.d.ts"
});

// vite/plugins/warmupPligin.ts
import { warmup } from "file:///F:/simple_admin_template/node_modules/.pnpm/vite-plugin-warmup@0.1.0_vite@4.3.9/node_modules/vite-plugin-warmup/index.js";
var createWarmup = () => {
  return warmup({
    clientFiles: ["./src/**"]
  });
};

// vite/plugins/svgBuildPlugin.ts
import { readFileSync, readdirSync } from "fs";
var idPerfix = "";
var iconNames = [];
var svgTitle = /<svg([^>+].*?)>/;
var clearHeightWidth = /(width|height)="([^>+].*?)"/g;
var hasViewBox = /(viewBox="[^>+].*?")/g;
var clearReturn = /(\r)|(\n)/g;
function findSvgFile(dir) {
  const svgRes = [];
  const dirents = readdirSync(dir, {
    withFileTypes: true
  });
  for (const dirent of dirents) {
    iconNames.push(`${idPerfix}-${dirent.name.replace(".svg", "")}`);
    if (dirent.isDirectory()) {
      svgRes.push(...findSvgFile(dir + dirent.name + "/"));
    } else {
      const svg = readFileSync(dir + dirent.name).toString().replace(clearReturn, "").replace(svgTitle, ($1, $2) => {
        let width = 0;
        let height = 0;
        let content = $2.replace(
          clearHeightWidth,
          (s1, s2, s3) => {
            if (s2 === "width") {
              width = s3;
            } else if (s2 === "height") {
              height = s3;
            }
            return "";
          }
        );
        if (!hasViewBox.test($2)) {
          content += `viewBox="0 0 ${width} ${height}"`;
        }
        return `<symbol id="${idPerfix}-${dirent.name.replace(
          ".svg",
          ""
        )}" ${content}>`;
      }).replace("</svg>", "</symbol>");
      svgRes.push(svg);
    }
  }
  return svgRes;
}
var svgBuildPlugin = (path, perfix = "local") => {
  if (path === "")
    return;
  idPerfix = perfix;
  const res = findSvgFile(path);
  return {
    name: "vite:svg",
    transformIndexHtml(html) {
      return html.replace(
        "<body>",
        `
                <body>
                <svg id="local-icon" data-icon-name="${iconNames.join(
          ","
        )}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="position: absolute; width: 0; height: 0">
                ${res.join("")}
                </svg>
                `
      );
    }
  };
};

// vite/plugins/mock.ts
import { viteMockServe } from "file:///F:/simple_admin_template/node_modules/.pnpm/vite-plugin-mock@2.9.6_mockjs@1.1.0_rollup@2.79.1_vite@4.3.9/node_modules/vite-plugin-mock/dist/index.js";
function configMockPlugin(isBuild) {
  return viteMockServe({
    mockPath: "mock",
    localEnabled: !isBuild,
    prodEnabled: isBuild,
    injectCode: `
    import { setupProdMockServer } from './_mockProdServer';

    setupProdMockServer();
  `
  });
}

// vite/plugins/viteBuildInfo.ts
import { readdir, stat } from "fs";
import dayjs from "file:///F:/simple_admin_template/node_modules/.pnpm/dayjs@1.11.8/node_modules/dayjs/dayjs.min.js";
import duration from "file:///F:/simple_admin_template/node_modules/.pnpm/dayjs@1.11.8/node_modules/dayjs/plugin/duration.js";
import pkg from "file:///F:/simple_admin_template/node_modules/.pnpm/picocolors@1.0.0/node_modules/picocolors/picocolors.js";
var { green, blue, bold } = pkg;
dayjs.extend(duration);
var staticPath = "dist";
var fileListTotal = [];
var recursiveDirectory = (folder, callback) => {
  readdir(folder, (err, files) => {
    if (err)
      throw err;
    let count = 0;
    const checkEnd = () => {
      ++count === files.length && callback();
    };
    files.forEach((item) => {
      stat(folder + "/" + item, async (err2, stats) => {
        if (err2)
          throw err2;
        if (stats.isFile()) {
          fileListTotal.push(stats.size);
          checkEnd();
        } else if (stats.isDirectory()) {
          recursiveDirectory(`${folder}/${item}/`, checkEnd);
        }
      });
    });
    files.length === 0 && callback();
  });
};
var sum = (arr) => {
  return arr.reduce((t, c) => {
    return t + c;
  }, 0);
};
var formatBytes = (a, b) => {
  if (a === 0)
    return "0 Bytes";
  const c = 1024;
  const d = b || 2;
  const e = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const f = Math.floor(Math.log(a) / Math.log(c));
  return parseFloat((a / Math.pow(c, f)).toFixed(d)) + " " + e[f];
};
var viteBuildInfo = () => {
  let config;
  let startTime;
  let endTime;
  return {
    name: "vite:buildInfo",
    configResolved(resolvedConfig) {
      config = resolvedConfig;
    },
    buildStart() {
      console.log(
        bold(
          green(
            `\u{1F44F}\u6B22\u8FCE\u4F7F\u7528${blue("[V3-Template]")}\uFF0C\u4E00\u4E2A\u5C0F\u762A\u4E09\u73B0\u5728\u6B63\u5168\u529B\u4E3A\u60A8${config.command === "build" ? "\u6253\u5305" : "\u7F16\u8BD1"}`
          )
        )
      );
      if (config.command === "build") {
        startTime = dayjs(/* @__PURE__ */ new Date());
      }
    },
    closeBundle() {
      if (config.command === "build") {
        endTime = dayjs(/* @__PURE__ */ new Date());
        recursiveDirectory(staticPath, () => {
          console.log(
            bold(
              green(
                `\u606D\u559C\u6253\u5305\u5B8C\u6210\u{1F389}\uFF08\u603B\u7528\u65F6${dayjs.duration(endTime.diff(startTime)).format("mm\u5206ss\u79D2")}\uFF0C\u6253\u5305\u540E\u7684\u5927\u5C0F\u4E3A${formatBytes(
                  sum(fileListTotal)
                )}\uFF09`
              )
            )
          );
        });
      }
    }
  };
};

// vite/plugins/visualizer.ts
import { visualizer } from "file:///F:/simple_admin_template/node_modules/.pnpm/rollup-plugin-visualizer@5.9.2_rollup@2.79.1/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
var createVisualizer = () => {
  return visualizer({
    open: true,
    gzipSize: true,
    brotliSize: true,
    filename: "report.html"
  });
};

// vite/plugins/compression.ts
import compression from "file:///F:/simple_admin_template/node_modules/.pnpm/vite-plugin-compression@0.5.1_vite@4.3.9/node_modules/vite-plugin-compression/dist/index.mjs";
var createCompression = (env) => {
  const plugin = [];
  const { VITE_BUILD_COMPRESS } = env;
  const compressList = VITE_BUILD_COMPRESS.split(",");
  if (compressList.includes("gz")) {
    plugin.push(
      compression({
        ext: ".gz",
        deleteOriginFile: false
      })
    );
  }
  if (compressList.includes("br")) {
    plugin.push(
      compression({
        ext: ".br",
        algorithm: "brotliCompress",
        deleteOriginFile: false
      })
    );
  }
  return plugin;
};

// vite/plugins/imagemin.ts
import viteImagemin from "file:///F:/simple_admin_template/node_modules/.pnpm/vite-plugin-imagemin@0.6.1_vite@4.3.9/node_modules/vite-plugin-imagemin/dist/index.mjs";
var createImagemin = () => {
  return viteImagemin({
    gifsicle: {
      optimizationLevel: 7,
      interlaced: false
    },
    optipng: {
      optimizationLevel: 7
    },
    mozjpeg: {
      quality: 20
    },
    pngquant: {
      quality: [0.8, 0.9],
      speed: 4
    },
    svgo: {
      plugins: [
        {
          name: "removeViewBox"
        },
        {
          name: "removeEmptyAttrs",
          active: false
        }
      ]
    }
  });
};

// vite/plugins/index.ts
function createVitePlugins(viteEnv, isBuild = false) {
  const { VITE_BUILD_IMAGEMIN, VITE_BUILD_REPORT } = viteEnv;
  const isReport = VITE_BUILD_REPORT === "true";
  const vitePlugins = [
    vue(),
    vueJsx({}),
    autoImportPlugin_default,
    componentsPlugin_default,
    // 预加载
    createWarmup(),
    // svg插件
    svgBuildPlugin("./src/assets/icons/"),
    configMockPlugin(isBuild),
    // 打包信息插件
    viteBuildInfo()
  ];
  if (isBuild) {
    vitePlugins.push(createCompression(viteEnv));
    VITE_BUILD_IMAGEMIN === "true" && vitePlugins.push(createImagemin());
  }
  if (isReport) {
    vitePlugins.push(createVisualizer());
  }
  return vitePlugins;
}

// vite.config.ts
var __vite_injected_original_dirname = "F:\\simple_admin_template";
var pathResolve = (dir) => {
  return resolve(__vite_injected_original_dirname, ".", dir);
};
var viteConfig = ({ mode, command }) => {
  const env = loadEnv(mode, process.cwd());
  const alias = {
    "/@": pathResolve("./src/")
  };
  return {
    plugins: createVitePlugins(env, command === "build"),
    resolve: { alias },
    server: {
      port: 9e3
    },
    build: {
      reportCompressedSize: false,
      chunkSizeWarningLimit: 2e3,
      rollupOptions: {
        // 静态资源分类打包
        output: {
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js",
          assetFileNames: "static/[ext]/[name]-[hash].[ext]"
        }
      }
    }
  };
};
var vite_config_default = viteConfig;
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAidml0ZS9wbHVnaW5zL2luZGV4LnRzIiwgInZpdGUvcGx1Z2lucy9hdXRvSW1wb3J0UGx1Z2luLnRzIiwgInZpdGUvcGx1Z2lucy9jb21wb25lbnRzUGx1Z2luLnRzIiwgInZpdGUvcGx1Z2lucy93YXJtdXBQbGlnaW4udHMiLCAidml0ZS9wbHVnaW5zL3N2Z0J1aWxkUGx1Z2luLnRzIiwgInZpdGUvcGx1Z2lucy9tb2NrLnRzIiwgInZpdGUvcGx1Z2lucy92aXRlQnVpbGRJbmZvLnRzIiwgInZpdGUvcGx1Z2lucy92aXN1YWxpemVyLnRzIiwgInZpdGUvcGx1Z2lucy9jb21wcmVzc2lvbi50cyIsICJ2aXRlL3BsdWdpbnMvaW1hZ2VtaW4udHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJGOlxcXFxzaW1wbGVfYWRtaW5fdGVtcGxhdGVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkY6XFxcXHNpbXBsZV9hZG1pbl90ZW1wbGF0ZVxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRjovc2ltcGxlX2FkbWluX3RlbXBsYXRlL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnXHJcbmltcG9ydCB0eXBlIHsgVXNlckNvbmZpZywgQ29uZmlnRW52IH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHsgbG9hZEVudiB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCBjcmVhdGVWaXRlUGx1Z2lucyBmcm9tICcuL3ZpdGUvcGx1Z2lucydcclxuY29uc3QgcGF0aFJlc29sdmUgPSAoZGlyOiBzdHJpbmcpOiBhbnkgPT4ge1xyXG4gIHJldHVybiByZXNvbHZlKF9fZGlybmFtZSwgJy4nLCBkaXIpXHJcbn1cclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmNuL2NvbmZpZy9cclxuY29uc3Qgdml0ZUNvbmZpZyA9ICh7IG1vZGUsIGNvbW1hbmQgfTogQ29uZmlnRW52KTogVXNlckNvbmZpZyA9PiB7XHJcbiAgY29uc3QgZW52ID0gbG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpKVxyXG4gIGNvbnN0IGFsaWFzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xyXG4gICAgJy9AJzogcGF0aFJlc29sdmUoJy4vc3JjLycpLFxyXG4gIH1cclxuICByZXR1cm4ge1xyXG4gICAgcGx1Z2luczogY3JlYXRlVml0ZVBsdWdpbnMoZW52LCBjb21tYW5kID09PSAnYnVpbGQnKSxcclxuICAgIHJlc29sdmU6IHsgYWxpYXMgfSxcclxuICAgIHNlcnZlcjoge1xyXG4gICAgICBwb3J0OiA5MDAwLFxyXG4gICAgfSxcclxuICAgIGJ1aWxkOiB7XHJcbiAgICAgIHJlcG9ydENvbXByZXNzZWRTaXplOiBmYWxzZSxcclxuICAgICAgY2h1bmtTaXplV2FybmluZ0xpbWl0OiAyMDAwLFxyXG4gICAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgICAgLy8gXHU5NzU5XHU2MDAxXHU4RDQ0XHU2RTkwXHU1MjA2XHU3QzdCXHU2MjUzXHU1MzA1XHJcbiAgICAgICAgb3V0cHV0OiB7XHJcbiAgICAgICAgICBjaHVua0ZpbGVOYW1lczogJ3N0YXRpYy9qcy9bbmFtZV0tW2hhc2hdLmpzJyxcclxuICAgICAgICAgIGVudHJ5RmlsZU5hbWVzOiAnc3RhdGljL2pzL1tuYW1lXS1baGFzaF0uanMnLFxyXG4gICAgICAgICAgYXNzZXRGaWxlTmFtZXM6ICdzdGF0aWMvW2V4dF0vW25hbWVdLVtoYXNoXS5bZXh0XScsXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB2aXRlQ29uZmlnXHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRjpcXFxcc2ltcGxlX2FkbWluX3RlbXBsYXRlXFxcXHZpdGVcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRjpcXFxcc2ltcGxlX2FkbWluX3RlbXBsYXRlXFxcXHZpdGVcXFxccGx1Z2luc1xcXFxpbmRleC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRjovc2ltcGxlX2FkbWluX3RlbXBsYXRlL3ZpdGUvcGx1Z2lucy9pbmRleC50c1wiO2ltcG9ydCB0eXBlIHsgUGx1Z2luT3B0aW9uLCBQbHVnaW4gfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcclxuaW1wb3J0IHZ1ZUpzeCBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUtanN4J1xyXG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tICcuL2F1dG9JbXBvcnRQbHVnaW4nXHJcbmltcG9ydCBDb21wb25lbnRzIGZyb20gJy4vY29tcG9uZW50c1BsdWdpbidcclxuaW1wb3J0IHsgY3JlYXRlV2FybXVwIH0gZnJvbSAnLi93YXJtdXBQbGlnaW4nXHJcbmltcG9ydCB7IHN2Z0J1aWxkUGx1Z2luIH0gZnJvbSAnLi9zdmdCdWlsZFBsdWdpbidcclxuaW1wb3J0IHsgY29uZmlnTW9ja1BsdWdpbiB9IGZyb20gJy4vbW9jaydcclxuaW1wb3J0IHsgdml0ZUJ1aWxkSW5mbyB9IGZyb20gJy4vdml0ZUJ1aWxkSW5mbydcclxuaW1wb3J0IHsgY3JlYXRlVmlzdWFsaXplciB9IGZyb20gJy4vdmlzdWFsaXplcidcclxuaW1wb3J0IHsgY3JlYXRlQ29tcHJlc3Npb24gfSBmcm9tICcuL2NvbXByZXNzaW9uJ1xyXG5pbXBvcnQgeyBjcmVhdGVJbWFnZW1pbiB9IGZyb20gJy4vaW1hZ2VtaW4nXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZVZpdGVQbHVnaW5zKFxyXG4gIHZpdGVFbnY6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4sXHJcbiAgaXNCdWlsZCA9IGZhbHNlLFxyXG4pIHtcclxuICBjb25zdCB7IFZJVEVfQlVJTERfSU1BR0VNSU4sIFZJVEVfQlVJTERfUkVQT1JUIH0gPSB2aXRlRW52XHJcbiAgY29uc3QgaXNSZXBvcnQgPSBWSVRFX0JVSUxEX1JFUE9SVCA9PT0gJ3RydWUnXHJcbiAgY29uc3Qgdml0ZVBsdWdpbnM6IChQbHVnaW5PcHRpb24gfCBQbHVnaW5PcHRpb25bXSlbXSA9IFtcclxuICAgIHZ1ZSgpLFxyXG4gICAgdnVlSnN4KHt9KSxcclxuICAgIEF1dG9JbXBvcnQsXHJcbiAgICBDb21wb25lbnRzLFxyXG4gICAgLy8gXHU5ODg0XHU1MkEwXHU4RjdEXHJcbiAgICBjcmVhdGVXYXJtdXAoKSxcclxuICAgIC8vIHN2Z1x1NjNEMlx1NEVGNlxyXG4gICAgc3ZnQnVpbGRQbHVnaW4oJy4vc3JjL2Fzc2V0cy9pY29ucy8nKSxcclxuICAgIGNvbmZpZ01vY2tQbHVnaW4oaXNCdWlsZCksXHJcbiAgICAvLyBcdTYyNTNcdTUzMDVcdTRGRTFcdTYwNkZcdTYzRDJcdTRFRjZcclxuICAgIHZpdGVCdWlsZEluZm8oKSxcclxuICBdXHJcbiAgLy8gZ2l6cCxiclx1NjI1M1x1NTMwNVx1NTM4Qlx1N0YyOVxyXG4gIGlmIChpc0J1aWxkKSB7XHJcbiAgICB2aXRlUGx1Z2lucy5wdXNoKGNyZWF0ZUNvbXByZXNzaW9uKHZpdGVFbnYpKVxyXG4gICAgVklURV9CVUlMRF9JTUFHRU1JTiA9PT0gJ3RydWUnICYmIHZpdGVQbHVnaW5zLnB1c2goY3JlYXRlSW1hZ2VtaW4oKSlcclxuICB9XHJcblxyXG4gIGlmIChpc1JlcG9ydCkge1xyXG4gICAgLy8gXHU2MjUzXHU1MzA1XHU1MjA2XHU2NzkwXHJcbiAgICB2aXRlUGx1Z2lucy5wdXNoKGNyZWF0ZVZpc3VhbGl6ZXIoKSBhcyBQbHVnaW4pXHJcbiAgfVxyXG4gIHJldHVybiB2aXRlUGx1Z2luc1xyXG59XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRjpcXFxcc2ltcGxlX2FkbWluX3RlbXBsYXRlXFxcXHZpdGVcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRjpcXFxcc2ltcGxlX2FkbWluX3RlbXBsYXRlXFxcXHZpdGVcXFxccGx1Z2luc1xcXFxhdXRvSW1wb3J0UGx1Z2luLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9GOi9zaW1wbGVfYWRtaW5fdGVtcGxhdGUvdml0ZS9wbHVnaW5zL2F1dG9JbXBvcnRQbHVnaW4udHNcIjtpbXBvcnQgQXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJ1xyXG5pbXBvcnQgeyBFbGVtZW50UGx1c1Jlc29sdmVyIH0gZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvcmVzb2x2ZXJzJ1xyXG5leHBvcnQgZGVmYXVsdCBBdXRvSW1wb3J0KHtcclxuICAvLyB0YXJnZXRzIHRvIHRyYW5zZm9ybVxyXG4gIGluY2x1ZGU6IFtcclxuICAgIC9cXC5bdGpdc3g/JC8sIC8vIC50cywgLnRzeCwgLmpzLCAuanN4XHJcbiAgICAvXFwudnVlJC8sXHJcbiAgICAvXFwudnVlXFw/dnVlLywgLy8gLnZ1ZVxyXG4gIF0sXHJcblxyXG4gIC8vIGdsb2JhbCBpbXBvcnRzIHRvIHJlZ2lzdGVyXHJcbiAgaW1wb3J0czogWyd2dWUnLCAndnVlLXJvdXRlcicsICdwaW5pYSddLFxyXG5cclxuICBkdHM6ICcuL3R5cGVzL2F1dG8taW1wb3J0cy5kLnRzJyxcclxuXHJcbiAgdnVlVGVtcGxhdGU6IGZhbHNlLFxyXG5cclxuICByZXNvbHZlcnM6IFtFbGVtZW50UGx1c1Jlc29sdmVyKCldLFxyXG5cclxuICBlc2xpbnRyYzoge1xyXG4gICAgZW5hYmxlZDogZmFsc2UsIC8vIERlZmF1bHQgYGZhbHNlYFxyXG4gICAgZmlsZXBhdGg6ICcuLy5lc2xpbnRyYy1hdXRvLWltcG9ydC5qc29uJywgLy8gRGVmYXVsdCBgLi8uZXNsaW50cmMtYXV0by1pbXBvcnQuanNvbmBcclxuICAgIGdsb2JhbHNQcm9wVmFsdWU6IHRydWUsIC8vIERlZmF1bHQgYHRydWVgLCAodHJ1ZSB8IGZhbHNlIHwgJ3JlYWRvbmx5JyB8ICdyZWFkYWJsZScgfCAnd3JpdGFibGUnIHwgJ3dyaXRlYWJsZScpXHJcbiAgfSxcclxufSlcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJGOlxcXFxzaW1wbGVfYWRtaW5fdGVtcGxhdGVcXFxcdml0ZVxcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJGOlxcXFxzaW1wbGVfYWRtaW5fdGVtcGxhdGVcXFxcdml0ZVxcXFxwbHVnaW5zXFxcXGNvbXBvbmVudHNQbHVnaW4udHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Y6L3NpbXBsZV9hZG1pbl90ZW1wbGF0ZS92aXRlL3BsdWdpbnMvY29tcG9uZW50c1BsdWdpbi50c1wiO2ltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnXHJcbmltcG9ydCB7IEVsZW1lbnRQbHVzUmVzb2x2ZXIgfSBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy9yZXNvbHZlcnMnXHJcbmV4cG9ydCBkZWZhdWx0IENvbXBvbmVudHMoe1xyXG4gIHJlc29sdmVyczogW0VsZW1lbnRQbHVzUmVzb2x2ZXIoKV0sXHJcbiAgZHRzOiAnLi90eXBlcy9jb21wb25lbnRzLmQudHMnLFxyXG59KVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkY6XFxcXHNpbXBsZV9hZG1pbl90ZW1wbGF0ZVxcXFx2aXRlXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkY6XFxcXHNpbXBsZV9hZG1pbl90ZW1wbGF0ZVxcXFx2aXRlXFxcXHBsdWdpbnNcXFxcd2FybXVwUGxpZ2luLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9GOi9zaW1wbGVfYWRtaW5fdGVtcGxhdGUvdml0ZS9wbHVnaW5zL3dhcm11cFBsaWdpbi50c1wiO2ltcG9ydCB7IHdhcm11cCB9IGZyb20gJ3ZpdGUtcGx1Z2luLXdhcm11cCdcclxuZXhwb3J0IGNvbnN0IGNyZWF0ZVdhcm11cCA9ICgpID0+IHtcclxuICByZXR1cm4gd2FybXVwKHtcclxuICAgIGNsaWVudEZpbGVzOiBbJy4vc3JjLyoqJ10sXHJcbiAgfSlcclxufVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkY6XFxcXHNpbXBsZV9hZG1pbl90ZW1wbGF0ZVxcXFx2aXRlXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkY6XFxcXHNpbXBsZV9hZG1pbl90ZW1wbGF0ZVxcXFx2aXRlXFxcXHBsdWdpbnNcXFxcc3ZnQnVpbGRQbHVnaW4udHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Y6L3NpbXBsZV9hZG1pbl90ZW1wbGF0ZS92aXRlL3BsdWdpbnMvc3ZnQnVpbGRQbHVnaW4udHNcIjtpbXBvcnQgeyByZWFkRmlsZVN5bmMsIHJlYWRkaXJTeW5jIH0gZnJvbSAnZnMnXHJcblxyXG5sZXQgaWRQZXJmaXggPSAnJ1xyXG5jb25zdCBpY29uTmFtZXM6IHN0cmluZ1tdID0gW11cclxuY29uc3Qgc3ZnVGl0bGUgPSAvPHN2ZyhbXj4rXS4qPyk+L1xyXG5jb25zdCBjbGVhckhlaWdodFdpZHRoID0gLyh3aWR0aHxoZWlnaHQpPVwiKFtePitdLio/KVwiL2dcclxuY29uc3QgaGFzVmlld0JveCA9IC8odmlld0JveD1cIltePitdLio/XCIpL2dcclxuY29uc3QgY2xlYXJSZXR1cm4gPSAvKFxccil8KFxcbikvZ1xyXG5mdW5jdGlvbiBmaW5kU3ZnRmlsZShkaXI6IHN0cmluZyk6IHN0cmluZ1tdIHtcclxuICBjb25zdCBzdmdSZXMgPSBbXVxyXG4gIGNvbnN0IGRpcmVudHMgPSByZWFkZGlyU3luYyhkaXIsIHtcclxuICAgIHdpdGhGaWxlVHlwZXM6IHRydWUsXHJcbiAgfSlcclxuICBmb3IgKGNvbnN0IGRpcmVudCBvZiBkaXJlbnRzKSB7XHJcbiAgICBpY29uTmFtZXMucHVzaChgJHtpZFBlcmZpeH0tJHtkaXJlbnQubmFtZS5yZXBsYWNlKCcuc3ZnJywgJycpfWApXHJcbiAgICBpZiAoZGlyZW50LmlzRGlyZWN0b3J5KCkpIHtcclxuICAgICAgc3ZnUmVzLnB1c2goLi4uZmluZFN2Z0ZpbGUoZGlyICsgZGlyZW50Lm5hbWUgKyAnLycpKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3Qgc3ZnID0gcmVhZEZpbGVTeW5jKGRpciArIGRpcmVudC5uYW1lKVxyXG4gICAgICAgIC50b1N0cmluZygpXHJcbiAgICAgICAgLnJlcGxhY2UoY2xlYXJSZXR1cm4sICcnKVxyXG4gICAgICAgIC5yZXBsYWNlKHN2Z1RpdGxlLCAoJDEsICQyKSA9PiB7XHJcbiAgICAgICAgICBsZXQgd2lkdGggPSAwXHJcbiAgICAgICAgICBsZXQgaGVpZ2h0ID0gMFxyXG4gICAgICAgICAgbGV0IGNvbnRlbnQgPSAkMi5yZXBsYWNlKFxyXG4gICAgICAgICAgICBjbGVhckhlaWdodFdpZHRoLFxyXG4gICAgICAgICAgICAoczE6IHN0cmluZywgczI6IHN0cmluZywgczM6IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICAgIGlmIChzMiA9PT0gJ3dpZHRoJykge1xyXG4gICAgICAgICAgICAgICAgd2lkdGggPSBzM1xyXG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoczIgPT09ICdoZWlnaHQnKSB7XHJcbiAgICAgICAgICAgICAgICBoZWlnaHQgPSBzM1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICByZXR1cm4gJydcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIClcclxuICAgICAgICAgIGlmICghaGFzVmlld0JveC50ZXN0KCQyKSkge1xyXG4gICAgICAgICAgICBjb250ZW50ICs9IGB2aWV3Qm94PVwiMCAwICR7d2lkdGh9ICR7aGVpZ2h0fVwiYFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIGA8c3ltYm9sIGlkPVwiJHtpZFBlcmZpeH0tJHtkaXJlbnQubmFtZS5yZXBsYWNlKFxyXG4gICAgICAgICAgICAnLnN2ZycsXHJcbiAgICAgICAgICAgICcnLFxyXG4gICAgICAgICAgKX1cIiAke2NvbnRlbnR9PmBcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5yZXBsYWNlKCc8L3N2Zz4nLCAnPC9zeW1ib2w+JylcclxuICAgICAgc3ZnUmVzLnB1c2goc3ZnKVxyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gc3ZnUmVzXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBzdmdCdWlsZFBsdWdpbiA9IChwYXRoOiBzdHJpbmcsIHBlcmZpeCA9ICdsb2NhbCcpID0+IHtcclxuICBpZiAocGF0aCA9PT0gJycpIHJldHVyblxyXG4gIGlkUGVyZml4ID0gcGVyZml4XHJcbiAgY29uc3QgcmVzID0gZmluZFN2Z0ZpbGUocGF0aClcclxuICByZXR1cm4ge1xyXG4gICAgbmFtZTogJ3ZpdGU6c3ZnJyxcclxuICAgIHRyYW5zZm9ybUluZGV4SHRtbChodG1sOiBzdHJpbmcpIHtcclxuICAgICAgLyogZXNsaW50LWRpc2FibGUgKi9cclxuICAgICAgcmV0dXJuIGh0bWwucmVwbGFjZShcclxuICAgICAgICAnPGJvZHk+JyxcclxuICAgICAgICBgXHJcbiAgICAgICAgICAgICAgICA8Ym9keT5cclxuICAgICAgICAgICAgICAgIDxzdmcgaWQ9XCJsb2NhbC1pY29uXCIgZGF0YS1pY29uLW5hbWU9XCIke2ljb25OYW1lcy5qb2luKFxyXG4gICAgICAgICAgICAgICAgICAnLCcsXHJcbiAgICAgICAgICAgICAgICApfVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiBzdHlsZT1cInBvc2l0aW9uOiBhYnNvbHV0ZTsgd2lkdGg6IDA7IGhlaWdodDogMFwiPlxyXG4gICAgICAgICAgICAgICAgJHtyZXMuam9pbignJyl9XHJcbiAgICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgICAgIGAsXHJcbiAgICAgIClcclxuICAgICAgLyogZXNsaW50LWVuYWJsZSAqL1xyXG4gICAgfSxcclxuICB9XHJcbn1cclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJGOlxcXFxzaW1wbGVfYWRtaW5fdGVtcGxhdGVcXFxcdml0ZVxcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJGOlxcXFxzaW1wbGVfYWRtaW5fdGVtcGxhdGVcXFxcdml0ZVxcXFxwbHVnaW5zXFxcXG1vY2sudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Y6L3NpbXBsZV9hZG1pbl90ZW1wbGF0ZS92aXRlL3BsdWdpbnMvbW9jay50c1wiOy8qKlxyXG4gKiBNb2NrIHBsdWdpbiBmb3IgZGV2ZWxvcG1lbnQgYW5kIHByb2R1Y3Rpb24uXHJcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9hbm5jd2Ivdml0ZS1wbHVnaW4tbW9ja1xyXG4gKi9cclxuaW1wb3J0IHsgdml0ZU1vY2tTZXJ2ZSB9IGZyb20gJ3ZpdGUtcGx1Z2luLW1vY2snXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY29uZmlnTW9ja1BsdWdpbihpc0J1aWxkOiBib29sZWFuKSB7XHJcbiAgcmV0dXJuIHZpdGVNb2NrU2VydmUoe1xyXG4gICAgbW9ja1BhdGg6ICdtb2NrJyxcclxuICAgIGxvY2FsRW5hYmxlZDogIWlzQnVpbGQsXHJcbiAgICBwcm9kRW5hYmxlZDogaXNCdWlsZCxcclxuICAgIGluamVjdENvZGU6IGBcclxuICAgIGltcG9ydCB7IHNldHVwUHJvZE1vY2tTZXJ2ZXIgfSBmcm9tICcuL19tb2NrUHJvZFNlcnZlcic7XHJcblxyXG4gICAgc2V0dXBQcm9kTW9ja1NlcnZlcigpO1xyXG4gIGAsXHJcbiAgfSlcclxufVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkY6XFxcXHNpbXBsZV9hZG1pbl90ZW1wbGF0ZVxcXFx2aXRlXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkY6XFxcXHNpbXBsZV9hZG1pbl90ZW1wbGF0ZVxcXFx2aXRlXFxcXHBsdWdpbnNcXFxcdml0ZUJ1aWxkSW5mby50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRjovc2ltcGxlX2FkbWluX3RlbXBsYXRlL3ZpdGUvcGx1Z2lucy92aXRlQnVpbGRJbmZvLnRzXCI7aW1wb3J0IHsgcmVhZGRpciwgc3RhdCB9IGZyb20gJ2ZzJ1xyXG5pbXBvcnQgdHlwZSB7IFBsdWdpbiB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCBkYXlqcywgeyBEYXlqcyB9IGZyb20gJ2RheWpzJ1xyXG5pbXBvcnQgZHVyYXRpb24gZnJvbSAnZGF5anMvcGx1Z2luL2R1cmF0aW9uJ1xyXG5pbXBvcnQgcGtnIGZyb20gJ3BpY29jb2xvcnMnXHJcblxyXG5jb25zdCB7IGdyZWVuLCBibHVlLCBib2xkIH0gPSBwa2dcclxuZGF5anMuZXh0ZW5kKGR1cmF0aW9uKVxyXG5cclxuY29uc3Qgc3RhdGljUGF0aCA9ICdkaXN0J1xyXG5jb25zdCBmaWxlTGlzdFRvdGFsOiBudW1iZXJbXSA9IFtdXHJcblxyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2Jhbi10eXBlc1xyXG5jb25zdCByZWN1cnNpdmVEaXJlY3RvcnkgPSAoZm9sZGVyOiBzdHJpbmcsIGNhbGxiYWNrOiBGdW5jdGlvbik6IHZvaWQgPT4ge1xyXG4gIHJlYWRkaXIoZm9sZGVyLCAoZXJyLCBmaWxlczogc3RyaW5nW10pID0+IHtcclxuICAgIGlmIChlcnIpIHRocm93IGVyclxyXG4gICAgbGV0IGNvdW50ID0gMFxyXG4gICAgY29uc3QgY2hlY2tFbmQgPSAoKSA9PiB7XHJcbiAgICAgICsrY291bnQgPT09IGZpbGVzLmxlbmd0aCAmJiBjYWxsYmFjaygpXHJcbiAgICB9XHJcbiAgICBmaWxlcy5mb3JFYWNoKChpdGVtOiBzdHJpbmcpID0+IHtcclxuICAgICAgc3RhdChmb2xkZXIgKyAnLycgKyBpdGVtLCBhc3luYyAoZXJyLCBzdGF0cykgPT4ge1xyXG4gICAgICAgIGlmIChlcnIpIHRocm93IGVyclxyXG4gICAgICAgIGlmIChzdGF0cy5pc0ZpbGUoKSkge1xyXG4gICAgICAgICAgZmlsZUxpc3RUb3RhbC5wdXNoKHN0YXRzLnNpemUpXHJcbiAgICAgICAgICBjaGVja0VuZCgpXHJcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0cy5pc0RpcmVjdG9yeSgpKSB7XHJcbiAgICAgICAgICByZWN1cnNpdmVEaXJlY3RvcnkoYCR7Zm9sZGVyfS8ke2l0ZW19L2AsIGNoZWNrRW5kKVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH0pXHJcbiAgICBmaWxlcy5sZW5ndGggPT09IDAgJiYgY2FsbGJhY2soKVxyXG4gIH0pXHJcbn1cclxuXHJcbmNvbnN0IHN1bSA9IChhcnI6IG51bWJlcltdKSA9PiB7XHJcbiAgcmV0dXJuIGFyci5yZWR1Y2UoKHQ6IG51bWJlciwgYzogbnVtYmVyKSA9PiB7XHJcbiAgICByZXR1cm4gdCArIGNcclxuICB9LCAwKVxyXG59XHJcbmNvbnN0IGZvcm1hdEJ5dGVzID0gKGE6IG51bWJlciwgYj86IG51bWJlcik6IHN0cmluZyA9PiB7XHJcbiAgaWYgKGEgPT09IDApIHJldHVybiAnMCBCeXRlcydcclxuICBjb25zdCBjID0gMTAyNFxyXG4gIGNvbnN0IGQgPSBiIHx8IDJcclxuICBjb25zdCBlID0gWydCeXRlcycsICdLQicsICdNQicsICdHQicsICdUQicsICdQQicsICdFQicsICdaQicsICdZQiddXHJcbiAgY29uc3QgZiA9IE1hdGguZmxvb3IoTWF0aC5sb2coYSkgLyBNYXRoLmxvZyhjKSlcclxuICByZXR1cm4gcGFyc2VGbG9hdCgoYSAvIE1hdGgucG93KGMsIGYpKS50b0ZpeGVkKGQpKSArICcgJyArIGVbZl1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHZpdGVCdWlsZEluZm8gPSAoKTogUGx1Z2luID0+IHtcclxuICBsZXQgY29uZmlnOiB7IGNvbW1hbmQ6IHN0cmluZyB9XHJcbiAgbGV0IHN0YXJ0VGltZTogRGF5anNcclxuICBsZXQgZW5kVGltZTogRGF5anNcclxuICByZXR1cm4ge1xyXG4gICAgbmFtZTogJ3ZpdGU6YnVpbGRJbmZvJyxcclxuICAgIGNvbmZpZ1Jlc29sdmVkKHJlc29sdmVkQ29uZmlnOiB7IGNvbW1hbmQ6IHN0cmluZyB9KSB7XHJcbiAgICAgIGNvbmZpZyA9IHJlc29sdmVkQ29uZmlnXHJcbiAgICB9LFxyXG4gICAgYnVpbGRTdGFydCgpIHtcclxuICAgICAgY29uc29sZS5sb2coXHJcbiAgICAgICAgYm9sZChcclxuICAgICAgICAgIGdyZWVuKFxyXG4gICAgICAgICAgICBgXHVEODNEXHVEQzRGXHU2QjIyXHU4RkNFXHU0RjdGXHU3NTI4JHtibHVlKCdbVjMtVGVtcGxhdGVdJyl9XHVGRjBDXHU0RTAwXHU0RTJBXHU1QzBGXHU3NjJBXHU0RTA5XHU3M0IwXHU1NzI4XHU2QjYzXHU1MTY4XHU1MjlCXHU0RTNBXHU2MEE4JHtcclxuICAgICAgICAgICAgICBjb25maWcuY29tbWFuZCA9PT0gJ2J1aWxkJyA/ICdcdTYyNTNcdTUzMDUnIDogJ1x1N0YxNlx1OEJEMSdcclxuICAgICAgICAgICAgfWAsXHJcbiAgICAgICAgICApLFxyXG4gICAgICAgICksXHJcbiAgICAgIClcclxuICAgICAgaWYgKGNvbmZpZy5jb21tYW5kID09PSAnYnVpbGQnKSB7XHJcbiAgICAgICAgc3RhcnRUaW1lID0gZGF5anMobmV3IERhdGUoKSlcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGNsb3NlQnVuZGxlKCkge1xyXG4gICAgICBpZiAoY29uZmlnLmNvbW1hbmQgPT09ICdidWlsZCcpIHtcclxuICAgICAgICBlbmRUaW1lID0gZGF5anMobmV3IERhdGUoKSlcclxuICAgICAgICByZWN1cnNpdmVEaXJlY3Rvcnkoc3RhdGljUGF0aCwgKCkgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXHJcbiAgICAgICAgICAgIGJvbGQoXHJcbiAgICAgICAgICAgICAgZ3JlZW4oXHJcbiAgICAgICAgICAgICAgICBgXHU2MDZEXHU1NTlDXHU2MjUzXHU1MzA1XHU1QjhDXHU2MjEwXHVEODNDXHVERjg5XHVGRjA4XHU2MDNCXHU3NTI4XHU2NUY2JHtkYXlqc1xyXG4gICAgICAgICAgICAgICAgICAuZHVyYXRpb24oZW5kVGltZS5kaWZmKHN0YXJ0VGltZSkpXHJcbiAgICAgICAgICAgICAgICAgIC5mb3JtYXQoJ21tXHU1MjA2c3NcdTc5RDInKX1cdUZGMENcdTYyNTNcdTUzMDVcdTU0MEVcdTc2ODRcdTU5MjdcdTVDMEZcdTRFM0Eke2Zvcm1hdEJ5dGVzKFxyXG4gICAgICAgICAgICAgICAgICBzdW0oZmlsZUxpc3RUb3RhbCksXHJcbiAgICAgICAgICAgICAgICApfVx1RkYwOWAsXHJcbiAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgIClcclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gIH1cclxufVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkY6XFxcXHNpbXBsZV9hZG1pbl90ZW1wbGF0ZVxcXFx2aXRlXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkY6XFxcXHNpbXBsZV9hZG1pbl90ZW1wbGF0ZVxcXFx2aXRlXFxcXHBsdWdpbnNcXFxcdmlzdWFsaXplci50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRjovc2ltcGxlX2FkbWluX3RlbXBsYXRlL3ZpdGUvcGx1Z2lucy92aXN1YWxpemVyLnRzXCI7aW1wb3J0IHsgdmlzdWFsaXplciB9IGZyb20gJ3JvbGx1cC1wbHVnaW4tdmlzdWFsaXplcidcclxuZXhwb3J0IGNvbnN0IGNyZWF0ZVZpc3VhbGl6ZXIgPSAoKSA9PiB7XHJcbiAgcmV0dXJuIHZpc3VhbGl6ZXIoe1xyXG4gICAgb3BlbjogdHJ1ZSxcclxuICAgIGd6aXBTaXplOiB0cnVlLFxyXG4gICAgYnJvdGxpU2l6ZTogdHJ1ZSxcclxuICAgIGZpbGVuYW1lOiAncmVwb3J0Lmh0bWwnLFxyXG4gIH0pXHJcbn1cclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJGOlxcXFxzaW1wbGVfYWRtaW5fdGVtcGxhdGVcXFxcdml0ZVxcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJGOlxcXFxzaW1wbGVfYWRtaW5fdGVtcGxhdGVcXFxcdml0ZVxcXFxwbHVnaW5zXFxcXGNvbXByZXNzaW9uLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9GOi9zaW1wbGVfYWRtaW5fdGVtcGxhdGUvdml0ZS9wbHVnaW5zL2NvbXByZXNzaW9uLnRzXCI7aW1wb3J0IGNvbXByZXNzaW9uIGZyb20gJ3ZpdGUtcGx1Z2luLWNvbXByZXNzaW9uJ1xyXG5cclxuZXhwb3J0IGNvbnN0IGNyZWF0ZUNvbXByZXNzaW9uID0gKGVudjogUmVjb3JkPHN0cmluZywgc3RyaW5nPikgPT4ge1xyXG4gIGNvbnN0IHBsdWdpbjogYW55W10gPSBbXVxyXG4gIGNvbnN0IHsgVklURV9CVUlMRF9DT01QUkVTUyB9ID0gZW52XHJcbiAgY29uc3QgY29tcHJlc3NMaXN0ID0gVklURV9CVUlMRF9DT01QUkVTUy5zcGxpdCgnLCcpXHJcbiAgaWYgKGNvbXByZXNzTGlzdC5pbmNsdWRlcygnZ3onKSkge1xyXG4gICAgcGx1Z2luLnB1c2goXHJcbiAgICAgIGNvbXByZXNzaW9uKHtcclxuICAgICAgICBleHQ6ICcuZ3onLFxyXG4gICAgICAgIGRlbGV0ZU9yaWdpbkZpbGU6IGZhbHNlLFxyXG4gICAgICB9KSxcclxuICAgIClcclxuICB9XHJcbiAgaWYgKGNvbXByZXNzTGlzdC5pbmNsdWRlcygnYnInKSkge1xyXG4gICAgcGx1Z2luLnB1c2goXHJcbiAgICAgIGNvbXByZXNzaW9uKHtcclxuICAgICAgICBleHQ6ICcuYnInLFxyXG4gICAgICAgIGFsZ29yaXRobTogJ2Jyb3RsaUNvbXByZXNzJyxcclxuICAgICAgICBkZWxldGVPcmlnaW5GaWxlOiBmYWxzZSxcclxuICAgICAgfSksXHJcbiAgICApXHJcbiAgfVxyXG4gIHJldHVybiBwbHVnaW5cclxufVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkY6XFxcXHNpbXBsZV9hZG1pbl90ZW1wbGF0ZVxcXFx2aXRlXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkY6XFxcXHNpbXBsZV9hZG1pbl90ZW1wbGF0ZVxcXFx2aXRlXFxcXHBsdWdpbnNcXFxcaW1hZ2VtaW4udHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Y6L3NpbXBsZV9hZG1pbl90ZW1wbGF0ZS92aXRlL3BsdWdpbnMvaW1hZ2VtaW4udHNcIjtpbXBvcnQgdml0ZUltYWdlbWluIGZyb20gJ3ZpdGUtcGx1Z2luLWltYWdlbWluJ1xyXG5leHBvcnQgY29uc3QgY3JlYXRlSW1hZ2VtaW4gPSAoKSA9PiB7XHJcbiAgcmV0dXJuIHZpdGVJbWFnZW1pbih7XHJcbiAgICBnaWZzaWNsZToge1xyXG4gICAgICBvcHRpbWl6YXRpb25MZXZlbDogNyxcclxuICAgICAgaW50ZXJsYWNlZDogZmFsc2UsXHJcbiAgICB9LFxyXG4gICAgb3B0aXBuZzoge1xyXG4gICAgICBvcHRpbWl6YXRpb25MZXZlbDogNyxcclxuICAgIH0sXHJcbiAgICBtb3pqcGVnOiB7XHJcbiAgICAgIHF1YWxpdHk6IDIwLFxyXG4gICAgfSxcclxuICAgIHBuZ3F1YW50OiB7XHJcbiAgICAgIHF1YWxpdHk6IFswLjgsIDAuOV0sXHJcbiAgICAgIHNwZWVkOiA0LFxyXG4gICAgfSxcclxuICAgIHN2Z286IHtcclxuICAgICAgcGx1Z2luczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIG5hbWU6ICdyZW1vdmVWaWV3Qm94JyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIG5hbWU6ICdyZW1vdmVFbXB0eUF0dHJzJyxcclxuICAgICAgICAgIGFjdGl2ZTogZmFsc2UsXHJcbiAgICAgICAgfSxcclxuICAgICAgXSxcclxuICAgIH0sXHJcbiAgfSlcclxufVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQThQLFNBQVMsZUFBZTtBQUV0UixTQUFTLGVBQWU7OztBQ0R4QixPQUFPLFNBQVM7QUFDaEIsT0FBTyxZQUFZOzs7QUNGZ1MsT0FBTyxnQkFBZ0I7QUFDMVUsU0FBUywyQkFBMkI7QUFDcEMsSUFBTywyQkFBUSxXQUFXO0FBQUE7QUFBQSxFQUV4QixTQUFTO0FBQUEsSUFDUDtBQUFBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQTtBQUFBLEVBQ0Y7QUFBQTtBQUFBLEVBR0EsU0FB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
