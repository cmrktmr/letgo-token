// src/pages/Home.tsx
import { Card, Col, Row, message, Space, Button } from 'antd';
import { PlusOutlined, RedoOutlined } from '@ant-design/icons';
import { Chart } from 'react-google-charts';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { fetchData } from '../helpers/api';
import { useLocalStorage } from '../helpers/localStorage';
import { Token } from '../types/types';
import TokenList from '../components/TokenList/TokenList';
import TokenModal from '../components/TokenModal/TokenModal';

const Home: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pageSize, setPageSize] = useState(5);
  const [letgoTokens, setMyTokens] = useLocalStorage<Token[]>('letgoTokens', []);
  const [allTokens, setAllTokens] = useState<Token[]>([]);
  const { data, isLoading, refetch } = useQuery('data', fetchData, {
    refetchOnWindowFocus: false,
    refetchInterval: 300000,
  });

  useEffect(() => {
    if (data) {
      const storedTokens = letgoTokens.map((token: Token) => {
        const foundToken = data.find((d) => d.symbol === token.symbol);
        return foundToken ? { ...token, amountInput: token.amount } : token;
      });
      setAllTokens(storedTokens.length ? storedTokens : data);
    }
  }, [data]);

  const handleSaveTokens = (tokens: Token[]) => {
    setMyTokens(tokens);
    localStorage.setItem('letgoTokens', JSON.stringify(tokens));
  };

  const handleDeleteToken = (symbol: string) => {
    const updatedTokens = letgoTokens.filter((token: { symbol: string; }) => token.symbol !== symbol);
    setMyTokens(updatedTokens);
    handleSaveTokens(updatedTokens);
  };

  const handleUpdateToken = (symbol: string, amountInput: number) => {
    if (amountInput && amountInput > 0) {
      const updatedTokens = letgoTokens.map((token: { symbol: string; }) =>
        token.symbol === symbol ? { ...token, amount: amountInput } : token
      );
      setMyTokens(updatedTokens as Token[]);
      handleSaveTokens(updatedTokens as Token[]);
    } else {
      message.error('Please enter a token valid amount!');
    }
  };



  const handleAddToken = (token: Token, amountInput: number) => {
    if (amountInput > 0) {
      const updatedTokens = [...letgoTokens, { ...token, amount: amountInput }];
      setMyTokens(updatedTokens);
      handleSaveTokens(updatedTokens);
    } else {
      message.error('Please enter a valid token amount!');
    }
  };


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, token: Token) => {
    const { value } = e.target;
    setAllTokens(
      allTokens.map((t) =>
        t.symbol === token.symbol ? { ...t, amountInput: parseInt(value) } : t
      )
    );
    const updatedTokens = letgoTokens.map((t) =>
      t.symbol === token.symbol ? { ...t, amountInput: parseInt(value) } : t
    );
    setMyTokens(updatedTokens);
  };

  const handleSearch = (text: string) => {
    setAllTokens(data?.filter((d) => d.symbol.toLowerCase().includes(text.toLowerCase())) ?? []);
  };

  return (
    <div>
      <Row gutter={[32, 32]}>
        <Col span={24} lg={24}>
          <Card loading={isLoading}>
            <Space>
              <Button icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)} type="primary">Add Stock</Button>
              <Button icon={<RedoOutlined />} onClick={() => refetch()} type="default">Refresh</Button>
            </Space>
          </Card>
        </Col>

        <Col span={24} lg={12}>
          <Card loading={isLoading}>
            <TokenList
              letgoTokens={letgoTokens}
              tokens={allTokens}
              onDeleteToken={handleDeleteToken}
              onUpdateToken={handleUpdateToken}
              onAddToken={handleAddToken}
              onInputChange={handleInputChange}
            />
          </Card>
        </Col>

        <Col span={24} lg={12}>
          <Card loading={isLoading}>
            <div>
              <Chart
                chartType="PieChart"
                data={[['Symbol', 'Amount'], ...(letgoTokens.map((token: Token) => [token.symbol, token.amount]))]}
                options={{
                  title: 'My Token Amounts',
                  pieHole: 0.4,
                  is3D: true,
                }}
                width={'100%'}
                height={400}
              />
            </div>
          </Card>
        </Col>
      </Row>

      <TokenModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSearch={handleSearch}
        tokens={allTokens}
        letgoTokens={letgoTokens} 
        onInputChange={handleInputChange}
        onAddToken={handleAddToken}
        onUpdateToken={handleUpdateToken}
        onRemoveToken={handleDeleteToken}
      />

    </div>
  );
};

export default Home;
