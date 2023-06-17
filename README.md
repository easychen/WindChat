# WindChat

可以通过 TailwindCSS 高度定制的 React Chatbot starter。

## 快速预览

https://github.com/easychen/WindChat/assets/1294760/961fd7b5-d027-4efd-86e0-b0b30bf85e7e

## 使用教程

登录后，可免费观看（仅限本节）

<https://stack.ftqq.com/section/show/294>

![image](https://github.com/easychen/WindChat/assets/1294760/d7b45770-3edc-411f-bd2f-6e16c42f386d)


## License

MIT

## 开发流程

### 克隆到本地并安装依赖

```
git clone https://github.com/easychen/WindChat.git
cd WindChat
yarn install
```

### 启动开发环境

```
yarn dev
```

可修改 `src/App.jsx` 中 `WindChat` 组件的属性进行定制

### 编译输出

```
yarn build
```

将 `dist` 目录部署到 web 目录即可访问使用。



## 可定制参数


| 参数 | 含义 | 默认值 |
| --- | --- | --- |
| containerClasses | 容器的 CSS 类名 | 'border p-2 rounded' |
| listClasses | 聊天记录列表的 CSS 类名 | ' max-h-96 overflow-auto my-2' |
| inputClasses | 输入框的 CSS 类名 | 'w-full border ' |
| inputBoxClasses | 输入框容器的 CSS 类名 | 'w-full flex flex-row items-center' |
| inputPlaceholder | 输入框的占位符 | '请输入问题 ' |
| sendBtnClasses | 发送按钮的 CSS 类名 | 'border p-2 border-gray-600' |
| sendBtnText | 发送按钮的文本 | '发送' |
| chatItemClass | 聊天记录项的 CSS 类名 | 'my-2 flex flex-row justify-center' |
| chatItemUserClass | 用户聊天记录项的 CSS 类名 | 'bg-blue-100 p-2 w-fit rounded flex flex-row ' |
| chatItemAssistantClass | 机器人聊天记录项的 CSS 类名 | 'bg-yellow-100 p-2 w-fit rounded flex flex-row' |
| searchDatabaseNameClasses | 搜索数据库名称的 CSS 类名 | 'text-center text-sm text-white bg-gray-300 w-fit mx-auto p-1 rounded hover:bg-gray-700' |
| maxTokens | OpenAI API 的最大 token 数量 | 1000 |
| temperature | OpenAI API 的温度参数 | 0.9 |
| key | OpenAI API 的 API Key | 空字符串 |
| endpoint | OpenAI API 的 API Endpoint | 'https://oa.api2d.net' |
| model | OpenAI API 的模型名称 | 'gpt-3.5-turbo' |
| loadingText | 正在思考中的文本 | '正在思考中...' |
| scrollDelay | 滚动延迟时间 | 500 |
| stream | 是否启用流式 API | false |
| historyCount | 历史记录数量 | 4 |
| preMessages | 预设的系统消息 | 空数组 |
| searchableId | 是否启用可搜索的 ID | false |
| searchResultCount | 搜索结果数量 | 5 |
| searchDatabaseName | 是否显示搜索数据库名称 | false |
| cleanBtn | 清空按钮的 JSX 元素 | `<AiOutlineClear color="#666" size={24} className="mr-2 cursor-pointer"/>` |
| avatarUser | 用户头像 | `<FaUserCircle size={24} color={'#999'}/>` |
| avatarAssistant | 机器人头像 | `<BsRobot size={24} color={'#999'}/>` |
