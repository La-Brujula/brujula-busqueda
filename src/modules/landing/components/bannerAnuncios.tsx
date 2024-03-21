import ResponsiveCarousel from '@shared/layout/carusel';
import { AnuncioSlide } from './anuncioSlide';
import React from 'react';

function BannerAnuncios(props: {
  anuncios: {
    horizontalImage?: string;
    verticalImage?: string;
    image?: string;
    linkUrl?: string;
  }[];
}) {
  return (
    <ResponsiveCarousel>
      {props.anuncios.map((anuncio, i) => (
        <AnuncioSlide
          key={anuncio.linkUrl + '' + i}
          horizontalImage={anuncio.horizontalImage}
          verticalImage={anuncio.verticalImage}
          imageUrl={anuncio.image}
          linkUrl={anuncio.linkUrl}
        />
      ))}
    </ResponsiveCarousel>
  );
}

export default React.memo(BannerAnuncios);
