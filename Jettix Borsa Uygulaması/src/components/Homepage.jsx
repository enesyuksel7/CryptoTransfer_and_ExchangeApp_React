import React from 'react';
import millify from 'millify';
import { Typography, Row, Col, Statistic } from 'antd';
import { Link } from 'react-router-dom';

import { useGetCryptosQuery } from '../services/cryptoApi';
import Cryptocurrencies from './Cryptocurrencies';
import News from './News';
import Loader from './Loader';

const { Title } = Typography;

const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;

  if (isFetching) return <Loader />;

  return (
    <>
      <Title level={2} className="heading">Küresel Kripto Paralar</Title>
      <Row gutter={[32, 32]}>
        <Col span={12}><Statistic title="Toplam Kripto Para Sayısı" value={globalStats.total} /></Col>
        <Col span={12}><Statistic title="Toplam Değişim" value={millify(globalStats.totalExchanges)} /></Col>
        <Col span={12}><Statistic title="Toplam Market Değeri:" value={`$${millify(globalStats.totalMarketCap)}`} /></Col>
        <Col span={12}><Statistic title="Toplam 24s Hacim" value={`$${millify(globalStats.total24hVolume)}`} /></Col>
        <Col span={12}><Statistic title="Toplam Kripto Para Birimi" value={globalStats.total} /></Col>
        <Col span={12}><Statistic title="Toplam Piyasalar" value={millify(globalStats.totalMarkets)} /></Col>
      </Row>
      <div className="home-heading-container">
        <Title level={2} className="home-title">En Popüler 10 Kripto Para</Title>
        <Title level={3} className="show-more"><Link to="/cryptocurrencies">Daha fazla</Link></Title>
      </div>
      <Cryptocurrencies simplified />
      <div className="home-heading-container">
        <Title level={2} className="home-title">Son Haberler</Title>
        <Title level={3}><Link to="/news">Daha fazla</Link></Title>
      </div>
      <News simplified />
    </>
  );
};

export default Homepage;
