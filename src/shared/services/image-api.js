import axios from 'axios';
import PropTypes from 'prop-types';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api',
  params: {
    key: '31992358-fee5b7a6e58dad6481a8d399d',
    per_page: 15,
    image_type: 'photo',
  },
});

export const getImages = async (search, page) => {
  const { data } = await instance.get('/', {
    params: {
      q: search,
      page,
    },
  });
  return data;
};

getImages.propTypes = {
  search: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};
