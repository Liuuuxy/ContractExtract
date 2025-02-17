import React from 'react';
import '../styles/contract.css';

class ClauseTracker {
    constructor() {
        this.levelCounters = new Map();
    }

    getNumber(level) {
        if (!this.levelCounters.has(level)) {
            this.levelCounters.set(level, 1);
        }
        return this.levelCounters.get(level);
    }

    increment(level) {
        this.levelCounters.set(level, this.getNumber(level) + 1);
    }
}

const formatClauseNumber = (number, level) => {
    return level === 0 ? number : String.fromCharCode(96 + number);
};

const MentionRenderer = ({ node, NodeRenderer }) => (
    <span
        className="mention"
        style={{ backgroundColor: node.color }}
        title={node.title}
    >
        {NodeRenderer(node.children)}
    </span>
);

const ClauseRenderer = ({ node, number, level, NodeRenderer }) => {
    // Make sure node.children[0]... exists to avoid runtime errors
    if (
      node.children &&
      node.children[0] &&
      node.children[0].children &&
      node.children[0].children[0] &&
      typeof node.children[0].children[0].text === "string" &&
      !node.children[0].children[0].text.startsWith(formatClauseNumber(number, level) + ". ")
    ) {
      node.children[0].children[0].text = formatClauseNumber(number, level) + ". " + node.children[0].children[0].text;
    }
  
    return (
      <div>
        {NodeRenderer(node.children, {
          parentType: "clause",
          level: level + 1,
          tracker: new ClauseTracker(),
        })}
      </div>
    );
  };

// const ClauseRenderer = ({ node, number, level, NodeRenderer }) => (
//     return <div>
//         <span>{formatClauseNumber(number, level)}.</span>
//         {NodeRenderer(node.children, {
//             parentType: 'clause',
//             level: level + 1,
//             tracker: new ClauseTracker()
//         })}
//     </div >
// );

const NodeRenderer = (node, context = {
    parentType: null,
    level: 0,
    tracker: new ClauseTracker()
}) => {
    if (!node) return null;

    if (typeof node === 'string' || node.text) {
        const text = typeof node === 'string' ? node : node.text;
        const style = {
            ...(node.bold && { fontWeight: 'bold' }),
            ...(node.italic && { fontStyle: 'italic' }),
            ...(node.underline && { textDecoration: 'underline' }),
        };
        const parts = text.split('\n');
        return (
            <>
                {parts.map((part, index) => (
                    <React.Fragment key={index}>
                        {index > 0 && <br />}
                        <span style={style}>{part}</span>
                    </React.Fragment>
                ))}
            </>
        );
    }

    if (Array.isArray(node)) {
        return node.map((child, idx) => {
            if (child.type === 'clause') {
                const number = context.tracker.getNumber(context.level);
                context.tracker.increment(context.level);
                return (
                    <ClauseRenderer
                        key={idx}
                        node={child}
                        number={number}
                        level={context.level}
                        NodeRenderer={NodeRenderer}
                    />
                );
            }
            return NodeRenderer(child, context);
        });
    }

    switch (node.type) {
        case 'mention':
            return <MentionRenderer node={node} NodeRenderer={NodeRenderer} />;

        case 'clause':
            const number = context.tracker.getNumber(context.level);
            context.tracker.increment(context.level);
            return (
                <ClauseRenderer
                    node={node}
                    number={number}
                    level={context.level}
                    NodeRenderer={NodeRenderer}
                />
            );

        default: {
            const Element = node.type === 'block' ? 'div' : node.type || 'div';
            return (
                <Element className={context.parentType === 'clause' ? 'clause-content' : ''}>
                    {NodeRenderer(node.children, context)}
                </Element>
            );
        }
    }
};

export const ContractViewer = ({ data }) => (
    <div >
        {NodeRenderer(data)}
    </div>
);
