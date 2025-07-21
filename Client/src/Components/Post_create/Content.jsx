import React from "react";
import ReactMarkDown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import remarkDefinitionList from "remark-definition-list";
import { remarkAlert } from "remark-github-blockquote-alert";
import "remark-github-blockquote-alert/alert.css";
import "github-markdown-css/github-markdown-light.css"; 
import styled from "styled-components";

const Content = (props) => {
  const val = props.content;
  // console.log(val);
  return (
    <Container className='markdown-body'>
      <ReactMarkDown
        remarkPlugins={[remarkGfm, remarkDefinitionList, remarkAlert]}
        rehypePlugins={[rehypeRaw]}
        components={{
          code(props) {
            const { children, className, node, ...rest } = props;
            const match = /language-(\w+)/.exec(className || "");
            return match ? (
              <SyntaxHighlighter
                {...rest}
                PreTag='div'
                children={String(children).replace(/\n$/, "")}
                language={match[1]}
                style={docco}
              />
            ) : (
              <code
                {...rest}
                className={className}
              >
                {children}
              </code>
            );
          },
        }}
      >
        {val}
      </ReactMarkDown>
    </Container>
  );
};
export default Content;

const Container = styled.div`
  padding: 3%;
  @media (prefers-color-scheme: light) {
    .markdown-body {
    }
  }
`;
