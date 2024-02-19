import { Input, List, Space, Tooltip, Button } from 'antd';
import { DeleteOutlined, PlusOutlined, SaveOutlined } from '@ant-design/icons';
import React from 'react';
import { Token } from '../../types/types';

interface TokenListItemProps {
  token: Token;
  onDeleteToken: (symbol: string) => void;
  onUpdateToken: (symbol: string, amountInput: number) => void;
  onAddToken: (token: Token, amountInput: number) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>, token: Token) => void;
  letgoTokens: Token[];
}

const TokenListItem: React.FC<TokenListItemProps> = ({ token, letgoTokens, onDeleteToken, onUpdateToken, onAddToken, onInputChange }) => {
  const renderTokenActions = () => {

    const isTokenAdded = !letgoTokens.some((myToken) => myToken.symbol === token.symbol);

    return (
      <>
        {isTokenAdded ? (
          <Button icon={<PlusOutlined />} onClick={() => onAddToken(token, token.amountInput || 0)} type="primary">
            Add
          </Button>
        ) : (
          <>
            <Button
              icon={<SaveOutlined />}
              onClick={() => onUpdateToken(token.symbol, token.amountInput || 0)}
              className='updateButton'
            >
              Update
            </Button>

            <Button icon={<DeleteOutlined />} onClick={() => onDeleteToken(token.symbol)} type="primary" danger>
              Remove
            </Button>
          </>
        )}
      </>
    );
  };

  return (
    <List.Item>
      <List.Item.Meta
        title={token.symbol}
        description={
          <div className='container'>
            {token.lastPrice} - {token.weightedAvgPrice}
            <Space>
              <Input
                value={token.amountInput || 0}
                onChange={(e) => onInputChange(e, token)}
                placeholder="Token amount"
                maxLength={16}
                type="number"
              />
              {renderTokenActions()}
            </Space>
          </div>
        }
      />
    </List.Item>
  );
};

export default TokenListItem;
