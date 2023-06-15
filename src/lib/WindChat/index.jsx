/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from 'react';
import ChatItem from './ChatItem';
import Api2d from 'api2d';
import { encoding_for_model } from "@dqbd/tiktoken";
import openai_model_tokens from 'openai-model-tokens'
import { AiOutlineClear } from 'react-icons/ai';
import { IoSettingsOutline } from 'react-icons/io5';

export default function ChatDeer(props) {

    const container_classes = props.containerClasses || 'border p-2 rounded';
    const list_classes = props.listClasses || 'max-h-96 overflow-auto my-2';
    const input_classes = props.inputClasses || 'w-full border ';
    const input_box_classes = props.inputBoxClasses || 'w-full flex flex-row items-center rounded border-t pt-5 border-dotted mt-5';
    const input_placeholder = props.inputPlaceholder || '请输入问题 ';
    const send_btn_classes = props.sendBtnClasses || 'border p-2 border-gray-600 rounded';
    const send_btn_text = props.sendBtnText || '发送';
    
    const key_box_classes = props.keyBoxClasses || ' bg-blue-100 my-2 p-2 flex flex-row ';
    const key_input_classes = props.keyInputClasses || 'border p-2 rounded border-gray-300';
    const save_key_btn_classes = props.saveKeyBtnClasses || 'border p-2 border-gray-300 bg-white rounded text-gray-600';
    const save_key_btn_text = props.saveKeyBtnText || '保存';
    const chat_item_class = props.chatItemClass || 'my-2 flex flex-row justify-center';
    const chat_item_user_class = props.chatItemUserClass || 'bg-blue-100 p-2 w-fit rounded flex flex-row ';
    const chat_item_assistant_class = props.chatItemAssistantClass || 'bg-yellow-100 p-2 w-fit rounded flex flex-row';
    const search_database_name_classes = props.searchDatabaseNameClasses || 'text-center text-sm text-white bg-gray-300 w-fit mx-auto p-1 rounded hover:bg-gray-700';

    const max_tokens = props.maxTokens || 1000;
    const temperature = props.temperature ?? 0.9;
    const key = props.apiKey || '';
    const endpoint = props.apiEndPoint || 'https://oa.api2d.net';
    const model = props.model || 'gpt-3.5-turbo';
    const model_tokens = openai_model_tokens(model);
    const loading_text = props.loadingText || '正在思考中...';
    const scroll_delay = props.scrollDelay || 500;
    const stream = props.stream || false;
    const history_count = props.historyCount || 4;
    const pre_messages = props.preMessages || []; // system messages
    const searchable_id = props.searchableId || false;
    const search_result_count = props.searchResultCount || 5;
    const search_database_name = props.searchDatabaseName || false;
    const clean_btn = props.cleanBtn || <AiOutlineClear color="#666" size={24} className="mr-2 cursor-pointer"/>;
    const settings_btn = props.settingsBtn || <IoSettingsOutline color="#666" size={24} className="mr-2 cursor-pointer"/>;

    const avatar_user = props.avatarUser || false;
    const avatar_assistant = props.avatarAssistant || false;
    const show_settings_btn = props.showSettingsBtn ?? false;
    
    let maxId = 1;
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [showSettings, setShowSettings] = useState(false);
    const [apiKey, setApiKey] = useState(key);

    const api2dRef = useRef(null);
    useEffect(() => {
        api2dRef.current = new Api2d(apiKey, endpoint);
    }, [apiKey,endpoint]);

    function scrollTop( delay = null )
    {
        if( parseInt( delay ) < 1 )
        {
            document.querySelector(".chat-deer.chat-list").scrollTop = document.querySelector(".chat-deer.chat-list").scrollHeight;
        }else
        {
            window.setTimeout(function(){
                document.querySelector(".chat-deer.chat-list").scrollTop = document.querySelector(".chat-deer.chat-list").scrollHeight;
            }
            , delay);
        }
        
    }

    async function chatSend()
    {
        console.log( "input text", inputText );
        if( inputText.length > 0 )
        {
            const question_id = _addMessage( inputText );
            setInputText('');

            if( props.onLoading ) props.onLoading( true );

            let data_messages = [];
            let data_token_count = 0;

            if( searchable_id )
            {
                data_messages = await _getVectorMessages( inputText, searchable_id, search_result_count ) || [];
                data_token_count = _getTokenCount( data_messages ) || 0 ;
            }
            
            const input_token_count = _getTokenCount( inputText );
            const history_messages = _getHistoryMessages( history_count, input_token_count + data_token_count ) || [];

            const messages_to_send = [...pre_messages,...data_messages,...history_messages,{
                role: 'user',
                content: inputText,
            }];
              
            const answer_id = _addMessage( loading_text, 'assistant' );
            const ret = await api2dRef.current.completion({
                model,
                messages:messages_to_send,
                stream,
                temperature,
                max_tokens,
                onMessage: ( message ) =>
                {
                    _updateMessage(answer_id, message);
                    scrollTop(scroll_delay);
                },
                // onEnd: ( message ) =>   console.log( message )
            });
            if( props.onLoading ) props.onLoading( false );
            if( ret  )
            {
                
                const result = stream ? ret : ret.choices[0].message.content;
                console.log( result );
                _updateMessage(answer_id, result );
                // update_token_count( answer_id, get_token_count( result ) );
            }
        }
    }

    async function _getVectorMessages( text, searchable_id, search_result_count = 5 )
    {
        // 首先通过 api2d 将 text 转换为向量
        const response = await api2dRef.current.embeddings({
            input: text,
        });
        console.log(response);
        if (response.data[0].embedding)
        {
            // 
            const response2 = await api2dRef.current.vectorSearch({
                embedding: response.data[0].embedding,
                topk: search_result_count,
                searchable_id,
            });
            console.log( response2.data );
            if( response2.data.Get.Text )
            {
                let ret_text = '可参考以下信息回答问题：'
                for( let i = 0; i < response2.data.Get.Text.length; i++ ){
                    if( response2.data.Get.Text[i]?.text )
                    ret_text += '\n' + response2.data.Get.Text[i]?.text;
                }
                return [{
                    role: 'system',
                    content: ret_text,
                }];
            }
        }
        return [];
    }

    function _getHistoryMessages( count, input_token_count=0 )
    {
        const allowed_token_count = model_tokens - input_token_count - max_tokens;
        
        // 从messages最后一条开始，逆序将元素push到数组中
        let ret = [];
        let i = messages.length - 1;
        while( i >= 0 && count > 0 )
        {
            ret.push( {"role":messages[i].role,"content":messages[i].content} );
            i--;
            count--;
        }

        ret.reverse();

        // 判断历史会话的token数量是否超过了允许的最大值
        while( _getTokenCount( ret ) > allowed_token_count )
        {
            // 超过长度，删除第一条
            // console.log( "h count", get_token_count( ret ), "a count", allowed_token_count );
            ret.shift();
        }

        return ret;
    }

    function _getTokenCount( input )
    {
        // 如果input是string
        if( typeof input == 'string' )
        {
            let model_check = model;

            // 简化模型版本号，避免因为新版本报错
            if( model_check.indexOf('gpt-3.5-turbo') === 0 ) model_check = 'gpt-3.5-turbo';

            if( model_check.indexOf('gpt-4') === 0 ) model_check = 'gpt-4';
            
            const enc = encoding_for_model(model_check);
            return enc.encode(input).length;
        }else
        {
            // 如果 input 是一个数组
            if( Array.isArray( input ) )
            {
                // 这是一个messages数组，要按 messages 的格式来拼接
                let ret_string = '';
                for( const message of input )
                {
                    ret_string += '<|im_start|>'+message.role+"\n"+message.content+'<|im_end|>'+"\n";
                }
                ret_string += '<|im_start|>assistant';
                // 把所有 <|im_***|> 的字符替换为 @ 
                ret_string = ret_string.replace(/<\|im_.*?\|>/g, '@');

                return _getTokenCount( ret_string );
            }
        }
    }

    function _addMessage( text, role='user' )
    {
        const id = new Date().getTime();
        const message_id = id + (maxId++);
        const message = {"id":message_id, role,"content":text};
        setMessages( messages => [...messages, message] );
        return message_id;
    }

    function _updateMessage( id, content )
    {
        setMessages(prevMessages => {
            return prevMessages.map((item) => {
                if( item.id == id )
                {
                    item.content = content;
                }
                return item;
            });
        });
    }

    function clean()
    {
        setMessages([]);
    }

    function settings()
    {
        setShowSettings( !showSettings );
    }

    return <div className={container_classes}>
        {search_database_name ? <div className={" chat-search-database-name "+search_database_name_classes}>知识库 · {search_database_name}</div> : null}
        <div className={"chat-deer chat-list " + list_classes}>
            { messages && messages.map( item => <ChatItem 
                className={"chat-deer chat-item "+ chat_item_class} 
                userClassName={chat_item_user_class} 
                avatarUser={avatar_user}
                avatarAssistant={avatar_assistant}
                assistantClassName={chat_item_assistant_class} 
                key={item.id} 
                data={item}
            /> ) }

        </div>
        <div className={"chat-input-box flex flex-row "+input_box_classes}>
            {show_settings_btn ? <span onClick={()=>settings()}>{settings_btn}</span> : null }
            
            <span onClick={()=>clean()}>{clean_btn}</span>
            <input type="text" placeholder={input_placeholder} className={"flex-1 mr-2 p-2 "+input_classes} value={inputText} onChange={e=>setInputText(e.target.value)} autoFocus={true}  />
            <button className={send_btn_classes} onClick={()=>chatSend()}>{send_btn_text}</button>
        </div>
        {showSettings ? <div className={"chat-settings "+key_box_classes}>
            <input type="text" className={"flex-1 mr-2 "+key_input_classes} value={apiKey} onChange={e=>setApiKey(e.target.value)} /><button className={save_key_btn_classes} onClick={()=>{setShowSettings(false);
            if( props.onApiKeyChange )
            {   
                props.onApiKeyChange(apiKey);
            }
            api2dRef.current = new Api2d(apiKey, endpoint);}}>{save_key_btn_text}</button>
        </div>:null}
    </div>
}