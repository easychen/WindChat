# WindChat

可以通过 TailwindCSS 高度定制的 React Chatbot starter。


| 参数 | 含义 | 默认值 |
| --- | --- | --- |
| container_classes | 容器的 CSS 类名 | 'border p-2 rounded' |
| list_classes | 聊天记录列表的 CSS 类名 | ' max-h-96 overflow-auto my-2' |
| input_classes | 输入框的 CSS 类名 | 'w-full border ' |
| input_box_classes | 输入框容器的 CSS 类名 | 'w-full flex flex-row items-center' |
| input_placeholder | 输入框的占位符 | '请输入问题 ' |
| send_btn_classes | 发送按钮的 CSS 类名 | 'border p-2 border-gray-600' |
| send_btn_text | 发送按钮的文本 | '发送' |
| chat_item_class | 聊天记录项的 CSS 类名 | 'my-2 flex flex-row justify-center' |
| chat_item_user_class | 用户聊天记录项的 CSS 类名 | 'bg-blue-100 p-2 w-fit rounded flex flex-row ' |
| chat_item_assistant_class | 机器人聊天记录项的 CSS 类名 | 'bg-yellow-100 p-2 w-fit rounded flex flex-row' |
| search_database_name_classes | 搜索数据库名称的 CSS 类名 | 'text-center text-sm text-white bg-gray-300 w-fit mx-auto p-1 rounded hover:bg-gray-700' |
| max_tokens | OpenAI API 的最大 token 数量 | 1000 |
| temperature | OpenAI API 的温度参数 | 0.9 |
| key | OpenAI API 的 API Key | 空字符串 |
| endpoint | OpenAI API 的 API Endpoint | 'https://oa.api2d.net' |
| model | OpenAI API 的模型名称 | 'gpt-3.5-turbo' |
| loading_text | 正在思考中的文本 | '正在思考中...' |
| scroll_delay | 滚动延迟时间 | 500 |
| stream | 是否启用流式 API | false |
| history_count | 历史记录数量 | 4 |
| pre_messages | 预设的系统消息 | 空数组 |
| searchable_id | 是否启用可搜索的 ID | false |
| search_result_count | 搜索结果数量 | 5 |
| search_database_name | 是否显示搜索数据库名称 | false |
| clean_btn | 清空按钮的 JSX 元素 | `<AiOutlineClear color="#666" size={24} className="mr-2 cursor-pointer"/>` |
| avatar_user | 用户头像 | `<FaUserCircle size={24} color={'#999'}/>` |
| avatar_assistant | 机器人头像 | `<BsRobot size={24} color={'#999'}/>` |