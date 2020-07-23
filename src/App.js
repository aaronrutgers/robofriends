import React from 'react'
import CardList from './CardList'
import robots from './robots'
import SearchBox from './SearchBox'


const state = {
    robots: robots,
    searchfield: ''
}

const App = () => {
    return (
        <div>
            <h1 className='tc'>RobotFriends</h1>
            <SearchBox />
            <CardList robots={robots}></CardList>
        </div>
    )
}

export default App