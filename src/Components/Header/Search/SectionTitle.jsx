// @flow
import React from 'react';

import { Title } from './Styles';

type Section = {
    title: string,
};

const renderSectionTitle = (section: Section) => <Title>{section.title}</Title>;

renderSectionTitle.defaultProps = {
    title: 'Media',
};

export default renderSectionTitle;
