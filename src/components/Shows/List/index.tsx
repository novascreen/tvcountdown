import * as React from 'react';
import { Show } from 'graphql/types';
// import { Grid, Typography } from 'material-ui';
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';
import withWidth, { WithWidthProps } from 'material-ui/utils/withWidth';
import FavoriteToggle from '../FavoriteToggle';

type Props = {
  shows: [Show];
};

export const List = ({ shows, width }: Props & WithWidthProps) => {
  let cols = 5;
  if (width === 'md') cols = 4;
  if (width === 'sm') cols = 3;
  if (width === 'xs') cols = 2;
  return (
    <GridList cellHeight="auto" cols={cols}>
      {!Boolean(shows.length)
        ? 'No favorite shows found'
        : shows.map((show: Show) => {
            const { id, name, image, premiered, network } = show;
            const year = premiered ? premiered.split('-')[0] : '';
            const networkName = network && network.name;
            let secondaryText = year ? [year] : [];
            secondaryText = secondaryText.concat(
              networkName ? [networkName] : [],
            );
            if (!id) return null;
            return (
              <GridListTile key={id}>
                {image && image.medium && <img src={image.medium} />}
                <GridListTileBar
                  title={name}
                  subtitle={secondaryText.join(', ')}
                  actionIcon={<FavoriteToggle showId={id} />}
                />
              </GridListTile>
            );
          })}
    </GridList>
  );
};

export default withWidth()(List);
