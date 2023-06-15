/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import remarkMermaidPlugin from 'remark-mermaid-plugin';
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";

import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {atomDark as dark} from 'react-syntax-highlighter/dist/esm/styles/prism';
import ModalImage from "react-modal-image";



export default function MarkdownSpan(props)
{
    return <div className={props.className||''}><ReactMarkdown 
    remarkPlugins={[remarkGfm,remarkMermaidPlugin]}
    rehypePlugins={[
        rehypeRaw,
        rehypeStringify,
      ]}
    components={{
        a: CustomLink,
        code: CodeBlock,
        img: CustomImage,
        // p: ({ children }) => <div>{children}</div>,
    }}

    
>
    {props.children||null}
</ReactMarkdown></div>
}

const CustomLink = (props) => {
    return <a href={props.href} target="_blank" rel="noopener noreferrer">{props.children}</a>;
};

const CodeBlock = ({ node, inline, className, children, ...props }) => {
    
    // 如果 className 包含 hljs 则不做处理
    if( className && className.indexOf('hljs') > -1 ){
        return <code {...props} className={className}>{children}</code>;
    }
    
    const match = /language-(\w+)/.exec(className || '');
    return !inline && match ? (
      <SyntaxHighlighter
        {...props}
        style={dark}
        language={match[1]}
        PreTag="div"
      >{String(children).replace(/\n$/, '')}</SyntaxHighlighter>
    ) : (
      <code {...props} className={className}>
        {children}
      </code>
    );
};

const CustomImage = ({ node, ...props }) => {
    const {src, ...rest} = props;
    return <ModalImage {...rest} small={src} large={src} />;
};