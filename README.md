# 使用 pnpm、Vue、Fastify 创建 TypeScript monorepo

本教程将指导您如何创建一个使用 pnpm、Vue、Fastify 的 TypeScript monorepo。

## 准备工作

1. 确保已经安装了 Node.js 和 pnpm。如果尚未安装，请按照以下链接安装：

   - [Node.js](https://nodejs.org/)
   - pnpm: 运行命令 `npm install -g pnpm`

## 创建项目

1. 创建一个新的项目文件夹，并进入该文件夹：

```bash
mkdir my-app
cd my-app
```

2. 初始化 pnpm 工作区：

```bash
pnpm init
```

3. 在项目根目录下创建一个名为 "pnpm-workspace.yaml" 的文件，并输入以下内容：

```bash
packages:
- "packages/*"
```

4. 创建 "packages" 文件夹，用于存放 frontend 和 backend 项目：

```bash
mkdir packages
```

5. 创建 frontend 和 backend 子项目文件夹：

```bash
cd packages
mkdir frontend backend
```


## 设置 frontend

1. 进入 frontend 目录：

```bash
cd frontend
```

2. 使用 pnpm 创建 Vite 项目：

```bash
pnpm create vite
```

3. 安装 pnpm 依赖：

```bash
pnpm install
```

## 设置 backend

1. 进入 backend 目录：

```bash
cd ../backend
```

2. 初始化 pnpm 项目：

```bash
pnpm init
```

3. 安装 Fastify、Fastify TypeScript 插件以及相关依赖：

```bash
pnpm add fastify fastify-plugin
pnpm add --save-dev typescript ts-node @types/node
```

4. 在 "backend" 目录下创建 "src" 目录并添加 "index.ts" 文件：

```bash
mkdir src
touch src/index.ts
```

5. 在 "index.ts" 文件中添加基本的 Fastify 服务器代码：
```typescript
import fastify from 'fastify';

const server = fastify({ logger: true });

server.get('/', async (request, reply) => {
  return { hello: 'world' };
});

server.listen(3000, (err, address) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
  server.log.info(`server listening on ${address}`);
});
```

6. 在 "backend" 目录下创建 "tsconfig.json" 文件并添加以下内容：

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "strict": true,
    "esModuleInterop": true,
    "moduleResolution": "node",
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "dist"
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules"]
}
```

7. 修改 "backend/package.json"，添加 "start" 和 "build" 脚本

```bash
"scripts": {
  "start": "ts-node src/index.ts",
  "build": "tsc"
}
```

## 运行 frontend

1. 在终端中，转到 frontend 目录：

```bash
cd packages/frontend
```

2. 运行开发服务器：

```bash
pnpm run serve
```

## 运行 backend

1. 在终端中，转到 backend 目录：

```bash
cd packages/backend
```

2. 运行开发服务器：

```bash
pnpm run start
```

backend/
│
├─ src/
│   ├─ api/                  # 存放与 API 相关的代码
│   │   ├─ controllers/      # 控制器，负责处理 API 请求和响应
│   │   ├─ middlewares/      # 中间件，用于处理 API 请求的预处理和后处理
│   │   └─ routes/           # 路由，定义 API 端点及其对应的控制器
│   │
│   ├─ cmd/                  # 存放与执行系统命令相关的代码
│   │   ├─ utilities/        # 系统命令的工具函数
│   │   └─ index.ts          # 暴露 cmd 模块的主文件
│   │
│   ├─ config/               # 存放配置文件（如数据库连接等）
│   │
│   ├─ models/               # 数据模型，用于定义数据结构和与数据库交互
│   │
│   └─ index.ts              # 主文件，用于启动 Fastify 服务器并加载路由
│
├─ dist/                     # 编译后的 JavaScript 代码
│
├─ test/                     # 测试文件
│
├─ .gitignore                # git 忽略文件
│
├─ package.json              # 项目依赖和脚本
│
└─ tsconfig.json             # TypeScript 配置文件



cmd/
├─ config/
│   ├─ readConfig.ts      # 读取配置文件的函数
│   └─ writeConfig.ts     # 写入配置文件的函数
│
├─ bean-query/
│   └─ index.ts           # 暴露 bean-query 相关功能的主文件
│
├─ utilities/
│   └─ utils.ts           # 存放与 cmd 子模块共享的辅助函数
│
└─ index.ts               # cmd 模块的主文件，导出所有功能供其他模块使用


