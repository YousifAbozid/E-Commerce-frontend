import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loader = () => {
    return (
        <Spinner
            animation="grow"
            variant="dark"
            style={{ margin: 'auto', display: 'block', width: "100px", height: "100px" }}
        >
            <span className="sr-only">Loading...</span>
        </Spinner>
    )
}

export default Loader