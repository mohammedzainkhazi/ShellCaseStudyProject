import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Box } from '@mui/material';

const Iconifysvg = forwardRef(({ imageSrc, width = 20, sx, ...other }, ref) => (
  <Box
    ref={ref}
    component="img"
    src={imageSrc}
    alt="Icon"
    sx={{ width, height: width, ...sx }}
    {...other}
  />
));

Iconifysvg.propTypes = {
  sx: PropTypes.object,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  imageSrc: PropTypes.string.isRequired, // Use imageSrc prop for the SVG image source
};

export default Iconifysvg;
