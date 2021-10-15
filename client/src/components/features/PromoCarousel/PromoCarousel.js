import React from 'react';
import { UncontrolledCarousel } from 'reactstrap';
import './PromoCarousel.scss';

const items = [
  {
    src: '/img/promo/promo1.jpg',
    header: 'Great atmosphere!',
    caption: 'Watch legendary movies with thousands of people!',
    alt: 'Watch legendary movies with thousands of people!',
  },
  {
    src: '/img/promo/promo2.jpg',
    altText: 'Amazing workshops!',
    caption: 'Take a part in phenomenal performances.',
    header: 'Amazing workshops!',
  },
  {
    src: '/img/promo/promo3.jpg',
    altText: 'Meet actors!',
    caption: 'Ask a question to your favorite star!',
    header: 'Meet actors!',
  }
];

const PromoCarousel = () => <UncontrolledCarousel className="promoCarousel" items={items} pause={false}/>;

export default PromoCarousel;