import React, { Component } from 'react'
import { connect } from "react-redux";
import CardList from '../components/CardList'
import SearchBox from '../components/SearchBox'
import Scroll from '../components/Scroll'
import ErrorBoundry from '../components/ErrorBoundry'
import './App.css'
import { setSearchFeild } from "../actions";
import { searchRobots } from "../reducers";


const mapStateToProps = state => {
    return {
        searchField: state.searchRobots.searchField
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchFeild(event.target.value))
    }
}

class App extends Component {
    constructor() {
        super()
        this.state = {
            robots: [],
            // 有了redux就不需要状态了
            // searchfield: ''
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                return response.json()
            })
            .then(users => {
                this.setState({ robots: users })
            })
    }

    // 有了redux就不需要了
    // onSearchChange = (event) => {
    //     this.setState({ searchfield: event.target.value })
    // }

    render() {
        const { robots } = this.state
        const { searchField, onSearchChange } = this.props
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase())
        })

        return !robots.length ?
            <h1>Loading</h1> :
            <div className='tc'>
                <h1 className="f1">RobotFriends</h1>
                <SearchBox searchChange={onSearchChange} />
                <Scroll>
                    <ErrorBoundry>
                        <CardList robots={filteredRobots} />
                    </ErrorBoundry>
                </Scroll>
            </div>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)