import React, {useState} from 'react';
import {render} from 'react-dom';
import {StaticMap} from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import {MapView} from '@deck.gl/core';
import {IconLayer} from '@deck.gl/layers';

import ICON from './image/geofence-center@2x.png';

const CENTER = [-73.9911, 40.7343];

const MAP_VIEW = new MapView({ repeat: true });

const INITIAL_VIEW_STATE = {
  longitude: CENTER[0],
  latitude: CENTER[1],
  zoom: 12,
  maxZoom: 20,
  pitch: 0,
  bearing: 0
};

// const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json';
const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';


/* eslint-disable react/no-deprecated */
export default function App({
  mapStyle = MAP_STYLE
}) {
  const layer = new IconLayer({
    id: 'icon',
    data: [CENTER],
    getIcon: () => ({
      url: '/image/geofence-center@2x.png',
      width: 32,
      height: 32,
    }),
    sizeMinPixels: 16,
    sizeMaxPixels: 16,
    getPosition: d => d,
    onIconError: (err) => {
      console.error('ICON ERROR', err);
    },
  });

  return (
    <DeckGL
      layers={[layer]}
      views={MAP_VIEW}
      initialViewState={INITIAL_VIEW_STATE}
      controller={{dragRotate: false}}
    >
      <StaticMap reuseMaps mapStyle={mapStyle} preventStyleDiffing={true} />
    </DeckGL>
  );
}

export function renderToDOM(container) {
  render(<App />, container);
}
