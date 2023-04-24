## Beancount Analysis Web

[English](./README.md)

Beancount Analysis Web 是一个使用 Web 方式展示 Beancount 账目统计分析的项目。目前支持年支出、年收入、月支出和月收入的分析。

## 前提条件

## 前提条件

本项目依赖于已经安装的 Beancount 中的 `bean-query` 命令，因此在使用本项目之前，请确保您已经正确安装了 Beancount。关于 Beancount 的安装与使用，您可以查看 [Beancount 项目的介绍](https://github.com/beancount/beancount) 以获取详细信息。

### 技术栈

- 前端框架: Vue3
- 后端框架: Fastify
- 无数据库
- 构建工具: Vite
- 前后端语言: TypeScript

**注意**: 本项目处于 WIP(Work In Progress) 状态，可能会有一些功能尚未实现或存在问题。

### 如何运行项目

1. 克隆项目

```
git clone git@github.com:tortorse/beancount-analysis-web.git
```

2. 安装依赖

```
pnpm install
```

3. 构建前后端

```
pnpm run build
```

4. 运行前后端

```
pnpm run start
```

在完成上述步骤后，项目应该已经成功运行，你可以在浏览器中访问前端并查看 Beancount 账目的统计分析。
