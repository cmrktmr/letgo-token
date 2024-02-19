import { List } from 'antd';
import React from 'react';
import { Token } from '../../types/types';
import TokenListItem from './TokenListItem';

interface TokenListProps {
  tokens: Token[];
  onDeleteToken: (symbol: string) => void;
  onUpdateToken: (symbol: string, amountInput: number) => void;
  onAddToken: (token: Token, amountInput: number) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>, token: Token) => void;
  letgoTokens: Token[];
}

const TokenList: React.FC<TokenListProps> = ({ letgoTokens, onDeleteToken, onUpdateToken, onAddToken, onInputChange }) => {
  return (
    <List
      pagination={{ pageSize: 10 }}
      dataSource={letgoTokens}
      renderItem={(token) => (
        <TokenListItem
        key={token.symbol}
        letgoTokens={letgoTokens}
        token={token}
        onDeleteToken={onDeleteToken}
        onUpdateToken={onUpdateToken}
        onAddToken={onAddToken}
        onInputChange={onInputChange}
      />
        
      )}
    />
  );
};

export default TokenList;
