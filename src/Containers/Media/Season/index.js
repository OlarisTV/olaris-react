import React from 'react'

import FetchSeason from 'Queries/fetchSeason'

const Season = props => {
    return (
        <FetchSeason uuid={props.match.params.uuid} />
    )
}

export default Season