import React, { useState } from 'react';
import { Modal, Input, List, Space, Button } from 'antd';
import { SearchOutlined, PlusOutlined, SaveOutlined, DeleteOutlined } from '@ant-design/icons';
import { Token } from '../../types/types';

interface TokenModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (text: string) => void;
  tokens: Token[];
  letgoTokens: Token[];
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>, token: Token) => void;
  onAddToken: (token: Token, amountInput: number) => void;
  onUpdateToken: (symbol: string, amountInput: number) => void;
  onRemoveToken: (symbol: string) => void;
}

const { Search } = Input;

const TokenModal: React.FC<TokenModalProps> = ({
  isOpen,
  onClose,
  onSearch,
  tokens,
  onInputChange,
  onAddToken,
  onUpdateToken,
  onRemoveToken,
  letgoTokens = []
}) => {

  const [searchValue, setSearchValue] = useState<string>('');

  const resetInputAndSearchValue = () => {
    setSearchValue('');
    onSearch('');
  };

  return (
    <Modal
      title="Search"
      visible={isOpen}
      onOk={onClose}
      onCancel={() => { onClose(); resetInputAndSearchValue(); }}
      width={1000}
    >

      <Search
        value={searchValue} // Value özelliği
        onChange={(e) => setSearchValue(e.target.value)} // Value'nun değişimi
        prefix={<SearchOutlined />}
        onSearch={(value) => {
          onSearch(value); // Arama işlevini çağır
        }}
        placeholder="Search"
      />
      <List
        pagination={{ pageSize: 10 }}
        dataSource={tokens}
        renderItem={(token) => (
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
                      placeholder="Input a number"
                      maxLength={16}
                      type="number"
                    />
                    {!letgoTokens.some((myToken) => myToken.symbol === token.symbol) ? (
                      <Button
                        type='primary'
                        icon={<PlusOutlined />}
                        onClick={() => onAddToken(token, token.amountInput || 0)}
                      >
                        Add
                      </Button>
                    ) : (
                      <>
                        <Button
                          className='updateButton'
                          icon={<SaveOutlined />}
                          onClick={() => onUpdateToken(token.symbol, token.amountInput || 0)}
                        >
                          Update
                        </Button>
                        <Button
                          className='deleteButton'
                          icon={<DeleteOutlined />}
                          onClick={() => onRemoveToken(token.symbol)}

                        >
                          Remove
                        </Button>
                      </>
                    )}

                  </Space>
                </div>
              }
            />
          </List.Item>
        )}
      />
    </Modal>
  );
};

export default TokenModal;

