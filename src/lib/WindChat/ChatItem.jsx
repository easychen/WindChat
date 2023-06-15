/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import MarkdownSpan from './MarkdownSpan';
import { FaUserCircle } from 'react-icons/fa';
import { BsRobot } from 'react-icons/bs';

export default function ChatItem(props) {
    if( !props.data ) return null;
    const item = props.data;
    const avatar_user = props.avatarUser || <FaUserCircle size={24} color={'#999'}/>;
    const avatar_assistant = props.avatarAssistant || <BsRobot size={24} color={'#999'}/>;
    const avatar = item.role == 'user' ? avatar_user: avatar_assistant;

    return item.role == 'user' ? <div className="flex flex-row items-start justify-end">
        <div className="chat-user ml-2 mt-3 order-last">
           {avatar}
        </div>
        <div className={(props.className || ' ') + ' ' + (props.userClassName||' ')}>
        <MarkdownSpan className="flex flex-col">{item.content}</MarkdownSpan>
    </div>
    </div> : <div className="flex flex-row items-start">
        <div className="chat-assistant mr-2 mt-3">
           {avatar}
        </div>
        <div className={(props.className || ' ') + ' ' + (props.assistantClassName||' ')}>
        <MarkdownSpan className="flex flex-col">{item.content}</MarkdownSpan>
    </div>
    </div>;
}